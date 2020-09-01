import React from "react";
import Request from "esri/request";
import SketchViewModel from "esri/widgets/Sketch/SketchViewModel";
import Graphic from "esri/Graphic";

export default function ExportKMZ() {
  let ServiceURL =
    "http://93.112.6.225/arcgis/rest/services/A_MapService/MapServer?f=pjson";
  let KMZServiceURL =
    "http://93.112.6.225/arcgis/rest/services/A_MapService/MapServer/";

  React.useEffect(() => {
    const pointSymbol = {
      type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
      style: "square",
      color: "#8A2BE2",
      size: "16px",
      outline: {
        // autocasts as new SimpleLineSymbol()
        color: [255, 255, 255],
        width: 3,
      },
    };

    const polylineSymbol = {
      type: "simple-line", // autocasts as new SimpleLineSymbol()
      color: "#8A2BE2",
      width: "4",
      style: "dash",
    };

    const polygonSymbol = {
      type: "simple-fill", // autocasts as new SimpleFillSymbol()
      color: "rgba(138,43,226, 0.8)",
      style: "backward-diagonal",
      outline: {
        color: "rgb(255,0,0)",
        width: 1.5,
        style: "dash",
      },
    };
    /// symbol style
    // "backward-diagonal"|"cross"|"diagonal-cross"|
    // "forward-diagonal"|"horizontal"|"none"|"solid"|"vertical"
    /// outline style
    //   'dash', 'dash-dot',
    //   'dot', 'inside-frame', 'long-dash', 'long-dash-dot',
    //    'long-dash-dot-dot', 'none', 'short-dash',
    // 'short-dash-dot', 'short-dash-dot-dot', 'short-dot', 'solid'
    var sketchVM = new SketchViewModel({
      layer: window._layer,
      view: window._view,
      polygonSymbol: polygonSymbol,
      pointSymbol: pointSymbol,
      polylineSymbol: polylineSymbol,
    });
    sketchVM.on("create", function(event) {
      if (event.state === "complete") {
        //remove currnet graphic
        window._layer.remove(event.graphic);
        window._view.graphics.removeAll();
        queryFunc(event.graphic.geometry);
      }
    });
    function queryFunc(geom) {
      // developers.arcgis.com/javascript/latest/api-reference/esri-tasks-support-Query.html
      let query = window._survyBuilding.createQuery();
      query.geometry = geom;
      query.spatialRelationship = "contains";
      query.returnGeometry = true;
      query.outFields = ["*"];
      window._survyBuilding.queryFeatures(query).then(function(response) {
        let geometriesArray = response.features.map(function(feature) {
          return feature.geometry;
        });
        // let featureName = response.features.map(function(feature) {
        //   return feature.attributes.Name;
        // });
        let geobjectIds = response.features.map(function(feature) {
          return feature.attributes.OBJECTID;
        });

        ExportKMZFByObjectid(3, "قطع أراضى الممتلكات", geobjectIds);

        document.getElementById(
          "CallMessageAlert"
        ).innerHTML = ` عدد القطع التى تم استخراجها  ${geobjectIds.length}`;

        let MessageAlertClicked = document.getElementById(
          "MessageAlertClicked"
        );
        MessageAlertClicked.click();

        const fillsymbol = {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "rgba(138,43,226)",
          //   style: "backward-diagonal",
          //   outline: {
          //     color: "rgb(255,0,0)",
          //     width: 1.5,
          //     style: "dash",
          //   },
        };
        geometriesArray.forEach(drawResultFun);
        function drawResultFun(geom) {
          let polygonGraphic = new Graphic({
            geometry: geom,
            symbol: fillsymbol,
          });
          window._view.graphics.add(polygonGraphic);
        }
      });
    }
    //start query
    document.querySelector("#KMZExport").addEventListener("click", function() {
      sketchVM.create("polygon");
    });

    // #region download layer
    let requestOptions = {
      responseType: "json",
    };
    Request(ServiceURL, requestOptions).then(function(response) {
      let result = response.data;
      let lstKMZLayers = document.getElementById("lstKMZLayers");

      lstKMZLayers.addEventListener("change", function() {
        let selectKMZLayersID =
          lstKMZLayers.options[lstKMZLayers.selectedIndex].id;
        let selectKMZLayersName =
          lstKMZLayers.options[lstKMZLayers.selectedIndex].name;

        ExportKMZFByLayer(selectKMZLayersID, selectKMZLayersName);

        document.getElementById(
          "CallMessageAlert"
        ).innerHTML = `تم استخراج طبقة -  ${selectKMZLayersName}`;
        let MessageAlertClicked = document.getElementById(
          "MessageAlertClicked"
        );
        MessageAlertClicked.click();
      });

      for (let i = 0; i < result.layers.length; i++) {
        let options = document.createElement("option");
        options.textContent = result.layers[i].name;
        options.id = result.layers[i].id;
        options.name = result.layers[i].name;
        lstKMZLayers.appendChild(options);
      }
    });
    function ExportKMZFByLayer(layerId, layerName) {
      let oLayerID = KMZServiceURL + layerId + "/query";
      let queryOption = {
        responseType: "blob",
        query: {
          f: "KMZ",
          where: "1=1",
          outFields: "*",
          // objectIds: oid,
          returnGeometry: true,
        },
      };
      http: Request(oLayerID, queryOption)
        .then((response) => {
          // console.log(response);
          // console.log(response.data);

          downloadFile(response.data, `${layerName}.kmz`, "kmz");
        })
        .catch((err) => console.log("ERRor to export KMZ func"));
    }
    // #endregion

    function ExportKMZFByObjectid(layerId, layerName, Objectid) {
      let oLayerID = KMZServiceURL + layerId + "/query";
      let queryOption = {
        responseType: "blob",
        query: {
          f: "KMZ",
          where: `objectid in (${Objectid})`,
          // objectid in (278,279)
          outFields: "*",
          returnGeometry: true,
        },
      };
      http: Request(oLayerID, queryOption)
        .then((response) => {
          // console.log(response);
          // console.log(response.data);

          downloadFile(response.data, `${layerName}.kmz`, "kmz");
        })
        .catch((err) => console.log("ERRor to export KMZ func"));
    }
    $(document).ready(function() {
      $("#success-alert").hide();
      $("#MessageAlertClicked").click(function showAlert() {
        $("#success-alert")
          .fadeTo(2000, 500)
          .slideUp(500, function() {
            $("#success-alert").slideUp(500);
          });
      });
    });
  });
  return (
    <>
      <div className="KMZLayers">
        <select id="lstKMZLayers">
          <option value="0">اختر اسم الطبقة</option>
        </select>
        <br />
        <button id="KMZExport">KMZ تصدير الى ملف </button>
      </div>
      <button id="MessageAlertClicked"></button>
      <div className="alert alert-success" id="success-alert">
        <button type="button" className="close" data-dismiss="alert">
          x
        </button>
        <label id="CallMessageAlert"></label>
      </div>
    </>
  );
}

export function downloadFile(data, filename, mime) {
  // It is necessary to create a new blob object with mime-type explicitly set
  // otherwise only Chrome works like it should
  const blob = new Blob([data], {
    type: mime || "application/octet-stream",
  });
  if (typeof window.navigator.msSaveBlob !== "undefined") {
    // IE doesn't allow using a blob object directly as link href.
    // Workaround for "HTML7007: One or more blob URLs were
    // revoked by closing the blob for which they were created.
    // These URLs will no longer resolve as the data backing
    // the URL has been freed."
    window.navigator.msSaveBlob(blob, filename);
    return;
  }
  // Other browsers
  // Create a link pointing to the ObjectURL containing the blob
  const blobURL = window.URL.createObjectURL(blob);
  const tempLink = document.createElement("a");
  tempLink.style.display = "none";
  tempLink.href = blobURL;
  tempLink.setAttribute("download", filename);
  // Safari thinks _blank anchor are pop ups. We only want to set _blank
  // target if the browser does not support the HTML5 download attribute.
  // This allows you to download files in desktop safari if pop up blocking
  // is enabled.
  if (typeof tempLink.download === "undefined") {
    tempLink.setAttribute("target", "_blank");
  }
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
  setTimeout(() => {
    // For Firefox it is necessary to delay revoking the ObjectURL
    window.URL.revokeObjectURL(blobURL);
  }, 100);
}

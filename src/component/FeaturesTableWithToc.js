import React from "react";
import FeatureLayer from "esri/layers/FeatureLayer";
import MapImageLayer from "esri/layers/MapImageLayer";
import EsriRequest from "esri/request";
import GraphicClass from "esri/Graphic";

export default function FeaturesTableWithToc() {
  var Request;
  let LayerID;
  const DEFAULTPageCount = 10;
  const DEFAULT_SET_PAGE_SIZE = 5;
  let MapImage;
  let survyPoint;
  let survyBuilding;
  let layerItem;
  let LegendItem;

  // var ServiceJsonURL = "http://93.112.6.225/arcgis/rest/services?f=pjson";
  var ServiceURL =
    // "http://93.112.6.225/arcgis/rest/services/MapServiceTest/MapServer/";
    "http://93.112.6.225/arcgis/rest/services/A_MapService/MapServer/";
  var LegnendServiceURL =
    // "http://93.112.6.225/arcgis/rest/services/MapServiceTest/MapServer/legend?f=pjson";
    "http://93.112.6.225/arcgis/rest/services/A_MapService/MapServer/legend?f=pjson";

  React.useEffect(() => {
    Request = EsriRequest;

    // The function used for the PopupTemplate
    function getInfo(feature) {
      var graphic, attributes, content;
      graphic = feature.graphic;
      attributes = graphic.attributes;
      // let date = new Date(attributes.DateCreated).toLocaleDateString();
      content =
        "الإسم:- " +
        attributes.Name +
        "</br>" +
        " حالة الممتلك:-" +
        attributes.LandType +
        "</br>" +
        "صور فوتوغرافيه للموقع:-" +
        '<a  href="' +
        attributes.ImagesAttach +
        '" target="_blank" style="color:red">مشاهدة وتحميل </a>' +
        "</br>" +
        "الرفع المساحي للموقع:-" +
        '<a  href="' +
        attributes.SiteAttach +
        '" target="_blank" style="color:red">مشاهدة وتحميل </a>' +
        "</br>" +
        "الكروكي المساحي للموقع:-" +
        '<a  href="' +
        attributes.SurveyAttach +
        '" target="_blank" style="color:red">مشاهدة وتحميل </a>' +
        "</br>" +
        "وثائق الملكية:-" +
        '<a  href="' +
        attributes.AdminAttach +
        '" target="_blank" style="color:red">مشاهدة وتحميل </a>' +
        "</br>" +
        "التقرير العقاري:-" +
        '<a  href="' +
        attributes.ReportAttach +
        '" target="_blank" style="color:red">مشاهدة وتحميل </a>' +
        "</br>";

      return content;
    }
    // "الصور:-" +
    // '<img  src="' +
    // attributes.Zone1 +
    // '" alt="" height="30" width="92"  />';

    const popupTemplate = {
      title: "Zone: {Zone}",
      outFields: ["*"],
      content: getInfo,
    };
    var featureLayerSymbol = {
      type: "simple",
      symbol: {
        type: "simple-marker",
        style: "square",
        color: "blue",
        size: "25px", // pixels
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: [255, 255, 0],
          width: 1, // points
        },
      },
    };

    onChangeServiceMap(1, true);
    let progressBarValue;
    window._progressBarValue = progressBarValue;
    window._progressBarValue = 1;

    let progressBar = document.querySelector("#progressBarapp");
    progressBar.onchange = function() {
      onChangeServiceMap(parseFloat(progressBar.value), false);
      window._progressBarValue = parseFloat(progressBar.value);
    };

    function onChangeFeatureService(layerIDs) {
      let layerFeature = new MapImageLayer({
        url: ServiceURL,
        sublayers: [
          {
            id: layerIDs,
          },
        ],
      });
      // window._topoMap.removeAll(); //for delete all layers
      window._topoMap.add(layerFeature);
      //wait until the layer is loaded
      layerFeature.when(() => {
        // populateLayerRecursive(layer, layerList);
        // console.log(layerFeature);
        // mapview.goTo(layerFeature.fullExtent);
        window._view.extent = {
          // autocasts as new Extent()
          xmin: layerFeature.fullExtent.xmin,
          ymin: layerFeature.fullExtent.ymin,
          xmax: layerFeature.fullExtent.xmax,
          ymax: layerFeature.fullExtent.ymax,
          spatialReference: layerFeature.fullExtent.spatialReference,
        };
      });
    }

    function onChangeServiceMap(numOpicty, poolGoTo) {
      survyPoint = new FeatureLayer({
        url:
          "http://93.112.6.225/arcgis/rest/services/MapServiceTest/FeatureServer/257",
        outFields: ["*"],
        popupTemplate,
        renderer: featureLayerSymbol,
      });
      survyBuilding = new FeatureLayer({
        url:
          "http://93.112.6.225/arcgis/rest/services/MapServiceTest/FeatureServer/263",
        outFields: ["*"],
        // popupTemplate,
        renderer: featureLayerSymbol,
      });

      MapImage = new MapImageLayer({
        url: ServiceURL,
      });
      MapImage.opacity = numOpicty;

      //for delete all layers
      window._topoMap.removeAll();

      window._topoMap.addMany([window._layer, MapImage, survyPoint]);

      //wait until the layer is loaded
      MapImage.when(() => {
        //this code to generate table of content (visible & not visible)
        let toc = document.getElementById("toc");

        while (toc.firstChild) {
          toc.removeChild(toc.firstChild);
        }

        let layerList = document.createElement("ul");
        layerList.classList.add("ulToggle");
        toc.appendChild(layerList);

        window._survyPoint = survyPoint;
        window._survyBuilding = survyBuilding;
        window._MapImage = MapImage;

        //populate layer in list
        populateLayerRecursive(window._MapImage, layerList);
        if (poolGoTo == true) {
          window._view.goTo(MapImage.fullExtent);
        }
      });
    }
    //this for query data
    function getCount(LayerID, el, labelHover) {
      let queryUrl = ServiceURL + LayerID + "/query";

      let queryOption = {
        responseType: "json",
        query: {
          f: "json",
          where: "1=1",
          returnCountOnly: true,
        },
      };

      Request(queryUrl, queryOption).then(
        function(response) {
          if (response.data.count) {
            labelHover.FeatureCount = response.data.count;
            labelHover.style.cursor = "pointer";
          }
          el.textContent = " " + response.data.count;
        },
        (response) => (el.style.visibility = "hidden")
      );
    }

    function populateLayerRecursive(thislayer, layerList) {
      let chk = document.createElement("input");
      chk.type = "checkbox";
      chk.value = thislayer.id;
      LayerID = thislayer.id;
      chk.checked = thislayer.visible;

      chk.addEventListener("click", (e) => {
        thislayer.visible = e.target.checked;
      });

      let lbl = document.createElement("label");
      lbl.textContent = thislayer.title;

      let lblCount = document.createElement("label");

      lblCount.classList.add("lblCount");

      getCount(thislayer.id, lblCount, lbl);
      lbl.layerId = thislayer.id;

      layerItem = document.createElement("li");
      layerItem.appendChild(chk);
      layerItem.appendChild(lbl);
      layerList.appendChild(layerItem);
      layerItem.appendChild(lblCount);
      GenerateLegend(thislayer.id, layerItem);

      //on click, open attribut table
      lbl.addEventListener("click", function(e) {
        GenerateLegend(e.target.layerId, layerItem);
        populateAtributeTable(e.target.layerId, e.target.FeatureCount, 1);
        if (e.target.FeatureCount === undefined) {
          console.log("not found any data");
          let PaginationCleaner = document.querySelector("#PageCounter");
          while (PaginationCleaner.firstChild) {
            PaginationCleaner.removeChild(PaginationCleaner.firstChild);
          }
        } else {
          populatePageCount(e.target.layerId, e.target.FeatureCount);
          onChangeFeatureService(e.target.layerId);
        }
      });

      if (thislayer.sublayers != null && thislayer.sublayers.items.length > 0) {
        let newList = document.createElement("ul");

        newList.style.display = "none";

        newList.classList.add("ulToggle");

        layerList.appendChild(newList);

        if (lbl.textContent == "A MapService") {
          lbl.innerHTML = "ممتلكات الوزارة العامة للرياضة";
        }
        if (document.querySelector(".lblCount")[0] == undefined)
          lblCount.style.visibility = "hidden";

        for (let i = 0; i < thislayer.sublayers.length; i++) {
          populateLayerRecursive(thislayer.sublayers.items[i], newList);
        }
      }
    }

    function GenerateLegend(layerIds, layerItem) {
      let requestOptionss = {
        responseType: "json",
      };
      Request(LegnendServiceURL, requestOptionss).then(function(responses) {
        let resultss = responses.data;
        for (let i = 0; i < resultss.layers.length; i++) {
          for (let j = 0; j < resultss.layers[i].legend.length; j++) {
            if (layerIds === resultss.layers[i].layerId) {
              LegendItem = document.createElement("ul");
              let LegendImg = document.createElement("img");
              LegendItem.appendChild(LegendImg);
              // console.log("outlayer" + layerId);
              // let op = resultss.layers[i].legend[j].imageData;
              // let opp = resultss.layers[i].layerId;
              // console.log(op);
              // console.log("legend" + opp);
              // LegendImg.src =
              //   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAFNJREFUOI1jYaAyYBk1cNRAOPiPxGak1MD/c4MRnOS1DP/xGUrIQBTDGBgYGOYG4zd06EcKY/JajDBkYKAgDOGGIvPxKSbWy3gNIcdAosGogZQDAMKAEGIsvr2UAAAAAElFTkSuQmCC";
              LegendImg.src = `data:${resultss.layers[i].legend[j].contentType};base64,${resultss.layers[i].legend[j].imageData}`;
              LegendImg.alt = resultss.layers[i].layerName;
              LegendImg.width = resultss.layers[i].legend[j].height;
              LegendImg.height = resultss.layers[i].legend[j].width;
              layerItem.appendChild(LegendItem);
            }
          }
        }
      });
    }
    function drawGeometry(geometry, cleanup = true) {
      let g;
      let s;
      //it is line
      if (geometry.paths != undefined) {
        g = {
          type: "polyline",
          paths: geometry.paths,
        };
        s = {
          type: "simple-line",
          cap: "round",
          color: [255, 0, 0, 0.5],
          width: 7,
          style: "solid", //short-dot
        };
      } // it is a polygon
      else if (geometry.rings != undefined) {
        g = {
          type: "polygon",
          rings: geometry.rings,
        };
        s = {
          type: "simple-fill",
          color: [255, 0, 0, 0.5],
          style: "backward-diagonal",
          outline: {
            width: 5,
            color: [0, 0, 255, 0.7],
            style: "solid",
          },
        };
      } // it is a point
      else {
        g = {
          type: "point",
          longitude: geometry.x,
          latitude: geometry.y,
        };
        s = {
          type: "simple-marker",
          color: [255, 0, 0, 0.5],
          size: 20,
        };
      }

      if (cleanup === true) window._view.graphics = []; //for clean all graphic

      let graphic = new GraphicClass({ geometry: g, symbol: s });
      window._view.graphics.add(graphic);
      window._view.goTo(graphic);
    }

    function ZooomToFeature(e) {
      let oLayerID = ServiceURL + e.target.eLayerID + "/query";

      let oid = e.target.oid;

      let queryOption = {
        responseType: "json",
        query: {
          f: "json",
          objectIds: oid,
          returnGeometry: true,
          outSR: 4326,
        },
      };

      Request(oLayerID, queryOption)
        .then((response) => {
          // when we get the geometry back, create graphic and zoom...
          // alert("Sucess" + JSON.stringify(response));
          // alert(JSON.stringify(response.data));
          drawGeometry(response.data.features[0].geometry);
        })
        .catch((err) => console.log("ERRor to lood drawGeometry func"));
    }
    //populate the attribute of a given layer
    function populateAtributeTable(LayerID, FeatureCount, page) {
      //create buttons

      let attributeTable = document.getElementById("attributeTable");
      // attributeTable.innerHTML = "";
      while (attributeTable.firstChild) {
        attributeTable.removeChild(attributeTable.firstChild);
      }

      let queryUrl = ServiceURL + LayerID + "/query";
      let queryOption = {
        responseType: "json",
        query: {
          f: "json",
          where: "1=1",
          returnCountOnly: false,
          outFields: "*",
          resultOffset: (page - 1) * DEFAULTPageCount,
          resultRecordCount: DEFAULTPageCount,
        },
      };

      Request(queryUrl, queryOption).then(
        (response) => {
          //alert(response.data.fields.length);
          let table = document.createElement("table");
          table.border = 2;
          let header = document.createElement("tr");
          let ZoomHeader = document.createElement("th");
          ZoomHeader.textContent = "";
          header.appendChild(ZoomHeader);
          table.appendChild(header);

          //populate the fileds / columns
          for (let i = 0; i < response.data.fields.length; i++) {
            // for create head (fields)
            let column = document.createElement("th");
            column.textContent = response.data.fields[i].alias;
            header.appendChild(column);
          }

          //loop through all features
          for (let j = 0; j < response.data.features.length; j++) {
            let feature = response.data.features[j];
            let row = document.createElement("tr");
            let zoomColumn = document.createElement("td");

            let img = document.createElement("img");
            img.style.width = "32px";
            img.style.height = "32px";
            img.src = "../src/assets/images/zoomFeature.png";
            img.eLayerID = LayerID;
            img.addEventListener("click", ZooomToFeature);
            zoomColumn.appendChild(img);
            row.appendChild(zoomColumn);
            table.appendChild(row);
            for (let i = 0; i < response.data.fields.length; i++) {
              let field = response.data.fields[i];

              let column = document.createElement("td");

              if (field.type == "esriFieldTypeOID") {
                img.oid = feature.attributes[field.name];
              }
              // this to convert datetime from EPOCH(this to use samply to use by any thing in programming
              //  (samply to convert to mile second)) to Date
              if (field.type == "esriFieldTypeDate") {
                let date = new Date(feature.attributes[field.name]);
                column.textContent = date.toLocaleDateString("en-US");
              } else {
                column.textContent = feature.attributes[field.name];
              }
              row.appendChild(column);
            }
          }

          attributeTable.appendChild(table);
        },
        (response) => console.log("can not get attribute for group layer")
      );
    }

    // #region Pagination

    //rest buttonPages color
    var buttonPages = [];
    function resetPages() {
      buttonPages.forEach((v) => {
        v.style.color = "black";
      });
    }
    let page;
    function populatePageCount(
      LayerID,
      feaureCount,
      initPage = 1,
      initSet = 0
    ) {
      let pageCount = Math.ceil(feaureCount / DEFAULTPageCount);
      let pageCountDiv = document.getElementById("PageCounter");
      let feaureCountLBL = document.createElement("label");
      feaureCountLBL.textContent = " العدد الإجمالى: " + feaureCount;

      while (pageCountDiv.firstChild) {
        pageCountDiv.removeChild(pageCountDiv.firstChild);
      }

      let pageToDraw = DEFAULT_SET_PAGE_SIZE;
      if (pageCount - initSet < DEFAULT_SET_PAGE_SIZE) {
        pageToDraw = pageCount - initSet;
      }

      for (let i = initSet; i < initSet + pageToDraw; i++) {
        page = document.createElement("button");
        page.textContent = i + 1;
        buttonPages.push(page);
        page.pageNumber = i + 1;
        page.featureCount = feaureCount;

        page.addEventListener("click", function(e) {
          resetPages();
          e.target.style.color = "red";
          populateAtributeTable(LayerID, feaureCount, i + 1);
        });
        if (i + 1 === initPage) {
          page.style.color = "red";
        }
        pageCountDiv.appendChild(page);
        pageCountDiv.appendChild(feaureCountLBL);
      }

      // this for make next more pages
      let nextSet = document.createElement("button");
      nextSet.textContent = ">>";
      nextSet.disabled = pageCount - initSet < DEFAULT_SET_PAGE_SIZE;
      nextSet.addEventListener("click", function(e) {
        page.click();
        resetPages();
        populatePageCount(
          LayerID,
          feaureCount,
          initSet + DEFAULT_SET_PAGE_SIZE + 1,
          initSet + DEFAULT_SET_PAGE_SIZE
        );
      });
      pageCountDiv.appendChild(nextSet);

      // this for make Previous more pages
      let PreviousSet = document.createElement("button");
      PreviousSet.textContent = "<<";
      if (initSet < DEFAULT_SET_PAGE_SIZE) {
        PreviousSet.disabled = true;
      } else if (pageCount + initSet > DEFAULT_SET_PAGE_SIZE) {
        PreviousSet.disabled = false;
      }

      PreviousSet.addEventListener("click", function() {
        page.addEventListener("click", function(e) {
          resetPages();
          e.target.style.color = "red";
          populateAtributeTable(LayerID, feaureCount, i - 1);
        });

        page.click();
        resetPages();
        populatePageCount(
          LayerID,
          feaureCount,
          initSet - DEFAULT_SET_PAGE_SIZE + 1,
          initSet - DEFAULT_SET_PAGE_SIZE
        );
      });
      pageCountDiv.appendChild(PreviousSet);
    }
    // #endregion
    $(document).on("click", ".ulToggle > li ", function() {
      $(this)
        .next("ul")
        .toggle()
        .toggleClass("lll");
    });
    window._LayerID = LayerID;

    // MapImage.when(() => {
    //   window._view.goTo({ target: MapImage.fullExtent });
    // }, []);
  });
  return (
    <>
      <div className="TocHide">
        <div>
          <input
            id="progressBarapp"
            type="range"
            v-model="rangeValue"
            step="0.1"
            min="0"
            defaultValue="1"
            max="1"
          />
          <div valign="top" id="toc"></div>
        </div>
      </div>
      <div className="attributeHide">
        <div id="PageCounter"></div>
        <div id="attributeTable"></div>
      </div>
    </>
  );
}

// << Code in Console window in  google chrome >>
//     if you need to check how many layer in ever layer and another important sample code
// layer.sublayers.length
// 2
// layer.sublayers.items[0].sublayers.lenght
// 1
// map.layers.items[0].sublayers._items[0].title
// "Damage to Residential Buildings"
// map.layers.items[0].sublayers.length
// 1
// map.layers.items[0].findSublayerById(0).title
// "No Permit"
// map.layers.items[0].findSublayerById(0).visible=false
// false
// map.layers.items[0].findSublayerById(0).visible=true
// true
// layer.sublayers.items.length
// 1
// layer.sublayers.items[0].sublayers._items.length
// 3
// layer.sublayers.items[0].sublayers._items[0].sublayers._items.length
// 2
// layer.sublayers.items[0].sublayers._items[0].id
// 7

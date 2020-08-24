import React from "react";
import Expand from "esri/widgets/Expand";
import request from "esri/request";
import FeatureLayer from "esri/layers/FeatureLayer";
import Field from "esri/layers/support/Field";
import Graphic from "esri/Graphic";

export default function ReviewShapfile() {
  React.useEffect(() => {
    var portalUrl = "https://www.arcgis.com";

    document
      .getElementById("uploadForm")
      .addEventListener("change", function(event) {
        var fileName = event.target.value.toLowerCase();

        if (fileName.indexOf(".zip") !== -1) {
          //is file a zip - if not notify user
          generateFeatureCollection(fileName);
        } else {
          document.getElementById("upload-status").innerHTML =
            '<p style={{color:"red"}}>Add shapefile as .zip file</p>';
        }
      });

    var fileForm = document.getElementById("mainWindow");

    var expand = new Expand({
      expandIconClass: "esri-icon-upload",
      view: window._view,
      content: fileForm,
    });

    window._view.ui.add(expand, "top-right");

    function generateFeatureCollection(fileName) {
      var name = fileName.split(".");
      // Chrome and IE add c:\fakepath to the value - we need to remove it
      // see this link for more info: http://davidwalsh.name/fakepath
      name = name[0].replace("c:\\fakepath\\", "");

      document.getElementById("upload-status").innerHTML =
        "<b>يرجى الإنتظار لتحميل.. </b>" + name;

      // define the input params for generate see the rest doc for details
      // https://developers.arcgis.com/rest/users-groups-and-items/generate.htm
      var params = {
        name: name,
        targetSR: window._view.spatialReference,
        maxRecordCount: 1000,
        enforceInputFileSizeLimit: true,
        enforceOutputJsonSizeLimit: true,
      };

      // generalize features to 10 meters for better performance
      params.generalize = true;
      params.maxAllowableOffset = 10;
      params.reducePrecision = true;
      params.numberOfDigitsAfterDecimal = 0;

      var myContent = {
        filetype: "shapefile",
        publishParameters: JSON.stringify(params),
        f: "json",
      };

      // use the REST generate operation to generate a feature collection from the zipped shapefile
      request(portalUrl + "/sharing/rest/content/features/generate", {
        query: myContent,
        body: document.getElementById("uploadForm"),
        responseType: "json",
      })
        .then(function(response) {
          var layerName =
            response.data.featureCollection.layers[0].layerDefinition.name;
          document.getElementById("upload-status").innerHTML =
            "<b>Loaded: </b>" + layerName;
          addShapefileToMap(response.data.featureCollection);
        })
        .catch(errorHandler);
    }

    function errorHandler(error) {
      document.getElementById("upload-status").innerHTML =
        "<p style={{color:'red',maxWidth: '500px'}}>" + error.message + "</p>";
    }

    function addShapefileToMap(featureCollection) {
      // add the shapefile to the map and zoom to the feature collection extent
      // if you want to persist the feature collection when you reload browser, you could store the
      // collection in local storage by serializing the layer using featureLayer.toJson()
      // see the 'Feature Collection in Local Storage' sample for an example of how to work with local storage
      var sourceGraphics = [];

      var layers = featureCollection.layers.map(function(layer) {
        var graphics = layer.featureSet.features.map(function(feature) {
          return Graphic.fromJSON(feature);
        });
        sourceGraphics = sourceGraphics.concat(graphics);
        var featureLayer = new FeatureLayer({
          objectIdField: "FID",
          source: graphics,
          fields: layer.layerDefinition.fields.map(function(field) {
            return Field.fromJSON(field);
          }),
        });
        return featureLayer;
        // associate the feature with the popup on click to enable highlight and zoom to
      });
      window._topoMap.addMany(layers);
      window._view.goTo(sourceGraphics).catch(function(error) {
        if (error.name != "AbortError") {
          console.error(error);
        }
      });

      document.getElementById("upload-status").innerHTML = "";
    }
  });
  return (
    <>
      <div id="mainWindow">
        <div>
          <div style={{ paddingLeft: "4px" }} className="custom_file_upload">
            <p>Shapefile يمكنك فتح واستعراض ملفات</p>
            <p>zip يرجى اختيار ملف بصيغة</p>
            <form encType="multipart/form-data" method="post" id="uploadForm">
              <div className="field">
                <label className="file-upload" htmlFor="inFile">
                  <span>
                    <strong>أختر الملف</strong>
                  </span>
                  <input
                    type="file"
                    name="file"
                    className="customFileForSHP"
                    id="inFile"
                    accept=".zip"
                  />
                </label>
              </div>
            </form>
            <span
              className="file-upload-status"
              style={{ opacity: "1" }}
              id="upload-status"
            ></span>
            <div id="fileInfo"></div>
          </div>
        </div>
      </div>
    </>
  );
}

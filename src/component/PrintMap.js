import React from "react";
import EsriRequest from "esri/request";

export default function PrintMap() {
  var Request;
  let Url =
    "http://93.112.6.225/arcgis/rest/services/ExportWebMapLast/GPServer/Export%20Web%20Map/submitJob";
  let topoMap;
  let mapview;
  var myfile;

  React.useEffect(() => {
    Request = EsriRequest;
    let jsonF = `{
      "mapOptions": {
        "showAttribution": true,
        "extent": {
          "XMin": -104.53020709870626,
          "YMin": -25.471925275660684,
          "XMax": 75.35704494206294,
          "YMax": 51.908146633940035,
          "spatialReference": { "wkid": 4326 }
        },
        "spatialReference": { "wkid": 4326 },
        "scale": 2311162.2171549997,
        "rotation": -45
      },
      "operationalLayers": [
        {
          "id": "إحداثيات أركان المبنى",
          "title": "إحداثيات أركان المبنى",
          "opacity": 1,
          "visibility": true,
          "url": "http://93.112.6.225/arcgis/rest/services/SampleWorldCities/MapServer"
        }
      ],
      "exportOptions": {
        "outputSize": [800, 1100],
        "dpi": 96
      },
      "drawingInfo": {
        "scaleSymbols": false,
        "showLabels": false
      },
      "layoutOptions": {
        "titleText": "الخريطة",
        "authorText": "ahmedEngN",
        "copyrightText": "© esri",
        "scaleBarOptions": {
          "metricUnit": "esriKilometers",
          "metricLabel": "km",
          "nonMetricUnit": "esriMiles",
          "nonMetricLabel": "mi"
        },
        "customTextElements": [{ "description": "descEngN" }]
      }
    }
    `;

    let queryOption = {
      responseType: "document",
      query: {
        f: "HTML",
        Web_Map_as_JSON: jsonF,
        Format: "PNG8",
        Layout_Template: "customLe",
      },
    };
    Request(Url, queryOption).then(
      (responses) => {
        setTimeout(function() {
          console.log(responses);
          console.log(responses.data.URL);
          myfile = responses.data.URL + "/results/Output_File?f=pjson";
        }, 2000);
      },
      (response) => console.log(response)
    );

    setTimeout(function() {
      let options = { responseType: "json" };
      Request(myfile, options).then(
        function(responsem) {
          console.log(responsem.data.value.url);
        },
        (responsen) => console.log(responsen)
      );
    }, 5000);
  });
  return <div></div>;
}

import "./config";
import React from "react";
import FeatureLayer from "esri/layers/FeatureLayer";
import MapImageLayer from "esri/layers/MapImageLayer";

export default function FeaturesService() {
  React.useEffect(() => {
    // The function used for the PopupTemplate
    function getInfo(feature) {
      var graphic, attributes, content;
      graphic = feature.graphic;
      attributes = graphic.attributes;
      let date = new Date(attributes.DateCreated).toLocaleDateString();
      content =
        "رقم النقطه:- " +
        attributes.point_numb +
        "</br>" +
        " موقع النقطه:-" +
        attributes.Point_Posi +
        "</br>" +
        "المعرف الجغرافى:-" +
        '<img  src="' +
        attributes.Zone1 +
        '" alt="" height="30" width="92"  />';

      return content;
    }

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
        size: "1px", // pixels
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: [255, 255, 0],
          width: 1, // points
        },
      },
    };

    const featureLayer = new FeatureLayer({
      url:
        "http://localhost:6080/arcgis/rest/services/DataWorker_H/FeatureServer/2",
      outFields: ["*"],
      popupTemplate,
      renderer: featureLayerSymbol,
    });
    window._featureLayer = featureLayer;

    const MapImage = new MapImageLayer({
      url: "http://localhost:6080/arcgis/rest/services/DataWorker_H/MapServer",
    });
    window._MapImage = MapImage;

    window._map.addMany([MapImage, featureLayer]);

    MapImage.when(() => {
      window._view.goTo({ target: MapImage.fullExtent });
    }, []);
  });
  return <div></div>;
}

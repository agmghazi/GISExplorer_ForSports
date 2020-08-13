import "./config";
import FeatureLayer from "esri/layers/FeatureLayer";
import React from "react";

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
    var nasemPointSymbol = {
      type: "simple",
      symbol: {
        type: "picture-marker",
        url:
          "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
        width: "15px",
        height: "15px",
      },
    };

    const layer1 = new FeatureLayer({
      url:
        "http://localhost:6080/arcgis/rest/services/DataWorker_H/FeatureServer/2",
      outFields: ["*"],
      popupTemplate,
      renderer: nasemPointSymbol,
    });

    // map.addMany([layer1, layer2]);
    window._map.add(layer1);

    layer1.when(() => {
      window._view.goTo({ target: layer1.fullExtent });
    }, []);
  });
  return <div></div>;
}

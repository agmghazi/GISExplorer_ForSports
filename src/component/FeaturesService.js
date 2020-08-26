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

    const survyPoint = new FeatureLayer({
      url:
        "http://93.112.6.225/arcgis/rest/services/MapServiceTest/FeatureServer/257",
      outFields: ["*"],
      popupTemplate,
      renderer: featureLayerSymbol,
    });
    const survyBuilding = new FeatureLayer({
      url:
        "http://93.112.6.225/arcgis/rest/services/MapServiceTest/FeatureServer/263",
      outFields: ["*"],
      // popupTemplate,
      renderer: featureLayerSymbol,
    });

    const MapImage = new MapImageLayer({
      url: "http://93.112.6.225/arcgis/rest/services/MapServiceTest/MapServer",
    });

    // window._topoMap.addMany([window._MapImage, survyPoint]);
    // window._satelliteMap.addMany([MapImage, survyPoint]);
    // window._streetMap.addMany([MapImage, survyPoint]);
    window._survyPoint = survyPoint;
    window._survyBuilding = survyBuilding;
    window._MapImage = MapImage;

    MapImage.when(() => {
      window._view.goTo({ target: MapImage.fullExtent });
    }, []);
  });
  return <div></div>;
}

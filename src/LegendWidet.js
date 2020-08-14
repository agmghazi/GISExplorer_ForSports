import React from "react";
import Legend from "esri/widgets/Legend";
import Expand from "esri/widgets/Expand";

export default function FeaturesService() {
  React.useEffect(() => {
    let legend = new Legend({
      view: window._view,
      layerInfos: [
        {
          layer: window._MapImage,
          title: "الخريطه",
        },
        {
          layer: window._featureLayer,
          title: "",
          ready: true,
          SymbolTableElementInfo: {
            size: "0.2",
          },
        },
      ],
    });
    legend.style = {
      type: "classic",
      layout: "stack",
    };
    const legendExpand = new Expand({
      expandIconClass: "esri-icon-collection",
      view: window._view,
      content: legend,
      expanded: false,
    });
    window._view.ui.add([
      {
        component: legendExpand,
        position: "bottom-left",
        index: 3,
      },
    ]);
  });
  return <div></div>;
}

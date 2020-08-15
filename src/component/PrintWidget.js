import React from "react";
import Print from "esri/widgets/Print";
import Expand from "esri/widgets/Expand";

export default function FeaturesService() {
  React.useEffect(() => {
    window._view.when(function() {
      const print = new Print({
        view: window._view,
        // specify your own print service
        printServiceUrl:
          "http://localhost:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
      });
      const printExpand = new Expand({
        expandIconClass: "esri-icon-printer",
        view: window._view,
        content: print,
        expandTooltip: "الطباعه",
      });
      window._view.ui.add([
        {
          component: printExpand,
          position: "top-left",
          index: 10,
        },
      ]);
    });
  });
  return <div></div>;
}

import React from "react";
import Search from "esri/widgets/Search";
import Expand from "esri/widgets/Expand";
import Locator from "esri/tasks/Locator";

export default function SearchWidget() {
  React.useEffect(() => {
    const searchWidget = new Search({
      view: window._view,
      autoSelect: true,
      maxResults: 10,
      maxSuggestions: 10,
      minSuggestCharacters: 4,
      //   searchTerm: "cairo",
      allPlaceholder: "يرجى كتابة كلمات البحث",
      sources: [
        {
          layer: window._survyPoint,
          searchFields: ["zone", "section"],
          displayField: "zone",
          exactMatch: false,
          outFields: ["*"],
          name: "النقاط المرجعية",
          placeholder: "البحث عن النقاط المرجعية",
          maxResults: 6,
          maxSuggestions: 6,
          suggestionsEnabled: true,
          minSuggestCharacters: 0,
          zoomScale: 10,
        },
        {
          locator: new Locator({
            url:
              "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",
          }),
          singleLineFieldName: "SingleLine",
          name: "خريطة العالم",
          placeholder: "البحث فى خريطة العالم",
          maxResults: 3,
          maxSuggestions: 6,
          suggestionsEnabled: false,
          minSuggestCharacters: 0,
        },
      ],
      includeDefaultSources: false,
    });
    const searchExpand = new Expand({
      expandIconClass: "esri-icon-search",
      expandTooltip: "البحث",
      view: window._view,
      content: searchWidget,
    });

    window._view.ui.add(searchExpand, {
      position: "top-left",
      index: 1,
    });
  });
  return <div></div>;
}

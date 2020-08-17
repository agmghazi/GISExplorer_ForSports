import React from "react";
import Home from "esri/widgets/Home";
import Compass from "esri/widgets/Compass";
import ScaleBar from "esri/widgets/ScaleBar";
import Expand from "esri/widgets/Expand";
import Sketch from "esri/widgets/Sketch";
// import BasemapToggle from "esri/widgets/BasemapToggle";
import BasemapGallery from "esri/widgets/BasemapGallery";
import AreaMeasurement2D from "esri/widgets/AreaMeasurement2D";
import DistanceMeasurement2D from "esri/widgets/DistanceMeasurement2D";
import CoordinateConversion from "esri/widgets/CoordinateConversion";
import Bookmarks from "esri/widgets/Bookmarks";

export default function Widgets() {
  React.useEffect(() => {
    const homeWidget = new Home({
      view: window._view,
    });
    const compass = new Compass({
      view: window._view,
    });
    const scaleBar = new ScaleBar({
      view: window._view,
      unit: "metric",
    });
    const sketch = new Sketch({
      layer: window._layer,
      view: window._view,
      creationMode: "update",
    });
    const sketchExpand = new Expand({
      expandIconClass: "esri-icon-sketch-rectangle",
      expandTooltip: "أدوات الرسم",
      view: window._view,
      content: sketch,
      mode: "floating",
    });
    // const basemapToggle = new BasemapToggle({
    //   view: window._view,
    //   nextBasemap: "satellite",
    // });
    const basemapGallery = new BasemapGallery({
      view: window._view,
    });

    const basemapExpand = new Expand({
      expandIconClass: "esri-icon-basemap",
      view: window._view,
      content: basemapGallery,
      expanded: false,
      expandTooltip: "الخرائط",
    });
    const AreameasurementWidget = new AreaMeasurement2D({
      view: window._view,
    });
    const AreameasurementExpand = new Expand({
      expandIconClass: "esri-icon-measure-area",
      expandTooltip: "قياس مساحات",
      view: window._view,
      content: AreameasurementWidget,
      mode: "floating",
    });
    const DistanceWidget = new DistanceMeasurement2D({
      view: window._view,
    });
    const DistanceExpand = new Expand({
      expandIconClass: "esri-icon-measure-line",
      expandTooltip: "قياس مسافات",
      view: window._view,
      content: DistanceWidget,
      mode: "floating",
    });
    const CoordinateWidget = new CoordinateConversion({
      view: window._view,
    });
    const CoordinateExpand = new Expand({
      expandIconClass: "esri-icon-tracking",
      expandTooltip: "الاحداثيات",
      view: window._view,
      content: CoordinateWidget,
      mode: "floating",
    });
    const bookmarks = new Bookmarks({
      view: window._view,
      // allows bookmarks to be added, edited, or deleted
      editingEnabled: true,
      bookmarks: [],
    });
    const BookmarksExpands = new Expand({
      view: window._view,
      content: bookmarks,
      expanded: false,
      expandTooltip: "حفظ الاماكن",
    });
    window._view.ui.move([
      {
        component: "zoom",
        position: "top-left",
        index: 3,
      },
    ]);

    window._view.ui.add([
      {
        component: homeWidget,
        position: "top-left",
        index: 2,
      },
      {
        component: compass,
        position: "top-left",
        index: 4,
      },
      {
        component: scaleBar,
        position: "bottom-left",
        index: 2,
      },
      {
        component: sketchExpand,
        position: "top-left",
        index: 5,
      },
      {
        component: basemapExpand,
        position: "top-left",
        index: 6,
      },
      {
        component: AreameasurementExpand,
        position: "top-left",
        index: 7,
      },
      {
        component: DistanceExpand,
        position: "top-left",
        index: 8,
      },
      {
        component: CoordinateExpand,
        position: "bottom-right",
        index: 2,
      },
      {
        component: BookmarksExpands,
        position: "top-left",
        index: 6,
      },
    ]);
  });
  return <div></div>;
}

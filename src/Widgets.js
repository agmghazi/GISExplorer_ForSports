import "./config";
import React from "react";
import Home from "esri/widgets/Home";
import Compass from "esri/widgets/Compass";
import ScaleBar from "esri/widgets/ScaleBar";
import Expand from "esri/widgets/Expand";
import Sketch from "esri/widgets/Sketch";
import BasemapToggle from "esri/widgets/BasemapToggle";
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
      label: "أدوات الرسم",
      view: window._view,
      content: sketch,
      mode: "floating",
    });
    const basemapToggle = new BasemapToggle({
      view: window._view,
      nextBasemap: "satellite",
    });
    const basemapExpand = new Expand({
      expandIconClass: "esri-icon-basemap",
      view: window._view,
      content: basemapToggle,
      expanded: false,
      label: "الخرائط",
    });
    const AreameasurementWidget = new AreaMeasurement2D({
      view: window._view,
    });
    const AreameasurementExpand = new Expand({
      expandIconClass: "esri-icon-measure-area",
      label: "قياس مساحات",
      view: window._view,
      content: AreameasurementWidget,
      mode: "floating",
    });
    const DistanceWidget = new DistanceMeasurement2D({
      view: window._view,
    });
    const DistanceExpand = new Expand({
      expandIconClass: "esri-icon-measure-line",
      label: "قياس مسافات",
      view: window._view,
      content: DistanceWidget,
      mode: "floating",
    });
    const CoordinateWidget = new CoordinateConversion({
      view: window._view,
    });
    const CoordinateExpand = new Expand({
      expandIconClass: "esri-icon-tracking",
      label: "الاحداثيات",
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
    });
    window._view.ui.add([
      {
        component: homeWidget,
        position: "top-right",
        index: 5,
      },
      {
        component: compass,
        position: "top-right",
        index: 4,
      },
      {
        component: scaleBar,
        position: "bottom-left",
        index: 2,
      },
      {
        component: sketchExpand,
        position: "top-right",
        index: 5,
      },
      {
        component: basemapExpand,
        position: "top-right",
        index: 3,
      },
      {
        component: AreameasurementExpand,
        position: "top-right",
        index: 6,
      },
      {
        component: DistanceExpand,
        position: "top-right",
        index: 5,
      },
      {
        component: CoordinateExpand,
        position: "bottom-right",
        index: 2,
      },
      {
        component: BookmarksExpands,
        position: "top-right",
        index: 2,
      },
    ]);
  });
  return <div></div>;
}

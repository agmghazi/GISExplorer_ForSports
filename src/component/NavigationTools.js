import React from "react";
// import watchUtils from "esri/core/watchUtils";
import * as watchUtils from "arcgis-js-api/core/watchUtils";
// OR
// import { whenTrue, whenFalse } from 'arcgis-js-api/core/watchUtils';

import Draw from "esri/views/2d/draw/Draw";
import Extent from "esri/geometry/Extent";
import Graphic from "esri/Graphic";

export default function NavigationTools() {
  var _prevExtent,
    _preExtent,
    _currentExtent,
    _extentHistory,
    evtViewDragHandler,
    evtViewKeyDownHandler,
    draw,
    fullExtent,
    _nextExtent,
    _extentHistoryIndx;

  React.useEffect(() => {
    //add Navigation Toolbar
    _prevExtent = false;
    _preExtent = null;
    _currentExtent = null;
    _extentHistory = [];
    _extentHistoryIndx = 0;
    _nextExtent = false;
    _prevExtent = false;
    _preExtent = null;
    _currentExtent = null;
    _extentHistory = [];
    _extentHistoryIndx = 0;
    _nextExtent = false;

    watchUtils.whenTrue(window._view, "ready", function() {
      fullExtent = window._view.extent.clone();
      draw = new Draw({
        view: window._view,
      });
      initToolbar();
      watchUtils.whenOnce(window._view, "extent", function() {
        watchUtils.when(window._view, "stationary", function(evt) {
          if (evt) {
            extentChangeHandler(window._view.extent);
          }
        });
      });
    });
    function extentChangeHandler(evt) {
      if (_prevExtent || _nextExtent) {
        _currentExtent = evt;
      } else {
        _preExtent = _currentExtent;
        _currentExtent = evt;
        _extentHistory.push({
          preExtent: _preExtent,
          currentExtent: _currentExtent,
        });
        _extentHistoryIndx = _extentHistory.length - 1;
      }
      _prevExtent = _nextExtent = false;
      extentHistoryChange();
    }
    function extentHistoryChange() {
      if (_extentHistory.length === 0 || _extentHistoryIndx === 0) {
        let elementAdd = document.getElementById("zoomprev");
        elementAdd.classList.add("disabled");
      } else {
        let elementRemove = document.getElementById("zoomprev");
        elementRemove.classList.remove("disabled");
      }
      if (
        _extentHistory.length === 0 ||
        _extentHistoryIndx === _extentHistory.length - 1
      ) {
        let elementAdds = document.getElementById("zoomnext");
        elementAdds.classList.add("disabled");
      } else {
        let elementRemoves = document.getElementById("zoomnext");
        elementRemoves.classList.remove("disabled");
      }
    }
    function enableViewPanning() {
      if (evtViewDragHandler) {
        evtViewDragHandler.remove();
        evtViewDragHandler = null;
      }
      if (evtViewKeyDownHandler) {
        evtViewKeyDownHandler.remove();
        evtViewKeyDownHandler = null;
      }
    }
    function disableViewPanning() {
      if (evtViewDragHandler) {
        evtViewDragHandler.remove();
        evtViewDragHandler = null;
      }
      if (evtViewKeyDownHandler) {
        evtViewKeyDownHandler.remove();
        evtViewKeyDownHandler = null;
      }
      evtViewDragHandler = window._view.on("drag", function(event) {
        // prevents panning with the mouse drag event
        event.stopPropagation();
      });
      evtViewKeyDownHandler = window._view.on("key-down", function(event) {
        // prevents panning with the arrow keys
        var keyPressed = event.key;
        if (keyPressed.slice(0, 5) === "Arrow") {
          event.stopPropagation();
        }
      });
    }
    function displayCrosshairCursor() {
      window._view &&
        window._view.container &&
        window._view.container.style &&
        "crosshair" !== window._view.container.style.cursor &&
        (window._view.container.style.cursor = "crosshair");
    }
    function displayPointerCursor() {
      window._view &&
        window._view.container &&
        window._view.container.style &&
        "pointer" !== window._view.container.style.cursor &&
        (window._view.container.style.cursor = "pointer");
    }
    function displayDefaultCursor() {
      window._view &&
        window._view.container &&
        window._view.container.style &&
        "default" !== window._view.container.style.cursor &&
        (window._view.container.style.cursor = "default");
    }
    function removeCurrentSelTool() {
      window._view.popup.close();
      let panmaplements = document.getElementById("panmap");
      panmaplements.classList.remove("selected");
      let zoominlements = document.getElementById("zoomin");
      zoominlements.classList.remove("selected");
      let zoomoutlements = document.getElementById("zoomout");
      zoomoutlements.classList.remove("selected");
    }
    function drawRect(event) {
      var vertices = event.vertices;
      //remove existing graphic
      window._view.graphics.removeAll();
      if (vertices.length < 2) {
        return;
      }
      // create a new extent
      var extent = getExtentfromVertices(vertices);
      var graphic = new Graphic({
        geometry: extent,
        symbol: {
          type: "simple-fill", // autocasts as SimpleFillSymbol
          color: [0, 0, 0, 0.3],
          style: "solid",
          outline: {
            // autocasts as SimpleLineSymbol
            color: [255, 0, 0],
            width: 1,
          },
        },
      });
      window._view.graphics.add(graphic);
    }
    function zoomIn(evt) {
      draw.reset();
      window._view.graphics.removeAll();
      var action = draw.create("rectangle");
      window._view.focus();
      action.on("vertex-add", drawRect);
      action.on("draw-complete", zoomIn);
      action.on("cursor-update", drawRect);
      if (evt.vertices.length === 1) {
        window._view.goTo({ scale: window._view.scale * 0.5 });
        return;
      }
      var extent = getExtentfromVertices(evt.vertices);
      if (extent.width !== 0 || extent.height !== 0) {
        window._view.goTo(extent);
      }
    }
    function zoomOut(evt) {
      var vertices = evt.vertices;
      draw.reset();
      window._view.graphics.removeAll();
      var action = draw.create("rectangle");
      window._view.focus();
      action.on("vertex-add", drawRect);
      action.on("draw-complete", zoomOut);
      action.on("cursor-update", drawRect);
      if (evt.vertices.length === 1) {
        window._view.goTo({ scale: window._view.scale * 2 });
        return;
      }
      var sx = vertices[0][0],
        sy = vertices[0][1];
      var ex = vertices[1][0],
        ey = vertices[1][1];
      var rect = {
        x: Math.min(sx, ex),
        y: Math.max(sy, ey),
        width: Math.abs(sx - ex),
        height: Math.abs(sy - ey),
        spatialReference: window._view.spatialReference,
      };
      if (rect.width !== 0 || rect.height !== 0) {
        var scrPnt1 = window._view.toScreen(rect);
        var scrPnt2 = window._view.toScreen({
          x: rect.x + rect.width,
          y: rect.y,
          spatialReference: rect.spatialReference,
        });
        var mWidth = window._view.extent.width;
        var delta =
          ((mWidth * window._view.width) / Math.abs(scrPnt2.x - scrPnt1.x) -
            mWidth) /
          2;
        var vExtent = window._view.extent;
        window._view.goTo(
          new Extent({
            xmin: vExtent.xmin - delta,
            ymin: vExtent.ymin - delta,
            xmax: vExtent.xmax + delta,
            ymax: vExtent.ymax + delta,
            spatialReference: vExtent.spatialReference,
          })
        );
      }
    }
    function getExtentfromVertices(vertices) {
      var sx = vertices[0][0],
        sy = vertices[0][1];
      var ex = vertices[1][0],
        ey = vertices[1][1];
      var rect = {
        x: Math.min(sx, ex),
        y: Math.max(sy, ey),
        width: Math.abs(sx - ex),
        height: Math.abs(sy - ey),
        spatialReference: window._view.spatialReference,
      };
      if (rect.width !== 0 || rect.height !== 0) {
        return new Extent({
          xmin: parseFloat(rect.x),
          ymin: parseFloat(rect.y) - parseFloat(rect.height),
          xmax: parseFloat(rect.x) + parseFloat(rect.width),
          ymax: parseFloat(rect.y),
          spatialReference: rect.spatialReference,
        });
      } else {
        return null;
      }
    }
    function initToolbar() {
      document.getElementById("zoomfull").addEventListener("click", function() {
        window._view.goTo(fullExtent);
      });
      document.getElementById("zoomnext").addEventListener("click", function() {
        _nextExtent = true;
        _extentHistoryIndx++;
        window._view.goTo(_extentHistory[_extentHistoryIndx].currentExtent);
      });
      document.getElementById("zoomprev").addEventListener("click", function() {
        if (_extentHistory[_extentHistoryIndx].preExtent) {
          _prevExtent = true;
          window._view.goTo(_extentHistory[_extentHistoryIndx].preExtent);
          _extentHistoryIndx--;
        }
      });
      document.getElementById("zoomin").addEventListener("click", function() {
        removeCurrentSelTool();
        disableViewPanning();
        window._view.graphics.removeAll();
        var action = draw.create("rectangle");
        displayCrosshairCursor();
        window._view.focus();
        action.on("vertex-add", drawRect);
        action.on("draw-complete", zoomIn);
        action.on("cursor-update", drawRect);
        let zoomelement = document.getElementById("zoomin");
        zoomelement.classList.add("selected");
      });
      document.getElementById("zoomout").addEventListener("click", function() {
        removeCurrentSelTool();
        disableViewPanning();
        window._view.graphics.removeAll();
        var action = draw.create("rectangle");
        displayCrosshairCursor();
        window._view.focus();
        action.on("vertex-add", drawRect);
        action.on("draw-complete", zoomOut);
        action.on("cursor-update", drawRect);
        let zoomoutlement = document.getElementById("zoomout");
        zoomoutlement.classList.add("selected");
      });
      document.getElementById("panmap").addEventListener("click", function() {
        removeCurrentSelTool();
        enableViewPanning();
        displayDefaultCursor();
        draw.reset();
        let panmaplement = document.getElementById("panmap");
        panmaplement.classList.add("selected");
      });
    }
    window._view.ui.add([
      {
        component: "Navigationtools",
        position: "top-left",
        index: 0,
      },
    ]);
  });
  return (
    <div>
      <div id="Navigationtools" className="esri-widget">
        <img
          src="./src/assets/images/zoom-in.png"
          alt="Zoom In"
          title="تكبير الخريطة"
          className="Navigationtool"
          id="zoomin"
        />
        <img
          src="./src/assets/images/zoom-out.png"
          alt="Zoom Out"
          title="تصغير الخريطة"
          className="Navigationtool"
          id="zoomout"
        />
        <img
          src="./src/assets/images/drag.png"
          alt="Pan Map"
          title="تحريك الخريطة"
          className="Navigationtool selected"
          id="panmap"
        />
        <img
          src="./src/assets/images/fullExtent.png"
          alt="Full Extent"
          title="الرجوع للموقع الرئيسي"
          className="Navigationtool"
          id="zoomfull"
        />
        <img
          src="./src/assets/images/back.png"
          alt="Back Extent"
          title="رجوع للخلف"
          className="Navigationtool"
          id="zoomprev"
        />
        <img
          src="./src/assets/images/forward.png"
          alt="Forward Extent"
          title="رجوع للأمام"
          className="Navigationtool"
          id="zoomnext"
        />
      </div>
    </div>
  );
}

import "./config";
import ArcGISMap from "esri/Map";
import MapView from "esri/views/MapView";
import GraphicsLayer from "esri/layers/GraphicsLayer";
import React from "react";

export default function App() {
  const layer = new GraphicsLayer();
  React.useEffect(() => {
    const map = new ArcGISMap({
      basemap: "streets",
      layers: [layer],
    });

    const view = new MapView({
      id: "viewMain1",
      map,
      container: "mapView",
      zoom: 10,
      center: [50.03602559770744, 26.38306796977232], // longitude, latitude
      popup: {
        dockEnabled: true,
        dockOptions: {
          breakpoint: false,
          buttonEnabled: true,
          position: "top-center",
        },
      },
    });
    view.popup.autoOpenEnabled = false;
    window._view = view;
    window._viewMain1 = view.id;
    window._map = map;
    window._layer = layer;

    function displayIdentifyCursor() {
      window._view &&
        window._view.container &&
        window._view.container.style &&
        "crosshair" !== window._view.container.style.cursor &&
        (window._view.container.style.cursor =
          "url('https://img.icons8.com/windows/26/000000/question-mark.png'), auto");
    }
    $(".identifyPopup").click(function() {
      view.popup.autoOpenEnabled = true;
      displayIdentifyCursor();
    });

    function identifyDisplayDefaultCursor() {
      window._view &&
        window._view.container &&
        window._view.container.style &&
        "default" !== window._view.container.style.cursor &&
        (window._view.container.style.cursor = "default");
    }

    window._view.on("key-down", function(event) {
      if (event.key == "Shift") {
        window._view.popup.autoOpenEnabled = false;
        identifyDisplayDefaultCursor();
      }
    });
  });
  return (
    <div>
      <div
        id="mapView"
        style={{
          width: "100%",
          height: "100%",
          zIndex: "-1",
          position: "fixed",
          padding: "0px",
          margin: "0px",
        }}
      ></div>
      <input
        className="identifyPopup"
        type="image"
        src="https://img.icons8.com/windows/40/000000/high-importance.png"
      />

      <div className="identifyDiv"></div>
    </div>
  );
}

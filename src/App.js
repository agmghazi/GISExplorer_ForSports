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
          buttonEnabled: false,
          position: "top-center",
        },
      },
    });
    window._view = view;
    window._viewMain1 = view.id;
    window._map = map;
    window._layer = layer;
    // style={{ width: "100vx", height: "97vh", zIndex: "-1" }}
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
    </div>
  );
}

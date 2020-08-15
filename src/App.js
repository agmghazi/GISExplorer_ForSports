import "./config";
import ArcGISMap from "esri/Map";
import MapView from "esri/views/MapView";
import GraphicsLayer from "esri/layers/GraphicsLayer";
import React from "react";

export default function App() {
  const layer = new GraphicsLayer();
  React.useEffect(() => {
    const map = new ArcGISMap({
      basemap: "topo",
      layers: [layer],
    });

    const view = new MapView({
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
    window._map = map;
    window._layer = layer;
  });
  return (
    <div>
      <div id="mapView" style={{ width: "100vx", height: "100vh" }}></div>
    </div>
  );
}

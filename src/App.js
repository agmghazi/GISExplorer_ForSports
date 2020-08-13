import "./config";
import ArcGISMap from "esri/Map";
import MapView from "esri/views/MapView";
import React from "react";

export default function App() {
  React.useEffect(() => {
    const map = new ArcGISMap({
      basemap: "topo",
    });

    const view = new MapView({
      map,
      container: "mapView",
      zoom: 10,
      center: [50.03602559770744, 26.38306796977232], // longitude, latitude
    });
    window._view = view;
    window._map = map;
  });
  return (
    <div>
      <div id="mapView" style={{ width: "100vx", height: "100vh" }}></div>
    </div>
  );
}

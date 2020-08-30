import "./config";
import ArcGISMap from "esri/Map";
import MapView from "esri/views/MapView";
import WebMap from "esri/WebMap";
import GraphicsLayer from "esri/layers/GraphicsLayer";
import React from "react";

export default function App() {
  let topoMap;
  let streetMap;
  let satelliteMap;
  let hybridMap;
  let terrainMap;
  let grayMap;
  let darkGrayMap;
  let oceansMap;
  let nationalGeographicMap;
  let osmMap;
  let darkGrayVectorMap;
  let grayVectorMap;
  let streetsNavigationVectorMap;
  let streetsReliefVectorMap;
  let streetsNightVectorMap;
  let topoVectorMap;
  let streetsVectorMap;

  let GoogleMapStreets;
  let GoogleMapsSatellite;
  let BingMap;
  let mapboxMap;
  let SpaceMap;

  let view;
  let lastLanConfig;
  let lastLongConfig;
  let lastZoomConfig;

  const layer = new GraphicsLayer();
  React.useEffect(() => {
    topoMap = new ArcGISMap({
      basemap: "topo",
      // layers: [layer, window._survyPoint, window._MapImage],
    });

    streetMap = new ArcGISMap({
      basemap: "streets",
    });
    satelliteMap = new ArcGISMap({
      basemap: "satellite",
    });
    hybridMap = new ArcGISMap({
      basemap: "hybrid",
    });
    terrainMap = new ArcGISMap({
      basemap: "terrain",
    });
    grayMap = new ArcGISMap({
      basemap: "gray",
    });
    darkGrayMap = new ArcGISMap({
      basemap: "dark-gray",
    });
    oceansMap = new ArcGISMap({
      basemap: "oceans",
    });
    nationalGeographicMap = new ArcGISMap({
      basemap: "national-geographic",
    });
    osmMap = new ArcGISMap({
      basemap: "osm",
    });
    darkGrayVectorMap = new ArcGISMap({
      basemap: "dark-gray-vector",
    });
    grayVectorMap = new ArcGISMap({
      basemap: "gray-vector",
    });
    streetsNavigationVectorMap = new ArcGISMap({
      basemap: "streets-navigation-vector",
    });
    streetsReliefVectorMap = new ArcGISMap({
      basemap: "streets-relief-vector",
    });
    streetsNightVectorMap = new ArcGISMap({
      basemap: "streets-night-vector",
    });
    topoVectorMap = new ArcGISMap({
      basemap: "topo-vector",
    });
    streetsVectorMap = new ArcGISMap({
      basemap: "streets-vector",
    });
    GoogleMapStreets = new WebMap({
      portalItem: {
        id: "1de2683cffdb44259c556b83a7a71ebd",
      },
    });
    GoogleMapsSatellite = new WebMap({
      portalItem: {
        id: "c82f2a5a424b4a41981a7f09530273a5",
      },
    });
    BingMap = new WebMap({
      portalItem: {
        id: "4b5bb3f2dc8d492bbd5dff34a9edb26e",
      },
    });
    mapboxMap = new WebMap({
      portalItem: {
        id: "aee29c1a69704130bac8e82f90e061e5",
      },
    });
    SpaceMap = new WebMap({
      portalItem: {
        id: "713ed80342ae44099efa63a3a54793dd",
      },
    });

    view = new MapView({
      id: "viewMain1",
      map: topoMap,
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
    lastLanConfig = view.center.latitude;
    lastLongConfig = view.center.longitude;
    lastZoomConfig = view.zoom;

    window._lastLanConfig = lastLanConfig;
    window._lastLongConfig = lastLongConfig;
    window._lastZoomConfig = lastZoomConfig;

    window._topoMap = topoMap;
    window._streetMap = streetMap;
    window._satelliteMap = satelliteMap;

    window._hybridMap = hybridMap;
    window._terrainMap = terrainMap;
    window._grayMap = grayMap;
    window._darkGrayMap = darkGrayMap;
    window._oceansMap = oceansMap;
    window._nationalGeographicMap = nationalGeographicMap;
    window._osmMap = osmMap;
    window._darkGrayVectorMap = darkGrayVectorMap;
    window._grayVectorMap = grayVectorMap;
    window._streetsNavigationVectorMap = streetsNavigationVectorMap;
    window._streetsReliefVectorMap = streetsReliefVectorMap;
    window._streetsNightVectorMap = streetsNightVectorMap;
    window._topoVectorMap = topoVectorMap;
    window._streetsVectorMap = streetsVectorMap;

    window._GoogleMapStreets = GoogleMapStreets;
    window._GoogleMapsSatellite = GoogleMapsSatellite;
    window._BingMap = BingMap;
    window._mapboxMap = mapboxMap;
    window._SpaceMap = SpaceMap;

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
    $(".identifyPopup").dblclick(function() {
      view.popup.autoOpenEnabled = false;
      identifyDisplayDefaultCursor();
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
        src="https://img.icons8.com/windows/30/000000/high-importance.png"
      />

      <div className="identifyDiv"></div>
    </div>
  );
}

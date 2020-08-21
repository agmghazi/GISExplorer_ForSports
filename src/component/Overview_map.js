import React from "react";
import Map from "esri/Map";
import MapView from "esri/views/MapView";
import Graphic from "esri/Graphic";
// import watchUtils from "esri/core/watchUtils";
import * as watchUtils from "arcgis-js-api/core/watchUtils";

export default function Overview_map() {
  React.useEffect(() => {
    let overviewMap = new Map({
      //   basemap: "satellite",
      //   ground: "world-elevation",
      basemap: "osm",
    });

    // Create the MapView for overview map
    let mapViewOver = new MapView({
      container: "overviewDiv",
      map: overviewMap,
      //to false ctrl+D  --rotation
      constraints: {
        rotationEnabled: false,
        snapToZoom: false,
      },
      zoom: 3,
      center: [47.03411205618008, 24.522649183866815], // longitude, latitude
    });

    // Remove the default widgets
    mapViewOver.ui.components = [];

    mapViewOver.when(function() {
      window._view.when(function() {
        setup();
      });
    });

    function setup() {
      const extentgraphic = new Graphic({
        geometry: null,
        symbol: {
          type: "simple-fill",
          color: [0, 0, 0, 0.5],
          outline: null,
        },
      });
      mapViewOver.graphics.add(extentgraphic);
      watchUtils.init(window._view, "extent", function(extent) {
        // Sync the overview map location
        if (window._view.stationary) {
          mapViewOver
            .goTo({
              center: window._view.center,
              scale:
                window._view.scale *
                2 *
                Math.max(
                  window._view.width / mapViewOver.width,
                  window._view.height / mapViewOver.height
                ),
            })
            .catch(function(error) {
              // ignore goto-interrupted errors
              if (error.name != "view:goto-interrupted") {
                console.error(error);
              }
            });
        }

        extentgraphic.geometry = extent;
      });
    }
    $(".overviewOption").click(function() {
      $(".overviewpoup").toggleClass("overviewhide");
    });
  });
  return (
    <div className="CsutomWH">
      <div id="extentDiv"></div>
      <div
        id="overviewDiv"
        className="overviewpoup overviewArrow-up overviewhide"
      ></div>
      <div className="overviewOption">
        <img src="https://img.icons8.com/windows/30/000000/treasure-map.png" />
      </div>
    </div>
  );
}

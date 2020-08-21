import React from "react";
import Map from "esri/Map";
import WebMap from "esri/WebMap";
import MapView from "esri/views/MapView";
// import watchUtils from "esri/core/watchUtils";
import * as watchUtils from "arcgis-js-api/core/watchUtils";

export default function Overview_map() {
  let GoogleMapStreets;
  let mapViewSync;
  let GoogleMapsSatellite;
  React.useEffect(() => {
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

    // Create the MapView for overview map
    mapViewSync = new MapView({
      id: "view2",
      container: "SynchronizeDiv",
      map: GoogleMapStreets,
      //to false ctrl+D  --rotation
      constraints: {
        // rotationEnabled: false,
        snapToZoom: false,
      },
      //   zoom: 5,
      //   center: [47.03411205618008, 24.522649183866815], // longitude, latitude
    });

    document
      .querySelector("#googleSatellite")
      .addEventListener("click", function() {
        mapViewSync.map = GoogleMapsSatellite;
      });

    document
      .querySelector("#gooleStreet")
      .addEventListener("click", function() {
        mapViewSync.map = GoogleMapStreets;
      });

    // Remove the default widgets
    mapViewSync.ui.components = [];

    /**
     * utility method that synchronizes the viewpoint of a view to other views
     */
    var synchronizeView = function(view, others) {
      others = Array.isArray(others) ? others : [others];

      var viewpointWatchHandle;
      var viewStationaryHandle;
      var otherInteractHandlers;
      var scheduleId;

      var clear = function() {
        if (otherInteractHandlers) {
          otherInteractHandlers.forEach(function(handle) {
            handle.remove();
          });
        }
        viewpointWatchHandle && viewpointWatchHandle.remove();
        viewStationaryHandle && viewStationaryHandle.remove();
        scheduleId && clearTimeout(scheduleId);
        otherInteractHandlers = viewpointWatchHandle = viewStationaryHandle = scheduleId = null;
      };

      var interactWatcher = view.watch("interacting,animation", function(
        newValue
      ) {
        if (!newValue) {
          return;
        }
        if (viewpointWatchHandle || scheduleId) {
          return;
        }

        // start updating the other views at the next frame
        scheduleId = setTimeout(function() {
          scheduleId = null;
          viewpointWatchHandle = view.watch("viewpoint", function(newValue) {
            others.forEach(function(otherView) {
              otherView.viewpoint = newValue;
            });
          });
        }, 0);

        // stop as soon as another view starts interacting, like if the user starts panning
        otherInteractHandlers = others.map(function(otherView) {
          return watchUtils.watch(otherView, "interacting,animation", function(
            value
          ) {
            if (value) {
              clear();
            }
          });
        });

        // or stop when the view is stationary again
        viewStationaryHandle = watchUtils.whenTrue(view, "stationary", clear);
      });

      return {
        remove: function() {
          this.remove = function() {};
          clear();
          interactWatcher.remove();
        },
      };
    };

    /**
     * utility method that synchronizes the viewpoints of multiple views
     */
    var synchronizeViews = function(views) {
      var handles = views.map(function(view, idx, views) {
        var others = views.concat();
        others.splice(idx, 1);
        return synchronizeView(view, others);
      });

      return {
        remove: function() {
          this.remove = function() {};
          handles.forEach(function(h) {
            h.remove();
          });
          handles = null;
        },
      };
    };

    // bind the views
    synchronizeViews([window._view, mapViewSync]);

    $(".SyncOption").click(function() {
      $(".SyncPopup, .overviewSynchronize").toggleClass("SyncHide");
    });
  });
  return (
    <div>
      <div className="SyncPopup SyncArrow-up SyncHide overviewSynchronize">
        <div
          id="SynchronizeDiv"
          style={{ width: "300px", height: "200px" }}
        ></div>
        <button id="googleSatellite" className="btn btn-primary">
          المصور الجوى
        </button>
        <button id="gooleStreet" className="btn btn-primary">
          شبكة الطرق
        </button>
      </div>
      <div className="SyncOption">
        <img src="https://img.icons8.com/windows/30/000000/google-earth.png" />
      </div>
    </div>
  );
}

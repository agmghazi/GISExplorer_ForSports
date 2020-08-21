import React from "react";

export default function BasemapGallery() {
  let lastZoomConfig;

  React.useEffect(() => {
    document
      .querySelector("#EXtSatalitte")
      .addEventListener("click", function() {
        window._lastLanConfig = window._view.center.latitude;
        window._lastLongConfig = window._view.center.longitude;
        window._lastZoomConfig = window._view.zoom;
        let psatelliteMap = new Promise(function(resolve, reject) {
          window._view.map = window._satelliteMap;
          window._satelliteMap.addMany([window._MapImage, window._survyPoint]);

          resolve();
        });
        psatelliteMap.then(function() {
          window._view.center = [window._lastLongConfig, window._lastLanConfig];
          window._view.zoom = lastZoomConfig;
        });
      });

    document.querySelector("#EXtTopo").addEventListener("click", function() {
      window._lastLanConfig = window._view.center.latitude;
      window._lastLongConfig = window._view.center.longitude;
      window._lastZoomConfig = window._view.zoom;
      let ptopoMap = new Promise(function(resolve, reject) {
        window._view.map = window._topoMap;
        window._topoMap.addMany([window._MapImage, window._survyPoint]);

        resolve();
      });
      ptopoMap.then(function() {
        window._view.center = [window._lastLongConfig, window._lastLanConfig];
        window._view.zoom = lastZoomConfig;
      });
    });

    document.querySelector("#EXtSreet").addEventListener("click", function() {
      window._lastLanConfig = window._view.center.latitude;
      window._lastLongConfig = window._view.center.longitude;
      window._lastZoomConfig = window._view.zoom;

      let pstreetMap = new Promise(function(resolve, reject) {
        window._view.map = window._streetMap;
        window._streetMap.addMany([window._MapImage, window._survyPoint]);

        resolve();
      });
      pstreetMap.then(function() {
        window._view.center = [window._lastLongConfig, window._lastLanConfig];
        window._view.zoom = lastZoomConfig;
      });
    });

    $(".BasemapOption").click(function() {
      $(".BasemapPopup, .BasemapOverview").toggleClass("BasemapHide");
    });
  });

  return (
    <div>
      <div className="BasemapPopup BasemapArrow-up BasemapHide BasemapOverview">
        <div id="BasemapDiv">
          <div className="EXtSatalitteDiv">
            <div id="EXtSatalitte">
              <img src="../src\assets\images\BasemapsPic\esri_maps\satellite.jpg" />
            </div>
            <label>مرئية فضائية</label>
          </div>
          <div className="EXtTopoDiv">
            <div id="EXtTopo">
              <img src="../src\assets\images\BasemapsPic\esri_maps\topo.jpg" />
            </div>
            <label>طبوجرافى</label>
          </div>
          <div className="EXtSreetDiv">
            <div id="EXtSreet">
              <img src="../src\assets\images\BasemapsPic\esri_maps\streets.jpg" />
            </div>
            <label>شوارع</label>
          </div>
        </div>
      </div>
      <div className="BasemapOption">
        <img src="https://img.icons8.com/windows/30/000000/google-earth.png" />
      </div>
    </div>
  );
}

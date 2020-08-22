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

    // Add active class to the current button (highlight it)
    var header = document.getElementById("BasemapDiv");
    var btns = header.getElementsByClassName("Selimg");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("imActive");
        current[0].className = current[0].className.replace(" imActive", "");
        this.className += " imActive";

        var current = document.getElementsByClassName("imActive");
        current[0].className = current[0].className.replace(" imActive", "");
        this.className += " imActive";
      });
    }
  });

  return (
    <div>
      <div className="BasemapPopup BasemapArrow-up BasemapHide BasemapOverview">
        <div id="BasemapDiv">
          <div className="EXtSatalitteDiv">
            <div id="EXtSatalitte">
              <img
                src="../src\assets\images\BasemapsPic\esri_maps\satellite.jpg"
                className="EXtSatalitteDivImg Selimg"
              />
            </div>
            <label>قمر صناعى</label>
          </div>
          <div className="EXtTopoDiv">
            <div id="EXtTopo">
              <img
                src="../src\assets\images\BasemapsPic\esri_maps\topo.jpg"
                className=" EXtTopoDivImg Selimg imActive"
              />
            </div>
            <label>طبوجرافى</label>
          </div>
          <div className="EXtSreetDiv">
            <div id="EXtSreet">
              <img
                src="../src\assets\images\BasemapsPic\esri_maps\streets.jpg"
                className=" EXtSreetDivImg Selimg "
              />
            </div>
            <label>شوارع</label>
          </div>
        </div>
      </div>
      <div className="BasemapOption">
        <img
          src="https://img.icons8.com/windows/30/000000/google-earth.png"
          className="Selimg"
        />
      </div>
    </div>
  );
}

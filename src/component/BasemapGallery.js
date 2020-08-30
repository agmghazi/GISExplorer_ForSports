import React from "react";

export default function BasemapGallery() {
  var lastZoomConfig;

  React.useEffect(() => {
    document
      .querySelector("#EXtSatalitte")
      .addEventListener("click", function() {
        window._lastLanConfig = window._view.center.latitude;
        window._lastLongConfig = window._view.center.longitude;
        window._lastZoomConfig = window._view.zoom;
        let psatelliteMap = new Promise(function(resolve, reject) {
          window._view.map = window._satelliteMap;
          onChange_satelliteMap(
            parseFloat(window._progressBarValue),
            true,
            false
          );
          var progressBar = document.querySelector("#progressBarapp");
          progressBar.onchange = function() {
            onChange_satelliteMap(parseFloat(progressBar.value), false, true);
          };

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
        onChange_topoMap(parseFloat(window._progressBarValue), true, false);
        var progressBar = document.querySelector("#progressBarapp");
        progressBar.onchange = function() {
          onChange_topoMap(parseFloat(progressBar.value), false, true);
        };

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
        onChange_streetMap(parseFloat(window._progressBarValue), true, false);
        var progressBar = document.querySelector("#progressBarapp");
        progressBar.onchange = function() {
          onChange_streetMap(parseFloat(progressBar.value), false, true);
        };

        resolve();
      });
      pstreetMap.then(function() {
        window._view.center = [window._lastLongConfig, window._lastLanConfig];
        window._view.zoom = lastZoomConfig;
      });
    });

    document
      .querySelector("#EXhybridMap")
      .addEventListener("click", function() {
        window._lastLanConfig = window._view.center.latitude;
        window._lastLongConfig = window._view.center.longitude;
        window._lastZoomConfig = window._view.zoom;

        let hybridMap = new Promise(function(resolve, reject) {
          window._view.map = window._hybridMap;
          window._hybridMap.addMany([
            window._layer,
            window._MapImage,
            window._survyPoint,
          ]);

          resolve();
        });
        hybridMap.then(function() {
          window._view.center = [window._lastLongConfig, window._lastLanConfig];
          window._view.zoom = lastZoomConfig;
        });
      });

    document
      .querySelector("#EXTerrainMap")
      .addEventListener("click", function() {
        window._lastLanConfig = window._view.center.latitude;
        window._lastLongConfig = window._view.center.longitude;
        window._lastZoomConfig = window._view.zoom;

        let terrainMap = new Promise(function(resolve, reject) {
          window._view.map = window._terrainMap;
          window._terrainMap.addMany([
            window._layer,
            window._MapImage,
            window._survyPoint,
          ]);

          resolve();
        });
        terrainMap.then(function() {
          window._view.center = [window._lastLongConfig, window._lastLanConfig];
          window._view.zoom = lastZoomConfig;
        });
      });

    document.querySelector("#EXgrayMap").addEventListener("click", function() {
      window._lastLanConfig = window._view.center.latitude;
      window._lastLongConfig = window._view.center.longitude;
      window._lastZoomConfig = window._view.zoom;

      let grayMap = new Promise(function(resolve, reject) {
        window._view.map = window._grayMap;
        window._grayMap.addMany([
          window._layer,
          window._MapImage,
          window._survyPoint,
        ]);

        resolve();
      });
      grayMap.then(function() {
        window._view.center = [window._lastLongConfig, window._lastLanConfig];
        window._view.zoom = lastZoomConfig;
      });
    });

    document
      .querySelector("#EXdarkGrayMap")
      .addEventListener("click", function() {
        window._lastLanConfig = window._view.center.latitude;
        window._lastLongConfig = window._view.center.longitude;
        window._lastZoomConfig = window._view.zoom;

        let darkGrayMap = new Promise(function(resolve, reject) {
          window._view.map = window._darkGrayMap;
          window._darkGrayMap.addMany([
            window._layer,
            window._MapImage,
            window._survyPoint,
          ]);

          resolve();
        });
        darkGrayMap.then(function() {
          window._view.center = [window._lastLongConfig, window._lastLanConfig];
          window._view.zoom = lastZoomConfig;
        });
      });

    document
      .querySelector("#EXoceansMap")
      .addEventListener("click", function() {
        window._lastLanConfig = window._view.center.latitude;
        window._lastLongConfig = window._view.center.longitude;
        window._lastZoomConfig = window._view.zoom;

        let oceansMap = new Promise(function(resolve, reject) {
          window._view.map = window._oceansMap;
          window._oceansMap.addMany([
            window._layer,
            window._MapImage,
            window._survyPoint,
          ]);

          resolve();
        });
        oceansMap.then(function() {
          window._view.center = [window._lastLongConfig, window._lastLanConfig];
          window._view.zoom = lastZoomConfig;
        });
      });

    document
      .querySelector("#EXnationalGeographicMap")
      .addEventListener("click", function() {
        window._lastLanConfig = window._view.center.latitude;
        window._lastLongConfig = window._view.center.longitude;
        window._lastZoomConfig = window._view.zoom;

        let nationalGeographicMap = new Promise(function(resolve, reject) {
          window._view.map = window._nationalGeographicMap;
          window._nationalGeographicMap.addMany([
            window._layer,
            window._MapImage,
            window._survyPoint,
          ]);

          resolve();
        });
        nationalGeographicMap.then(function() {
          window._view.center = [window._lastLongConfig, window._lastLanConfig];
          window._view.zoom = lastZoomConfig;
        });
      });

    document.querySelector("#EXosmMap").addEventListener("click", function() {
      window._lastLanConfig = window._view.center.latitude;
      window._lastLongConfig = window._view.center.longitude;
      window._lastZoomConfig = window._view.zoom;

      let osmMap = new Promise(function(resolve, reject) {
        window._view.map = window._osmMap;
        window._osmMap.addMany([
          window._layer,
          window._MapImage,
          window._survyPoint,
        ]);

        resolve();
      });
      osmMap.then(function() {
        window._view.center = [window._lastLongConfig, window._lastLanConfig];
        window._view.zoom = lastZoomConfig;
      });
    });

    document
      .querySelector("#EXdarkGrayVectorMap")
      .addEventListener("click", function() {
        window._lastLanConfig = window._view.center.latitude;
        window._lastLongConfig = window._view.center.longitude;
        window._lastZoomConfig = window._view.zoom;

        let darkGrayVectorMap = new Promise(function(resolve, reject) {
          window._view.map = window._darkGrayVectorMap;
          window._darkGrayVectorMap.addMany([
            window._layer,
            window._MapImage,
            window._survyPoint,
          ]);

          resolve();
        });
        darkGrayVectorMap.then(function() {
          window._view.center = [window._lastLongConfig, window._lastLanConfig];
          window._view.zoom = lastZoomConfig;
        });
      });

    document
      .querySelector("#EXgrayVectorMap")
      .addEventListener("click", function() {
        window._lastLanConfig = window._view.center.latitude;
        window._lastLongConfig = window._view.center.longitude;
        window._lastZoomConfig = window._view.zoom;

        let grayVectorMap = new Promise(function(resolve, reject) {
          window._view.map = window._grayVectorMap;
          window._grayVectorMap.addMany([
            window._layer,
            window._MapImage,
            window._survyPoint,
          ]);

          resolve();
        });
        grayVectorMap.then(function() {
          window._view.center = [window._lastLongConfig, window._lastLanConfig];
          window._view.zoom = lastZoomConfig;
        });
      });

    document
      .querySelector("#EXstreetsNavigationVectorMap")
      .addEventListener("click", function() {
        window._lastLanConfig = window._view.center.latitude;
        window._lastLongConfig = window._view.center.longitude;
        window._lastZoomConfig = window._view.zoom;

        let streetsNavigationVectorMap = new Promise(function(resolve, reject) {
          window._view.map = window._streetsNavigationVectorMap;
          window._streetsNavigationVectorMap.addMany([
            window._layer,
            window._MapImage,
            window._survyPoint,
          ]);

          resolve();
        });
        streetsNavigationVectorMap.then(function() {
          window._view.center = [window._lastLongConfig, window._lastLanConfig];
          window._view.zoom = lastZoomConfig;
        });
      });

    document
      .querySelector("#EXstreetsReliefVectorMap")
      .addEventListener("click", function() {
        window._lastLanConfig = window._view.center.latitude;
        window._lastLongConfig = window._view.center.longitude;
        window._lastZoomConfig = window._view.zoom;

        let streetsReliefVectorMap = new Promise(function(resolve, reject) {
          window._view.map = window._streetsReliefVectorMap;
          window._streetsReliefVectorMap.addMany([
            window._layer,
            window._MapImage,
            window._survyPoint,
          ]);

          resolve();
        });
        streetsReliefVectorMap.then(function() {
          window._view.center = [window._lastLongConfig, window._lastLanConfig];
          window._view.zoom = lastZoomConfig;
        });
      });

    document
      .querySelector("#EXstreetsNightVectorMap")
      .addEventListener("click", function() {
        window._lastLanConfig = window._view.center.latitude;
        window._lastLongConfig = window._view.center.longitude;
        window._lastZoomConfig = window._view.zoom;

        let streetsNightVectorMap = new Promise(function(resolve, reject) {
          window._view.map = window._streetsNightVectorMap;
          window._streetsNightVectorMap.addMany([
            window._layer,
            window._MapImage,
            window._survyPoint,
          ]);

          resolve();
        });
        streetsNightVectorMap.then(function() {
          window._view.center = [window._lastLongConfig, window._lastLanConfig];
          window._view.zoom = lastZoomConfig;
        });
      });

    document
      .querySelector("#EXtopoVectorMap")
      .addEventListener("click", function() {
        window._lastLanConfig = window._view.center.latitude;
        window._lastLongConfig = window._view.center.longitude;
        window._lastZoomConfig = window._view.zoom;

        let topoVectorMap = new Promise(function(resolve, reject) {
          window._view.map = window._topoVectorMap;
          window._topoVectorMap.addMany([
            window._layer,
            window._MapImage,
            window._survyPoint,
          ]);

          resolve();
        });
        topoVectorMap.then(function() {
          window._view.center = [window._lastLongConfig, window._lastLanConfig];
          window._view.zoom = lastZoomConfig;
        });
      });

    document
      .querySelector("#EXstreetsVectorMap")
      .addEventListener("click", function() {
        window._lastLanConfig = window._view.center.latitude;
        window._lastLongConfig = window._view.center.longitude;
        window._lastZoomConfig = window._view.zoom;

        let streetsVectorMap = new Promise(function(resolve, reject) {
          window._view.map = window._streetsVectorMap;
          window._streetsVectorMap.addMany([
            window._layer,
            window._MapImage,
            window._survyPoint,
          ]);

          resolve();
        });
        streetsVectorMap.then(function() {
          window._view.center = [window._lastLongConfig, window._lastLanConfig];
          window._view.zoom = lastZoomConfig;
        });
      });

    document
      .querySelector("#EXGoogleMapStreetsMap")
      .addEventListener("click", function() {
        window._lastLanConfig = window._view.center.latitude;
        window._lastLongConfig = window._view.center.longitude;
        window._lastZoomConfig = window._view.zoom;

        let GoogleMapStreetsMap = new Promise(function(resolve, reject) {
          window._view.map = window._GoogleMapStreets;
          window._GoogleMapStreets.addMany([
            window._layer,
            window._MapImage,
            window._survyPoint,
          ]);

          resolve();
        });
        GoogleMapStreetsMap.then(function() {
          window._view.center = [window._lastLongConfig, window._lastLanConfig];
          window._view.zoom = lastZoomConfig;
        });
      });

    document
      .querySelector("#EXGoogleMapsSatelliteMap")
      .addEventListener("click", function() {
        window._lastLanConfig = window._view.center.latitude;
        window._lastLongConfig = window._view.center.longitude;
        window._lastZoomConfig = window._view.zoom;

        let GoogleMapsSatelliteMap = new Promise(function(resolve, reject) {
          window._view.map = window._GoogleMapsSatellite;
          window._GoogleMapsSatellite.addMany([
            window._layer,
            window._MapImage,
            window._survyPoint,
          ]);

          resolve();
        });
        GoogleMapsSatelliteMap.then(function() {
          window._view.center = [window._lastLongConfig, window._lastLanConfig];
          window._view.zoom = lastZoomConfig;
        });
      });
    // ---
    document.querySelector("#EXBingMap").addEventListener("click", function() {
      window._lastLanConfig = window._view.center.latitude;
      window._lastLongConfig = window._view.center.longitude;
      window._lastZoomConfig = window._view.zoom;

      let BingMap = new Promise(function(resolve, reject) {
        window._view.map = window._BingMap;
        window._BingMap.addMany([
          window._layer,
          window._MapImage,
          window._survyPoint,
        ]);

        resolve();
      });
      BingMap.then(function() {
        window._view.center = [window._lastLongConfig, window._lastLanConfig];
        window._view.zoom = lastZoomConfig;
      });
    });

    document
      .querySelector("#EXmapboxMap")
      .addEventListener("click", function() {
        window._lastLanConfig = window._view.center.latitude;
        window._lastLongConfig = window._view.center.longitude;
        window._lastZoomConfig = window._view.zoom;

        let mapboxMap = new Promise(function(resolve, reject) {
          window._view.map = window._mapboxMap;
          window._mapboxMap.addMany([
            window._layer,
            window._MapImage,
            window._survyPoint,
          ]);

          resolve();
        });
        mapboxMap.then(function() {
          window._view.center = [window._lastLongConfig, window._lastLanConfig];
          window._view.zoom = lastZoomConfig;
        });
      });

    document.querySelector("#EXSpaceMap").addEventListener("click", function() {
      window._lastLanConfig = window._view.center.latitude;
      window._lastLongConfig = window._view.center.longitude;
      window._lastZoomConfig = window._view.zoom;

      let SpaceMap = new Promise(function(resolve, reject) {
        window._view.map = window._SpaceMap;
        window._SpaceMap.addMany([
          window._layer,
          window._MapImage,
          window._survyPoint,
        ]);

        resolve();
      });
      SpaceMap.then(function() {
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
          <div className="EXhybridMapDiv">
            <div id="EXhybridMap">
              <img
                src="../src\assets\images\BasemapsPic\esri_maps\hybrid.jpg"
                className=" EXhybridMapImg Selimg "
              />
            </div>
            <label>خ.هجينة</label>
          </div>
          <div className="EXTerrainMapDiv">
            <div id="EXTerrainMap">
              <img
                src="../src\assets\images\BasemapsPic\esri_maps\terrain.jpg"
                className=" EXTerrainMapImg Selimg "
              />
            </div>
            <label>تضاريس</label>
          </div>
          <div className="EXgrayMapDiv">
            <div id="EXgrayMap">
              <img
                src="../src\assets\images\BasemapsPic\esri_maps\gray.jpg"
                className=" EXgrayMapImg Selimg "
              />
            </div>
            <label>خ.رمادية</label>
          </div>
          <div className="EXdarkGrayMapDiv">
            <div id="EXdarkGrayMap">
              <img
                src="../src\assets\images\BasemapsPic\esri_maps\dark-gray.jpg"
                className=" EXdarkGrayMapImg Selimg "
              />
            </div>
            <label>ر.الداكن</label>
          </div>
          <div className="EXoceansMapDiv">
            <div id="EXoceansMap">
              <img
                src="../src\assets\images\BasemapsPic\esri_maps\oceans.jpg"
                className=" EXoceansMapImg Selimg "
              />
            </div>
            <label>المحيطات</label>
          </div>
          <div className="EXnationalGeographicMapDiv">
            <div id="EXnationalGeographicMap">
              <img
                src="../src\assets\images\BasemapsPic\esri_maps\national-geographic.jpg"
                className=" EXnationalGeographicMapImg Selimg "
              />
            </div>
            <label>جيوجرافيك</label>
          </div>
          <div className="EXosmMapDiv">
            <div id="EXosmMap">
              <img
                src="../src\assets\images\BasemapsPic\esri_maps\osm.jpg"
                className=" EXosmMapImg Selimg "
              />
            </div>
            <label>osm</label>
          </div>
          <div className="EXdarkGrayVectorMapDiv">
            <div id="EXdarkGrayVectorMap">
              <img
                src="../src\assets\images\BasemapsPic\esri_maps\dark-gray-vectorjpg.jpg"
                className=" EXdarkGrayVectorMapImg Selimg "
              />
            </div>
            <label>رمادى داكن متجة</label>
          </div>
          <div className="EXgrayVectorMapDiv">
            <div id="EXgrayVectorMap">
              <img
                src="../src\assets\images\BasemapsPic\esri_maps\gray-vectorpg.jpg"
                className=" EXgrayVectorMapImg Selimg "
              />
            </div>
            <label>داكن متجة</label>
          </div>
          <div className="EXstreetsNavigationVectorMapDiv">
            <div id="EXstreetsNavigationVectorMap">
              <img
                src="../src\assets\images\BasemapsPic\esri_maps\streets-navigation.jpg"
                className=" EXstreetsNavigationVectorMapImg Selimg "
              />
            </div>
            <label>شوارع-ملاحة</label>
          </div>
          <div className="EXstreetsReliefVectorMapDiv">
            <div id="EXstreetsReliefVectorMap">
              <img
                src="../src\assets\images\BasemapsPic\esri_maps\streets-relief.jpg"
                className=" EXstreetsNavigationVectorMapImg Selimg "
              />
            </div>
            <label>شوارع الاغاثة</label>
          </div>
          <div className="EXstreetsNightVectorMapDiv">
            <div id="EXstreetsNightVectorMap">
              <img
                src="../src\assets\images\BasemapsPic\esri_maps\streets-night.jpg"
                className=" EXstreetsNightVectorMapImg Selimg "
              />
            </div>
            <label>ليلي متجة</label>
          </div>
          <div className="EXtopoVectorMapDiv">
            <div id="EXtopoVectorMap">
              <img
                src="../src\assets\images\BasemapsPic\esri_maps\topo-vectorjpg.jpg"
                className=" EXtopoVectorMapImg Selimg "
              />
            </div>
            <label>طبوغرافي متجة</label>
          </div>
          <div className="EXstreetsVectorMapDiv">
            <div id="EXstreetsVectorMap">
              <img
                src="../src\assets\images\BasemapsPic\esri_maps\streets-vector.jpg"
                className=" EXstreetsVectorMapImg Selimg "
              />
            </div>
            <label>شوارع متجة</label>
          </div>
          <div className="EXGoogleMapsSatelliteMapDiv">
            <div id="EXGoogleMapsSatelliteMap">
              <img
                src="../src\assets\images\BasemapsPic\google_maps\GoogleSatellite.png"
                className="EXGoogleMapsSatelliteMapImg Selimg "
              />
            </div>
            <label>ف.جوجل</label>
          </div>
          <div className="EXGoogleMapStreetsMapDiv">
            <div id="EXGoogleMapStreetsMap">
              <img
                src="../src\assets\images\BasemapsPic\google_maps\GoogleStreate.png"
                className="EXGoogleMapStreetsMapImg Selimg "
              />
            </div>
            <label>ش.جوجل</label>
          </div>
          ---
          <div className="EXBingMapDiv">
            <div id="EXBingMap">
              <img
                src="../src\assets\images\BasemapsPic\othersMaps\bing_map.jpg"
                className="EXBingMapImg Selimg "
              />
            </div>
            <label>خ.بنج</label>
          </div>
          <div className="EXmapboxMapDiv">
            <div id="EXmapboxMap">
              <img
                src="../src\assets\images\BasemapsPic\othersMaps\mapboxMap.jpg"
                className="EXmapboxMapImg Selimg "
              />
            </div>
            <label>ماب بوكس</label>
          </div>
          <div className="EXSpaceMapDiv">
            <div id="EXSpaceMap">
              <img
                src="../src\assets\images\BasemapsPic\othersMaps\emptyMap.png"
                className="EXSpaceMapImg Selimg "
              />
            </div>
            <label>بدون خريطة</label>
          </div>
        </div>
      </div>
      <div className="BasemapOption">
        <img
          src="https://img.icons8.com/wired/30/000000/map.png"
          className="Selimg"
        />
      </div>
    </div>
  );
}

function onChange_satelliteMap(numOpicty, poolGoTo, RempoveMap) {
  window._MapImage.opacity = numOpicty;
  //for delete all layers
  if (RempoveMap == true) {
    window._satelliteMap.removeAll();
    window._topoMap.removeAll();
    window._streetMap.removeAll();
  }
  window._satelliteMap.addMany([
    window._layer,
    window._MapImage,
    window._survyPoint,
  ]);
  //wait until the layer is loaded
  window._MapImage.when(() => {
    if (poolGoTo == true) {
      window._view.goTo(window._MapImage.fullExtent);
    }
  });
}
function onChange_topoMap(numOpicty, poolGoTo, RempoveMap) {
  window._MapImage.opacity = numOpicty;
  //for delete all layers
  if (RempoveMap == true) {
    window._satelliteMap.removeAll();
    window._topoMap.removeAll();
    window._streetMap.removeAll();
  }
  // window._topoMap.add(MapImage);
  window._topoMap.addMany([
    window._layer,
    window._MapImage,
    window._survyPoint,
  ]);
  //wait until the layer is loaded
  window._MapImage.when(() => {
    if (poolGoTo == true) {
      window._view.goTo(window._MapImage.fullExtent);
    }
  });
}
function onChange_streetMap(numOpicty, poolGoTo, RempoveMap) {
  window._MapImage.opacity = numOpicty;
  //for delete all layers
  if (RempoveMap == true) {
    window._satelliteMap.removeAll();
    window._topoMap.removeAll();
    window._streetMap.removeAll();
  }
  // window._topoMap.add(MapImage);
  window._streetMap.addMany([
    window._layer,
    window._MapImage,
    window._survyPoint,
  ]);
  //wait until the layer is loaded
  window._MapImage.when(() => {
    if (poolGoTo == true) {
      window._view.goTo(window._MapImage.fullExtent);
    }
  });
}

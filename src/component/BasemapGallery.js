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
          let progressBar = document.querySelector("#progressBarapp");
          progressBar.onchange = function() {
            onChange_satelliteMap(parseFloat(progressBar.value), false, true);
            window._progressBarValue = parseFloat(progressBar.value);
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
        let progressBar = document.querySelector("#progressBarapp");
        progressBar.onchange = function() {
          onChange_topoMap(parseFloat(progressBar.value), false, true);
          window._progressBarValue = parseFloat(progressBar.value);
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
        let progressBar = document.querySelector("#progressBarapp");
        progressBar.onchange = function() {
          onChange_streetMap(parseFloat(progressBar.value), false, true);
          window._progressBarValue = parseFloat(progressBar.value);
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

          onChange_hybridMap(parseFloat(window._progressBarValue), true, false);
          let progressBar = document.querySelector("#progressBarapp");
          progressBar.onchange = function() {
            onChange_hybridMap(parseFloat(progressBar.value), false, true);
            window._progressBarValue = parseFloat(progressBar.value);
          };
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

          onChange_terrainMap(
            parseFloat(window._progressBarValue),
            true,
            false
          );
          let progressBar = document.querySelector("#progressBarapp");
          progressBar.onchange = function() {
            onChange_terrainMap(parseFloat(progressBar.value), false, true);
            window._progressBarValue = parseFloat(progressBar.value);
          };

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

        onChange_grayMap(parseFloat(window._progressBarValue), true, false);
        let progressBar = document.querySelector("#progressBarapp");
        progressBar.onchange = function() {
          onChange_grayMap(parseFloat(progressBar.value), false, true);
          window._progressBarValue = parseFloat(progressBar.value);
        };

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

          onChange_darkGrayMap(
            parseFloat(window._progressBarValue),
            true,
            false
          );
          let progressBar = document.querySelector("#progressBarapp");
          progressBar.onchange = function() {
            onChange_darkGrayMap(parseFloat(progressBar.value), false, true);
            window._progressBarValue = parseFloat(progressBar.value);
          };

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

          onChange_oceansMap(parseFloat(window._progressBarValue), true, false);
          let progressBar = document.querySelector("#progressBarapp");
          progressBar.onchange = function() {
            onChange_oceansMap(parseFloat(progressBar.value), false, true);
            window._progressBarValue = parseFloat(progressBar.value);
          };

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

          onChange_NGeographicMap(
            parseFloat(window._progressBarValue),
            true,
            false
          );
          let progressBar = document.querySelector("#progressBarapp");
          progressBar.onchange = function() {
            onChange_NGeographicMap(parseFloat(progressBar.value), false, true);
            window._progressBarValue = parseFloat(progressBar.value);
          };

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

        onChange_osmMap(parseFloat(window._progressBarValue), true, false);
        let progressBar = document.querySelector("#progressBarapp");
        progressBar.onchange = function() {
          onChange_osmMap(parseFloat(progressBar.value), false, true);
          window._progressBarValue = parseFloat(progressBar.value);
        };

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

          onChange_darkGrayVectorMap(
            parseFloat(window._progressBarValue),
            true,
            false
          );
          let progressBar = document.querySelector("#progressBarapp");
          progressBar.onchange = function() {
            onChange_darkGrayVectorMap(
              parseFloat(progressBar.value),
              false,
              true
            );
            window._progressBarValue = parseFloat(progressBar.value);
          };

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

          onChange_grayVectorMap(
            parseFloat(window._progressBarValue),
            true,
            false
          );
          let progressBar = document.querySelector("#progressBarapp");
          progressBar.onchange = function() {
            onChange_grayVectorMap(parseFloat(progressBar.value), false, true);
            window._progressBarValue = parseFloat(progressBar.value);
          };

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

          onChange_SNVectorMap(
            parseFloat(window._progressBarValue),
            true,
            false
          );
          let progressBar = document.querySelector("#progressBarapp");
          progressBar.onchange = function() {
            onChange_SNVectorMap(parseFloat(progressBar.value), false, true);
            window._progressBarValue = parseFloat(progressBar.value);
          };

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

          onChange_SReliefVectorMap(
            parseFloat(window._progressBarValue),
            true,
            false
          );
          let progressBar = document.querySelector("#progressBarapp");
          progressBar.onchange = function() {
            onChange_SReliefVectorMap(
              parseFloat(progressBar.value),
              false,
              true
            );
            window._progressBarValue = parseFloat(progressBar.value);
          };

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

          onChange_SNightVectorMap(
            parseFloat(window._progressBarValue),
            true,
            false
          );
          let progressBar = document.querySelector("#progressBarapp");
          progressBar.onchange = function() {
            onChange_SNightVectorMap(
              parseFloat(progressBar.value),
              false,
              true
            );
            window._progressBarValue = parseFloat(progressBar.value);
          };

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

          onChange_topoVectorMap(
            parseFloat(window._progressBarValue),
            true,
            false
          );
          let progressBar = document.querySelector("#progressBarapp");
          progressBar.onchange = function() {
            onChange_topoVectorMap(parseFloat(progressBar.value), false, true);
            window._progressBarValue = parseFloat(progressBar.value);
          };

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

          onChange_SVectorMap(
            parseFloat(window._progressBarValue),
            true,
            false
          );
          let progressBar = document.querySelector("#progressBarapp");
          progressBar.onchange = function() {
            onChange_SVectorMap(parseFloat(progressBar.value), false, true);
            window._progressBarValue = parseFloat(progressBar.value);
          };

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

          onChange__GMapStreets(
            parseFloat(window._progressBarValue),
            true,
            false
          );
          let progressBar = document.querySelector("#progressBarapp");
          progressBar.onchange = function() {
            onChange__GMapStreets(parseFloat(progressBar.value), false, true);
            window._progressBarValue = parseFloat(progressBar.value);
          };

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

          onChange_GMSatellite(
            parseFloat(window._progressBarValue),
            true,
            false
          );
          let progressBar = document.querySelector("#progressBarapp");
          progressBar.onchange = function() {
            onChange_GMSatellite(parseFloat(progressBar.value), false, true);
            window._progressBarValue = parseFloat(progressBar.value);
          };

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

        onChange_BingMap(parseFloat(window._progressBarValue), true, false);
        let progressBar = document.querySelector("#progressBarapp");
        progressBar.onchange = function() {
          onChange_BingMap(parseFloat(progressBar.value), false, true);
          window._progressBarValue = parseFloat(progressBar.value);
        };

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

          onChange_mapboxMap(parseFloat(window._progressBarValue), true, false);
          let progressBar = document.querySelector("#progressBarapp");
          progressBar.onchange = function() {
            onChange_mapboxMap(parseFloat(progressBar.value), false, true);
            window._progressBarValue = parseFloat(progressBar.value);
          };

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

        onChange_SpaceMap(parseFloat(window._progressBarValue), true, false);
        let progressBar = document.querySelector("#progressBarapp");
        progressBar.onchange = function() {
          onChange_SpaceMap(parseFloat(progressBar.value), false, true);
          window._progressBarValue = parseFloat(progressBar.value);
        };

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
function onChange_hybridMap(numOpicty, poolGoTo, RempoveMap) {
  window._MapImage.opacity = numOpicty;
  //for delete all layers
  if (RempoveMap == true) {
    window._hybridMap.removeAll();
  }
  // window._topoMap.add(MapImage);
  window._hybridMap.addMany([
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
function onChange_terrainMap(numOpicty, poolGoTo, RempoveMap) {
  window._MapImage.opacity = numOpicty;
  //for delete all layers
  if (RempoveMap == true) {
    window._terrainMap.removeAll();
  }
  // window._topoMap.add(MapImage);
  window._terrainMap.addMany([
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
function onChange_grayMap(numOpicty, poolGoTo, RempoveMap) {
  window._MapImage.opacity = numOpicty;
  //for delete all layers
  if (RempoveMap == true) {
    window._grayMap.removeAll();
  }
  // window._topoMap.add(MapImage);
  window._grayMap.addMany([
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
function onChange_darkGrayMap(numOpicty, poolGoTo, RempoveMap) {
  window._MapImage.opacity = numOpicty;
  //for delete all layers
  if (RempoveMap == true) {
    window._darkGrayMap.removeAll();
  }
  // window._topoMap.add(MapImage);
  window._darkGrayMap.addMany([
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
function onChange_oceansMap(numOpicty, poolGoTo, RempoveMap) {
  window._MapImage.opacity = numOpicty;
  //for delete all layers
  if (RempoveMap == true) {
    window._oceansMap.removeAll();
  }
  // window._topoMap.add(MapImage);
  window._oceansMap.addMany([
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
function onChange_nationalGeographicMap(numOpicty, poolGoTo, RempoveMap) {
  window._MapImage.opacity = numOpicty;
  //for delete all layers
  if (RempoveMap == true) {
    window._nationalGeographicMap.removeAll();
  }
  // window._topoMap.add(MapImage);
  window._nationalGeographicMap.addMany([
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
function onChange_NGeographicMap(numOpicty, poolGoTo, RempoveMap) {
  window._MapImage.opacity = numOpicty;
  //for delete all layers
  if (RempoveMap == true) {
    window._nationalGeographicMap.removeAll();
  }
  // window._topoMap.add(MapImage);
  window._nationalGeographicMap.addMany([
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
function onChange_osmMap(numOpicty, poolGoTo, RempoveMap) {
  window._MapImage.opacity = numOpicty;
  //for delete all layers
  if (RempoveMap == true) {
    window._osmMap.removeAll();
  }
  // window._topoMap.add(MapImage);
  window._osmMap.addMany([window._layer, window._MapImage, window._survyPoint]);
  //wait until the layer is loaded
  window._MapImage.when(() => {
    if (poolGoTo == true) {
      window._view.goTo(window._MapImage.fullExtent);
    }
  });
}
function onChange_grayVectorMap(numOpicty, poolGoTo, RempoveMap) {
  window._MapImage.opacity = numOpicty;
  //for delete all layers
  if (RempoveMap == true) {
    window._grayVectorMap.removeAll();
  }
  // window._topoMap.add(MapImage);
  window._grayVectorMap.addMany([
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
function onChange_darkGrayVectorMap(numOpicty, poolGoTo, RempoveMap) {
  window._MapImage.opacity = numOpicty;
  //for delete all layers
  if (RempoveMap == true) {
    window._darkGrayVectorMap.removeAll();
  }
  // window._topoMap.add(MapImage);
  window._darkGrayVectorMap.addMany([
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
function onChange_SNVectorMap(numOpicty, poolGoTo, RempoveMap) {
  window._MapImage.opacity = numOpicty;
  //for delete all layers
  if (RempoveMap == true) {
    window._streetsNavigationVectorMap.removeAll();
  }
  // window._topoMap.add(MapImage);
  window._streetsNavigationVectorMap.addMany([
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
function onChange_SReliefVectorMap(numOpicty, poolGoTo, RempoveMap) {
  window._MapImage.opacity = numOpicty;
  //for delete all layers
  if (RempoveMap == true) {
    window._streetsReliefVectorMap.removeAll();
  }
  // window._topoMap.add(MapImage);
  window._streetsReliefVectorMap.addMany([
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
function onChange_SNightVectorMap(numOpicty, poolGoTo, RempoveMap) {
  window._MapImage.opacity = numOpicty;
  //for delete all layers
  if (RempoveMap == true) {
    window._streetsNightVectorMap.removeAll();
  }
  // window._topoMap.add(MapImage);
  window._streetsNightVectorMap.addMany([
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
function onChange_topoVectorMap(numOpicty, poolGoTo, RempoveMap) {
  window._MapImage.opacity = numOpicty;
  //for delete all layers
  if (RempoveMap == true) {
    window._topoVectorMap.removeAll();
  }
  // window._topoMap.add(MapImage);
  window._topoVectorMap.addMany([
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
function onChange_SVectorMap(numOpicty, poolGoTo, RempoveMap) {
  window._MapImage.opacity = numOpicty;
  //for delete all layers
  if (RempoveMap == true) {
    window._streetsVectorMap.removeAll();
  }
  // window._topoMap.add(MapImage);
  window._streetsVectorMap.addMany([
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
function onChange__GMapStreets(numOpicty, poolGoTo, RempoveMap) {
  window._MapImage.opacity = numOpicty;
  //for delete all layers
  if (RempoveMap == true) {
    window._GoogleMapStreets.removeAll();
  }
  // window._topoMap.add(MapImage);
  window._GoogleMapStreets.addMany([
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
function onChange_GMSatellite(numOpicty, poolGoTo, RempoveMap) {
  window._MapImage.opacity = numOpicty;
  //for delete all layers
  if (RempoveMap == true) {
    window._GoogleMapsSatellite.removeAll();
  }
  // window._topoMap.add(MapImage);
  window._GoogleMapsSatellite.addMany([
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
function onChange_BingMap(numOpicty, poolGoTo, RempoveMap) {
  window._MapImage.opacity = numOpicty;
  //for delete all layers
  if (RempoveMap == true) {
    window._BingMap.removeAll();
  }
  // window._topoMap.add(MapImage);
  window._BingMap.addMany([
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
function onChange_mapboxMap(numOpicty, poolGoTo, RempoveMap) {
  window._MapImage.opacity = numOpicty;
  //for delete all layers
  if (RempoveMap == true) {
    window._mapboxMap.removeAll();
  }
  // window._topoMap.add(MapImage);
  window._mapboxMap.addMany([
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
function onChange_SpaceMap(numOpicty, poolGoTo, RempoveMap) {
  window._MapImage.opacity = numOpicty;
  //for delete all layers
  if (RempoveMap == true) {
    window._SpaceMap.removeAll();
  }
  // window._topoMap.add(MapImage);
  window._SpaceMap.addMany([
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

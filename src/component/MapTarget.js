import React from "react";
export default function MapTarget() {
  React.useEffect(() => {
    window._view.on("key-down", function(event) {
      //   console.log(event);
      if (event.key === "w") {
        window._view.goTo({
          target: window._view.center,
          zoom: window._view.zoom + 1,
        });
      }
      if (event.key === "s") {
        window._view.goTo({
          target: window._view.center,
          zoom: window._view.zoom - 1,
        });
      }
    });

    window._view.watch("zoom", function(target) {
      document.querySelector("#Zooming").innerHTML = `Zoom: ${target}`;
    });

    window._view.on("click", function(event) {
      // var lat = Math.round(event.mapPoint.latitude);
      var lat = event.mapPoint.latitude;
      var lon = event.mapPoint.longitude;

      document.querySelector(
        "#cordinate"
      ).innerHTML = `latitude: ${lat} longitude: ${lon} `;
    });
  });

  //fire when select item from any feature layer
  // window._view.on("click", function(event) {
  // window._view.hitTest(event.screenPoint).then(function(response) {
  // var graphics = response.results;
  // graphics.forEach(function(graphic) {
  // console.log(graphic);
  // });
  // });
  // });

  return (
    <div>
      <label id="Zooming"></label>
      <label id="cordinate"></label>
    </div>
  );
}

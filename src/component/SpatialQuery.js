import React from "react";
import SketchViewModel from "esri/widgets/Sketch/SketchViewModel";
import Graphic from "esri/Graphic";

export default function SpatialQuery() {
  React.useEffect(() => {
    const polygonSymbol = {
      type: "simple-fill", // autocasts as new SimpleFillSymbol()
      color: "rgba(138,43,226, 0.8)",
      style: "backward-diagonal",
      outline: {
        color: "rgb(255,0,0)",
        width: 1.5,
        style: "dash",
      },
    };
    /// symbol style
    // "backward-diagonal"|"cross"|"diagonal-cross"|
    // "forward-diagonal"|"horizontal"|"none"|"solid"|"vertical"
    /// outline style
    //   'dash', 'dash-dot',
    //   'dot', 'inside-frame', 'long-dash', 'long-dash-dot',
    //    'long-dash-dot-dot', 'none', 'short-dash',
    // 'short-dash-dot', 'short-dash-dot-dot', 'short-dot', 'solid'
    var sketchVM = new SketchViewModel({
      layer: window._layer,
      view: window._view,
      polygonSymbol: polygonSymbol,
    });
    sketchVM.on("create", function(event) {
      //   console.log(event);
      if (event.state === "complete") {
        //remove currnet graphic
        window._layer.remove(event.graphic);
        window._view.graphics.removeAll();
        queryFunc(event.graphic.geometry);
      }
    });
    function queryFunc(geom) {
      // developers.arcgis.com/javascript/latest/api-reference/esri-tasks-support-Query.html
      let query = window._survyBuilding.createQuery();
      query.geometry = geom;
      //   query.distance = 1;
      //   query.units = "kilometers";
      query.spatialRelationship = "contains";
      query.returnGeometry = true;
      window._survyBuilding.queryFeatures(query).then(function(response) {
        let geometriesArray = response.features.map(function(feature) {
          return feature.geometry;
        });
        const fillsymbol = {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "rgba(138,43,226)",
          //   style: "backward-diagonal",
          //   outline: {
          //     color: "rgb(255,0,0)",
          //     width: 1.5,
          //     style: "dash",
          //   },
        };
        geometriesArray.forEach(drawResultFun);
        function drawResultFun(geom) {
          let polygonGraphic = new Graphic({
            geometry: geom,
            symbol: fillsymbol,
          });
          window._view.graphics.add(polygonGraphic);
        }
      });
    }

    //start query

    document
      .getElementById("polygonButton")
      .addEventListener("click", function() {
        sketchVM.create("rectangle");
      });

    //   for select symbol graphic.......
    //   document.getElementById('select').addEventListener('click', function () {
    // console.log('click to select', sketchVM.layer.graphics.getItemAt(0), layer);
    // sketchVM.update({ graphics: sketchVM.layer.graphics, updateOptions: { tool: 'reshape' } });
    // })
  });
  return (
    <div>
      <button id="polygonButton">Spatial query</button>
    </div>
  );
}

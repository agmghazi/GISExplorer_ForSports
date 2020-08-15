import React from "react";
import Expand from "esri/widgets/Expand";
import QueryTask from "esri/tasks/QueryTask";
import Query from "esri/tasks/support/Query";
import Graphic from "esri/Graphic";

export default function HerarchicalSearch() {
  // var HerarchicalSearchs = {};
  var _stateFeatures, _countiesFeatures;
  var polygonSymbol = {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    color: [51, 51, 204, 0.2],
    style: "solid",
    outline: {
      color: "red",
      width: 2,
    },
  };

  React.useEffect(() => {
    let queryTask = new QueryTask({
      url:
        "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/2",
    });

    let query = new Query();
    query.returnGeometry = true;
    query.outFields = ["*"];
    query.where = "1=1";

    queryTask.execute(query).then((results) => {
      let ddlStates = document.querySelector("#ddlStates");
      _stateFeatures = results.features;
      results.features.map((feature) => {
        const state_name = feature.attributes.state_name;
        let opt = document.createElement("option");
        opt.value = state_name;
        opt.innerHTML = state_name;
        ddlStates.appendChild(opt);
      });
    });

    document.querySelector("#ddlStates").onchange = () => {
      const stateName = document.querySelector("#ddlStates").value;
      _stateFeatures.map((feature) => {
        if (feature.attributes.state_name === stateName) {
          var graphic = new Graphic({
            geometry: feature.geometry,
            symbol: polygonSymbol,
            attributes: feature.attributes,
            popupTemplate: {
              title: "{state_name}",
              content: "state_name: {state_name} - pop2000:{pop2000}",
            },
          });
          console.log(feature.attributes);
          window._view.graphics.removeAll();
          window._view.graphics.add(graphic);
          window._view.goTo(graphic);
        }
      });

      let queryTaskS = new QueryTask({
        url:
          "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/3",
      });
      console.log("name in value: " + stateName);
      let queryS = new Query();
      queryS.returnGeometry = true;
      queryS.outFields = ["*"];
      queryS.where = `state_name = '${stateName}'`;
      queryTaskS.execute(queryS).then((results) => {
        let ddlCounties = document.querySelector("#ddlCounties");
        _countiesFeatures = results.features;
        //this for clean successfully
        while (ddlCounties.firstChild)
          ddlCounties.removeChild(ddlCounties.firstChild);
        ddlCounties.disabled = false;

        results.features.map((feature) => {
          const name = feature.attributes.name;
          let opt = document.createElement("option");
          opt.value = name;
          opt.innerHTML = name;
          ddlCounties.appendChild(opt);
        });
      });
    };

    document.querySelector("#ddlCounties").onchange = () => {
      const name = document.querySelector("#ddlCounties").value;
      console.log("value for contry: " + name);
      _countiesFeatures.map((feature) => {
        if (feature.attributes.name === name) {
          var graphic = new Graphic({
            geometry: feature.geometry,
            symbol: polygonSymbol,
            attributes: feature.attributes,
            popupTemplate: {
              title: "{name}",
              content: "{state_name} -{name}",
            },
          });
          console.log(feature.attributes);
          window._view.graphics.removeAll();
          window._view.graphics.add(graphic);
          window._view.goTo(graphic);
        }
      });
    };

    const HsearchExpand = new Expand({
      expandIconClass: "esri-icon-search",
      expandTooltip: "البحث",
      view: window._view,
      content: document.querySelector("#app-search"),
    });

    window._view.ui.add(HsearchExpand, {
      position: "top-right",
      index: 1,
    });
  }, []);
  return (
    <div>
      <div className="input-group input-group-sm mb-4">
        <div className="input-group-prepend">
          <div id="app-search" className="esri-widget">
            <select
              id="ddlStates"
              className="esri-input"
              className="custom-select"
            >
              <option value="0">اختر اسم المدينة</option>
            </select>
            <br />
            <select
              id="ddlCounties"
              className="esri-input"
              className="custom-select"
              disabled
            >
              {" "}
            </select>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}

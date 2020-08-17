import React from "react";
import Expand from "esri/widgets/Expand";
import QueryTask from "esri/tasks/QueryTask";
import Query from "esri/tasks/support/Query";
import Graphic from "esri/Graphic";

export default function HierarchicalSearch() {
  // var HerarchicalSearchs = {};
  var _stateFeatures, _countiesFeatures, _cityFeatures, _BildingFeatures;
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
        "http://localhost:6080/arcgis/rest/services/DataWorker_H/FeatureServer/10",
    });

    let query = new Query();
    query.returnGeometry = true;
    query.outFields = ["*"];
    query.where = "1=1";

    queryTask.execute(query).then((results) => {
      let ddlStates = document.querySelector("#ddlStates");
      _stateFeatures = results.features;
      results.features.map((feature) => {
        const name_arabi = feature.attributes.name_arabi;
        let opt = document.createElement("option");
        opt.value = name_arabi;
        opt.innerHTML = name_arabi;
        ddlStates.appendChild(opt);
      });
    });

    document.querySelector("#ddlStates").onchange = () => {
      const name_arabi = document.querySelector("#ddlStates").value;
      _stateFeatures.map((feature) => {
        if (feature.attributes.name_arabi === name_arabi) {
          var graphic = new Graphic({
            geometry: feature.geometry,
            symbol: polygonSymbol,
            attributes: feature.attributes,
            popupTemplate: {
              title: "{name_arabi}",
              content: "name_arabi: {name_arabi}",
            },
          });
          window._view.graphics.removeAll();
          window._view.graphics.add(graphic);
          window._view.goTo(graphic);
        }
      });

      let queryTaskS = new QueryTask({
        url:
          "http://localhost:6080/arcgis/rest/services/DataWorker_H/FeatureServer/11",
      });
      let queryS = new Query();
      queryS.returnGeometry = true;
      queryS.outFields = ["*"];
      queryS.where = `country = '${name_arabi}'`;
      queryTaskS.execute(queryS).then((results) => {
        let ddlCounties = document.querySelector("#ddlCounties");
        _countiesFeatures = results.features;

        //this for clean successfully
        while (ddlCounties.firstChild)
          ddlCounties.removeChild(ddlCounties.firstChild);
        // ddlCounties.disabled = false;
        // ddlCounties.style.display = "block";
        ddlCounties.classList.remove("hiddenEl");
        ddlCounties.classList.add("custom-select");

        results.features.map((feature) => {
          const name_a = feature.attributes.name_a;
          let opt = document.createElement("option");
          opt.value = name_a;
          opt.innerHTML = name_a;
          ddlCounties.appendChild(opt);
        });
      });
    };

    document.querySelector("#ddlCounties").onchange = () => {
      const name_a = document.querySelector("#ddlCounties").value;
      _countiesFeatures.map((feature) => {
        if (feature.attributes.name_a === name_a) {
          var graphic = new Graphic({
            geometry: feature.geometry,
            symbol: polygonSymbol,
            attributes: feature.attributes,
            popupTemplate: {
              title: "{name_a}",
              content: "{name_a} - {country}",
            },
          });
          window._view.graphics.removeAll();
          window._view.graphics.add(graphic);
          window._view.goTo(graphic);
        }
      });

      let cityTask = new QueryTask({
        url:
          "http://localhost:6080/arcgis/rest/services/DataWorker_H/FeatureServer/12",
      });
      let cityQuery = new Query();
      cityQuery.returnGeometry = true;
      cityQuery.outFields = ["*"];
      cityQuery.where = `zone = '${name_a}'`;
      console.log(name_a);
      cityTask.execute(cityQuery).then((results) => {
        let ddlCity = document.querySelector("#ddlCity");
        _cityFeatures = results.features;
        //this for clean successfully
        while (ddlCity.firstChild) ddlCity.removeChild(ddlCity.firstChild);
        // ddlCity.disabled = false;
        // ddlCity.style.display = "block";
        ddlCity.classList.remove("hiddenEl");
        ddlCity.classList.add("custom-select");

        results.features.map((feature) => {
          const admnuntarn = feature.attributes.admnuntarn;
          let opts = document.createElement("option");
          opts.value = admnuntarn;
          opts.innerHTML = admnuntarn;
          ddlCity.appendChild(opts);
        });
      });
    };
    document.querySelector("#ddlCity").onchange = () => {
      const admnuntarn = document.querySelector("#ddlCity").value;
      _cityFeatures.map((feature) => {
        if (feature.attributes.admnuntarn === admnuntarn) {
          var graphic = new Graphic({
            geometry: feature.geometry,
            symbol: polygonSymbol,
            attributes: feature.attributes,
            popupTemplate: {
              title: "{admnuntarn}",
              content: "{admnuntarn} - {admnuntarn}",
            },
          });
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

    // window._view.ui.add(HsearchExpand, {
    //   position: "top-right",
    //   index: 1,
    // });
    var $j = jQuery.noConflict();
    // https://www.tutorialspoint.com/jqueryui/jqueryui_dialog.htm
    // https://jqueryui.com/position/
    $(function() {
      $("#attributTabe")
        .dialog({
          // dialogClass: "alert",
          // maxWidth: 4000,
          // maxHeight: 600,
          // title: "Success",
          position: {
            my: "left top",
            at: "center top",
            of: $("#toggleAttribute"),
            collision: "flipfit fit",
          },
          autoOpen: false,
          show: {
            effect: "blind",
            duration: 1000,
          },
          hide: {
            effect: "explode",
            duration: 1200,
          },
          width: 370,
          // height: 300,
        })
        .dialogExtend({
          closable: true,
          maximizable: false,
          minimizable: true,
          collapsable: true,
          dblclick: "collapse",
          titlebar: "transparent",
          minimizeLocation: "right",
          icons: {
            close: "ui-icon-circle-close",
            maximize: "ui-icon-circle-plus",
            minimize: "ui-icon-circle-minus",
            collapse: "ui-icon-triangle-1-s",
            restore: "ui-icon-bullet",
          },
          load: function(evt, dlg) {
            //   console.log(evt.type);
          },
          beforeCollapse: function(evt, dlg) {
            //   console.log(evt.type);
          },
          beforeMaximize: function(evt, dlg) {
            //   console.log(evt.type);
          },
          beforeMinimize: function(evt, dlg) {
            //   console.log(evt.type);
          },
          beforeRestore: function(evt, dlg) {
            //   console.log(evt.type);
          },
          collapse: function(evt, dlg) {
            //   console.log(evt.type);
          },
          maximize: function(evt, dlg) {
            //   console.log(evt.type);
          },
          minimize: function(evt, dlg) {
            //   console.log(evt.type);
          },
          restore: function(evt, dlg) {
            //   console.log(evt.type);
          },
        });
      $("#toggleAttribute").on("click", function() {
        $("#attributTabe").dialog("open");
      });
    });
  }, []);
  return (
    <>
      <div
        className="input-group input-group-sm mb-4"
        id="attributTabe"
        title="البحث الهرمى"
        // hidden="hidden"
      >
        <div className="input-group-prepend" id="masking">
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
              className="hiddenEl"
            ></select>
            <br />
            <select
              id="ddlCity"
              className="esri-input"
              className="custom-select"
              className="hiddenEl"
            ></select>
          </div>
        </div>
      </div>

      <input
        id="toggleAttribute"
        type="image"
        src="https://img.icons8.com/pastel-glyph/40/000000/search--v2.png"
      />
    </>
  );
}

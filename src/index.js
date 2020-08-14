import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import FeaturesService from "./FeaturesService";
import Widgets from "./Widgets";
import NavigationTools from "./NavigationTools";
import PrintWidget from "./PrintWidget";
import LegendWidet from "./LegendWidet";
import Screenshot from "./Screenshot";

const wrapper = document.getElementById("root");
wrapper
  ? ReactDOM.render(
      <div>
        <App />
        <FeaturesService />
        <Widgets />
        <NavigationTools />
        <PrintWidget />
        <LegendWidet />
        <Screenshot />
      </div>,
      wrapper
    )
  : false;

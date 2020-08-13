import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import FeaturesService from "./FeaturesService";
import Widgets from "./Widgets";
import NavigationTools from "./NavigationTools";

const wrapper = document.getElementById("root");
wrapper
  ? ReactDOM.render(
      <div>
        <App />
        <FeaturesService />
        <Widgets />
        <NavigationTools />
      </div>,
      wrapper
    )
  : false;

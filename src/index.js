import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import FeaturesService from "./FeaturesService";

const wrapper = document.getElementById("root");
wrapper
  ? ReactDOM.render(
      <div>
        <App />
        <FeaturesService />
      </div>,
      wrapper
    )
  : false;

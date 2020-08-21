import "./config";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import FeaturesService from "./component/FeaturesService";
import Widgets from "./component/Widgets";
import NavigationTools from "./component/NavigationTools";
import PrintWidget from "./component/PrintWidget";
import LegendWidet from "./component/LegendWidet";
import Screenshot from "./component/Screenshot";
import SearchWidget from "./component/SearchWidget";
import HierarchicalSearch from "./component/HierarchicalSearch";
import Bookmarks from "./component/Bookmarks";
import MapTarget from "./component/MapTarget";
import FeaturesTable from "./component/FeaturesTable";
import Overview_map from "./component/Overview_map";
import SynchronizeView from "./component/SynchronizeView";
import BasemapGallery from "./component/BasemapGallery";

const wrapper = document.getElementById("root");
wrapper
  ? ReactDOM.render(
      <>
        <FeaturesService />
        <App />
        <Widgets />
        <NavigationTools />
        <PrintWidget />
        <LegendWidet />
        <Screenshot />
        <SearchWidget />
        <HierarchicalSearch />
        <Bookmarks />
        <MapTarget />
        <FeaturesTable />
        <Overview_map />
        <SynchronizeView />
        <BasemapGallery />
      </>,
      wrapper
    )
  : false;

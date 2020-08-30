import "./config";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Widgets from "./component/Widgets";
import NavigationTools from "./component/NavigationTools";
import PrintWidget from "./component/PrintWidget";
import LegendWidet from "./component/LegendWidet";
import Screenshot from "./component/Screenshot";
import SearchWidget from "./component/SearchWidget";
import HierarchicalSearch from "./component/HierarchicalSearch";
import Bookmarks from "./component/Bookmarks";
import MapTarget from "./component/MapTarget";
import Overview_map from "./component/Overview_map";
import SynchronizeView from "./component/SynchronizeView";
import BasemapGallery from "./component/BasemapGallery";
import RemoveGraphic from "./component/RemoveGraphic";
import ReviewShapfile from "./component/ReviewShapfile";
import SearchByCordinates from "./component/SearchByCordinates";
import SpatialQuery from "./component/SpatialQuery";
import FeaturesTableWithToc from "./component/FeaturesTableWithToc";

const wrapper = document.getElementById("root");
wrapper
  ? ReactDOM.render(
      <>
        <App />
        <FeaturesTableWithToc />
        <Widgets />
        <NavigationTools />
        <PrintWidget />
        <LegendWidet />
        <Screenshot />
        <SearchWidget />
        <HierarchicalSearch />
        <Bookmarks />
        <MapTarget />
        <Overview_map />
        <SynchronizeView />
        <BasemapGallery />
        <ReviewShapfile />
        <RemoveGraphic />
        <SearchByCordinates />
        <SpatialQuery />
      </>,
      wrapper
    )
  : false;

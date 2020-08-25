import React, { useEffect, useRef } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import Graphic from "esri/Graphic";

export default function SearchByCordinates() {
  const CordinateForm = useRef();
  const CordinateDegreeForm = useRef();
  useEffect(() => {
    $("#CordinateSelected").click(function() {
      $("#CordinateBox").toggle(this.checked);
    });

    $("#DegreeSelected").click(function() {
      $("#DegreeBox").toggle(this.checked);
    });
  }, []);
  return (
    <div className="CordinateDiv">
      <div className="checkbox">
        <label>
          <input type="checkbox" name="cod" value="1" id="CordinateSelected" />
          CordinateBox
        </label>
      </div>
      <div className="checkbox">
        <label>
          <input type="checkbox" name="cod" value="1" id="DegreeSelected" />
          DegreeBox
        </label>
      </div>

      <div id="CordinateBox" style={{ display: "none" }}>
        <h2>درجات عشريه</h2>
        <form ref={CordinateForm}>
          <input
            type="number"
            placeholder="longitude"
            label={"longitude"}
            name={"longitude"}
          />
          <input
            type="number"
            placeholder="latitude"
            label={"latitude"}
            name={"latitude"}
          />
        </form>
        <button onClick={CalculateDecimal}>بحث</button>
      </div>
      <br />
      <div id="DegreeBox" style={{ display: "none" }}>
        <h2> درجات.دقائق.ثوانى</h2>
        <form ref={CordinateDegreeForm}>
          <h3>دوائر العرض</h3>
          <input
            type="number"
            placeholder="ثوانى"
            label={"SecondLatitude"}
            name={"SecondLatitude"}
          />
          <input
            type="number"
            placeholder="دقايق"
            label={"MinLatitude"}
            name={"MinLatitude"}
          />
          <input
            type="number"
            placeholder="درجات"
            label={"DegreeLatitude"}
            name={"DegreeLatitude"}
          />
          <h3>خطوط الطول</h3>
          <input
            type="number"
            placeholder="ثوانى"
            label={"Secondlongitude"}
            name={"Secondlongitude"}
          />

          <input
            type="number"
            placeholder="دقايق"
            label={"Minlongitude"}
            name={"Minlongitude"}
          />
          <input
            type="number"
            placeholder="درجات"
            label={"Degreelongitude"}
            name={"Degreelongitude"}
          />
        </form>
        <button onClick={CalculateDegrees}>بحث</button>
      </div>
    </div>
  );
  function CalculateDegrees() {
    const formDegrees = CordinateDegreeForm.current;

    let SecondLatitude = parseInt(`${formDegrees["SecondLatitude"].value}`);
    let MinLatitude = parseInt(`${formDegrees["MinLatitude"].value}`);
    let DegreeLatitude = parseInt(`${formDegrees["DegreeLatitude"].value}`);

    let Secondlongitude = `${formDegrees["Secondlongitude"].value}`;
    let Minlongitude = `${formDegrees["Minlongitude"].value}`;
    let Degreelongitude = `${formDegrees["Degreelongitude"].value}`;

    function getDMS2DD(days, minutes, seconds, direction) {
      direction.toUpperCase();
      var dd = days + minutes / 60 + seconds / (60 * 60);
      if (direction == "S" || direction == "W") {
        dd = dd * -1;
      } // Don't do anything for N or E
      return dd;
    }

    let LatitudeCord = getDMS2DD(
      parseInt(`${DegreeLatitude}`),
      parseInt(`${MinLatitude}`),
      parseInt(`${SecondLatitude}`),
      "N"
    );
    alert(LatitudeCord);

    let longitudeCord = getDMS2DD(
      parseInt(`${Degreelongitude}`),
      parseInt(`${Minlongitude}`),
      parseInt(`${Secondlongitude}`),
      "E"
    );
    alert(longitudeCord);

    let pointDegrees = {
      type: "point", // autocasts as new Point()
      longitude: longitudeCord,
      latitude: LatitudeCord,
    };

    let markerSymbolformDegrees = {
      type: "simple-marker",
      color: [198, 83, 133],
      size: 10,
      // outline: {
      // color: [198, 83, 133],
      // width: 10,
      // },
    };

    let pointGraphicDegrees = new Graphic({
      geometry: pointDegrees,
      symbol: markerSymbolformDegrees,
    });
    window._layer.removeAll();
    window._layer.add(pointGraphicDegrees);
    window._view.goTo(pointGraphicDegrees);
  }

  function CalculateDecimal() {
    const formDecimal = CordinateForm.current;
    // CordinateForm.current.focus();
    let pointDecimal = {
      type: "point", // autocasts as new Point()
      longitude: parseInt(`${formDecimal["longitude"].value}`),
      latitude: parseInt(`${formDecimal["latitude"].value}`),
    };

    let markerSymbolformDecimal = {
      type: "simple-marker",
      color: [198, 83, 133],
      size: 10,
      // outline: {
      // color: [198, 83, 133],
      // width: 10,
      // },
    };

    let pointGraphicDecimal = new Graphic({
      geometry: pointDecimal,
      symbol: markerSymbolformDecimal,
    });
    window._layer.removeAll();
    window._layer.add(pointGraphicDecimal);
    window._view.goTo(pointGraphicDecimal);
    // window._view.goTo({
    //   center: [
    //     parseInt(`${form["longitude"].value}`),
    //     parseInt(`${form["latitude"].value}`),
    //   ],
    // });

    // https://www.movable-type.co.uk/scripts/geodesy/docs/index.html for get Distance

    // import LatLon from "geodesy/latlon-spherical.js";

    // const p1 = new LatLon(50.06632, -5.71475);
    // const p2 = new LatLon(58.64402, -3.07009);
    // const d = p1.distanceTo(p2);
    // // console.log(d.toFixed(3) == "968874.704");
    // console.log(d.toFixed(3));

    // const mid = p1.midpointTo(p2);
    // // console.log(mid.toString("dms") == "54° 21′ 44″ N, 004° 31′ 51″ W");
    // console.log(mid.toString("dms"));
  }
}

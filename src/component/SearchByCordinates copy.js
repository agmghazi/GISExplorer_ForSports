import React, { useRef } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import Graphic from "esri/Graphic";

export default function SearchByCordinates() {
  const textInput = useRef();

  focusTextInput = () => textInput.current.focus();

  const { register, errors, handleSubmit } = useForm({
    criteriaMode: "all",
  });
  //   const call = () => {
  //     alert("call");
  //   };
  const onSubmit = (data) => {
    console.log(data.longitude);
    console.log(data.latitude);
    call();
  };
  //   React.useEffect(() => {
  //     window._view.goTo({ center: [-126, 49] });
  //   });
  return (
    <div className="CordinateDiv">
      <h2>البحث بالإحداثيات</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="CordinateForm">
        <input
          name="longitude"
          placeholder="longitude"
          ref={textInput}
          ref={register({
            required: "يرجى أدخال الاحداثى",
            pattern: {
              value: /\d+/,
              message: "الحقل يقبل ارقام فقط.",
            },
            minLength: {
              value: 1,
              message: "لابد من ادخال عشر ارقام",
            },
          })}
        />
        <input
          name="latitude"
          placeholder="latitude"
          ref={register({
            required: "يرجى أدخال الاحداثى",
            pattern: {
              value: /\d+/,
              message: "الحقل يقبل ارقام فقط.",
            },
            minLength: {
              value: 1,
              message: "لابد من ادخال عشر ارقام",
            },
          })}
        />

        <ErrorMessage
          errors={errors}
          name="longitude"
          render={({ messages }) => {
            console.log("messages", messages);
            return messages
              ? Object.entries(messages).map(([type, message]) => (
                  <p key={type}>{message}</p>
                ))
              : null;
          }}
        />
        <ErrorMessage
          errors={errors}
          name="latitude"
          render={({ messages }) => {
            console.log("messages", messages);
            return messages
              ? Object.entries(messages).map(([type, message]) => (
                  <p key={type}>{message}</p>
                ))
              : null;
          }}
        />

        <input type="submit" onClick={focusTextInput} />
      </form>
    </div>
  );

  function call() {
    alert("cll");
    // First create a point geometry
    var point = {
      type: "point", // autocasts as new Point()
      longitude: data.longitude,
      latitude: data.latitude,
    };

    // Create a symbol for drawing the point
    var markerSymbol = {
      type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
      color: [226, 119, 40],
      outline: {
        // autocasts as new SimpleLineSymbol()
        color: [255, 255, 255],
        width: 50,
      },
    };

    // Create a graphic and add the geometry and symbol to it
    var pointGraphic = new Graphic({
      geometry: point,
      symbol: markerSymbol,
    });
    // pointGraphic.when(() => {
    //   window._view.goTo({ target: pointGraphic.fullExtent });
    // }, []);

    window._view.goTo({ center: [data.longitude, data.latitude] });
  }
}

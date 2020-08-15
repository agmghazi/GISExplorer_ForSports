import React from "react";

export default function Screenshot() {
  const inputElement = React.useRef(null);

  React.useEffect(() => {
    // the button that triggers area selection mode
    const screenshotBtn = document.getElementById("screenshotBtn");

    // the orange mask used to select the area
    const maskDiv = document.getElementById("maskDiv");

    // element where we display the print preview
    const screenshotDiv = document.getElementById("screenshotDiv");

    // replace the navigation elements with screenshot area selection button
    // window._view.ui.empty("top-left");
    window._view.ui.add(screenshotBtn, "top-left");

    // add an event listener to trigger the area selection mode
    screenshotBtn.addEventListener("click", function() {
      screenshotBtn.classList.add("active");
      window._view.container.classList.add("screenshotCursor");
      let area = null;

      // listen for drag events and compute the selected area
      const dragHandler = window._view.on("drag", function(event) {
        // prevent navigation in the window._view
        event.stopPropagation();

        // when the user starts dragging or is dragging
        if (event.action !== "end") {
          // calculate the extent of the area selected by dragging the cursor
          const xmin = clamp(
            Math.min(event.origin.x, event.x),
            0,
            window._view.width
          );
          const xmax = clamp(
            Math.max(event.origin.x, event.x),
            0,
            window._view.width
          );
          const ymin = clamp(
            Math.min(event.origin.y, event.y),
            0,
            window._view.height
          );
          const ymax = clamp(
            Math.max(event.origin.y, event.y),
            0,
            window._view.height
          );
          area = {
            x: xmin,
            y: ymin,
            width: xmax - xmin,
            height: ymax - ymin,
          };
          // set the position of the div element that marks the selected area
          setMaskPosition(area);
        }
        // when the user stops dragging
        else {
          // remove the drag event listener from the SceneView
          dragHandler.remove();
          // the screenshot of the selected area is taken
          window._view
            .takeScreenshot({ area: area, format: "png" })
            .then(function(screenshot) {
              // display a preview of the image
              showPreview(screenshot);

              // create the image for download
              document.getElementById("downloadBtn").onclick = function() {
                const text = document.getElementById("textInput").value;
                // if a text exists, then add it to the image
                if (text) {
                  const dataUrl = getImageWithText(screenshot, text);
                  downloadImage("لقطه الشاشة" + ".png", dataUrl);
                }
                // otherwise download only the webscene screenshot
                else {
                  downloadImage(
                    // window._map.basemap.title + ".png",
                    "لقطه الشاشة" + ".png",
                    screenshot.dataUrl
                  );
                }
              };

              // the screenshot mode is disabled
              screenshotBtn.classList.remove("active");
              window._view.container.classList.remove("screenshotCursor");
              setMaskPosition(null);
            });
        }
      });

      function setMaskPosition(area) {
        if (area) {
          maskDiv.classList.remove("hide");
          maskDiv.style.left = area.x + "px";
          maskDiv.style.top = area.y + "px";
          maskDiv.style.width = area.width + "px";
          maskDiv.style.height = area.height + "px";
        } else {
          maskDiv.classList.add("hide");
        }
      }

      function clamp(value, from, to) {
        return value < from ? from : value > to ? to : value;
      }
    });

    // creates an image that will be appended to the DOM
    // so that users can have a preview of what they will download
    function showPreview(screenshot) {
      screenshotDiv.classList.remove("hide");
      // add the screenshot dataUrl as the src of an image element
      const screenshotImage = document.getElementsByClassName(
        "js-screenshot-image"
      )[0];
      screenshotImage.width = screenshot.data.width;
      screenshotImage.height = screenshot.data.height;
      screenshotImage.src = screenshot.dataUrl;
    }

    // returns a new image created by adding a custom text to the webscene image
    function getImageWithText(screenshot, text) {
      const imageData = screenshot.data;

      // to add the text to the screenshot we create a new canvas element
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.height = imageData.height;
      canvas.width = imageData.width;

      // add the screenshot data to the canvas
      context.putImageData(imageData, 0, 0);
      context.font = "20px Arial";
      context.fillStyle = "#000";
      context.fillRect(
        0,
        imageData.height - 40,
        context.measureText(text).width + 20,
        30
      );

      // add the text from the textInput element
      context.fillStyle = "#fff";
      context.fillText(text, 10, imageData.height - 20);

      return canvas.toDataURL();
    }

    function downloadImage(filename, dataUrl) {
      // the download is handled differently in Microsoft browsers
      // because the download attribute for <a> elements is not supported
      if (!window.navigator.msSaveOrOpenBlob) {
        // in browsers that support the download attribute
        // a link is created and a programmatic click will trigger the download
        const element = document.createElement("a");
        element.setAttribute("href", dataUrl);
        element.setAttribute("download", filename);
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      } else {
        // for MS browsers convert dataUrl to Blob
        const byteString = atob(dataUrl.split(",")[1]);
        const mimeString = dataUrl
          .split(",")[0]
          .split(":")[1]
          .split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });

        // download file
        window.navigator.msSaveOrOpenBlob(blob, filename);
      }
    }
    // button to hide the print preview html element
    document.getElementById("closeBtn").addEventListener("click", function() {
      screenshotDiv.classList.add("hide");
    });

    if (inputElement.current) {
      inputElement.current.focus();
    }
  });
  return (
    <div>
      <div className="esri-widget">
        <button
          id="screenshotBtn"
          className="action-button esri-widget"
          aria-label="Select screenshot area"
          title="لقطة الشاشه"
        >
          <i className="fas fa-camera  fa-lg"></i>
        </button>
      </div>
      <div className="container ">
        <div className="form-group ">
          <div id="screenshotDiv" className="hide">
            <img id="snappImage" className="js-screenshot-image" />
            <div>
              <input
                type="text"
                placeholder="أدخل إسم الصورة - أختيارى "
                id="textInput"
                className="form-control ScreenShotButton"
                ref={inputElement}
              />
            </div>
            <button
              id="downloadBtn"
              className="action-button"
              aria-label="Download image"
              title="تحميل الصورة"
              className="btn btn-primary btn-sm mr-1"
            >
              تحميل الصورة
            </button>
            <button
              id="closeBtn"
              className="action-button"
              aria-label="Back to webscene"
              title="الرجوع للخريطة"
              className="btn btn-warning btn-sm"
            >
              الرجوع للخريطة
            </button>
          </div>
        </div>
      </div>

      <div id="maskDiv" className="hide screenshotCursor"></div>
    </div>
  );
}

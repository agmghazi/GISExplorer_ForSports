import React from "react";
import dom from "dojo/dom";
import domClass from "dojo/dom-class";
import dojoQuery from "dojo/query";
import on from "dojo/on";
import Extent from "esri/geometry/Extent";
import domConstruct from "dojo/dom-construct";
import domGeom from "dojo/dom-geometry";
import keys from "dojo/keys";
import JSON from "dojo/json";
import lang from "dojo/_base/lang";
import Expand from "esri/widgets/Expand";

export default function FeaturesService() {
  var extents = [];
  var sExt;
  React.useEffect(() => {
    // Bookmark data objects
    var bookmarkJSON = {
      // first: {
      //   extent: {
      //     xmin: -12975151.579395358,
      //     ymin: 3993919.9969406975,
      //     xmax: -12964144.647322308,
      //     ymax: 4019507.292159126,
      //     spatialReference: {
      //       wkid: 102100,
      //       latestWkid: 3857,
      //     },
      //   },
      //   name: "Palm Springs, CA",
      // },
      // second: {
      //   extent: {
      //     xmin: -13052123.666878553,
      //     ymin: 4024962.9850527253,
      //     xmax: -13041116.734805504,
      //     ymax: 4050550.280271154,
      //     spatialReference: {
      //       wkid: 102100,
      //       latestWkid: 3857,
      //     },
      //   },
      //   name: "Redlands, California",
      // },
      // third: {
      //   extent: {
      //     xmin: -13048836.874662295,
      //     ymin: 3844839.127898948,
      //     xmax: -13037829.942589246,
      //     ymax: 3870426.4231173764,
      //     spatialReference: {
      //       wkid: 102100,
      //       latestWkid: 3857,
      //     },
      //   },
      //   name: "San Diego, CA",
      // },
    };

    function initBookmarksWidget() {
      var bmDiv = dom.byId("bookmarksDiv");
      domClass.add(bmDiv, "bookmark-container");
      var bookmarksdiv = domConstruct.create(
        "div",
        {
          class: "esriBookmarks",
        },
        bmDiv
      );
      var bmlistdiv = domConstruct.create(
        "div",
        {
          class: "esriBookmarkList",
          style: {
            width: "250px",
          },
        },
        bookmarksdiv
      );
      var bmTable = domConstruct.create(
        "div",
        {
          class: "esriBookmarkTable",
        },
        bmlistdiv
      );
      var bmadditemdiv = domConstruct.create(
        "div",
        {
          class: "esriBookmarkItem esriAddBookmark",
        },
        bookmarksdiv
      );
      var addbmlabeldiv = domConstruct.create(
        "div",
        {
          class: "esriBookmarkLabel",
          innerHTML: "إضف نقطة مرجعية",
        },
        bmadditemdiv
      );
      on(bmadditemdiv, "click", bookmarkEvent);
      on(bmadditemdiv, "mouseover", addMouseOverClass);
      on(bmadditemdiv, "mouseout", removeMouseOverClass);

      //process the bookmarkJSON
      Object.keys(bookmarkJSON).forEach(function(bookmark) {
        var bmName =
          bookmarkJSON[bookmark].name || "Bookmark " + (index + 1).toString();
        var theExtent = Extent.fromJSON(bookmarkJSON[bookmark].extent);
        var bmTable = dojoQuery(".esriBookmarkTable")[0];
        var item = domConstruct.toDom(
          '<div class="esriBookmarkItem" data-fromuser="false" data-extent="' +
            theExtent.xmin +
            "," +
            theExtent.ymin +
            "," +
            theExtent.xmax +
            "," +
            theExtent.ymax +
            "," +
            theExtent.spatialReference.wkid +
            '"><div class="esriBookmarkLabel">' +
            bmName +
            '</div><div title="Remove" class="esriBookmarkRemoveImage"></div><div title="Edit" class="esriBookmarkEditImage"></div></div>'
        );
        domConstruct.place(item, bmTable, "last");
        on(
          dojoQuery(".esriBookmarkRemoveImage", item)[0],
          "click",
          removeBookmark
        );
        on(dojoQuery(".esriBookmarkEditImage", item)[0], "click", editBookmark);
        on(item, "click", bookmarkEvent);
        on(item, "mouseover", addMouseOverClass);
        on(item, "mouseout", removeMouseOverClass);
        bookmarkJSON[bookmark];
      });

      //process the local storage bookmarks
      readBookmarks();
    }

    initBookmarksWidget();

    function addMouseOverClass(evt) {
      evt.stopPropagation();
      domClass.add(evt.currentTarget, "esriBookmarkHighlight");
    }

    function removeMouseOverClass(evt) {
      evt.stopPropagation();
      domClass.remove(evt.currentTarget, "esriBookmarkHighlight");
    }

    function removeBookmark(evt) {
      evt.stopPropagation();
      var bmItem = evt.target.parentNode;

      var bmEditItem = dojoQuery(".esriBookmarkEditBox")[0];
      if (bmEditItem) {
        domConstruct.destroy(bmEditItem);
      }
      domConstruct.destroy(bmItem);

      setTimeout(writeCurrentBookmarks, 200);
    }

    function writeCurrentBookmarks() {
      extents = [];
      var bmTable = dojoQuery(".esriBookmarkTable")[0];
      var bookMarkItems = dojoQuery(".esriBookmarkItem", bmTable);
      bookMarkItems.forEach(function(item) {
        if (item.dataset.fromuser) {
          var extArr = item.dataset.extent.split(",");
          var theExt = new Extent({
            xmin: extArr[0],
            ymin: extArr[1],
            xmax: extArr[2],
            ymax: extArr[3],
            spatialReference: {
              wkid: parseInt(extArr[4]),
            },
          });
          sExt = {
            extent: theExt,
            name: dojoQuery(".esriBookmarkLabel", item)[0].innerHTML,
          };
          extents.push(sExt);
        }
      });
      var stringifedExtents = JSON.stringify(extents);
      localStorage.setItem("myBookmarks", stringifedExtents);
    }

    function editBookmark(evt) {
      evt.stopPropagation();
      var bmItem = evt.target.parentNode;
      var bmItemName = dojoQuery(".esriBookmarkLabel", bmItem)[0].innerHTML;
      var output = domGeom.position(bmItem, true);
      var editItem = domConstruct.toDom(
        '<input class="esriBookmarkEditBox" style="top: ' +
          (output.y + 1) +
          "px; left: " +
          output.x +
          'px;">'
      );
      editItem.value = bmItemName;
      var bmTable = dojoQuery(".esriBookmarkTable")[0];
      domConstruct.place(editItem, bmTable);
      on(editItem, "keypress", function(evt) {
        var charOrCode = evt.charCode || evt.keyCode;
        if (charOrCode === keys.ENTER) {
          dojoQuery(".esriBookmarkLabel", bmItem)[0].innerHTML = editItem.value;
          domConstruct.destroy(editItem);
          writeCurrentBookmarks();
        }
      });
      editItem.focus();
    }

    function bookmarkEvent(evt) {
      if (domClass.contains(evt.target, "esriAddBookmark")) {
        var bmTable = dojoQuery(".esriBookmarkTable")[0];
        var item = domConstruct.toDom(
          '<div class="esriBookmarkItem" data-fromuser="true" data-extent="' +
            window._view.extent.xmin +
            "," +
            window._view.extent.ymin +
            "," +
            window._view.extent.xmax +
            "," +
            window._view.extent.ymax +
            "," +
            window._view.extent.spatialReference.wkid +
            '"><div class="esriBookmarkLabel">New Bookmark</div><div title="Remove" class="esriBookmarkRemoveImage"></div><div title="Edit" class="esriBookmarkEditImage"></div></div>'
        );

        domConstruct.place(item, bmTable, "last");
        var output = domGeom.position(item, true);
        var editItem = domConstruct.toDom(
          '<input class="esriBookmarkEditBox" style="top: ' +
            (output.y + 1) +
            "px; left: " +
            output.x +
            'px;">'
        );
        domConstruct.place(editItem, bmTable);
        on(editItem, "keypress", function(evt) {
          var charOrCode = evt.charCode || evt.keyCode;
          if (charOrCode === keys.ENTER) {
            dojoQuery(".esriBookmarkLabel", item)[0].innerHTML = editItem.value;
            domConstruct.destroy(editItem);
            sExt = {
              name: editItem.value,
              extent: window._view.extent,
            };
            extents.push(sExt);
            var stringifedExtents = JSON.stringify(extents);
            localStorage.setItem("myBookmarks", stringifedExtents);
          }
        });
        on(
          dojoQuery(".esriBookmarkRemoveImage", item)[0],
          "click",
          removeBookmark
        );
        on(dojoQuery(".esriBookmarkEditImage", item)[0], "click", editBookmark);
        on(item, "click", bookmarkEvent);
        on(item, "mouseover", addMouseOverClass);
        on(item, "mouseout", removeMouseOverClass);
        editItem.focus();
        return;
      }

      var extArr = evt.target.dataset.extent.split(",");
      window._view.goTo(
        new Extent({
          xmin: extArr[0],
          ymin: extArr[1],
          xmax: extArr[2],
          ymax: extArr[3],
          spatialReference: {
            wkid: parseInt(extArr[4]),
          },
        }),
        {
          duration: 2000,
        }
      );
    }

    function readBookmarks() {
      try {
        if (!localStorage.getItem("myBookmarks")) {
          return;
        }
        var extentArray = JSON.parse(localStorage.getItem("myBookmarks"));
        if (!extentArray) {
          return;
        }
        extentArray.map(function(extentJSON, index) {
          var bmName = extentJSON.name || "Bookmark " + (index + 1).toString();
          var theExtent = Extent.fromJSON(extentJSON.extent);
          extents.push(extentJSON);
          var bmTable = dojoQuery(".esriBookmarkTable")[0];
          var item = domConstruct.toDom(
            '<div class="esriBookmarkItem" data-fromuser="true" data-extent="' +
              theExtent.xmin +
              "," +
              theExtent.ymin +
              "," +
              theExtent.xmax +
              "," +
              theExtent.ymax +
              "," +
              theExtent.spatialReference.wkid +
              '"><div class="esriBookmarkLabel">' +
              bmName +
              '</div><div title="Remove" class="esriBookmarkRemoveImage"></div><div title="Edit" class="esriBookmarkEditImage"></div></div>'
          );
          domConstruct.place(item, bmTable, "last");
          on(
            dojoQuery(".esriBookmarkRemoveImage", item)[0],
            "click",
            removeBookmark
          );
          on(
            dojoQuery(".esriBookmarkEditImage", item)[0],
            "click",
            editBookmark
          );
          on(item, "click", bookmarkEvent);
          on(item, "mouseover", addMouseOverClass);
          on(item, "mouseout", removeMouseOverClass);
        });
      } catch (e) {
        console.warn("Could not parse bookmark JSON", e.message);
      }
    }
    var $j = jQuery.noConflict();
    // https://www.tutorialspoint.com/jqueryui/jqueryui_dialog.htm
    // https://jqueryui.com/position/
    $(function() {
      $("#bookmarksDiv")
        .dialog({
          // dialogClass: "alert",
          // maxWidth: 4000,
          // maxHeight: 600,
          // title: "Success",
          position: {
            my: "left center",
            at: "left center",
            of: $("#screenshotBtn"),
            collision: "flit none",
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
          // width: 280,
          // height: 250,
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
      $("#bookmarksBtn").on("click", function() {
        $("#bookmarksDiv").dialog("open");
      });
    });
  });
  // for more
  // https://icons8.com/icons/set/zoom
  return (
    <div>
      <div id="bookmarksDiv"></div>
      <input
        id="bookmarksBtn"
        type="image"
        src="https://img.icons8.com/wired/40/000000/bookmark-ribbon.png"
      />
    </div>
  );
}

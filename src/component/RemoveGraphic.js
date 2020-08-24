import React from "react";
export default function RemoveGraphic() {
  React.useEffect(() => {
    document
      .querySelector("#romoveGraphics")
      .addEventListener("click", function() {
        window._view.graphics.removeAll();
      });
  });
  return (
    <div>
      <input
        id="romoveGraphics"
        type="image"
        src="https://img.icons8.com/material-sharp/30/000000/filled-trash.png"
      />
    </div>
  );
}

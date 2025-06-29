export class CommonFunctions {
  constructor() {}
  toggleCursor() {
    if (
      $("#draw-point span.esri-icon").hasClass("esri-icon-cursor-filled") ||
      $("#btnIdentify").hasClass("selected")
    ) {
      document.getElementById("viewDiv").style.cursor = "pointer";
    } else {
      document.getElementById("viewDiv").style.cursor = "auto";
    }
  }
}

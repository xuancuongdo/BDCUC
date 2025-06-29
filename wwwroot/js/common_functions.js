define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CommonFunctions = void 0;
    class CommonFunctions {
        constructor() { }
        toggleCursor() {
            if ($("#draw-point span.esri-icon").hasClass("esri-icon-cursor-filled") ||
                $("#btnIdentify").hasClass("selected")) {
                document.getElementById("viewDiv").style.cursor = "pointer";
            }
            else {
                document.getElementById("viewDiv").style.cursor = "auto";
            }
        }
    }
    exports.CommonFunctions = CommonFunctions;
});
//# sourceMappingURL=common_functions.js.map
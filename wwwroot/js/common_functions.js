define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CommonFunctions = void 0;
    exports.dateToSession = dateToSession;
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
    function dateToSession(dateStr) {
        const date = new Date(dateStr);
        const year = date.getFullYear().toString().slice(-2);
        const startOfYear = new Date(date.getFullYear(), 0, 0);
        const diff = date.getTime() - startOfYear.getTime();
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);
        const dayOfYearStr = dayOfYear.toString().padStart(3, '0');
        return `${year}${dayOfYearStr}0`;
    }
});
//# sourceMappingURL=common_functions.js.map
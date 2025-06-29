define(["require", "exports", "tslib", "./map_variables", "./init_variables", "esri/widgets/Print"], function (require, exports, tslib_1, map_variables_1, init, Print_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    init = tslib_1.__importStar(init);
    Print_1 = tslib_1.__importDefault(Print_1);
    var toggle = false;
    var print = new Print_1.default({
        view: map_variables_1.view,
        printServiceUrl: init.print_url
    });
    map_variables_1.view.ui.add("btnPrint", "top-left");
    $("#btnPrint").click(function () {
        if (!toggle) {
            map_variables_1.view.ui.add(print, "bottom-right");
        }
        else {
            map_variables_1.view.ui.remove(print);
        }
        toggle = !toggle;
    });
});
//# sourceMappingURL=print.js.map
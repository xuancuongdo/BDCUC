define(["require", "exports", "tslib", "./map_variables", "./map_variables", "esri/widgets/Legend"], function (require, exports, tslib_1, map_variables_1, map_variables_2, Legend_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Legend_1 = tslib_1.__importDefault(Legend_1);
    var legend_toggle = false;
    var legend = new Legend_1.default({
        view: map_variables_2.view,
        layerInfos: [
            {
                layer: map_variables_1.map_layer.getMapLayer(),
                title: "Chú giải",
                hideLayers: [],
            },
        ],
    });
    map_variables_2.view.ui.add("btnLegend", "top-left");
    $("#btnLegend").click(function () {
        if (!legend_toggle) {
            map_variables_2.view.ui.add(legend, "bottom-right");
        }
        else {
            map_variables_2.view.ui.remove(legend);
        }
        legend_toggle = !legend_toggle;
    });
});
//# sourceMappingURL=map_legend.js.map
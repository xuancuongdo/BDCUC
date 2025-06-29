define(["require", "exports", "tslib", "./map_variables", "./map_variables", "./map_variables", "esri/widgets/Home", "./features_search"], function (require, exports, tslib_1, map_variables_1, map_variables_2, map_variables_3, Home_1, features_search_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Home_1 = tslib_1.__importDefault(Home_1);
    map_variables_1.map.add(map_variables_2.map_layer.getMapLayer());
    const home = new Home_1.default({
        view: map_variables_3.view,
    });
    map_variables_3.view.ui.add(home, "top-left");
    map_variables_3.view.ui.add(features_search_1.searchWidget, {
        position: "top-right"
    });
});
//# sourceMappingURL=main.js.map
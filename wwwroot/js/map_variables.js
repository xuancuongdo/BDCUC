define(["require", "exports", "tslib", "./tile_layer", "esri/Map", "esri/views/MapView", "./init_variables", "./map_layer", "esri/widgets/BasemapToggle", "esri/layers/WMSLayer", "esri/Basemap"], function (require, exports, tslib_1, tile_layer_1, Map_1, MapView_1, init, map_layer_1, BasemapToggle_1, WMSLayer_1, Basemap_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.basemapToggle = exports.view = exports.map = exports.map_layer_Background = exports.basemap = exports.layer = exports.till_layer = exports.map_layer = void 0;
    Map_1 = tslib_1.__importDefault(Map_1);
    MapView_1 = tslib_1.__importDefault(MapView_1);
    init = tslib_1.__importStar(init);
    BasemapToggle_1 = tslib_1.__importDefault(BasemapToggle_1);
    WMSLayer_1 = tslib_1.__importDefault(WMSLayer_1);
    Basemap_1 = tslib_1.__importDefault(Basemap_1);
    exports.map_layer = new map_layer_1.MapLayer(init.hanhchinh_url);
    exports.till_layer = new tile_layer_1.TileMapLayer(init.hanhchinh_url);
    exports.layer = new WMSLayer_1.default({
        url: "http://ows.mapvn.vn:8080/wms?",
        sublayers: [
            {
                name: "bandodatyle"
            }
        ]
    });
    exports.basemap = new Basemap_1.default({
        baseLayers: [exports.layer],
        title: "basemap",
        id: "0",
        thumbnailUrl: "img/streetsVN.png"
    });
    exports.map_layer_Background = new map_layer_1.MapLayer("https://basemap.bandovn.vn/server/rest/services/bdgiaothong_v11/MapServer?f=jsapi");
    exports.map = new Map_1.default({
        basemap: "satellite"
    });
    exports.view = new MapView_1.default({
        map: exports.map,
        container: "viewDiv",
        center: [105, 15.5],
        zoom: 5,
    });
    exports.basemapToggle = new BasemapToggle_1.default({
        view: exports.view,
        nextBasemap: exports.basemap
    });
    exports.view.ui.add(exports.basemapToggle, {
        position: "bottom-left"
    });
    const imgScale = new Image();
    imgScale.src = "img/Scale.png";
    exports.view.ui.add(imgScale, {
        position: "bottom-right"
    });
});
//# sourceMappingURL=map_variables.js.map
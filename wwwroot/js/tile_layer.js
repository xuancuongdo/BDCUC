define(["require", "exports", "tslib", "esri/layers/TileLayer"], function (require, exports, tslib_1, TileLayer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TileMapLayer = void 0;
    TileLayer_1 = tslib_1.__importDefault(TileLayer_1);
    class TileMapLayer {
        constructor(url) {
            this.tileMap = new TileLayer_1.default({
                url: url
            });
        }
        getMapLayer() {
            return this.tileMap;
        }
    }
    exports.TileMapLayer = TileMapLayer;
});
//# sourceMappingURL=tile_layer.js.map
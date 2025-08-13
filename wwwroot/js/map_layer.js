define(["require", "exports", "tslib", "esri/layers/MapImageLayer", "./init_variables"], function (require, exports, tslib_1, MapImageLayer_1, init) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MapLayer = void 0;
    MapImageLayer_1 = tslib_1.__importDefault(MapImageLayer_1);
    init = tslib_1.__importStar(init);
    class MapLayer {
        constructor(url) {
            this.hanhChinhMap = new MapImageLayer_1.default({
                url: url,
            });
        }
        getMapLayer() {
            return this.hanhChinhMap;
        }
        getVisibleLayersIDAllType() {
            var lst = this.hanhChinhMap.allSublayers;
            var visible_sublayer = [];
            lst.items.map((x) => {
                if (x.visible && x.sublayers == null) {
                    visible_sublayer.push(x.id);
                }
            });
            return visible_sublayer;
        }
        getVisibleLayers() {
            var lst = this.hanhChinhMap.allSublayers;
            var visible_sublayer = [];
            lst.items.map((x) => {
                if (x.id <= init.map_frame_end) {
                    if (x.visible && x.sublayers == null) {
                        visible_sublayer.push(x.id);
                    }
                }
            });
            return visible_sublayer;
        }
        hideMapLayer(from, end) {
            for (var i = from; i <= end; i++) {
                var sublayer_invisible = this.hanhChinhMap.findSublayerById(i);
                if (sublayer_invisible.sublayers == null) {
                    sublayer_invisible.visible = false;
                }
            }
        }
        visibleSubLayer(id) {
            var sublayer = this.hanhChinhMap.findSublayerById(id);
            if (sublayer != null) {
                sublayer.visible = true;
            }
        }
        findSublayerById(id) {
            return this.hanhChinhMap.findSublayerById(id);
        }
    }
    exports.MapLayer = MapLayer;
});
//# sourceMappingURL=map_layer.js.map
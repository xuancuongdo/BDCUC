define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.altitude_pointSymbol = exports.coordinate_pointSymbol = exports.search_polygonSymbol = exports.polygonSymbol = void 0;
    exports.polygonSymbol = {
        type: "simple-fill",
        color: [0, 0, 0, 0],
        style: "solid",
        outline: {
            color: [252, 3, 3, 1],
            width: 2,
        },
    };
    exports.search_polygonSymbol = {
        type: "simple-fill",
        color: [0, 0, 0, 0],
        style: "solid",
        outline: {
            color: [3, 173, 252, 1],
            width: 2,
        },
    };
    exports.coordinate_pointSymbol = {
        type: "simple-marker",
        style: "triangle",
        color: [153, 102, 0],
        size: "8px",
        outline: {
            color: [255, 255, 0],
            width: 0
        }
    };
    exports.altitude_pointSymbol = {
        type: "simple-marker",
        style: "square",
        color: [153, 102, 0],
        size: "8px",
        outline: {
            color: [255, 255, 0],
            width: 0
        }
    };
});
//# sourceMappingURL=common_symbol.js.map
define(["require", "exports", "tslib", "esri/layers/FeatureLayer", "esri/widgets/Search", "./init_variables", "esri/widgets/Search/LayerSearchSource", "./common_symbol", "./map_variables"], function (require, exports, tslib_1, FeatureLayer_1, Search_1, init, LayerSearchSource, common_symbol_1, map_variables_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.searchWidget = void 0;
    FeatureLayer_1 = tslib_1.__importDefault(FeatureLayer_1);
    Search_1 = tslib_1.__importDefault(Search_1);
    init = tslib_1.__importStar(init);
    var TramCORS = setSource(0, "CHUYỂN DỊCH TRUNG BÌNH/NĂM", "<p><b>Tên trạm:</b> {Tên}</p><p><b>d.North(m/year):</b> {VNorth}</p><p><b>d.East(m/year):</b> {VEast}</p><p><b>d.Up(m/year):</b> {VUp}</p><p><b>Mặt phẳng(m/year):</b> {Vmp}</p><p><b>Khoảng thời gian:</b> {ThoiDiemThamChieu}</p>", ["Tên"], "Tên", ["Tên", "VNorth", "VEast", "VUp", "Vmp", "ThoiDiemThamChieu"]);
    var tinh = setSource(11, "HÀNH CHÍNH TỈNH", "<p><b>Tên tỉnh:</b> {Ten}</p>", ["Ten"], "Ten", ["Ten"]);
    exports.searchWidget = new Search_1.default({
        view: map_variables_1.view,
        allPlaceholder: "Tìm kiếm trạm CORS, tỉnh",
        includeDefaultSources: false,
        sources: [
            TramCORS,
            tinh
        ],
    });
    function setSource(id, title, content, searchFields, displayField, outFields) {
        var feature_layer = new FeatureLayer_1.default({
            url: init.map_feature + "/" + id.toString(),
            popupTemplate: {
                title: title,
                content: content,
                overwriteActions: true,
            },
        });
        var source = {
            layer: feature_layer,
            searchFields: searchFields,
            displayField: displayField,
            exactMatch: false,
            outFields: outFields,
            name: title,
            placeholder: title,
            resultSymbol: (id == 1) ? common_symbol_1.coordinate_pointSymbol : ((id == 2) ? common_symbol_1.altitude_pointSymbol : common_symbol_1.search_polygonSymbol)
        };
        var simple_source = new LayerSearchSource(source);
        return simple_source;
    }
});
//# sourceMappingURL=features_search.js.map
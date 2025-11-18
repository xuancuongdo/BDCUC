define(["require", "exports", "tslib", "esri/layers/FeatureLayer", "esri/widgets/Search", "./init_variables", "esri/widgets/Search/LayerSearchSource", "./common_symbol", "./map_variables"], function (require, exports, tslib_1, FeatureLayer_1, Search_1, init, LayerSearchSource, common_symbol_1, map_variables_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.searchWidget = void 0;
    FeatureLayer_1 = tslib_1.__importDefault(FeatureLayer_1);
    Search_1 = tslib_1.__importDefault(Search_1);
    init = tslib_1.__importStar(init);
    var ChuKy_month = setSource(2, "CHUYỂN DỊCH CHU KỲ 1 THÁNG", "<p><b>Tên trạm:</b> {Tên}</p><p><b>Hướng Bắc(m):</b> {VNorth}</p><p><b>Hướng Đông(m):</b> {VEast}</p><p><b>Hướng Đứng(m):</b> {VUp}</p><p><b>Hướng Ngang(m):</b> {Vmp}</p><p><b>Khoảng thời gian:</b> {ThoiDiemThamChieu}</p><p><b>Địa chỉ:</b> {DiaChi}</p>", ["Tên"], "Tên", ["Tên", "VNorth", "VEast", "VUp", "Vmp", "ThoiDiemThamChieu", "DiaChi"]);
    var ChuKy_year = setSource(4, "CHUYỂN DỊCH CHU KỲ 1 NĂM", "<p><b>Tên trạm:</b> {Tên}</p><p><b>Hướng Bắc(m):</b> {VNorth}</p><p><b>Hướng Đông(m):</b> {VEast}</p><p><b>Hướng Đứng(m):</b> {VUp}</p><p><b>Hướng Ngang(m):</b> {Vmp}</p><p><b>Khoảng thời gian:</b> {ThoiDiemThamChieu}</p><p><b>Địa chỉ:</b> {DiaChi}</p>", ["Tên"], "Tên", ["Tên", "VNorth", "VEast", "VUp", "Vmp", "ThoiDiemThamChieu", "DiaChi"]);
    var ChuKy_5year = setSource(6, "CHUYỂN DỊCH CHU KỲ 5 NĂM", "<p><b>Tên trạm:</b> {Tên}</p><p><b>Hướng Bắc(m):</b> {VNorth}</p><p><b>Hướng Đông(m):</b> {VEast}</p><p><b>Hướng Đứng(m):</b> {VUp}</p><p><b>Hướng Ngang(m):</b> {Vmp}</p><p><b>Khoảng thời gian:</b> {ThoiDiemThamChieu}</p><p><b>Địa chỉ:</b> {DiaChi}</p>", ["Tên"], "Tên", ["Tên", "VNorth", "VEast", "VUp", "Vmp", "ThoiDiemThamChieu", "DiaChi"]);
    var ChuKy_10year = setSource(8, "CHUYỂN DỊCH TỪ NGÀY 26/08/2019", "<p><b>Tên trạm:</b> {Tên}</p><p><b>Hướng Bắc(m):</b> {VNorth}</p><p><b>Hướng Đông(m):</b> {VEast}</p><p><b>Hướng Đứng(m):</b> {VUp}</p><p><b>Hướng Ngang(m):</b> {Vmp}</p><p><b>Khoảng thời gian:</b> {ThoiDiemThamChieu}</p><p><b>Địa chỉ:</b> {DiaChi}</p>", ["Tên"], "Tên", ["Tên", "VNorth", "VEast", "VUp", "Vmp", "ThoiDiemThamChieu", "DiaChi"]);
    var tinh = setSource(11, "HÀNH CHÍNH TỈNH", "<p><b>Tên tỉnh:</b> {Ten}</p>", ["Ten"], "Ten", ["Ten"]);
    exports.searchWidget = new Search_1.default({
        view: map_variables_1.view,
        allPlaceholder: "Tìm kiếm trạm định vị vệ tinh quốc gia, tỉnh",
        includeDefaultSources: false,
        sources: [
            ChuKy_month,
            ChuKy_year,
            ChuKy_5year,
            ChuKy_10year,
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
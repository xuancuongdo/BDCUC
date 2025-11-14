define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LayerOptions = exports.ErsiLayers = exports.map_base_end = exports.map_base_start = exports.map_frame_end = exports.map_frame_start = exports.layer_url = exports.map_feature = exports.print_url = exports.hanhchinh_url = void 0;
    exports.hanhchinh_url = "http://14.238.1.124:6080/arcgis/rest/services/VanToc/MapServer";
    exports.print_url = "http://14.238.1.124:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task";
    exports.map_feature = "http://14.238.1.124:6080/arcgis/rest/services/VanToc/MapServer";
    exports.layer_url = "http://14.238.1.124:6080/arcgis/rest/services/VanToc/MapServer/layers?f=pjson";
    exports.map_frame_start = 1;
    exports.map_frame_end = 24;
    exports.map_base_start = 26;
    exports.map_base_end = 30;
    var ErsiLayers;
    (function (ErsiLayers) {
        ErsiLayers[ErsiLayers["Matphang_NE_TB_2682019"] = 0] = "Matphang_NE_TB_2682019";
        ErsiLayers[ErsiLayers["DoCao_H_TB_2682019"] = 1] = "DoCao_H_TB_2682019";
        ErsiLayers[ErsiLayers["Matphang_NE_month"] = 2] = "Matphang_NE_month";
        ErsiLayers[ErsiLayers["DoCao_H_month"] = 3] = "DoCao_H_month";
        ErsiLayers[ErsiLayers["Matphang_NE_year"] = 4] = "Matphang_NE_year";
        ErsiLayers[ErsiLayers["DoCao_H_year"] = 5] = "DoCao_H_year";
        ErsiLayers[ErsiLayers["Matphang_NE_5years"] = 6] = "Matphang_NE_5years";
        ErsiLayers[ErsiLayers["DoCao_H_5years"] = 7] = "DoCao_H_5years";
        ErsiLayers[ErsiLayers["Matphang_NE_10years"] = 8] = "Matphang_NE_10years";
        ErsiLayers[ErsiLayers["DoCao_H_10years"] = 9] = "DoCao_H_10years";
        ErsiLayers[ErsiLayers["TenTramCORS"] = 10] = "TenTramCORS";
        ErsiLayers[ErsiLayers["HanhChinhTinh"] = 11] = "HanhChinhTinh";
    })(ErsiLayers = exports.ErsiLayers || (exports.ErsiLayers = {}));
    var LayerOptions;
    (function (LayerOptions) {
        LayerOptions["chu_ky_trung_binh_hang_nam"] = "chu_ky_trung_binh_hang_nam";
        LayerOptions["chu_ky_1_thang"] = "chu_ky_1_thang";
        LayerOptions["chu_ky_1_nam"] = "chu_ky_1_nam";
        LayerOptions["chu_ky_5_nam"] = "chu_ky_5_nam";
        LayerOptions["chu_ky_tu_260819"] = "chu_ky_tu_260819";
        LayerOptions["huong_ngang"] = "huong_ngang";
        LayerOptions["huong_thang_dung"] = "huong_thang_dung";
        LayerOptions["hien_thi_cors"] = "hien_thi_cors";
    })(LayerOptions = exports.LayerOptions || (exports.LayerOptions = {}));
});
//# sourceMappingURL=init_variables.js.map
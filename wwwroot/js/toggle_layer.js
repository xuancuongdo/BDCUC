define(["require", "exports", "tslib", "./map_variables", "./init_variables", "./table_vantoc"], function (require, exports, tslib_1, map_variables_1, init, table_vantoc_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.http = void 0;
    init = tslib_1.__importStar(init);
    table_vantoc_1 = tslib_1.__importStar(table_vantoc_1);
    var toggle_layer = false;
    $(document).on("change", ".layer-toggle", function () {
        var id = $(this).data("id");
        var sublayer = map_variables_1.map_layer.findSublayerById(parseInt(id));
        sublayer.visible = !sublayer.visible;
    });
    $(document).on("change", "#hien_thi_cors", function () {
        var sublayer = map_variables_1.map_layer.findSublayerById(init.ErsiLayers.TenTramCORS);
        sublayer.visible = !sublayer.visible;
    });
    $(document).on("change", ".esri-toggle-tree__radio", function () {
        const checkedIds = [];
        $(".esri-toggle-tree__radio").each(function () {
            if ($(this).is(":checked")) {
                checkedIds.push($(this).attr("id"));
            }
        });
        var visible_layer_id = 0;
        if (checkedIds.length === 2) {
            if (checkedIds.includes("huong_ngang") && checkedIds.includes("chu_ky_trung_binh_hang_nam")) {
                visible_layer_id = init.ErsiLayers.Matphang_NE_TB_2682019;
            }
            if (checkedIds.includes("huong_thang_dung") && checkedIds.includes("chu_ky_trung_binh_hang_nam")) {
                visible_layer_id = init.ErsiLayers.DoCao_H_TB_2682019;
            }
            if (checkedIds.includes("huong_ngang") && checkedIds.includes("chu_ky_1_thang")) {
                visible_layer_id = init.ErsiLayers.Matphang_NE_month;
            }
            if (checkedIds.includes("huong_thang_dung") && checkedIds.includes("chu_ky_1_thang")) {
                visible_layer_id = init.ErsiLayers.DoCao_H_month;
            }
            if (checkedIds.includes("huong_ngang") && checkedIds.includes("chu_ky_1_nam")) {
                visible_layer_id = init.ErsiLayers.Matphang_NE_year;
            }
            if (checkedIds.includes("huong_thang_dung") && checkedIds.includes("chu_ky_1_nam")) {
                visible_layer_id = init.ErsiLayers.DoCao_H_year;
            }
            if (checkedIds.includes("huong_ngang") && checkedIds.includes("chu_ky_5_nam")) {
                visible_layer_id = init.ErsiLayers.Matphang_NE_5years;
            }
            if (checkedIds.includes("huong_thang_dung") && checkedIds.includes("chu_ky_5_nam")) {
                visible_layer_id = init.ErsiLayers.DoCao_H_5years;
            }
            if (checkedIds.includes("huong_ngang") && checkedIds.includes("chu_ky_tu_260819")) {
                visible_layer_id = init.ErsiLayers.Matphang_NE_10years;
            }
            if (checkedIds.includes("huong_thang_dung") && checkedIds.includes("chu_ky_tu_260819")) {
                visible_layer_id = init.ErsiLayers.DoCao_H_10years;
            }
            var sublayer = map_variables_1.map_layer.findSublayerById(visible_layer_id);
            sublayer.visible = true;
            map_variables_1.map_layer.getVisibleLayers().forEach((sublayerId) => {
                if (sublayerId !== visible_layer_id && sublayerId !== init.ErsiLayers.TenTramCORS
                    && sublayerId !== init.ErsiLayers.HanhChinhTinh) {
                    var sublayer = map_variables_1.map_layer.findSublayerById(sublayerId);
                    sublayer.visible = false;
                }
            });
            table_vantoc_1.default(visible_layer_id);
        }
    });
    $(document).on("click", "#btn_download_modal", function () {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var selectedValue = $('#periodSelect').val();
            var visible_layer_id = 0;
            var fileName = "";
            switch (selectedValue) {
                case '1thang':
                    console.log("Bạn đã chọn 1 tháng");
                    visible_layer_id = init.ErsiLayers.Matphang_NE_month;
                    fileName = "1Thang";
                    break;
                case '1nam':
                    console.log("Bạn đã chọn 1 năm");
                    visible_layer_id = init.ErsiLayers.Matphang_NE_year;
                    fileName = "1Nam";
                    break;
                case '5nam':
                    console.log("Bạn đã chọn 5 năm");
                    visible_layer_id = init.ErsiLayers.Matphang_NE_5years;
                    fileName = "5Nam";
                    break;
                case 'tu26082019':
                    console.log("Bạn đã chọn từ ngày 26/08/2019");
                    visible_layer_id = init.ErsiLayers.Matphang_NE_10years;
                    fileName = "Tu26_08_2019";
                    break;
                default:
                    console.log("Vui lòng chọn một chu kỳ");
                    alert('Vui lòng chọn một chu kỳ');
                    break;
            }
            yield table_vantoc_1.addTableVanTocDownload(visible_layer_id);
            const KhoangThoiGian = document.getElementById("khoangThoiGianDownload").outerHTML;
            const table = document.getElementById("bangVanTocDownload").outerHTML;
            const blob = new Blob([KhoangThoiGian, table], { type: "application/vnd.ms-excel" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `BaoCaoChuyenDich_${fileName}.html`;
            a.click();
            URL.revokeObjectURL(url);
        });
    });
    function http(request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(request);
            const body = yield response.json();
            return body;
        });
    }
    exports.http = http;
    const fetch_layer_name = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield fetch(init.layer_url);
        const legends = yield fetch(init.hanhchinh_url + "/legend?f=pjson");
        const body = yield response.json();
        const body_legends = yield legends.json();
        var layer_legends = body_legends.layers;
        var ul_dom = document.createElement("ul");
        ul_dom.id = "toggle_layer_ul";
        ul_dom.className = "tree";
        document.getElementById("toggle-layer-content").appendChild(ul_dom);
        body.layers.forEach((layer) => {
            var li_layer = document.createElement("li");
            li_layer.id = "layer-" + layer.id;
            li_layer.className = "layer-item";
            if (layer.type === "Group Layer") {
                var li_layer_a = document.createElement("a");
                li_layer_a.innerHTML = layer.name;
                li_layer.appendChild(li_layer_a);
                var ul_inner = document.createElement("ul");
                ul_inner.id = "layer-" + layer.id + "-ul";
                li_layer.appendChild(ul_inner);
                if (layer.parentLayer != null) {
                    var layer_parent = "layer-" + layer.parentLayer.id + "-ul";
                    document.getElementById(layer_parent).appendChild(li_layer);
                }
                else {
                    ul_dom.appendChild(li_layer);
                }
            }
            else {
                var li_layer_input = document.createElement("INPUT");
                li_layer_input.setAttribute("type", "checkbox");
                if (layer.id <= init.map_frame_end) {
                    li_layer_input.className = "layer-toggle layer-main";
                    $("#data-layer").append(`<option value='${layer.id}'>${layer.name}</option>`);
                }
                else {
                    li_layer_input.className = "layer-toggle layer-base";
                    $("#data-intersect").append(`<option value='${layer.id}'>${layer.name}</option>`);
                }
                li_layer_input.setAttribute("data-id", layer.id);
                if (layer.defaultVisibility === true) {
                    li_layer_input.setAttribute("checked", "true");
                }
                var a_expand = document.createElement("a");
                a_expand.className = "toggle-tree";
                a_expand.setAttribute("data-toggle", "collapse");
                a_expand.setAttribute("aria-controls", "legend-" + layer.id);
                a_expand.setAttribute("aria-expanded", "false");
                a_expand.href = "#legend-" + layer.id;
                li_layer.appendChild(a_expand);
                li_layer.appendChild(li_layer_input);
                var li_layer_label = document.createElement("label");
                li_layer_label.innerHTML = layer.name;
                li_layer.appendChild(li_layer_label);
                var legends = getLegendImage(layer.id, layer_legends);
                if (legends.length > 0) {
                    var ul_legend = document.createElement("ul");
                    ul_legend.className = "collapse";
                    ul_legend.id = "legend-" + layer.id;
                    for (var i = 0; i < legends.length; i++) {
                        var li_legend = document.createElement("li");
                        var img_legend = document.createElement("img");
                        img_legend.src =
                            "data:" +
                                legends[i].contentType +
                                ";base64, " +
                                legends[i].imageData;
                        var label_legend = document.createElement("label");
                        label_legend.innerHTML = legends[i].label;
                        li_legend.appendChild(img_legend);
                        li_legend.appendChild(label_legend);
                        ul_legend.appendChild(li_legend);
                        li_layer.appendChild(ul_legend);
                    }
                }
                if (layer.parentLayer != null) {
                    var layer_parent = "layer-" + layer.parentLayer.id + "-ul";
                    document.getElementById(layer_parent).appendChild(li_layer);
                }
                else {
                    ul_dom.appendChild(li_layer);
                }
            }
        });
    });
    function getLegendImage(layerId, layer_legends) {
        for (var i = 0; i < layer_legends.length; i++) {
            var feature = layer_legends[i];
            if (feature.layerId == layerId) {
                return feature.legend;
            }
        }
    }
    table_vantoc_1.default(4);
    $(document).on('click', ".toggle-tree", function () {
        $(this).toggleClass("collapse-layer");
    });
});
//# sourceMappingURL=toggle_layer.js.map
define(["require", "exports", "tslib", "./map_variables", "./init_variables"], function (require, exports, tslib_1, map_variables_1, init) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.http = void 0;
    init = tslib_1.__importStar(init);
    var toggle_layer = false;
    $(document).on("change", ".layer-toggle", function () {
        var id = $(this).data("id");
        var sublayer = map_variables_1.map_layer.findSublayerById(parseInt(id));
        sublayer.visible = !sublayer.visible;
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
    fetch_layer_name();
    $(document).on('click', ".toggle-tree", function () {
        $(this).toggleClass("collapse-layer");
    });
});
//# sourceMappingURL=toggle_layer.js.map
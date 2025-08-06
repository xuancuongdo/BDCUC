define(["require", "exports", "tslib", "esri/layers/FeatureLayer", "./init_variables"], function (require, exports, tslib_1, FeatureLayer_1, init) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = addTableVanToc;
    FeatureLayer_1 = tslib_1.__importDefault(FeatureLayer_1);
    init = tslib_1.__importStar(init);
    function addTableVanToc(id_layerShow) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const myFeatureLayer = new FeatureLayer_1.default({
                url: init.map_feature + "/" + id_layerShow,
                title: "Bảng chuyển dịch"
            });
            var bangVanToc = document.createElement('table');
            bangVanToc.id = "bangVanToc";
            var KhoangThoiGian = document.createElement('div');
            KhoangThoiGian.id = "KhoangThoiGian";
            KhoangThoiGian.style.display = "flex";
            KhoangThoiGian.style.alignItems = "center";
            myFeatureLayer.queryFeatures(null).then(function (response) {
                if (response.features.length > 0) {
                    if (id_layerShow == 0 || id_layerShow == 1) {
                        bangVanToc.innerHTML = "<tr><td><b>STT</b></td><td><b>Tên trạm</b></td><td><b>d.North<br />m/year</b></td><td><b>d.East<br />m/year</b></td><td><b>d.Up<br />m/year</b></td><td><b>Mặt phẳng<br />m/year</b></td></tr>";
                    }
                    else
                        bangVanToc.innerHTML = "<tr><td><b>STT</b></td><td><b>Tên trạm</b></td><td><b>d.North<br />(m)</b></td><td><b>d.East<br />(m)</b></td><td><b>d.Up<br />(m)</b></td><td><b>Mặt phẳng<br />(m)</b></td></tr>";
                    response.features.map((feature) => {
                        bangVanToc.innerHTML += "<tr><td>" + feature.attributes.STT + "</td><td>" + feature.attributes.Tên
                            + "</td><td>" + feature.attributes.VNorth.toFixed(4) + "</td><td>" + feature.attributes.VEast.toFixed(4) + "</td><td>" + feature.attributes.VUp.toFixed(4)
                            + "</td><td>" + feature.attributes.Vmp.toFixed(4) + "</td></tr>";
                        if (KhoangThoiGian.innerHTML == "") {
                            KhoangThoiGian.innerHTML = "Khoảng thời gian: ";
                            KhoangThoiGian.innerHTML += feature.attributes.ThoiDiemThamChieu;
                        }
                    });
                }
                else {
                    bangVanToc.innerHTML = "Chi tiết dữ liệu trống";
                }
            });
            const tableCORS = document.getElementById("TableCORS");
            while (tableCORS.firstChild) {
                tableCORS.removeChild(tableCORS.firstChild);
            }
            tableCORS.appendChild(KhoangThoiGian);
            tableCORS.appendChild(bangVanToc);
        });
    }
    ;
});
//# sourceMappingURL=table_vantoc.js.map
define(["require", "exports", "tslib", "esri/layers/FeatureLayer", "./init_variables"], function (require, exports, tslib_1, FeatureLayer_1, init) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = addTableVanToc;
    exports.addTableVanTocDownload = addTableVanTocDownload;
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
                        bangVanToc.innerHTML = "<tr><td><b>STT</b></td><td><b>Tên trạm</b></td><td><b>Hướng Bắc<br />m/year</b></td><td><b>Hướng Đông<br />m/year</b></td><td><bHướng Đứng<br />m/year</b></td><td><b>Hướng Ngang<br />m/year</b></td></tr>";
                    }
                    else
                        bangVanToc.innerHTML = "<tr><td><b>STT</b></td><td><b>Tên trạm</b></td><td><b>Hướng Bắc<br />(m)</b></td><td><b>Hướng Đông<br />(m)</b></td><td><b>Hướng Đứng<br />(m)</b></td><td><b>Hướng Ngang<br />(m)</b></td></tr>";
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
                    bangVanToc.innerHTML = "Giá trị chuyển dịch trống";
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
    function addTableVanTocDownload(id_layerShow) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const myFeatureLayer = new FeatureLayer_1.default({
                url: init.map_feature + "/" + id_layerShow,
                title: "Bảng chuyển dịch"
            });
            var bangVanToc = document.createElement('table');
            bangVanToc.style.borderCollapse = 'collapse';
            bangVanToc.id = "bangVanTocDownload";
            bangVanToc.style.border = "1px solid black";
            var KhoangThoiGian = document.createElement('div');
            KhoangThoiGian.id = "khoangThoiGianDownload";
            KhoangThoiGian.style.display = "flex";
            KhoangThoiGian.style.alignItems = "center";
            const response = yield myFeatureLayer.queryFeatures(null);
            if (response.features.length > 0) {
                bangVanToc.innerHTML = `
        <tr style="border: 1px solid black;">
          <td style="border: 1px solid black;"><b>STT</b></td>
          <td style="border: 1px solid black;"><b>Tên trạm</b></td>
          <td style="border: 1px solid black;"><b>Kinh độ<br />(độ)</b></td>
          <td style="border: 1px solid black;"><b>Vỹ độ<br />(độ)</b></td>
          <td style="border: 1px solid black;"><b>Hướng Bắc<br />(m)</b></td>
          <td style="border: 1px solid black;"><b>Hướng Đông<br />(m)</b></td>
          <td style="border: 1px solid black;"><b>Hướng Đứng<br />(m)</b></td>
          <td style="border: 1px solid black;"><b>Hướng Ngang<br />(m)</b></td>
          <td style="border: 1px solid black;"><b>Loại trạm</b></td>
          <td style="border: 1px solid black;"><b>Vị trí cột<br />anten</b></td>
          <td style="border: 1px solid black;"><b>Địa chỉ</b></td>
        </tr>
      `;
                for (const feature of response.features) {
                    bangVanToc.innerHTML += `
          <tr style="border: 1px solid black;">
            <td style="border: 1px solid black;">${feature.attributes.STT}</td>
            <td style="border: 1px solid black;">${feature.attributes.Tên}</td>
            <td style="border: 1px solid black;">${feature.attributes.btong.toFixed(5)}</td>
            <td style="border: 1px solid black;">${feature.attributes.ltong.toFixed(5)}</td>
            <td style="border: 1px solid black;">${feature.attributes.VNorth.toFixed(4)}</td>
            <td style="border: 1px solid black;">${feature.attributes.VEast.toFixed(4)}</td>
            <td style="border: 1px solid black;">${feature.attributes.VUp.toFixed(4)}</td>
            <td style="border: 1px solid black;">${feature.attributes.Vmp.toFixed(4)}</td>
            <td style="border: 1px solid black;">${feature.attributes.LoaiTram}</td>
            <td style="border: 1px solid black;">${feature.attributes.ViTriCot}</td>
            <td style="border: 1px solid black;">${feature.attributes.DiaChi}</td>
          </tr>
        `;
                    if (KhoangThoiGian.innerHTML === "") {
                        KhoangThoiGian.innerHTML = `Khoảng thời gian: ${feature.attributes.ThoiDiemThamChieu}`;
                    }
                }
            }
            else {
                bangVanToc.innerHTML = "Giá trị chuyển dịch trống";
            }
            const tableCORS = document.getElementById("TableCORSDownload");
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
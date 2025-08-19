define(["require", "exports", "tslib", "./map_variables", "./init_variables", "esri/tasks/IdentifyTask", "esri/tasks/support/IdentifyParameters", "./common_functions", "./map_variables"], function (require, exports, tslib_1, map_variables_1, init, IdentifyTask_1, IdentifyParameters_1, common_functions_1, map_variables_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    init = tslib_1.__importStar(init);
    IdentifyTask_1 = tslib_1.__importDefault(IdentifyTask_1);
    IdentifyParameters_1 = tslib_1.__importDefault(IdentifyParameters_1);
    var is_Identify = false;
    var identifyTask, params;
    var common_functions = new common_functions_1.CommonFunctions();
    map_variables_1.view.ui.add("btnIdentify", "top-left");
    var diem = ["Điểm tọa độ", "Điểm độ cao"];
    var tyle = [
        "Tỷ lệ 1/25.000 địa hình",
        "Tỷ lệ 1/50.000 địa hình",
        "Tỷ lệ 1/100.000 địa hình",
        "Tỷ lệ 1/250.000 địa hình",
        "Tỷ lệ 1/500.000 địa hình",
        "Tỷ lệ 1/1.000.000 địa hình",
        "Tỷ lệ 1/25.000 dữ liệu địa lý",
        "Tỷ lệ 1/50.000 dữ liệu địa lý",
        "Tỷ lệ 1/100.000 dữ liệu địa lý",
        "Tỷ lệ 1/250.000 dữ liệu địa lý",
        "Tỷ lệ 1/500.000 dữ liệu địa lý",
        "Tỷ lệ 1/1.000.000 dữ liệu địa lý",
    ];
    var vantocTrungBinh = [
        "Mặt phẳng (N, E)_TB_26.8.2019",
        "Độ cao (H)_TB_26.8.2019",
    ];
    var vantoc = [
        "Mặt phẳng (N, E)_month",
        "Độ cao (H)_month",
        "Mặt phẳng (N, E)_year",
        "Độ cao (H)_year",
        "Mặt phẳng (N, E)_5years",
        "Độ cao (H)_5year",
        "Mặt phẳng (N, E)_10years",
        "Độ cao (H)_10year",
    ];
    var TenTram = [
        "Tên trạm CORS",
    ];
    $("#btnIdentify").click(function () {
        $(this).toggleClass("selected");
        is_Identify = !is_Identify;
        common_functions.toggleCursor();
    });
    map_variables_1.view.when(function () {
        map_variables_1.view.on("click", executeIdentifyTask);
        identifyTask = new IdentifyTask_1.default({ url: init.hanhchinh_url });
        params = new IdentifyParameters_1.default();
        params.tolerance = 3;
        params.layerOption = "all";
        params.width = map_variables_1.view.width;
        params.height = map_variables_1.view.height;
    });
    function executeIdentifyTask(event) {
        if (!is_Identify)
            return;
        params.layerIds = map_variables_2.map_layer.getVisibleLayers();
        params.geometry = event.mapPoint;
        params.mapExtent = map_variables_1.view.extent;
        document.getElementById("viewDiv").style.cursor = "wait";
        identifyTask
            .execute(params)
            .then(function (response) {
            var results = response.results;
            return results
                .filter((result) => !TenTram.includes(result.layerName))
                .map(function (result) {
                var feature = result.feature;
                var layerName = result.layerName;
                feature.attributes.layerName = layerName;
                if (diem.includes(layerName)) {
                    feature.popupTemplate = {
                        title: layerName,
                        content: "<b>Số hiệu điểm:</b> {SOHIEUDIEM} " +
                            "<br><b>Năm hoàn thành:</b> {NAMHOANTHA} " +
                            "<br><b>Định dạng:</b> {DINHDANG} ",
                    };
                }
                else if (tyle.includes(layerName)) {
                    feature.popupTemplate = {
                        title: layerName,
                        content: "<b>Phiên hiệu mảnh:</b> {MASOUTM}" +
                            "<br><b>Khoảng cao đều:</b> {KHOANGCAODEU}" +
                            "<br><b>Năm sản xuất:</b> {NAMSX}" +
                            "<br><b>Định dạng:</b> {DINHDANG}",
                    };
                }
                else if (vantocTrungBinh.includes(layerName)) {
                    feature.popupTemplate = {
                        content: "<b>Tên trạm:</b> {Tên}<br>" +
                            "<br><b>d.North(m/year):</b> {VNorth}" +
                            "<br><b>d.East(m/year):</b> {VEast}" +
                            "<br><b>d.Up(m/year):</b> {VUp}" +
                            "<br><b>Mặt phẳng(m/year):</b> {Vmp}" +
                            "<br><b>Khoảng thời gian:</b> {ThoiDiemThamChieu}",
                    };
                }
                else if (vantoc.includes(layerName)) {
                    feature.popupTemplate = {
                        content: "<b>Tên trạm:</b> {Tên}" +
                            "<br><b>d.North(m):</b> {VNorth}" +
                            "<br><b>d.East(m):</b> {VEast}" +
                            "<br><b>d.Up(m):</b> {VUp}" +
                            "<br><b>Mặt phẳng(m):</b> {Vmp}" +
                            "<br><b>Khoảng thời gian:</b> {ThoiDiemThamChieu}",
                    };
                }
                else if (TenTram.includes(layerName)) {
                    feature.popupTemplate = {
                        content: "<b>Tên trạm:</b> {Tên}<br>",
                    };
                }
                return feature;
            });
        })
            .then(showPopup);
        function showPopup(response) {
            if (response.length > 0) {
                map_variables_1.view.popup.open({
                    features: response,
                    location: event.mapPoint,
                });
            }
            common_functions.toggleCursor();
        }
    }
});
//# sourceMappingURL=identify_task.js.map
define(["require", "exports", "tslib", "esri/layers/FeatureLayer", "./init_variables"], function (require, exports, tslib_1, FeatureLayer_1, init) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = getCORSLayers;
    exports.GetDataForStatistic = GetDataForStatistic;
    FeatureLayer_1 = tslib_1.__importDefault(FeatureLayer_1);
    init = tslib_1.__importStar(init);
    function getCORSLayers(id_layerShow) {
        const myFeatureLayer = new FeatureLayer_1.default({
            url: init.map_feature + "/" + id_layerShow,
            title: "Bảng chuyển dịch"
        });
        const categorySelect = document.getElementById("categorySelect");
        myFeatureLayer.queryFeatures(null).then(function (response) {
            if (response.features.length > 0) {
                response.features.map((feature) => {
                    const option = document.createElement("option");
                    option.value = feature.attributes.Tên;
                    option.textContent = `${feature.attributes.Tên} (${feature.attributes.btong},${feature.attributes.ltong})`;
                    categorySelect.appendChild(option);
                });
            }
        });
    }
    function GetDataForStatistic(cors_name, from_date, to_date) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const apiUrl = "/api/MovingChart";
            const params = new URLSearchParams({
                TenTramCORS: cors_name,
                StartDate: from_date,
                EndDate: to_date
            });
            try {
                const response = yield fetch(`${apiUrl}?${params.toString()}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = yield response.json();
                return data;
            }
            catch (error) {
                console.error("Error fetching data:", error);
            }
        });
    }
});
//# sourceMappingURL=statistic.js.map
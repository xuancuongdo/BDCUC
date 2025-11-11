define(["require", "exports", "tslib", "./map_variables", "./map_variables", "./map_variables", "esri/widgets/Home", "./features_search", "./statistic", "./common_functions", "chart.js"], function (require, exports, tslib_1, map_variables_1, map_variables_2, map_variables_3, Home_1, features_search_1, statistic_1, common_functions_1, chart_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Home_1 = tslib_1.__importDefault(Home_1);
    statistic_1 = tslib_1.__importStar(statistic_1);
    let myChartNorth = null;
    let myChartEast = null;
    let myChartAltitude = null;
    let myChartPosition = null;
    map_variables_1.map.add(map_variables_2.map_layer.getMapLayer());
    const home = new Home_1.default({
        view: map_variables_3.view,
    });
    map_variables_3.view.ui.add(home, "top-left");
    map_variables_3.view.ui.add(features_search_1.searchWidget, {
        position: "top-right"
    });
    let today = new Date();
    today.setDate(today.getDate() - 22);
    let formattedDate = today.toISOString().split('T')[0];
    $('#endDate').val(formattedDate);
    statistic_1.default(0);
    $(document).on("click", "#btn_drawing_chart", function () {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const startDateStr = document.getElementById('startDate').value;
            const endDateStr = document.getElementById('endDate').value;
            const cors_name = $('#categorySelect').val();
            if (!startDateStr || !endDateStr || !cors_name) {
                alert("Vui lòng chọn trạm định vị vệ tinh quốc gia, từ ngày và đến ngày!");
                return;
            }
            const startDate = new Date(startDateStr);
            const endDate = new Date(endDateStr);
            const minDate = new Date("2019-08-16");
            if (startDate < minDate) {
                alert("Ngày bắt đầu không được nhỏ hơn 16/08/2019!");
                return;
            }
            if (startDate > endDate) {
                alert("Ngày bắt đầu không được lớn hơn ngày kết thúc!");
                return;
            }
            var data = yield statistic_1.GetDataForStatistic(cors_name.toString(), common_functions_1.dateToSession(startDateStr), common_functions_1.dateToSession(endDateStr));
            const ctx_north = document.getElementById('chartAreaNorth');
            const ctx_east = document.getElementById('chartAreaEast');
            const ctx_altitude = document.getElementById('chartAreaAltitude');
            const ctx_position = document.getElementById('chartAreaPosition');
            if (myChartNorth) {
                myChartNorth.destroy();
            }
            if (myChartEast) {
                myChartEast.destroy();
            }
            if (myChartAltitude) {
                myChartAltitude.destroy();
            }
            if (myChartPosition) {
                myChartPosition.destroy();
            }
            const labels = data.map((item) => item.calcDate);
            const northValues = data.map((item) => item.north);
            const eastValues = data.map((item) => item.east);
            const altitudeValues = data.map((item) => item.altitude);
            const correctChartData = {
                datasets: [{
                        label: 'Vị trí trạm đo',
                        data: data.map((item) => {
                            return {
                                x: item.y_MP,
                                y: item.x_MP
                            };
                        }),
                        backgroundColor: 'rgba(255, 99, 132, 0.8)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
            };
            myChartNorth = new chart_js_1.Chart(ctx_north, {
                type: 'bar',
                data: {
                    labels,
                    datasets: [
                        {
                            label: 'Hướng Bắc (North)',
                            data: northValues,
                            backgroundColor: 'rgba(75, 192, 192, 0.5)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Ngày đo'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Độ lệch hướng Bắc'
                            },
                            beginAtZero: true
                        }
                    }
                }
            });
            myChartEast = new chart_js_1.Chart(ctx_east, {
                type: 'bar',
                data: {
                    labels,
                    datasets: [
                        {
                            label: 'Hướng Đông (East)',
                            data: eastValues,
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Ngày đo'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Độ lệch hướng Đông'
                            },
                            beginAtZero: true
                        }
                    }
                }
            });
            myChartAltitude = new chart_js_1.Chart(ctx_altitude, {
                type: 'bar',
                data: {
                    labels,
                    datasets: [
                        {
                            label: 'Hướng Đứng (Altitude)',
                            data: altitudeValues,
                            backgroundColor: 'rgba(54, 162, 235, 0.5)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Ngày đo'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Độ lệch hướng Đứng'
                            },
                            beginAtZero: true
                        }
                    }
                }
            });
            const datasettest = {
                datasets: [{
                        label: 'Scatter Dataset',
                        data: [{
                                x: -10,
                                y: 0
                            }, {
                                x: 0,
                                y: 10
                            }, {
                                x: 10,
                                y: 5
                            }, {
                                x: 0.5,
                                y: 5.5
                            }],
                        backgroundColor: 'rgb(255, 99, 132)'
                    }],
            };
            myChartPosition = new chart_js_1.Chart(ctx_position, {
                type: 'scatter',
                data: correctChartData,
                options: {
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Y'
                            },
                            type: 'linear',
                            position: 'bottom'
                        },
                        y: {
                            beginAtZero: false,
                            title: {
                                display: true,
                                text: 'X'
                            }
                        }
                    }
                }
            });
        });
    });
});
//# sourceMappingURL=main.js.map
import { view } from "./map_variables";
import * as init from "./init_variables";
import IdentifyTask from "esri/tasks/IdentifyTask";
import IdentifyParameters from "esri/tasks/support/IdentifyParameters";
import { CommonFunctions } from "./common_functions";
import { map_layer } from "./map_variables";

var is_Identify = false;
var identifyTask: any, params: any;
var common_functions = new CommonFunctions();
view.ui.add("btnIdentify", "top-left");

var diem = ["Điểm tọa độ", "Điểm độ cao"];//Biến cũ của dữ liệu cục BDQD

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
];//Biến cũ của dữ liệu cục BDQD

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

view.when(function () {
  // executeIdentifyTask() is called each time the view is clicked
  view.on("click", executeIdentifyTask);

  // Create identify task for the specified map service
  identifyTask = new IdentifyTask({ url: init.hanhchinh_url });

  // Set the parameters for the Identify
  params = new IdentifyParameters();
  params.tolerance = 3;
  
  params.layerOption = "all";
  params.width = view.width;
  params.height = view.height;
});

// Executes each time the view is clicked
function executeIdentifyTask(event: any) {
  //console.log(map_layer.getVisibleLayersIDAllType());
  if (!is_Identify) return;
  params.layerIds = map_layer.getVisibleLayers();
  // Set the geometry to the location of the view click
  params.geometry = event.mapPoint;
  params.mapExtent = view.extent;
  document.getElementById("viewDiv").style.cursor = "wait";

  // This function returns a promise that resolves to an array of features
  // A custom popupTemplate is set for each feature based on the layer it
  // originates from
  identifyTask
    .execute(params)
    .then(function (response: any) {
      var results = response.results;

      return results.map(function (result: any) {
        var feature = result.feature;
        var layerName = result.layerName;
        // console.log(feature.attributes);
        feature.attributes.layerName = layerName;
        if (diem.includes(layerName)) {//Biến cũ của dữ liệu cục BDQD 
          feature.popupTemplate = {
            // autocasts as new PopupTemplate()
            title: layerName,
            content:
              "<b>Số hiệu điểm:</b> {SOHIEUDIEM} " +
              "<br><b>Năm hoàn thành:</b> {NAMHOANTHA} " +
              "<br><b>Định dạng:</b> {DINHDANG} ",
          };
        } else if (tyle.includes(layerName)) {//Biến cũ của dữ liệu cục BDQD
          feature.popupTemplate = {
            // autocasts as new PopupTemplate()
            title: layerName,
            content:
              "<b>Phiên hiệu mảnh:</b> {MASOUTM}" +
              "<br><b>Khoảng cao đều:</b> {KHOANGCAODEU}" +
              "<br><b>Năm sản xuất:</b> {NAMSX}" +
              "<br><b>Định dạng:</b> {DINHDANG}",
          };
        } else if (vantocTrungBinh.includes(layerName)) {
          feature.popupTemplate = {
            // autocasts as new PopupTemplate()
            //title: layerName,
            content:
              "<b>Tên trạm:</b> {Tên}<br>" +
              "<br><b>d.North(m/year):</b> {VNorth}" +
              "<br><b>d.East(m/year):</b> {VEast}" +
              "<br><b>d.Up(m/year):</b> {VUp}" +
              "<br><b>Mặt phẳng(m/year):</b> {Vmp}" +
              "<br><b>Khoảng thời gian:</b> {ThoiDiemThamChieu}",
          };
        } else if (vantoc.includes(layerName)) {
          feature.popupTemplate = {
            // autocasts as new PopupTemplate()
            //title: layerName,
            content:
              "<b>Tên trạm:</b> {Tên}<br>" +
              "<br><b>d.North(m):</b> {VNorth}" +
              "<br><b>d.East(m):</b> {VEast}" +
              "<br><b>d.Up(m):</b> {VUp}" +
              "<br><b>Mặt phẳng(m):</b> {Vmp}" +
              "<br><b>Khoảng thời gian:</b> {ThoiDiemThamChieu}",
          };
        }
        else if (TenTram.includes(layerName)) {
          feature.popupTemplate = {
            // autocasts as new PopupTemplate()
            //title: layerName,
            content:
              "<b>Tên trạm:</b> {Tên}<br>",
          };
        }
        return feature;
      });
    })
    .then(showPopup); // Send the array of features to showPopup()

  // Shows the results of the Identify in a popup once the promise is resolved
  function showPopup(response: any) {
    if (response.length > 0) {
      view.popup.open({
        features: response,
        location: event.mapPoint,
      });
    }
    common_functions.toggleCursor();
  }
}


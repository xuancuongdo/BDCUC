import FeatureLayer from "esri/layers/FeatureLayer";
import Search from "esri/widgets/Search";
import * as init from "./init_variables";
//import * as map_init from "./map_variables";//Bỏ chuyển thành view biến khai bên map_variables
import LayerSearchSource = require("esri/widgets/Search/LayerSearchSource");
import { search_polygonSymbol, coordinate_pointSymbol, altitude_pointSymbol } from "./common_symbol";
import { view } from "./map_variables";

//Dữ liệu cũ của cục BDQĐ
/*var diem_toa_do = setSource(1, "Điểm tọa độ", "<p>Số hiệu điểm: {SOHIEUDIEM}</p><p>Tên điểm: {TENDIEM}</p><p>Năm: {NAMHOANTHA}</p>",
  ["SOHIEUDIEM"], "SOHIEUDIEM", ["SOHIEUDIEM", "TENDIEM","NAMHOANTHA"]);

var diem_do_cao = setSource(2, "Điểm độ cao", "<p>Số hiệu điểm: {SOHIEUDIEM}</p><p>Năm: {NAMHOANTHA}</p>",
  ["SOHIEUDIEM"], "SOHIEUDIEM", ["SOHIEUDIEM", "NAMHOANTHA"]);

var diahinh_25 = setSource(4, "Tỷ lệ 1/25.00 địa hình", "<p>Mã số UTM: {MASOUTM}</p><p>Tên mảnh: {TENMANH}</p><p>Năm: {NAMSX}</p>",
  ["MASOUTM"], "MASOUTM", ["MASOUTM", "TENMANH", "NAMSX"]);
var diahinh_50 = setSource(5, "Tỷ lệ 1/50.00 địa hình", "<p>Mã số UTM: {MASOUTM}</p><p>Tên mảnh: {TENMANH}</p><p>Năm: {NAMSX}</p>",
  ["MASOUTM"], "MASOUTM", ["MASOUTM", "TENMANH", "NAMSX"]);
var diahinh_100 = setSource(6, "Tỷ lệ 1/100.00 địa hình", "<p>Mã số UTM: {MASOUTM}</p><p>Tên mảnh: {TENMANH}</p><p>Năm: {NAMSX}</p>",
  ["MASOUTM"], "MASOUTM", ["MASOUTM", "TENMANH", "NAMSX"]);
var diahinh_250 = setSource(7, "Tỷ lệ 1/250.00 địa hình", "<p>Mã số UTM: {MASOUTM}</p><p>Tên mảnh: {TENMANH}</p><p>Năm: {NAMSX}</p>",
  ["MASOUTM"], "MASOUTM", ["MASOUTM", "TENMANH", "NAMSX"]);
var diahinh_500 = setSource(8, "Tỷ lệ 1/500.00 địa hình", "<p>Mã số UTM: {MASOUTM}</p><p>Tên mảnh: {TENMANH}</p><p>Năm: {NAMSX}</p>",
  ["MASOUTM"], "MASOUTM", ["MASOUTM", "TENMANH", "NAMSX"]);
var diahinh_1000 = setSource(9, "Tỷ lệ 1/1.000.000 địa hình", "<p>Mã số UTM: {MASOUTM}</p><p>Tên mảnh: {TENMANH}</p><p>Năm: {NAMSX}</p>",
  ["MASOUTM"], "MASOUTM", ["MASOUTM", "TENMANH", "NAMSX"]);

var dialy_25 = setSource(11, "Tỷ lệ 1/25.00 địa lý", "<p>Mã số UTM: {MASOUTM}</p><p>Tên mảnh: {TENMANH}</p><p>Năm: {NAMSX}</p>",
  ["MASOUTM"], "MASOUTM", ["MASOUTM", "TENMANH", "NAMSX"]);
var dialy_50 = setSource(12, "Tỷ lệ 1/50.00 địa lý", "<p>Mã số UTM: {MASOUTM}</p><p>Tên mảnh: {TENMANH}</p><p>Năm: {NAMSX}</p>",
  ["MASOUTM"], "MASOUTM", ["MASOUTM", "TENMANH", "NAMSX"]);
var dialy_100 = setSource(13, "Tỷ lệ 1/100.00 địa lý", "<p>Mã số UTM: {MASOUTM}</p><p>Tên mảnh: {TENMANH}</p><p>Năm: {NAMSX}</p>",
  ["MASOUTM"], "MASOUTM", ["MASOUTM", "TENMANH", "NAMSX"]);
var dialy_250 = setSource(14, "Tỷ lệ 1/250.00 địa lý", "<p>Mã số UTM: {MASOUTM}</p><p>Tên mảnh: {TENMANH}</p><p>Năm: {NAMSX}</p>",
  ["MASOUTM"], "MASOUTM", ["MASOUTM", "TENMANH", "NAMSX"]);
var dialy_500 = setSource(15, "Tỷ lệ 1/500.000 địa lý", "<p>Mã số UTM: {MASOUTM}</p><p>Tên mảnh: {TENMANH}</p><p>Năm: {NAMSX}</p>",
  ["MASOUTM"], "MASOUTM", ["MASOUTM", "TENMANH", "NAMSX"]);
var dialy_1000 = setSource(16, "Tỷ lệ 1/1.000.000 địa lý", "<p>Mã số UTM: {MASOUTM}</p><p>Tên mảnh: {TENMANH}</p><p>Năm: {NAMSX}</p>",
  ["MASOUTM"], "MASOUTM", ["MASOUTM", "TENMANH", "NAMSX"]);

var hang_khong = setSource(18, "Ảnh hàng không Việt Nam bay chụp", "<p>Số hiệu ảnh: {SHANH}</p><p>Năm: {NamBayChup}</p>",
  ["SHANH"], "SHANH", ["SHANH", "NamBayChup"]);
var hang_khong1 = setSource(19, "Ảnh hàng không 1", "<p>Số hiệu ảnh: {SHANH}</p><p>Năm: {NamBayChup}</p>",
  ["SHANH"], "SHANH", ["SHANH", "NamBayChup"]);
var hang_khong2 = setSource(20, "Ảnh hàng không 2", "<p>Số hiệu ảnh: {SHANH}</p><p>Năm: {NamBayChup}</p>",
  ["SHANH"], "SHANH", ["SHANH", "NamBayChup"]);

var ve_tinh = setSource(22, "Ảnh vệ tinh Việt Nam thu nhận", "<p>Số hiệu ảnh: {SHANH}</p><p>Năm: {NamBayChup}</p>",
  ["SHANH"], "SHANH", ["SHANH", "NamBayChup"]);
var ve_tinh1 = setSource(23, "Ảnh vệ tinh 1", "<p>Số hiệu ảnh: {SHANH}</p><p>Năm: {NamBayChup}</p>",
  ["SHANH"], "SHANH", ["SHANH", "NamBayChup"]);
var ve_tinh2 = setSource(24, "Ảnh vệ tinh 2", "<p>Số hiệu ảnh: {SHANH}</p><p>Năm: {NamBayChup}</p>",
  ["SHANH"], "SHANH", ["SHANH", "NamBayChup"]);

var quan_khu = setSource(27, "Quân khu", "<p>Tên quân khu: {Ten}</p>",
  ["Ten"], "Ten", ["Ten"]);
var xa = setSource(28, "Hành chính xã", "<p>Tên xã: {TenXa}</p><p>Tên huyện: {TenHuyen}</p><p>Tên tỉnh: {TenTinh}</p>",
  ["TenXa"], "TenXa", ["TenXa", "TenHuyen", "TenTinh"]);
var huyen = setSource(29, "Hành chính huyện", "<p>Tên huyện: {ten}</p>",
  ["ten"], "ten", ["ten"]);*/
var TramCORS = setSource(0, "CHUYỂN DỊCH TRUNG BÌNH/NĂM", "<p><b>Tên trạm:</b> {Tên}</p><p><b>d.North(m/year):</b> {VNorth}</p><p><b>d.East(m/year):</b> {VEast}</p><p><b>d.Up(m/year):</b> {VUp}</p><p><b>Mặt phẳng(m/year):</b> {Vmp}</p><p><b>Khoảng thời gian:</b> {ThoiDiemThamChieu}</p>", 
  ["Tên"], "Tên", ["Tên", "VNorth", "VEast", "VUp", "Vmp", "ThoiDiemThamChieu"]);
var tinh = setSource(11, "HÀNH CHÍNH TỈNH", "<p><b>Tên tỉnh:</b> {Ten}</p>", 
  ["Ten"], "Ten", ["Ten"]);



//export var searchWidget = new Search({
export const searchWidget = new Search({
  //view: map_init.view,//Bỏ chuyển thành view biến khai bên map_variables
  view: view,
  allPlaceholder: "Tìm kiếm trạm CORS, tỉnh",
  includeDefaultSources: false,
  sources: [
    /*diem_toa_do,
    diem_do_cao,
    diahinh_25,
    diahinh_50,
    diahinh_100,
    diahinh_250,
    diahinh_500,
    diahinh_1000,
    dialy_25,
    dialy_50,
    dialy_100,
    dialy_250,
    dialy_500,
    dialy_1000,
    hang_khong,
    hang_khong1,
    hang_khong2,
    ve_tinh,
    ve_tinh1,
    ve_tinh2,
    quan_khu,
    xa,
    huyen,*/
    TramCORS,
    tinh
  ],
});

//Bỏ khai báo bên main
/*map_init.view.ui.add(searchWidget, {
  position: "top-right"
});*/


function setSource(id: number, title: string, content: string, searchFields: string[], displayField: string, outFields: string[]): any {
  var feature_layer = new FeatureLayer({
    url: init.map_feature + "/" + id.toString(),
    popupTemplate: {
      // autocasts as new PopupTemplate()
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
    resultSymbol: (id == 1) ? coordinate_pointSymbol : ((id == 2) ? altitude_pointSymbol : search_polygonSymbol)
  };
  var simple_source = new LayerSearchSource(source);
  return simple_source;
}
//Biến nội dung bản đồ
export var hanhchinh_url =
  //"http://118.70.182.154:6080/arcgis/rest/services/NDBanDo/MapServer";
  //"http://14.238.1.124:6080/arcgis/rest/services/NDBanDo/MapServer";
  "http://14.238.1.124:6080/arcgis/rest/services/VanToc/MapServer";
//"https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer";
//"https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer";
//"https://basemap.bandovn.vn/server/rest/services/bandovn/MapServer";
//"https://basemap.bandovn.vn/server/rest/services/VietNam/MapServer/token?47pNXJHfjYT9WhZH-7MLdWG06v5Lrir__3JjBStPbmAbPUGy9B-9UemuJBeRVfPi-ntxyJD5p1idYrVSd20VVA";

export var print_url =
  "http://14.238.1.124:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task";
//"http://14.238.1.124:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task";

export var map_feature =
  //"http://118.70.182.154:6080/arcgis/rest/services/NDBanDo/FeatureServer";
  //"http://14.238.1.124:6080/arcgis/rest/services/NDBanDo/FeatureServer";
  "http://14.238.1.124:6080/arcgis/rest/services/VanToc/MapServer";
//Biến danh mục danh sách tên layer bên tay trái
export var layer_url =
  //"http://118.70.182.154:6080/arcgis/rest/services/NDBanDo/MapServer/layers?f=pjson";
  //"http://14.238.1.124:6080/arcgis/rest/services/NDBanDo/MapServer/layers?f=pjson";
  "http://14.238.1.124:6080/arcgis/rest/services/VanToc/MapServer/layers?f=pjson";
//"https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/layers?f=pjson";
//"https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/layers?f=pjson";
//"https://basemap.bandovn.vn/server/rest/services/bandovn/MapServer/layers?f=pjson";
//"https://basemap.bandovn.vn/server/rest/services/VietNam/MapServer/layers?f=pjson";
//  export var hanhchinh_url = "http://localhost:6080/arcgis/rest/services/HanhChinh/HanhChinhVN/MapServer";
//  export var layer_url = "http://localhost:6080/arcgis/rest/services/HanhChinh/HanhChinhVN/MapServer/layers?f=pjson"

export var map_frame_start = 1;
export var map_frame_end = 24;

export var map_base_start = 26;
export var map_base_end = 30;

//export var AnhVeTinhEsri_url =
//"https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer";
//"https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer";
//"https://basemap.bandovn.vn/server/rest/services/bandovn/MapServer";

//export var AnhVeTinhEsri_layer_url =
//"https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/layers?f=pjson";
//"https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/layers?f=pjson";
//"https://basemap.bandovn.vn/server/rest/services/bandovn/MapServer/layers?f=pjson";

export enum ErsiLayers {
  Matphang_NE_TB_2682019 = 0,
  DoCao_H_TB_2682019 = 1,
  Matphang_NE_month = 2,
  DoCao_H_month = 3,
  Matphang_NE_year = 4,
  DoCao_H_year = 5,
  Matphang_NE_5years = 6,
  DoCao_H_5years = 7,
  Matphang_NE_10years = 8,
  DoCao_H_10years = 9,
  TenTramCORS = 10,
  HanhChinhTinh = 11
}

export enum LayerOptions {
  chu_ky_trung_binh_hang_nam = "chu_ky_trung_binh_hang_nam",
  chu_ky_1_thang = "chu_ky_1_thang",
  chu_ky_1_nam = "chu_ky_1_nam",
  chu_ky_5_nam = "chu_ky_5_nam",
  chu_ky_tu_260819 = "chu_ky_tu_260819",
  huong_ngang = "huong_ngang",  
  huong_thang_dung = "huong_thang_dung",
  hien_thi_cors = "hien_thi_cors",
}
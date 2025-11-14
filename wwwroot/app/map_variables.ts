import { TileMapLayer } from './tile_layer';
import MapImageLayer from "esri/layers/MapImageLayer";
import EsriMap from "esri/Map";
import MapView from "esri/views/MapView";
import * as init from "./init_variables";
import { MapLayer } from './map_layer';
import BasemapToggle from "esri/widgets/BasemapToggle";
import WMSLayer from "esri/layers/WMSLayer";//Thêm để đọc layer wms
import Basemap from "esri/Basemap";
import TileLayer from 'esri/layers/TileLayer';
import WebTileLayer from 'esri/layers/WebTileLayer';
//import SceneView from "esri/views/SceneView";

//var hanhChinhMap:any;
export var map_layer = new MapLayer(init.hanhchinh_url);
export var till_layer = new TileMapLayer(init.hanhchinh_url);
//export var map_layer1 = new MapLayer(init.AnhVeTinhEsri_url);


//Thêm để đọc layer wms
//require(["esri/Map", "esri/views/SceneView", "esri/layers/WMSLayer"], (Map, SceneView, WMSLayer) => {
  //const layer = new WMSLayer({
    export var layer = new WMSLayer({
    //url: "https://ows.terrestris.de/osm/service",
    url: "http://ows.mapvn.vn:8080/wms?",
    sublayers: [
      {
        name: "bandodatyle"
      }
    ]
  });

  const vnTileLayer = new WebTileLayer({
    //urlTemplate: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    //Cập nhật mã token mới thì dán ở phía cuối token=..
    urlTemplate: "https://vnsdi.mae.gov.vn/basemap/rest/services/BanDoHanhChinhVietNam/MapServer/tile/{z}/{y}/{x}?token=bLqFps_rUstfn-QY_SuFYo5X-zyh_DaftKd1hyul2DMLrlmBlOHg31ad5Tx30y-MFucYW7N2ck38KHnA4XD1kKvAGadfimd2n8Ql_aPCGrc.",
    copyright: "© DOSMVN" //"© OpenStreetMap contributors"
  });
  export var basemap = new Basemap({
    baseLayers: [vnTileLayer],
    title: "basemap",
    id: "0",
    thumbnailUrl:"img/streetsVN.png"//"https://js.arcgis.com/3.16/esri/images/basemap/streets.jpg"//Hiển thị ảnh nhỏ ở phần chuyển đổi bản đồ nền
  });

//Tạo nền background bản đồ giao thông bên tư liệu
export var map_layer_Background = new MapLayer("https://basemap.bandovn.vn/server/rest/services/bdgiaothong_v11/MapServer?f=jsapi");

export const map = new EsriMap({
  //basemap: "streets-vector"
  basemap: basemap
  //basemap: "hybrid"
  //basemap : {baseLayers: [layer]}
  //basemap : {baseLayers: [map_layer_Background.getMapLayer()]}
  //basemap: basemap
});

export const view = new MapView({
  map: map,
  container: "viewDiv",
  center: [105, 15.5],
  zoom: 5,
});

export const basemapToggle = new BasemapToggle({
  view: view,  // The view that provides access to the map's "streets-vector" basemap
  //nextBasemap: "satellite"  // Allows for toggling to the "hybrid" basemap
  nextBasemap: "satellite"//{baseLayers: [layer]}//"streets-vector"  // Allows for toggling to the "hybrid" basemap
  //nextBasemap: "satellite",
});

//Add chuyển đổi nền Background
view.ui.add(basemapToggle, {
  position: "bottom-left"
  //position: "top-right"
});

//Thêm ảnh thể hiện tỷ lệ mũi tên bên phải phía dưới
const imgScale = new Image();
imgScale.src="img/Scale.png";
view.ui.add(imgScale, {
  position: "bottom-right"
  //position: "top-right"
});



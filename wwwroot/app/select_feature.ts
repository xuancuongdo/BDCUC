import { view } from "./map_variables";
import * as init from "./init_variables";
import { map_layer } from "./map_variables";
import QueryTask from "esri/tasks/QueryTask";
import Query from "esri/tasks/support/Query";
import Graphic from "esri/Graphic";
import Extent from "esri/geometry/Extent";
import Draw from "esri/views/draw/Draw";
import Polygon from "esri/geometry/Polygon";
import IdentifyTask from "esri/tasks/IdentifyTask";
import IdentifyParameters from "esri/tasks/support/IdentifyParameters";
import * as map_symbol from "./common_symbol";
import { CommonFunctions } from "./common_functions";

var layer_data = 4;
var layer_intersect = -1;
var isSelection = false;

var features: any[] = [];
var isMultipleSelection = false;
const draw = new Draw({
  view: view,
});
var common_functions = new CommonFunctions();
var identifyTask = new IdentifyTask({ url: init.hanhchinh_url });
var params = new IdentifyParameters();
var query = new Query();
query.where = queryClause();
query.returnGeometry = true;
query.outFields = ["*"];

document.getElementById("delete-graphic").onclick = function () {
  clearData();
};

document.getElementById("draw-point").onclick = function () {
  //layer_data = getCurrentLayer();
  isSelection = !isSelection;
  $("#draw-point .esri-icon").toggleClass("esri-icon-cursor-filled");
  //$("#viewDiv").toggleClass("cursor-pointer");
  common_functions.toggleCursor();
};

document.getElementById("draw-rectangle").onclick = function () {
  clearData();
  layer_data = getCurrentLayer();
  const action = draw.create("rectangle");

  // focus the view to activate keyboard shortcuts for sketching
  view.focus();

  // listen polylineDrawAction events to give immediate visual feedback
  // to users as the line is being drawn on the view.
  action.on(
    ["vertex-add", "vertex-remove", "cursor-update", "redo", "undo"],
    updateVertices
  );

  action.on(["draw-complete"], queryByVertical);
};

document.getElementById("draw-polygon").onclick = function () {
  layer_data = getCurrentLayer();
  clearData();
  var action = draw.create("polygon");

  // PolygonDrawAction.vertex-add
  // Fires when user clicks, or presses the "F" key.
  // Can also be triggered when the "R" key is pressed to redo.
  action.on("vertex-add", function (evt) {
    createPolygonGraphic(evt.vertices);
  });

  // PolygonDrawAction.vertex-remove
  // Fires when the "Z" key is pressed to undo the last added vertex
  action.on("vertex-remove", function (evt) {
    createPolygonGraphic(evt.vertices);
  });

  // Fires when the pointer moves over the view
  action.on("cursor-update", function (evt) {
    createPolygonGraphic(evt.vertices);
  });

  // Add a graphic representing the completed polygon
  // when user double-clicks on the view or presses the "C" key
  action.on("draw-complete", function (evt) {
    drawPolygonComplete(evt.vertices);
  });
};

function createPolygonGraphic(vertices: any) {
  view.graphics.removeAll();
  var polygon = {
    type: "polygon", // autocasts as Polygon
    rings: vertices,
    spatialReference: view.spatialReference,
  };

  var graphic = new Graphic({
    geometry: polygon,
    symbol: map_symbol.polygonSymbol,
  });
  view.graphics.add(graphic);
}

function drawPolygonComplete(vertices: any) {
  view.graphics.removeAll();
  var polygon = {
    type: "polygon", // autocasts as Polygon
    rings: vertices,
    spatialReference: view.spatialReference,
  };
  executeQuery(polygon);
}

function updateVertices(vertex: any) {
  /// console.log(vertex);
  if (vertex.vertices.length > 1) {
    view.graphics.removeAll();
    const ring1 = [
      // first ring
      [vertex.vertices[0][0], vertex.vertices[0][1]],
      [vertex.vertices[1][0], vertex.vertices[0][1]],
      [vertex.vertices[1][0], vertex.vertices[1][1]],
      [vertex.vertices[0][0], vertex.vertices[1][1]],
      [vertex.vertices[0][0], vertex.vertices[0][1]],
    ];

    var polygon = new Polygon({
      rings: ring1, //rings,
      spatialReference: view.spatialReference,
    });
    //console.log(polygon);

    var graphic = new Graphic({
      geometry: polygon,
      symbol: map_symbol.polygonSymbol,
    });
    view.graphics.add(graphic);
  }
}

function queryByVertical(vertex: any) {
  if (vertex.vertices.length > 1) {
    view.graphics.removeAll();
    const ring1 = [
      // first ring
      [vertex.vertices[0][0], vertex.vertices[0][1]],
      [vertex.vertices[1][0], vertex.vertices[0][1]],
      [vertex.vertices[1][0], vertex.vertices[1][1]],
      [vertex.vertices[0][0], vertex.vertices[1][1]],
      [vertex.vertices[0][0], vertex.vertices[0][1]],
    ];

    var polygon = new Polygon({
      rings: ring1, //rings,
      spatialReference: view.spatialReference,
    });
    executeQuery(polygon);
  }
}

function executeQuery(polygon: any) {
  showLoading();
  query.where = queryClause();
  query.geometry = polygon;
  query.spatialRelationship = "intersects";
  var url = init.hanhchinh_url + "/" + layer_data.toString();
  // if (layer_intersect < 0) url += "/" + layer_data.toString();
  // else url += "/" + layer_intersect;
  //console.log(url);
  var queryTask = new QueryTask({
    url: url,
  });
  //query.distance = 2;
  //query.units = "miles";
  queryTask.execute(query).then(getResultMany).catch(promiseRejected);
}

view.when().then(function () {
  view.on("click", function (event) {
    //layer_data = getCurrentLayer();
    //console.log(event.native.shiftKey);
    if (event.native.shiftKey) {
      isMultipleSelection = true;
    } else {
      isMultipleSelection = false;
    }
    // Remove any existing highlighted features
    if (isSelection) {
      showLoading();
      queryFeatures(event);
    }
  });

  // Set the parameters for the Identify

  params.tolerance = 3;
  params.layerOption = "top";
  params.returnGeometry = true;
  params.width = view.width;
  params.height = view.height;
});

function queryFeatures(screenPoint: any) {
  layer_data = getCurrentLayer();
  // $("#data-selected").html("");
  params.layerIds = [layer_data];
  if (layer_intersect > 0) {
    clearData();
    params.layerIds = [layer_intersect];
  }

  params.geometry = view.toMap(screenPoint);
  params.mapExtent = view.extent;
  identifyTask.execute(params).then(getResult);
}

function getResult(outputs: any) {
  var response = outputs.results;
  if (response.length == 0) {
    hideLoading();
    return;
  }
  //console.log(response);
  if (layer_intersect < 0) {
    if (!isMultipleSelection) {
      features = [];
    }
    //console.log(features);
    var years = $("#year-input").val().toString();
    if (
      !checkExistFeature(response[0].feature, features) &&
      checkExistYear(response[0].feature, years)
    ) {
      features.push(response[0].feature);
    }

    addGraphicToMap(features);
    hideLoading();
  } else {
    //fetch all data from intersect layer and use this response to find the map frame layers
    var url = init.hanhchinh_url + "/" + layer_data;
    query.where = queryClause();
    query.geometry = response[0].feature.geometry;
    query.spatialRelationship = "intersects";
    var queryTask = new QueryTask({
      url: url,
    });
    queryTask.execute(query).then(getResultIntersect).catch(promiseRejected);
  }
  //clear all exist graphics in the map

  //console.log(response.features);
}

function checkExistYear(feature: any, years: string) {
  var check = false;
  if (years.trim() == "") {
    return true;
  }
  //console.log(feature);
  switch (true) {
    case layer_data < 3:
      check = years.includes(feature.attributes.NAMHOANTHA);
      break;
    case layer_data > 3 && layer_data < 17:
      check = years.includes(feature.attributes.NAMSX);
      break;
    case layer_data > 17 && layer_data < 25:
      check = years.includes(feature.attributes.NamBayChup);
      break;
  }
  return check;
}
function checkExistFeature(feature: any, features: any): any {
  for (var i = 0; i < features.length; i++) {
    var x = features[i];

    if (x.attributes.OBJECTID === feature.attributes.OBJECTID) {
      return true;
    }
  }
  return false;
}

function getResultMany(response: any) {
  if (response.features.length > 0) {
    features = [];
    response.features.map((feature: any) => {
      features.push(feature);
    });
    addGraphicToMap(features);
  }
  hideLoading();
}

function addGraphicToMap(features: any[]) {
  view.graphics.removeAll();

  (document.getElementById("data-selected") as HTMLTextAreaElement).value = "";

  var count = 0;
  features.map((feature) => {
    if (checkFeatureYearInRange(feature)) {
      count++;
      addGraphic(feature.geometry);
      //$("#data-selected").html(response.features[0].attributes.MASOUTM);
      (document.getElementById("data-selected") as HTMLTextAreaElement).value +=
        getDataToTextArea(feature) + "\n";
    }
  });
  $("#result-count").html(count.toString());
}

function getResultIntersect(response: any) {
  if (response.features.length > 0) {
    var features_intersected = response.features;
    addGraphicToMap(features_intersected);
  }
  hideLoading();
}

// Called each time the promise is rejected
function promiseRejected(error: any) {
  console.error("Promise rejected: ", error.message);
  hideLoading();
}

$("#data-layer").change(function () {
  var id = parseInt($(this).val().toString());
  map_layer.hideMapLayer(init.map_frame_start, init.map_frame_end);
  map_layer.visibleSubLayer(id);

  layer_data = id;
  toggleLayer(id, "layer-main");
  clearData();
});

$("#data-intersect").change(function () {
  var id = parseInt($(this).val().toString());
  if (id > 0) {
    map_layer.hideMapLayer(init.map_base_start, init.map_base_end);
    map_layer.visibleSubLayer(id);
    toggleLayer(id, "layer-base");
  }

  layer_intersect = id;
});

$("#btnDownload").click(function () {
  var content = "Tổng số: " + $("#result-count").html() + "\n";
  content += (document.getElementById("data-selected") as HTMLTextAreaElement)
    .value;
  var blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "gis-data.txt");
});

$("#btnZoomTo").click(function () {
  if ((view.graphics as any).items.length > 0) {
    var items = (view.graphics as any).items;

    if (layer_data == 1 || layer_data == 2) {
      getExtentPoint(items, 0.1);
      return;
    }

    var xmax = 0,
      ymax = 0,
      xmin = 1000,
      ymin = 1000;
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      xmax =
        xmax < item.geometry.extent.xmax ? item.geometry.extent.xmax : xmax;
      ymax =
        ymax < item.geometry.extent.ymax ? item.geometry.extent.ymax : ymax;
      xmin =
        xmin > item.geometry.extent.xmin ? item.geometry.extent.xmin : xmin;
      ymin =
        ymin > item.geometry.extent.ymin ? item.geometry.extent.ymin : ymin;
    }
    var extent = new Extent({
      xmin: xmin,
      ymin: ymin,
      xmax: xmax,
      ymax: ymax,
      //spatialReference: sr
    });
    //console.log(extent);
    view.extent = extent;
    // console.log(view.graphics);
  }
});

function getExtentPoint(items: any, zoomLevel: number) {
  var xmax = 0,
    ymax = 0,
    xmin = 1000,
    ymin = 1000;
  if (items.length == 1) {
    var item = items[0];
    xmax = item.geometry.x + zoomLevel;
    ymax = item.geometry.y + zoomLevel;
    xmin = item.geometry.x - zoomLevel;
    ymin = item.geometry.y - zoomLevel;
  } else {
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      xmax = xmax < item.geometry.x ? item.geometry.x : xmax;
      ymax = ymax < item.geometry.y ? item.geometry.y : ymax;
      xmin = xmin > item.geometry.x ? item.geometry.x : xmin;
      ymin = ymin > item.geometry.y ? item.geometry.y : ymin;
    }
    xmax = xmax + zoomLevel;
    ymax = ymax + zoomLevel;
    xmin = xmin - zoomLevel;
    ymin = ymin - zoomLevel;
  }

  var extent = new Extent({
    xmin: xmin,
    ymin: ymin,
    xmax: xmax,
    ymax: ymax,
    //spatialReference: sr
  });
  //console.log(extent);
  view.extent = extent;
}
function clearData() {
  view.graphics.removeAll();
  (document.getElementById("data-selected") as HTMLTextAreaElement).value = "";
  features = [];
  //isSelection = false;
  $("#result-count").html("0");
  // $("#draw-polygon").prop("checked", "false");
}

function toggleLayer(layer_on: number, layer_type: string) {
  $("." + layer_type).prop("checked", false);
  var element = "." + layer_type + "[data-id='" + layer_on.toString() + "']";
  //console.log(element);
  $(element).prop("checked", true);
  // console.log(element); //.prop( "checked", true );
}

//get layer data default for the selection
function getCurrentLayer() {
  var lstId = map_layer.getVisibleLayers();
  if (lstId.length > 0) {
    return lstId[0];
  }
}

function getDataToTextArea(feature: any): string {
  switch (true) {
    case layer_data == 1 || layer_data == 2:
      return feature.attributes.SOHIEUDIEM;
      break;
    case layer_data > 3 && layer_data < 17:
      return feature.attributes.MASOUTM;
      break;
    case layer_data > 17 && layer_data < 25:
      return feature.attributes.SHANH;
      break;
  }
  return "";
}

function addGraphic(geometry: any) {
  if (layer_data == 1) {
    var graphic = new Graphic({
      geometry: geometry,
      symbol: map_symbol.coordinate_pointSymbol,
    });
    view.graphics.add(graphic);
    return;
  }

  if (layer_data == 2) {
    var graphic = new Graphic({
      geometry: geometry,
      symbol: map_symbol.altitude_pointSymbol,
    });
    view.graphics.add(graphic);
    return;
  }

  var graphic = new Graphic({
    geometry: geometry,
    symbol: map_symbol.polygonSymbol,
  });
  view.graphics.add(graphic);
}

function queryClause() {
  // var nam = $("#year-input").val();
  // if (nam != "") {
  //   if (layer_data == 1 || layer_data == 2) {
  //     return `NAMHOANTHA in (${nam})`;
  //   }

  //   if (layer_data > 3 && layer_data < 17) {
  //     return `NAMSX in (${nam})`;
  //   }

  //   return `NamBayChup in (${nam})`;
  // }
  return "";
}

function showLoading() {
  $("#loading").html("Đang chọn...");
  document.getElementById("viewDiv").style.cursor = "wait";
}
function hideLoading() {
  $("#loading").html("");
  common_functions.toggleCursor();
}

function checkItemInList(item: string, list: string[]) {
  var results = false;
  if (list.length == 0) {
    results = true;
  }
  list.forEach((element) => {
    if (element.trim() == item.trim()) {
      results = true;
      return;
    }
  });
  return results;
}
function checkItemFromList1InList2(list1: string[], list2: string[]) {
  var results = false;
  list1.forEach((element) => {
    if (checkItemInList(element, list2)) {
      results = true;
      return true;
    }
  });
  return results;
}

function getListYearToCompare(): any[] {
  var yearType = $("#year-type").val();
  var years: string[];
  years = [];
  if (yearType == "0") {
    if ($("#year-input").val()) {
      years = $("#year-input").val().toString().trim().split(",");
    }
  } else {
    const regex = /^[1,2][0-9]{3}$/gm;
    var s_year1 = $("#year-input1").val().toString().match(regex);
    var s_year2 = $("#year-input2").val().toString().match(regex);
    if (s_year1 && s_year2) {
      var year1 = parseInt(s_year1[0]);
      var year2 = parseInt(s_year2[0]);
      if (year1 < year2) {
        for (var i = year1; i < year2 + 1; i++) {
          years.push(i.toString());
        }
      }
    }
  }
  return years;
}

function getListYearFeature(feature: any) {
  if (layer_data == 1 || layer_data == 2) {
    return feature.attributes.NAMHOANTHA.split(",");
  }

  if (layer_data > 3 && layer_data < 17) {
    return feature.attributes.NAMSX.split(",");
  }

  return feature.attributes.NamBayChup.split(",");
}

function checkFeatureYearInRange(feature: any) {
  var featureYear = getListYearFeature(feature);
  var compareYear = getListYearToCompare();
  // console.log(featureYear);
  // console.log(compareYear);
  return checkItemFromList1InList2(featureYear, compareYear);
}

$("#year-type").change(function () {
  $(".input-text").toggleClass("hidden");
  $(".year-from-to").toggleClass("hidden");
});



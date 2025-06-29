define(["require", "exports", "tslib", "./map_variables", "./init_variables", "./map_variables", "esri/tasks/QueryTask", "esri/tasks/support/Query", "esri/Graphic", "esri/geometry/Extent", "esri/views/draw/Draw", "esri/geometry/Polygon", "esri/tasks/IdentifyTask", "esri/tasks/support/IdentifyParameters", "./common_symbol", "./common_functions"], function (require, exports, tslib_1, map_variables_1, init, map_variables_2, QueryTask_1, Query_1, Graphic_1, Extent_1, Draw_1, Polygon_1, IdentifyTask_1, IdentifyParameters_1, map_symbol, common_functions_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    init = tslib_1.__importStar(init);
    QueryTask_1 = tslib_1.__importDefault(QueryTask_1);
    Query_1 = tslib_1.__importDefault(Query_1);
    Graphic_1 = tslib_1.__importDefault(Graphic_1);
    Extent_1 = tslib_1.__importDefault(Extent_1);
    Draw_1 = tslib_1.__importDefault(Draw_1);
    Polygon_1 = tslib_1.__importDefault(Polygon_1);
    IdentifyTask_1 = tslib_1.__importDefault(IdentifyTask_1);
    IdentifyParameters_1 = tslib_1.__importDefault(IdentifyParameters_1);
    map_symbol = tslib_1.__importStar(map_symbol);
    var layer_data = 4;
    var layer_intersect = -1;
    var isSelection = false;
    var features = [];
    var isMultipleSelection = false;
    const draw = new Draw_1.default({
        view: map_variables_1.view,
    });
    var common_functions = new common_functions_1.CommonFunctions();
    var identifyTask = new IdentifyTask_1.default({ url: init.hanhchinh_url });
    var params = new IdentifyParameters_1.default();
    var query = new Query_1.default();
    query.where = queryClause();
    query.returnGeometry = true;
    query.outFields = ["*"];
    document.getElementById("delete-graphic").onclick = function () {
        clearData();
    };
    document.getElementById("draw-point").onclick = function () {
        isSelection = !isSelection;
        $("#draw-point .esri-icon").toggleClass("esri-icon-cursor-filled");
        common_functions.toggleCursor();
    };
    document.getElementById("draw-rectangle").onclick = function () {
        clearData();
        layer_data = getCurrentLayer();
        const action = draw.create("rectangle");
        map_variables_1.view.focus();
        action.on(["vertex-add", "vertex-remove", "cursor-update", "redo", "undo"], updateVertices);
        action.on(["draw-complete"], queryByVertical);
    };
    document.getElementById("draw-polygon").onclick = function () {
        layer_data = getCurrentLayer();
        clearData();
        var action = draw.create("polygon");
        action.on("vertex-add", function (evt) {
            createPolygonGraphic(evt.vertices);
        });
        action.on("vertex-remove", function (evt) {
            createPolygonGraphic(evt.vertices);
        });
        action.on("cursor-update", function (evt) {
            createPolygonGraphic(evt.vertices);
        });
        action.on("draw-complete", function (evt) {
            drawPolygonComplete(evt.vertices);
        });
    };
    function createPolygonGraphic(vertices) {
        map_variables_1.view.graphics.removeAll();
        var polygon = {
            type: "polygon",
            rings: vertices,
            spatialReference: map_variables_1.view.spatialReference,
        };
        var graphic = new Graphic_1.default({
            geometry: polygon,
            symbol: map_symbol.polygonSymbol,
        });
        map_variables_1.view.graphics.add(graphic);
    }
    function drawPolygonComplete(vertices) {
        map_variables_1.view.graphics.removeAll();
        var polygon = {
            type: "polygon",
            rings: vertices,
            spatialReference: map_variables_1.view.spatialReference,
        };
        executeQuery(polygon);
    }
    function updateVertices(vertex) {
        if (vertex.vertices.length > 1) {
            map_variables_1.view.graphics.removeAll();
            const ring1 = [
                [vertex.vertices[0][0], vertex.vertices[0][1]],
                [vertex.vertices[1][0], vertex.vertices[0][1]],
                [vertex.vertices[1][0], vertex.vertices[1][1]],
                [vertex.vertices[0][0], vertex.vertices[1][1]],
                [vertex.vertices[0][0], vertex.vertices[0][1]],
            ];
            var polygon = new Polygon_1.default({
                rings: ring1,
                spatialReference: map_variables_1.view.spatialReference,
            });
            var graphic = new Graphic_1.default({
                geometry: polygon,
                symbol: map_symbol.polygonSymbol,
            });
            map_variables_1.view.graphics.add(graphic);
        }
    }
    function queryByVertical(vertex) {
        if (vertex.vertices.length > 1) {
            map_variables_1.view.graphics.removeAll();
            const ring1 = [
                [vertex.vertices[0][0], vertex.vertices[0][1]],
                [vertex.vertices[1][0], vertex.vertices[0][1]],
                [vertex.vertices[1][0], vertex.vertices[1][1]],
                [vertex.vertices[0][0], vertex.vertices[1][1]],
                [vertex.vertices[0][0], vertex.vertices[0][1]],
            ];
            var polygon = new Polygon_1.default({
                rings: ring1,
                spatialReference: map_variables_1.view.spatialReference,
            });
            executeQuery(polygon);
        }
    }
    function executeQuery(polygon) {
        showLoading();
        query.where = queryClause();
        query.geometry = polygon;
        query.spatialRelationship = "intersects";
        var url = init.hanhchinh_url + "/" + layer_data.toString();
        var queryTask = new QueryTask_1.default({
            url: url,
        });
        queryTask.execute(query).then(getResultMany).catch(promiseRejected);
    }
    map_variables_1.view.when().then(function () {
        map_variables_1.view.on("click", function (event) {
            if (event.native.shiftKey) {
                isMultipleSelection = true;
            }
            else {
                isMultipleSelection = false;
            }
            if (isSelection) {
                showLoading();
                queryFeatures(event);
            }
        });
        params.tolerance = 3;
        params.layerOption = "top";
        params.returnGeometry = true;
        params.width = map_variables_1.view.width;
        params.height = map_variables_1.view.height;
    });
    function queryFeatures(screenPoint) {
        layer_data = getCurrentLayer();
        params.layerIds = [layer_data];
        if (layer_intersect > 0) {
            clearData();
            params.layerIds = [layer_intersect];
        }
        params.geometry = map_variables_1.view.toMap(screenPoint);
        params.mapExtent = map_variables_1.view.extent;
        identifyTask.execute(params).then(getResult);
    }
    function getResult(outputs) {
        var response = outputs.results;
        if (response.length == 0) {
            hideLoading();
            return;
        }
        if (layer_intersect < 0) {
            if (!isMultipleSelection) {
                features = [];
            }
            var years = $("#year-input").val().toString();
            if (!checkExistFeature(response[0].feature, features) &&
                checkExistYear(response[0].feature, years)) {
                features.push(response[0].feature);
            }
            addGraphicToMap(features);
            hideLoading();
        }
        else {
            var url = init.hanhchinh_url + "/" + layer_data;
            query.where = queryClause();
            query.geometry = response[0].feature.geometry;
            query.spatialRelationship = "intersects";
            var queryTask = new QueryTask_1.default({
                url: url,
            });
            queryTask.execute(query).then(getResultIntersect).catch(promiseRejected);
        }
    }
    function checkExistYear(feature, years) {
        var check = false;
        if (years.trim() == "") {
            return true;
        }
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
    function checkExistFeature(feature, features) {
        for (var i = 0; i < features.length; i++) {
            var x = features[i];
            if (x.attributes.OBJECTID === feature.attributes.OBJECTID) {
                return true;
            }
        }
        return false;
    }
    function getResultMany(response) {
        if (response.features.length > 0) {
            features = [];
            response.features.map((feature) => {
                features.push(feature);
            });
            addGraphicToMap(features);
        }
        hideLoading();
    }
    function addGraphicToMap(features) {
        map_variables_1.view.graphics.removeAll();
        document.getElementById("data-selected").value = "";
        var count = 0;
        features.map((feature) => {
            if (checkFeatureYearInRange(feature)) {
                count++;
                addGraphic(feature.geometry);
                document.getElementById("data-selected").value +=
                    getDataToTextArea(feature) + "\n";
            }
        });
        $("#result-count").html(count.toString());
    }
    function getResultIntersect(response) {
        if (response.features.length > 0) {
            var features_intersected = response.features;
            addGraphicToMap(features_intersected);
        }
        hideLoading();
    }
    function promiseRejected(error) {
        console.error("Promise rejected: ", error.message);
        hideLoading();
    }
    $("#data-layer").change(function () {
        var id = parseInt($(this).val().toString());
        map_variables_2.map_layer.hideMapLayer(init.map_frame_start, init.map_frame_end);
        map_variables_2.map_layer.visibleSubLayer(id);
        layer_data = id;
        toggleLayer(id, "layer-main");
        clearData();
    });
    $("#data-intersect").change(function () {
        var id = parseInt($(this).val().toString());
        if (id > 0) {
            map_variables_2.map_layer.hideMapLayer(init.map_base_start, init.map_base_end);
            map_variables_2.map_layer.visibleSubLayer(id);
            toggleLayer(id, "layer-base");
        }
        layer_intersect = id;
    });
    $("#btnDownload").click(function () {
        var content = "Tổng số: " + $("#result-count").html() + "\n";
        content += document.getElementById("data-selected")
            .value;
        var blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "gis-data.txt");
    });
    $("#btnZoomTo").click(function () {
        if (map_variables_1.view.graphics.items.length > 0) {
            var items = map_variables_1.view.graphics.items;
            if (layer_data == 1 || layer_data == 2) {
                getExtentPoint(items, 0.1);
                return;
            }
            var xmax = 0, ymax = 0, xmin = 1000, ymin = 1000;
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
            var extent = new Extent_1.default({
                xmin: xmin,
                ymin: ymin,
                xmax: xmax,
                ymax: ymax,
            });
            map_variables_1.view.extent = extent;
        }
    });
    function getExtentPoint(items, zoomLevel) {
        var xmax = 0, ymax = 0, xmin = 1000, ymin = 1000;
        if (items.length == 1) {
            var item = items[0];
            xmax = item.geometry.x + zoomLevel;
            ymax = item.geometry.y + zoomLevel;
            xmin = item.geometry.x - zoomLevel;
            ymin = item.geometry.y - zoomLevel;
        }
        else {
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
        var extent = new Extent_1.default({
            xmin: xmin,
            ymin: ymin,
            xmax: xmax,
            ymax: ymax,
        });
        map_variables_1.view.extent = extent;
    }
    function clearData() {
        map_variables_1.view.graphics.removeAll();
        document.getElementById("data-selected").value = "";
        features = [];
        $("#result-count").html("0");
    }
    function toggleLayer(layer_on, layer_type) {
        $("." + layer_type).prop("checked", false);
        var element = "." + layer_type + "[data-id='" + layer_on.toString() + "']";
        $(element).prop("checked", true);
    }
    function getCurrentLayer() {
        var lstId = map_variables_2.map_layer.getVisibleLayers();
        if (lstId.length > 0) {
            return lstId[0];
        }
    }
    function getDataToTextArea(feature) {
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
    function addGraphic(geometry) {
        if (layer_data == 1) {
            var graphic = new Graphic_1.default({
                geometry: geometry,
                symbol: map_symbol.coordinate_pointSymbol,
            });
            map_variables_1.view.graphics.add(graphic);
            return;
        }
        if (layer_data == 2) {
            var graphic = new Graphic_1.default({
                geometry: geometry,
                symbol: map_symbol.altitude_pointSymbol,
            });
            map_variables_1.view.graphics.add(graphic);
            return;
        }
        var graphic = new Graphic_1.default({
            geometry: geometry,
            symbol: map_symbol.polygonSymbol,
        });
        map_variables_1.view.graphics.add(graphic);
    }
    function queryClause() {
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
    function checkItemInList(item, list) {
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
    function checkItemFromList1InList2(list1, list2) {
        var results = false;
        list1.forEach((element) => {
            if (checkItemInList(element, list2)) {
                results = true;
                return true;
            }
        });
        return results;
    }
    function getListYearToCompare() {
        var yearType = $("#year-type").val();
        var years;
        years = [];
        if (yearType == "0") {
            if ($("#year-input").val()) {
                years = $("#year-input").val().toString().trim().split(",");
            }
        }
        else {
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
    function getListYearFeature(feature) {
        if (layer_data == 1 || layer_data == 2) {
            return feature.attributes.NAMHOANTHA.split(",");
        }
        if (layer_data > 3 && layer_data < 17) {
            return feature.attributes.NAMSX.split(",");
        }
        return feature.attributes.NamBayChup.split(",");
    }
    function checkFeatureYearInRange(feature) {
        var featureYear = getListYearFeature(feature);
        var compareYear = getListYearToCompare();
        return checkItemFromList1InList2(featureYear, compareYear);
    }
    $("#year-type").change(function () {
        $(".input-text").toggleClass("hidden");
        $(".year-from-to").toggleClass("hidden");
    });
});
//# sourceMappingURL=select_feature.js.map
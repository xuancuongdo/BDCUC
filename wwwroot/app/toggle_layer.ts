import { view } from "./map_variables";
import { map_layer } from "./map_variables";
import * as init from "./init_variables";
import { LayerOptions } from "./init_variables";
import addTableVanToc, { addTableVanTocDownload } from "./table_vantoc";
interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

var toggle_layer = false;

// view.ui.add("btnToggleLayer", "top-left");

// view.ui.add("toggle-layer", "bottom-right");

// $("#btnToggleLayer").click(function () {
//   if (toggle_layer) {
//     $("#toggle-layer").addClass("hide");
//   } else {
//     $("#toggle-layer").removeClass("hide");
//   }
//   toggle_layer = !toggle_layer;
// });

$(document).on("change", ".layer-toggle", function () {
  //do something

  var id = $(this).data("id");
  //console.log(id);
  var sublayer = map_layer.findSublayerById(parseInt(id));
  sublayer.visible = !sublayer.visible;
  //console.log(sublayer);
});
$(document).on("change", "#hien_thi_cors", function () {
  var sublayer = map_layer.findSublayerById(init.ErsiLayers.TenTramCORS);
  sublayer.visible = !sublayer.visible;
  //console.log(sublayer);
});
$(document).on("change", ".esri-toggle-tree__radio", function () {
  //do something
  const checkedIds: string[] = [];

  $(".esri-toggle-tree__radio").each(function () {
    if ($(this).is(":checked")) {
      checkedIds.push($(this).attr("id"));
    }
  });
  var visible_layer_id: number = 0;
  if (checkedIds.length === 2) {
    //2 options selected
    if (checkedIds.includes("huong_ngang") && checkedIds.includes("chu_ky_trung_binh_hang_nam")) {
      visible_layer_id = init.ErsiLayers.Matphang_NE_TB_2682019;
    }
    if (checkedIds.includes("huong_thang_dung") && checkedIds.includes("chu_ky_trung_binh_hang_nam")) {
      visible_layer_id = init.ErsiLayers.DoCao_H_TB_2682019;
    }
    if (checkedIds.includes("huong_ngang") && checkedIds.includes("chu_ky_1_thang")) {
      visible_layer_id = init.ErsiLayers.Matphang_NE_month;
    }
    if (checkedIds.includes("huong_thang_dung") && checkedIds.includes("chu_ky_1_thang")) {
      visible_layer_id = init.ErsiLayers.DoCao_H_month;
    }
    if (checkedIds.includes("huong_ngang") && checkedIds.includes("chu_ky_1_nam")) {
      visible_layer_id = init.ErsiLayers.Matphang_NE_year;
    }
    if (checkedIds.includes("huong_thang_dung") && checkedIds.includes("chu_ky_1_nam")) {
      visible_layer_id = init.ErsiLayers.DoCao_H_year;
    }
    if (checkedIds.includes("huong_ngang") && checkedIds.includes("chu_ky_5_nam")) {
      visible_layer_id = init.ErsiLayers.Matphang_NE_5years;
    }
    if (checkedIds.includes("huong_thang_dung") && checkedIds.includes("chu_ky_5_nam")) {
      visible_layer_id = init.ErsiLayers.DoCao_H_5years;
    }
    if (checkedIds.includes("huong_ngang") && checkedIds.includes("chu_ky_tu_260819")) {
      visible_layer_id = init.ErsiLayers.Matphang_NE_10years;
    }
    if (checkedIds.includes("huong_thang_dung") && checkedIds.includes("chu_ky_tu_260819")) {
      visible_layer_id = init.ErsiLayers.DoCao_H_10years;
    }

    //visible layer
    var sublayer = map_layer.findSublayerById(visible_layer_id);
    sublayer.visible = true;

    //hide other layers
    map_layer.getVisibleLayers().forEach((sublayerId) => {
      if (sublayerId !== visible_layer_id && sublayerId !== init.ErsiLayers.TenTramCORS
        && sublayerId !== init.ErsiLayers.HanhChinhTinh) {
        var sublayer = map_layer.findSublayerById(sublayerId);
        sublayer.visible = false;
      }
    });

    //add table
    addTableVanToc(visible_layer_id);
  }

});

$(document).on("click", "#btn_download_modal",async function () {
  var selectedValue = $('#periodSelect').val();
  var visible_layer_id: number = 0;
  var fileName: string = "";
  switch (selectedValue) {
    case '1thang':
      console.log("Bạn đã chọn 1 tháng");
      // Thực hiện hành động cho "1 tháng"
      visible_layer_id = init.ErsiLayers.Matphang_NE_month;
      fileName = "1Thang";
      break;
    case '1nam':
      console.log("Bạn đã chọn 1 năm");
      // Thực hiện hành động cho "1 năm"
      visible_layer_id = init.ErsiLayers.Matphang_NE_year;
      fileName = "1Nam";
      break;
    case '5nam':
      console.log("Bạn đã chọn 5 năm");
      // Thực hiện hành động cho "5 năm"
      visible_layer_id = init.ErsiLayers.Matphang_NE_5years;
      fileName = "5Nam";

      break;
    case 'tu26082019':
      console.log("Bạn đã chọn từ ngày 26/08/2019");
      // Thực hiện hành động cho "Từ ngày 26/08/2019"
      visible_layer_id = init.ErsiLayers.Matphang_NE_10years;
      fileName = "10Nam";

      break;
    default:
      console.log("Vui lòng chọn một chu kỳ");
      // Thực hiện hành động cho trường hợp không có lựa chọn hợp lệ
      alert('Vui lòng chọn một chu kỳ')
      break;
  }
  // ghi ra html
  await addTableVanTocDownload(visible_layer_id)

  // //do something
  const KhoangThoiGian = document.getElementById("khoangThoiGianDownload").outerHTML;
  const table = document.getElementById("bangVanTocDownload").outerHTML;
  const blob = new Blob([KhoangThoiGian, table], { type: "application/vnd.ms-excel" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `BaoCaoChuyenDich_${fileName}.xls`; // Hoặc bang.xls nếu muốn mở bằng Excel
  a.click();
  URL.revokeObjectURL(url);

});



export async function http(request: RequestInfo): Promise<any> {
  const response = await fetch(request);
  const body = await response.json();
  return body;
}

const fetch_layer_name = async () => {
  const response = await fetch(init.layer_url);
  const legends = await fetch(init.hanhchinh_url + "/legend?f=pjson");

  const body = await response.json();
  const body_legends = await legends.json();
  var layer_legends = body_legends.layers;

  var ul_dom = document.createElement("ul");
  ul_dom.id = "toggle_layer_ul";
  ul_dom.className = "tree";
  document.getElementById("toggle-layer-content").appendChild(ul_dom);
  //console.log(body);
  //Đẩy dữ liệu danh sách layer vào document
  body.layers.forEach((layer: any) => {
    //Định nghĩa layer
    var li_layer = document.createElement("li");
    li_layer.id = "layer-" + layer.id;
    li_layer.className = "layer-item";
    //Nếu layer là dạng Group layer
    if (layer.type === "Group Layer") {
      var li_layer_a = document.createElement("a");
      li_layer_a.innerHTML = layer.name;
      li_layer.appendChild(li_layer_a);
      var ul_inner = document.createElement("ul");
      ul_inner.id = "layer-" + layer.id + "-ul";
      li_layer.appendChild(ul_inner);
      if (layer.parentLayer != null) {
        var layer_parent = "layer-" + layer.parentLayer.id + "-ul";
        //console.log
        document.getElementById(layer_parent).appendChild(li_layer);
      } else {
        ul_dom.appendChild(li_layer);
      }
    }
    //Nếu không phải là Group layer
    else {
      //if not a group layer then add checkbox and the legend to the layer

      //add checkbox
      var li_layer_input = document.createElement("INPUT");
      li_layer_input.setAttribute("type", "checkbox");

      //choose class according to the type of the layer
      if (layer.id <= init.map_frame_end) {
        li_layer_input.className = "layer-toggle layer-main";
        $("#data-layer").append(`<option value='${layer.id}'>${layer.name}</option>`);
      } else {
        li_layer_input.className = "layer-toggle layer-base";
        $("#data-intersect").append(`<option value='${layer.id}'>${layer.name}</option>`);
      }

      //set data-id to the input
      li_layer_input.setAttribute("data-id", layer.id);
      if (layer.defaultVisibility === true) {
        li_layer_input.setAttribute("checked", "true");
      }
      //create a dom for the expand button
      var a_expand = document.createElement("a");
      a_expand.className = "toggle-tree";
      a_expand.setAttribute("data-toggle", "collapse");
      a_expand.setAttribute("aria-controls", "legend-" + layer.id);
      a_expand.setAttribute("aria-expanded", "false");
      a_expand.href = "#legend-" + layer.id;
      // a_expand.innerHTML ="dđ";
      //append this input to the li layer
      li_layer.appendChild(a_expand);
      li_layer.appendChild(li_layer_input);
      var li_layer_label = document.createElement("label");
      li_layer_label.innerHTML = layer.name;
      li_layer.appendChild(li_layer_label);

      //append the legend to the layer
      //Chú giải cá symbol, linestyle của layer
      var legends = getLegendImage(layer.id, layer_legends);

      if (legends.length > 0) {
        var ul_legend = document.createElement("ul");
        ul_legend.className = "collapse";
        ul_legend.id = "legend-" + layer.id;
        for (var i = 0; i < legends.length; i++) {
          var li_legend = document.createElement("li");
          var img_legend = document.createElement("img");
          img_legend.src =
            "data:" +
            legends[i].contentType +
            ";base64, " +
            legends[i].imageData;
          var label_legend = document.createElement("label");
          label_legend.innerHTML = legends[i].label;
          li_legend.appendChild(img_legend);
          li_legend.appendChild(label_legend);
          /////Chuyển đoạn code vào vòng for này thì mới add toàn bộ chú giải của layer
          //alert(legends[i].label);
          ul_legend.appendChild(li_legend);
          li_layer.appendChild(ul_legend);
        }
        //Dòng lệnh này để ngoài sẽ chỉ add chú giải cuối cùng của lớp dữ liệu
        /*ul_legend.appendChild(li_legend);
        li_layer.appendChild(ul_legend);*/
      }
      /////

      //append the li to the parent DOM
      if (layer.parentLayer != null) {
        var layer_parent = "layer-" + layer.parentLayer.id + "-ul";
        //console.log
        document.getElementById(layer_parent).appendChild(li_layer);
      } else {
        ul_dom.appendChild(li_layer);
      }
    }
  });
  // do smt with bar
  //////////////////////////////
  /*const response1 = await fetch(init.AnhVeTinhEsri_layer_url);
  const legends1 = await fetch(init.AnhVeTinhEsri_url + "/legend?f=pjson");

  const body1 = await response1.json();
  const body_legends1 = await legends1.json();
  var layer_legends1 = body_legends1.layers;
  body1.layers.forEach((layer: any) => {
    //Định nghĩa layer
    var li_layer = document.createElement("li");
    li_layer.id = "layer-" + layer.id;
    li_layer.className = "layer-item";
    //Nếu layer là dạng Group layer
    if (layer.type === "Group Layer") {
      var li_layer_a = document.createElement("a");
      li_layer_a.innerHTML = layer.name;
      li_layer.appendChild(li_layer_a);
      var ul_inner = document.createElement("ul");
      ul_inner.id = "layer-" + layer.id + "-ul";
      li_layer.appendChild(ul_inner);
      if (layer.parentLayer != null) {
        var layer_parent = "layer-" + layer.parentLayer.id + "-ul";
        //console.log
        document.getElementById(layer_parent).appendChild(li_layer);
      } else {
        ul_dom.appendChild(li_layer);
      }
    }

    //Nếu không phải là Group layer
    else {
      //if not a group layer then add checkbox and the legend to the layer

      //add checkbox
      var li_layer_input = document.createElement("INPUT");
      li_layer_input.setAttribute("type", "checkbox");

      //choose class according to the type of the layer
      if (layer.id <= init.map_frame_end) {
        li_layer_input.className = "layer-toggle layer-main";
        $("#data-layer").append(`<option value='${layer.id}'>${layer.name}</option>`);
      } else {
        li_layer_input.className = "layer-toggle layer-base";
        $("#data-intersect").append(`<option value='${layer.id}'>${layer.name}</option>`);
      }

      //set data-id to the input
      li_layer_input.setAttribute("data-id", layer.id);
      if (layer.defaultVisibility === true) {
        li_layer_input.setAttribute("checked", "true");
      }
      //create a dom for the expand button
      var a_expand = document.createElement("a");
      a_expand.className = "toggle-tree";
      a_expand.setAttribute("data-toggle", "collapse");
      a_expand.setAttribute("aria-controls", "legend-" + layer.id);
      a_expand.setAttribute("aria-expanded", "false");
      a_expand.href = "#legend-" + layer.id;
      // a_expand.innerHTML ="dđ";
      //append this input to the li layer
      li_layer.appendChild(a_expand);
      li_layer.appendChild(li_layer_input);
      var li_layer_label = document.createElement("label");
      li_layer_label.innerHTML = layer.name;
      li_layer.appendChild(li_layer_label);

      //append the legend to the layer
      var legends = getLegendImage(layer.id, layer_legends1);

      if (legends.length > 0) {
        var ul_legend = document.createElement("ul");
        ul_legend.className = "collapse";
        ul_legend.id = "legend-" + layer.id;
        for (var i = 0; i < legends.length; i++) {
          var li_legend = document.createElement("li");
          var img_legend = document.createElement("img");
          img_legend.src =
            "data:" +
            legends[i].contentType +
            ";base64, " +
            legends[i].imageData;
          var label_legend = document.createElement("label");
          label_legend.innerHTML = legends[i].label;
          li_legend.appendChild(img_legend);
          li_legend.appendChild(label_legend);
        }
        ul_legend.appendChild(li_legend);
        li_layer.appendChild(ul_legend);
      }

      //append the li to the parent DOM
      if (layer.parentLayer != null) {
        var layer_parent = "layer-" + layer.parentLayer.id + "-ul";
        //console.log
        document.getElementById(layer_parent).appendChild(li_layer);
      } else {
        ul_dom.appendChild(li_layer);
      }
    }
  });*/

  ///////////////////////


};

function getLegendImage(layerId: number, layer_legends: any[]) {
  for (var i = 0; i < layer_legends.length; i++) {
    var feature = layer_legends[i];
    if (feature.layerId == layerId) {
      return feature.legend;
    }
  }
}

//add tablevantoc for the first layer
addTableVanToc(4);

$(document).on('click', ".toggle-tree", function () {
  $(this).toggleClass("collapse-layer");
});
//Thêm cho hiển thị bảng dữ liệu
import FeatureLayer from "esri/layers/FeatureLayer";
import * as init from "./init_variables";
//Cái dưới này dùng cho dạng FeatureTable của arcgis không dùng do không tùy chỉnh được bảng
/*
import QueryTask from "esri/tasks/QueryTask";
import Query from "esri/tasks/support/Query";
import FeatureTable from "esri/widgets/FeatureTable";
import FieldElement from "esri/form/elements/FieldElement";
import FieldColumn from "esri/widgets/FeatureTable/FieldColumn";
import { fieldNames } from "esri/core/sql/WhereClause";*/


//

//
//addTable;
//Viết hàm kiểu này thì nó thực hiện chạy luôn vào gọi hàm phía dưới
export default async function addTableVanToc(id_layerShow: number) {
  //const id_layerShow = 0;//Lớp thứ 0 (bắt đầu từ 0) là lớp Tên trạm CORS//Lắp id layer khi hiển thị
  const myFeatureLayer = new FeatureLayer({
    url: init.map_feature + "/" + id_layerShow,
    title: "Bảng chuyển dịch"
  });
  /*var html = "<table><tr><td>123</td><td>456</td></tr>";
  html += "<tr><td>123</td><td>456</td></tr></table>";
  document.getElementById("TableCORS").innerHTML = html;*/
  //
  var bangVanToc = document.createElement('table');
  bangVanToc.id = "bangVanToc";
  var KhoangThoiGian = document.createElement('div');
  KhoangThoiGian.id = "KhoangThoiGian";
  KhoangThoiGian.style.display = "flex";
  //KhoangThoiGian.style.justifyContent = "center";
  KhoangThoiGian.style.alignItems = "center";
  //Gọi hàm truy vấn các đối tượng trong lớp Tên trạm CORS
  //executeQuery();
  myFeatureLayer.queryFeatures(null).then(function (response: any) {
    if (response.features.length > 0) {
      //Là lớp dữ liệu trung bình 1 năm
      if (id_layerShow == 0 || id_layerShow == 1) {
        bangVanToc.innerHTML = "<tr><td><b>STT</b></td><td><b>Tên trạm</b></td><td><b>Hướng Bắc<br />m/year</b></td><td><b>Hướng Đông<br />m/year</b></td><td><bHướng Đứng<br />m/year</b></td><td><b>Hướng Ngang<br />m/year</b></td></tr>";
      }
      else
        bangVanToc.innerHTML = "<tr><td><b>STT</b></td><td><b>Tên trạm</b></td><td><b>Hướng Bắc<br />(m)</b></td><td><b>Hướng Đông<br />(m)</b></td><td><b>Hướng Đứng<br />(m)</b></td><td><b>Hướng Ngang<br />(m)</b></td></tr>";

      response.features.map((feature: any) => {
        //list_feature.push(feature);//Đưa danh sách đối tượng vào mảng list_feature
        //alert("1");
        bangVanToc.innerHTML += "<tr><td>" + feature.attributes.STT + "</td><td>" + feature.attributes.Tên
          + "</td><td>" + feature.attributes.VNorth.toFixed(4) + "</td><td>" + feature.attributes.VEast.toFixed(4) + "</td><td>" + feature.attributes.VUp.toFixed(4)
          + "</td><td>" + feature.attributes.Vmp.toFixed(4) + "</td></tr>";
        //
        if (KhoangThoiGian.innerHTML == "") {
          KhoangThoiGian.innerHTML = "Khoảng thời gian: "
          KhoangThoiGian.innerHTML += feature.attributes.ThoiDiemThamChieu;
        }
      });
    }
    else {
      bangVanToc.innerHTML = "Giá trị chuyển dịch trống";
    }
  });
  const tableCORS = document.getElementById("TableCORS");
  // Xóa toàn bộ con
  while (tableCORS.firstChild) {
    tableCORS.removeChild(tableCORS.firstChild);
  }
  //Add dữ liệu vào id TableCORS khai ở index.cshtml
  tableCORS.appendChild(KhoangThoiGian);
  tableCORS.appendChild(bangVanToc);
};

export async function addTableVanTocDownload(id_layerShow: number) {

  //const id_layerShow = 0;//Lớp thứ 0 (bắt đầu từ 0) là lớp Tên trạm CORS//Lắp id layer khi hiển thị
  const myFeatureLayer = new FeatureLayer({
    url: init.map_feature + "/" + id_layerShow,
    title: "Bảng chuyển dịch"
  });
  /*var html = "<table><tr><td>123</td><td>456</td></tr>";
  html += "<tr><td>123</td><td>456</td></tr></table>";
  document.getElementById("TableCORS").innerHTML = html;*/
  //
  var bangVanToc = document.createElement('table');
  bangVanToc.id = "bangVanTocDownload";
  bangVanToc.style.border = "1px solid black";
  var KhoangThoiGian = document.createElement('div');
  KhoangThoiGian.id = "khoangThoiGianDownload";
  KhoangThoiGian.style.display = "flex";
  //KhoangThoiGian.style.justifyContent = "center";
  KhoangThoiGian.style.alignItems = "center";
  //Gọi hàm truy vấn các đối tượng trong lớp Tên trạm CORS
  //executeQuery();
  const response: any = await myFeatureLayer.queryFeatures(null);
  //myFeatureLayer.queryFeatures(null).then(function (response: any) {
  if (response.features.length > 0) {
    // Là lớp dữ liệu trung bình 1 năm
    bangVanToc.innerHTML = `
        <tr style="border: 1px solid black;">
          <td style="border: 1px solid black;"><b>STT</b></td>
          <td style="border: 1px solid black;"><b>Tên trạm</b></td>
          <td style="border: 1px solid black;"><b>Kinh độ<br />(độ)</b></td>
          <td style="border: 1px solid black;"><b>Vỹ độ<br />(độ)</b></td>
          <td style="border: 1px solid black;"><b>Hướng Bắc<br />(m)</b></td>
          <td style="border: 1px solid black;"><b>Hướng Đông<br />(m)</b></td>
          <td style="border: 1px solid black;"><b>Hướng Đứng<br />(m)</b></td>
          <td style="border: 1px solid black;"><b>Hướng Ngang<br />(m)</b></td>
          <td style="border: 1px solid black;"><b>Loại trạm</b></td>
          <td style="border: 1px solid black;"><b>Vị trí cột<br />anten</b></td>
          <td style="border: 1px solid black;"><b>Địa chỉ</b></td>
        </tr>
      `;

    for (const feature of response.features) {
      bangVanToc.innerHTML += `
          <tr style="border: 1px solid black;">
            <td style="border: 1px solid black;">${feature.attributes.STT}</td>
            <td style="border: 1px solid black;">${feature.attributes.Tên}</td>
            <td style="border: 1px solid black;">${feature.attributes.btong.toFixed(5)}</td>
            <td style="border: 1px solid black;">${feature.attributes.ltong.toFixed(5)}</td>
            <td style="border: 1px solid black;">${feature.attributes.VNorth.toFixed(4)}</td>
            <td style="border: 1px solid black;">${feature.attributes.VEast.toFixed(4)}</td>
            <td style="border: 1px solid black;">${feature.attributes.VUp.toFixed(4)}</td>
            <td style="border: 1px solid black;">${feature.attributes.Vmp.toFixed(4)}</td>
            <td style="border: 1px solid black;">${feature.attributes.LoaiTram}</td>
            <td style="border: 1px solid black;">${feature.attributes.ViTriCot}</td>
            <td style="border: 1px solid black;">${feature.attributes.DiaChi}</td>
          </tr>
        `;

      if (KhoangThoiGian.innerHTML === "") {
        KhoangThoiGian.innerHTML = `Khoảng thời gian: ${feature.attributes.ThoiDiemThamChieu}`;
      }
    }
  } else {
    bangVanToc.innerHTML = "Giá trị chuyển dịch trống";
  }
  //});
  const tableCORS = document.getElementById("TableCORSDownload");
  // Xóa toàn bộ con
  while (tableCORS.firstChild) {
    tableCORS.removeChild(tableCORS.firstChild);
  }
  //Add dữ liệu vào id TableCORS khai ở index.cshtml
  tableCORS.appendChild(KhoangThoiGian);
  tableCORS.appendChild(bangVanToc);
};
//addTableVanToc();//Gọi thực hiện hàm

//Khai báo dùng dạng bảng của Arcgis, nhưng không tùy chỉnh được kích thước và ẩn đi ... của bảng nên không dùng
//
/*const myFeatureLayer = new FeatureLayer({
  url: init.map_feature + "/" + 2,//Lớp thứ 2 (bắt đầu từ 0) là lớp Tên trạm CORS
  title: "Bảng vận tốc"
});*/
// create the FeatureTable from the provided FeatureLayer
/*const table = new FeatureTable({
  layer: myFeatureLayer,
  //view: view,
  //visibleElements: {selectionColumn: false},
  // autocastable to FieldColumnConfig
  // The fieldColumnConfig are used to determine which attributes are shown in the table
  // If the fieldColumnConfig are not set, all attributes will be shown
  fieldConfigs: [
    {
      name: "FID",
      label: "ID",
      // This field will not be shown in the table initially
      visible: false
    },
    {
      name: "STT",
      label: "STT",
      // The table will be sorted by this column
      // in ascending order
      direction: "asc"//Sắp xếp tăng dần
    },
    {
      name: "Tên",
      label: "Tên trạm",
    },
    {
      name: "VNorth",
      label: "V-North(m/year)"
    },
    {
      name: "VEast",
      label: "V-East(m/year)"
    }
  ],
  container: document.getElementById("TableCORS")
});

/*table.visibleElements = {
  header: false,//Ẩn tiêu đề bảng là title của layer
  menu: false,
  menuItems: {
    clearSelection: false,
    refreshData: false,
    toggleColumns: false
  },
}*/


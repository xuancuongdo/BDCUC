import { map } from "./map_variables";
import { map_layer } from "./map_variables";
//import { map_layer1 } from "./map_variables";
import { layer } from "./map_variables";
import { basemap } from "./map_variables";
import { view } from "./map_variables";
import Home from "esri/widgets/Home";
import { searchWidget } from './features_search';
import getCORSLayers, { GetDataForStatistic } from './statistic'
import { MovingChartModel } from './models/MovingChartModel';
import { dateToSession } from "./common_functions";
import { Chart } from 'chart.js';
let myChartNorth: Chart | null = null;
let myChartEast: Chart | null = null;
let myChartAltitude: Chart | null = null;
let myChartPosition: Chart | null = null;
// import $ from "jquery";

//map.add(map_layer1.getMapLayer()); // Thêm nhóm layer của service khác
//map.add(layer); // Thêm nhóm layer của service khác
map.add(map_layer.getMapLayer()); // adds the layer to the map


// view.ui.move("zoom", "bottom-left");

// view.ui.add("logo", "top-left");

// create and add Home widget to the view
const home = new Home({
  view: view,
});
view.ui.add(home, "top-left");

//view.map.basemap = basemap;


// $(".btn").click(function () {
//   $(this).toggleClass("active");
// });


//Thêm thanh tìm kiếm ở phía trên bên phải, phải add ở bên main này mới phóng được đến đối tượng, 
//còn để bên map_variables không phóng đến đối tượng tìm được
view.ui.add(searchWidget, {
  //position: "bottom-right"
  position: "top-right"
});

// Lấy ngày hiện tại
let today = new Date();

// Trừ đi 22 ngày
today.setDate(today.getDate() - 22);

// Format về yyyy-MM-dd để set vào input
let formattedDate = today.toISOString().split('T')[0];

// Gán vào input có id="endDate"
$('#endDate').val(formattedDate);


getCORSLayers(0)

$(document).on("click", "#btn_drawing_chart", async function () {
  const startDateStr = (document.getElementById('startDate') as HTMLInputElement).value;
  const endDateStr = (document.getElementById('endDate') as HTMLInputElement).value;
  const cors_name = $('#categorySelect').val();

  // Kiểm tra có chọn ngày chưa
  if (!startDateStr || !endDateStr || !cors_name) {
    alert("Vui lòng chọn trạm định vị vệ tinh quốc gia, từ ngày và đến ngày!");
    return;
  }

  // Chuyển chuỗi sang đối tượng Date
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  const minDate = new Date("2019-08-16");

  // Kiểm tra ngày bắt đầu nhỏ hơn ngày tối thiểu
  if (startDate < minDate) {
    alert("Ngày bắt đầu không được nhỏ hơn 16/08/2019!");
    return;
  }

  // Kiểm tra startDate > endDate
  if (startDate > endDate) {
    alert("Ngày bắt đầu không được lớn hơn ngày kết thúc!");
    return;
  }


  var data = await GetDataForStatistic(cors_name.toString(), dateToSession(startDateStr), dateToSession(endDateStr));

  const ctx_north = document.getElementById('chartAreaNorth') as HTMLCanvasElement;
  const ctx_east = document.getElementById('chartAreaEast') as HTMLCanvasElement;
  const ctx_altitude = document.getElementById('chartAreaAltitude') as HTMLCanvasElement;
  const ctx_position = document.getElementById('chartAreaPosition') as HTMLCanvasElement;


  // Store the chart instance outside the function

  // Check if a chart instance already exists
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
  // Chuẩn bị dữ liệu cho Chart.js
  const labels = data.map((item: any) => item.calcDate);
  const northValues = data.map((item: any) => item.north);
  const eastValues = data.map((item: any) => item.east);
  const altitudeValues = data.map((item: any) => item.altitude);
  // Cấu trúc dataset hoàn chỉnh
const correctChartData = {
  datasets: [{
    label: 'Vị trí trạm đo',
    data: data.map((item: any) => {
        return {
          x: item.y_MP,
          y: item.x_MP
        };
      }), // <-- This is the correct format.
    backgroundColor: 'rgba(255, 99, 132, 0.8)',
    borderColor: 'rgba(255, 99, 132, 1)',
    borderWidth: 1
  }]
};

  myChartNorth = new Chart(ctx_north, {
    type: 'bar', // Biểu đồ cột
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

  myChartEast = new Chart(ctx_east, {
    type: 'bar', // Biểu đồ cột
    data: {
      labels,
      datasets: [
        {
          label: 'Hướng Đông (East)',
          data: eastValues,
          backgroundColor: 'rgba(255, 99, 132, 0.5)', // đỏ nhạt
          borderColor: 'rgba(255, 99, 132, 1)', // đỏ đậm
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
  myChartAltitude = new Chart(ctx_altitude, {
    type: 'bar', // Biểu đồ cột
    data: {
      labels,
      datasets: [
        {
          label: 'Hướng Đứng (Altitude)',
          data: altitudeValues,
          backgroundColor: 'rgba(54, 162, 235, 0.5)', // xanh dương nhạt
          borderColor: 'rgba(54, 162, 235, 1)', // xanh dương đậm
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

myChartPosition = new Chart(ctx_position, {
  type: 'scatter', // Loại biểu đồ là scatter
  data: correctChartData,
  options: {
    scales: {
      x: {
        title: {
            display: true,
            text: 'Y'
          },
        type: 'linear', // Trục X phải là kiểu tuyến tính
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
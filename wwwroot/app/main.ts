import { map } from "./map_variables";
import { map_layer } from "./map_variables";
//import { map_layer1 } from "./map_variables";
import { layer } from "./map_variables";
import { basemap } from "./map_variables";
import { view } from "./map_variables";
import Home from "esri/widgets/Home";
import { searchWidget } from './features_search';



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

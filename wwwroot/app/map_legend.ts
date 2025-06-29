import { map_layer } from "./map_variables";
import { view } from "./map_variables";

import Legend from "esri/widgets/Legend";

var legend_toggle = false;

var legend = new Legend({
  view: view,
  layerInfos: [
    {
      layer: map_layer.getMapLayer(),
      title: "Chú giải",
      hideLayers: [],
    },
  ],
});

//view.ui.add(legend, "bottom-right");
view.ui.add("btnLegend", "top-left");

$("#btnLegend").click(function () {
  if (!legend_toggle) {
    view.ui.add(legend, "bottom-right");
  } else {
    view.ui.remove(legend);
  }
  legend_toggle = !legend_toggle;
});

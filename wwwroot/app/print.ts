import { view } from "./map_variables";
import * as init from "./init_variables";
import Print from "esri/widgets/Print";

var toggle = false;

var print = new Print({
    view: view,
    // specify your own print service
    printServiceUrl:
        init.print_url
  });
  view.ui.add("btnPrint", "top-left");

  // Add widget to the top right corner of the view
  //view.ui.add(print, "top-right");

  $("#btnPrint").click(function () {
    if (!toggle) {
      view.ui.add(print, "bottom-right");
    } else {
      view.ui.remove(print);
    }
    toggle = !toggle;
  });
  

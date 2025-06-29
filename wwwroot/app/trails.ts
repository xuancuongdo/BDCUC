
// import FeatureLayer from "esri/layers/FeatureLayer";
// import SimpleRenderer = require("esri/renderers/SimpleRenderer");
// var citiesRenderer = {
//     type: "simple",  // autocasts as new SimpleRenderer()
//     symbol: {
//       type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
//       size: 6,
//       color: "black",
//       outline: {  // autocasts as new SimpleLineSymbol()
//         width: 0.5,
//         color: "white"
//       }
//     }
//   };
  
//   var simplerRenderer = new SimpleRenderer(citiesRenderer);
//   // Trailheads feature layer (points)
//   var trailheadsLayer = new FeatureLayer({
//     url:
//       "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
//       //*** ADD ***//
//     // definitionExpression: "ELEV_GAIN < 250",
//     renderer: simplerRenderer,
  
//     //*** ADD ***//
//     outFields: ["TRL_NAME", "ELEV_FT"],
  
//     //*** ADD ***//
//     popupTemplate: {
//       // Enable a popup
//       title: "{TRL_NAME}", // Show attribute value
//       content: "The trail elevation gain is {ELEV_FT} ft." // Display text in pop-up
//     }
//   });
  
//   //map.add(trailheadsLayer);
  
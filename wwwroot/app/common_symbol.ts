export var polygonSymbol = {
  type: "simple-fill", // autocasts as new SimpleFillSymbol()
  color: [0, 0, 0, 0],
  style: "solid",
  outline: {
    // autocasts as new SimpleLineSymbol()
    color: [252, 3, 3, 1],
    width: 2,
  },
};

export var search_polygonSymbol = {
  type: "simple-fill", // autocasts as new SimpleFillSymbol()
  color: [0, 0, 0, 0],
  style: "solid",
  outline: {
    // autocasts as new SimpleLineSymbol()
    color: [3, 173, 252, 1],
    width: 2,
  },
};

export var coordinate_pointSymbol = {
  type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
  style: "triangle",
  color: [153, 102, 0],
  size: "8px",  // pixels
  outline: {  // autocasts as new SimpleLineSymbol()
    color: [255, 255, 0],
    width: 0  // points
  }
}

export var altitude_pointSymbol = {
  type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
  style: "square",
  color: [153, 102, 0],
  size: "8px",  // pixels
  outline: {  // autocasts as new SimpleLineSymbol()
    color: [255, 255, 0],
    width: 0  // points
  }
}

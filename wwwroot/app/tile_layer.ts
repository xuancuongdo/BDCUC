import TileLayer from "esri/layers/TileLayer";
import * as init from "./init_variables";

export class TileMapLayer {
  private tileMap: TileLayer;

  getMapLayer(): TileLayer {
    return this.tileMap;
  }
  constructor(url: string) {
    this.tileMap = new TileLayer({
      url: url
    });
  }

 
}
//export map_layer;//var layer = new map_layer(init.hanhchinh_url);

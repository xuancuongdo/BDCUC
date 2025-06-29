import MapImageLayer from "esri/layers/MapImageLayer";
import * as init from "./init_variables";

export class MapLayer {
  private hanhChinhMap: MapImageLayer;

  getMapLayer(): MapImageLayer {
    return this.hanhChinhMap;
  }
  constructor(url: string) {
    this.hanhChinhMap = new MapImageLayer({
      url: url,
    });
  }

  getVisibleLayersIDAllType(): number[] {
    var lst = this.hanhChinhMap.allSublayers as any;
    var visible_sublayer: number[] = [];
    //console.log(lst);
    lst.items.map((x: any) => {

      if (x.visible && x.sublayers == null) {
        visible_sublayer.push(x.id);
      }

    });
    return visible_sublayer;
  }

  getVisibleLayers(): number[] {
    var lst = this.hanhChinhMap.allSublayers as any;
    var visible_sublayer: number[] = [];
    //console.log(lst);
    lst.items.map((x: any) => {
      //console.log(x);
      if (x.id <= init.map_frame_end) {
        if (x.visible && x.sublayers == null) {
          visible_sublayer.push(x.id);
        }
      }
    });
    return visible_sublayer;
  }

  hideMapLayer(from: number, end: number) {
    for (var i = from; i <= end; i++) {
      var sublayer_invisible = this.hanhChinhMap.findSublayerById(i);
      if (sublayer_invisible.sublayers == null) {
        sublayer_invisible.visible = false;
      }
    }
  }

  visibleSubLayer(id: number) {
    var sublayer = this.hanhChinhMap.findSublayerById(id);

    if (sublayer != null) {
      sublayer.visible = true;
    }
  }
  findSublayerById(id: number) {
    return this.hanhChinhMap.findSublayerById(id);
  }
}
//export map_layer;//var layer = new map_layer(init.hanhchinh_url);

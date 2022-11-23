import { ElementRef, Injectable } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Editor from "@arcgis/core/widgets/Editor";

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map!: Map;
  mapView!:MapView;
  featureLayer!: FeatureLayer;
  

  constructor() { }

  initialMap(divMap: ElementRef){
    //create map
    this.map = new Map({
      basemap: "topo-vector"
    })
    //create mapView
    this.mapView = new MapView({
      map: this.map,
      container: divMap.nativeElement,
      zoom: 14,
      center: [100.580,14.356],
    })

    //Feature Layer
    this.featureLayer = new FeatureLayer({
      url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/NapervilleShelters/FeatureServer/0',
      
    })
    this.map.add(this.featureLayer) 

    //Call Widget
    this.initialWidgetEditor();
  }

  //Editor
  initialWidgetEditor() {
    // At the very minimum, set the Editor's view
      const editor = new Editor({
        view: this.mapView
      });
      this.mapView.ui.add(editor, "top-right");
  }





}

import { ElementRef, Injectable } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  map!: Map;
  mapView!: MapView;
  featureLayer!: FeatureLayer;

  constructor() { }

  initialMap(divMap: ElementRef){
    this.map = new Map({
      basemap: "topo-vector"
    })

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
  }

}

import { AfterViewInit ,Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import { MapService } from '../map.service';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.css']
})
export class RegistComponent implements OnInit,AfterViewInit {
  @ViewChild('mapDiv') mapDiv!: ElementRef //ref #mapDiv


  constructor(private mapServise: MapService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.mapServise.initialMap(this.mapDiv);
  }

}

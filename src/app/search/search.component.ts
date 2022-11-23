import { AfterViewInit ,Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SearchService } from '../search.service';
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import Point from '@arcgis/core/geometry/Point';
import Graphic from '@arcgis/core/Graphic';
import { ParseSpan } from '@angular/compiler';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit, AfterViewInit {
  @ViewChild('mapDiv') mapDiv!: ElementRef //ref #mapDiv

  name!: string;
  startCapacity: number = 0;
  capacity!: number;
  
  options: string[] = ["Yes", "No"];
  selectPet: string = "Yes"; //ngModel
  selecPetCode: number = 1;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.searchService.initialMap(this.mapDiv);
  }
  doSearchPet(event: any){
    //removeAll
    this.searchService.mapView.graphics.removeAll();

    console.log(this.selectPet);
    if(this.selectPet === "Yes") {
      this.selecPetCode = 1;
    }
    else {
      this.selecPetCode = 0;
    }

    //CreateQuery
    let params = this.searchService.featureLayer.createQuery();
    params.where = "petfriend = " + this.selecPetCode;
    params.outFields = ["*"]
    params.returnGeometry = true
    params.outSpatialReference = SpatialReference.WGS84

    this.searchService.featureLayer.queryFeatures(params).then((response)=> {
      if(response.features.length > 0) {
        for(let i = 0 ;i<response.features.length; i++) {
          const feature = response.features[i]
          const point = feature.geometry as Point

          //Symbol
          let symbol = {
            type: "simple-marker",
            style: "circle",
            color: [255, 0, 0, 0],
            size: "50px",  // pixels
            outline: {  // autocasts as new SimpleLineSymbol()
              color: [255, 0, 0, 1],
              width: 3  // points
            }
          }

          //Add Graphic
          const graphic = new Graphic({
            geometry: point,
            symbol: symbol
            })

          //Add Graphic to mapView 
          this.searchService.mapView.graphics.add(graphic); //graphic layers
          console.log(this.searchService.mapView.graphics);
        }
      }
    })
    
    
  

  }//function doSearchPet

  doSearchName(){
    //removeAll
    this.searchService.mapView.graphics.removeAll();

    //CreateQuery
    let params = this.searchService.featureLayer.createQuery();
    params.where = "facname = " + "'"+this.name+"'" + " AND petfriend = " + this.selecPetCode;
    params.outFields = ["*"]
    params.returnGeometry = true
    params.outSpatialReference = SpatialReference.WGS84

    this.searchService.featureLayer.queryFeatures(params).then((response)=> {
      if(response.features.length > 0) {
        const feature = response.features[0]
        const point = feature.geometry as Point

        //Symbol
        let symbol = {
          type: "simple-marker",
          style: "circle",
          color: [255, 0, 0, 0],
          size: "50px",  // pixels
          outline: {  // autocasts as new SimpleLineSymbol()
            color: [255, 0, 0, 1],
            width: 3  // points
          }
        }

        //Add Graphic
        const graphic = new Graphic({
          geometry: point,
          symbol: symbol
          })

        //Add Graphic to mapView 
        this.searchService.mapView.graphics.add(graphic); //graphic layers
        console.log(this.searchService.mapView.graphics);

        //goTo Center 
        this.searchService.mapView.goTo({
          center: [point.longitude, point.latitude]
        })

        //popup
        this.searchService.mapView.popup.open({
          location: point,
          features: [feature]
        })
      }
    })
  }

  doSearchCapacity(){
    //removeAll
    this.searchService.mapView.graphics.removeAll();

    let cap!: number;
    //Check All Capacity
    let paramsCheck = this.searchService.featureLayer.createQuery();
    paramsCheck.where = "1=1"
    paramsCheck.outFields = ["*"]
    paramsCheck.returnGeometry = true
    paramsCheck.outSpatialReference = SpatialReference.WGS84

    console.log("paramsCheck.where == ",paramsCheck.where);

    this.searchService.featureLayer.queryFeatures(paramsCheck).then((response)=> {

      //Capacity from UserInputCapacity to MaxCapacity
      console.log("length",response.features.length)
      for(let i=0 ; i<response.features.length ; i++){
        if(response.features[i].attributes.capacity != null && Number(response.features[i].attributes.capacity) >= this.capacity){
          cap = Number(response.features[i].attributes.capacity);
          this.createGraphicForCapacity(cap);
        }
      }
    })
  }
  
  // Create Graphic from UserInputCapacity to MaxCapacity
  createGraphicForCapacity(cap: number){
    let params = this.searchService.featureLayer.createQuery();
    params.where = "capacity = " + "'" + cap + "'"
    params.outFields = ["*"]
    params.returnGeometry = true
    params.outSpatialReference = SpatialReference.WGS84

    this.searchService.featureLayer.queryFeatures(params).then((response)=> {
      if(response.features.length > 0) {
        const feature = response.features[0]
        const point = feature.geometry as Point
  
        //Symbol
        let symbol = {
          type: "simple-marker",
          style: "circle",
          color: [255, 0, 0, 0],
          size: "50px",  // pixels
          outline: {  // autocasts as new SimpleLineSymbol()
            color: [255, 0, 0, 1],
            width: 3  // points
          }
        }
  
        //Add Graphic
        const graphic = new Graphic({
          geometry: point,
          symbol: symbol
          })
  
        //Add Graphic to mapView 
        this.searchService.mapView.graphics.add(graphic); //graphic layers
      }

    })//queryFeature
  }

}

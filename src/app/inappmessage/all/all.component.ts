import {Component, OnInit} from '@angular/core';
import {NavigationService} from '../../navigation.service';
import {NotiDataService} from '../../noti-data.service';
import {Route, Router} from "@angular/router";
import {icon, latLng, marker, polyline, tileLayer} from 'leaflet';



@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  constructor( private _router: Router,private navigationService:NavigationService) {
  }


  // Define our base layers so we can reference them multiple times
  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  wMaps = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // Marker for the top of Mt. Ranier
  summit = marker([ 23.8103, 90.4125 ], {
    icon: icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    }),

  }).bindTooltip('Click here to view the <br>greenness analysis of<br> Dhaka Division')
    .openTooltip().on('mousedown',this.onMarkerClick);

  // // Marker for the parking lot at the base of Mt. Ranier trails
  // paradise = marker([ 46.78465227596462,-121.74141269177198 ], {
  //   icon: icon({
  //     iconSize: [ 25, 41 ],
  //     iconAnchor: [ 13, 41 ],
  //     iconUrl: 'leaflet/marker-icon.png',
  //     shadowUrl: 'leaflet/marker-shadow.png'
  //   })
  // });

  // Path from paradise to summit - most points omitted from this example for brevity
  route = polyline([[ 46.78465227596462,-121.74141269177198 ],
    [ 46.80047278292477, -121.73470708541572 ],
    [ 46.815471360459924, -121.72521826811135 ],
    [ 46.8360239546746, -121.7323131300509 ],
    [ 46.844306448474526, -121.73327445052564 ],
    [ 46.84979408048093, -121.74325201660395 ],
    [ 46.853193528950214, -121.74823296256363 ],
    [ 46.85322881676257, -121.74843915738165 ],
    [ 46.85119913890958, -121.7519719619304 ],
    [ 46.85103829018772, -121.7542376741767 ],
    [ 46.85101557523012, -121.75431755371392 ],
    [ 46.85140013694763, -121.75727385096252 ],
    [ 46.8525277543813, -121.75995212048292 ],
    [ 46.85290292836726, -121.76049157977104 ],
    [ 46.8528160918504, -121.76042997278273 ]]);

  // Layers control object with our two base layers and the three overlay layers
  layersControl = {
    baseLayers: {
      'Street Maps': this.streetMaps,
      'Wikimedia Maps': this.wMaps
    },
    overlays: {
      'Mt. Rainier Summit': this.summit,
    }
  };


  // Set the initial set of displayed layers (we could also use the leafletLayers input binding for this)
  options = {
    layers: [ this.streetMaps, this.route, this.summit ],
    zoom: 7,
    center: latLng([ 23.8103, 90.4125 ])
  };

  noOfDataset = 0;
  noOfYear = 0;
  noOfDistricts = 0;
  noOfImages = 0;

  isShowRouter:boolean = false;


  ngOnInit() {
    this.startDatasetCounter();
    this.startNoOfYearCounter();
    this.startNoOfDistrictCounter();
    this.startImageCounter();

  }
   onMarkerClick($event: any) {
     window.location.href = 'http://localhost:4200/analytis/yearrangecompersion'

   // this.navigationService.isShowNavbar = true;
    //this._router.navigate(['analytis/datasetcomperison'])
  }
  startDatasetCounter() {
    setInterval(() => {
      if (this.noOfDataset < 23*13 * 15) {
        this.noOfDataset += 115;
      }
    }, 100)
  }

  startNoOfYearCounter() {
    setInterval(() => {
      if (this.noOfYear < 15) {
        this.noOfYear++;
      }
    }, 100)
  }


  startNoOfDistrictCounter() {
    setInterval(() => {
      if (this.noOfDistricts < 13) {
        this.noOfDistricts++;
      }
    }, 100)
  }

  startImageCounter() {
    setInterval(() => {
      if (this.noOfImages < 23*13*15) {
        this.noOfImages += 115;
      }
    }, 100)
  }

  onViewAnalyticsClick() {
   this.navigationService.isShowNavbar = true;
   this._router.navigate(['analytis/yearrangecompersion'])
  }

  onImageClick($event: MouseEvent) {
    console.log($event.offsetX,$event.offsetY);
    if($event.offsetX>=110 && $event.offsetX<=250 && $event.offsetY>=150 && $event.offsetY<=350){
      console.log('Clicked');
    }


  }
}

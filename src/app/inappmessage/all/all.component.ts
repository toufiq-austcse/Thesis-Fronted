import {Component, OnInit} from '@angular/core';
import {NavigationService} from '../../navigation.service';
import {NotiDataService} from '../../noti-data.service';
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  noOfDataset = 0;
  noOfYear = 0;
  noOfDistricts = 0;
  noOfImages = 0;

  isShowRouter:boolean = false;

  constructor( private _router: Router,private navigationService:NavigationService) {
  }

  ngOnInit() {
    this.startDatasetCounter();
    this.startNoOfYearCounter();
    this.startNoOfDistrictCounter();
    this.startImageCounter();

  }

  startDatasetCounter() {
    setInterval(() => {
      if (this.noOfDataset < 345 * 15) {
        this.noOfDataset += 207;
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
      if (this.noOfImages < 345 * 15) {
        this.noOfImages += 207;
      }
    }, 100)
  }

  onViewAnalyticsClick() {
   this.navigationService.isShowNavbar = true;
   this._router.navigate(['analytis/datasetcomperison'])
  }
}

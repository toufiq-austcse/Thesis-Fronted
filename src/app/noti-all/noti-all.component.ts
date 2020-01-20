import {Component, OnInit} from '@angular/core';
import {NotiDataService} from '../noti-data.service';
import {all} from 'q';
import {Router} from "@angular/router";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {ConfirmComponent} from "../confirm/confirm.component";
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {FileuploadService} from "../fileupload.service";
import {ApiService} from "../shared/services/api.service";
import {LoadingComponent} from "../loading/loading.component";

@Component({
  selector: 'app-noti-all',
  templateUrl: './noti-all.component.html',
  styleUrls: ['./noti-all.component.css']
})
export class NotiAllComponent implements OnInit {
  constructor(private apiSerivice: ApiService){}
  private district:any = 'Dhaka';
  private year:any = '2001';

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          max: 100
        }
      }]
    }

  };

  public mbarChartLabels:string[] = [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartColors:Array<any> = [
    {
      backgroundColor: 'rgba(77,177,155,0.2)',
      // borderColor: 'rgb(77,177,155)',
      // pointBackgroundColor: 'rgba(105,159,177,1)',
      // pointBorderColor: '#fafafa',
      // pointHoverBackgroundColor: '#fafafa',
      // pointHoverBorderColor: 'rgba(105,159,177)'
    },
  ];
  public barChartData:any[] = [
    {data: [], label: ''},
  ];

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }






  onDistrictSelect(value: any) {
    this.district = value;

  }

  onYearSelect(value: any) {
    this.year = value;
  }

  ngOnInit(): void {
    this.onViewData();
  }

  onViewData() {
    this.barChartData[0].data = [];
    this.mbarChartLabels = [];
    console.log('Called',this.district,this.year);
    this.getData(this.district,this.year)
  }
  getData(district: any, year: any) {
    LoadingComponent.display = true;
    this.apiSerivice.getDataOfAZila(district, year).subscribe(response => {
      let myResponse = response.map(aresponse => {
        return {
          green_percentage: aresponse.green_percentage,
          month: aresponse.month
        }
      });

      myResponse.forEach(res => {
       this.mbarChartLabels.push(res.month);
       this.barChartData[0].data.push(res.green_percentage);
       this.barChartData[0].fillColor  = 'rgba(177,67,119,0.73)';
       this.barChartData[0].label = `${district}, ${year} Bar Graph of Green Percentage`
      })
    },(err)=>{},()=> LoadingComponent.display = false);


  }
}

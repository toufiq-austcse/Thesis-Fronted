import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {NotiDataService} from '../noti-data.service';
import {Router, ActivatedRoute} from '@angular/router';
import {ApiService} from "../shared/services/api.service";


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  // lineChart
  public lineChartData: Array<any> = [
    {data: []},
    {data: []},
  ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    animation: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          max: 100
        }
      }]
    },
    fill: false

  };

  public lineChartColours: Array<any> = [
    { // grey
      //backgroundColor: 'rgb(50,177,107)',
      borderColor: 'rgb(82,177,97)',
      // pointBackgroundColor: 'rgba(148,159,177,1)',
      // pointBorderColor: '#fff',
      //  pointHoverBackgroundColor: '#fff',
      // pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    // { // dark grey
    //   //backgroundColor: 'rgb(65,42,50)',
    //   borderColor: 'rgb(66,60,96)',
    //   // pointBackgroundColor: 'rgba(77,83,96,1)',
    //   //pointBorderColor: '#fff',
    //   // pointHoverBackgroundColor: '#fff',
    //   //pointHoverBorderColor: 'rgba(77,83,96,1)'
    // },
    // { // grey
    //   // backgroundColor: 'rgba(148,159,177,0.2)',
    //   borderColor: 'rgba(148,159,177,1)',
    //   // pointBackgroundColor: 'rgba(148,159,177,1)',
    //   // pointBorderColor: '#fff',
    //   // pointHoverBackgroundColor: '#fff',
    //   // pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    // }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  notificationDetails: any;
  videoDetails: any;
  notificationId: string;
  isShowSpinner: boolean = false;
  isScheduleNotification: boolean = false;
  private district1: any;
  private year1: any;
  private year2: any;
  private district2: any;

  constructor(private apiSerivice: ApiService) {
  }

  ngOnInit() {

  }

  getData(district1: any, year1: any, district2: any, year2: any) {
    this.apiSerivice.getDataOfAZila(district1, year1).subscribe(response => {
      let myResponse = response.map(aresponse => {
        return {
          green_percentage: aresponse.green_percentage,
          month: aresponse.month
        }
      });

      myResponse.forEach(res => {
        this.lineChartData[0].data.push(res.green_percentage);
        this.lineChartData[0].fill = false;
        this.lineChartData[0].borderColor = 'rgb(255,51,51)';
        this.lineChartLabels.push(res.month);
        this.lineChartData[0].label = district1 + ", " + year1
      })
    });

    this.apiSerivice.getDataOfAZila(district2, year2).subscribe(response => {
      let myResponse = response.map(aresponse => {
        return {
          green_percentage: aresponse.green_percentage,
          month: aresponse.month
        }
      });

      myResponse.forEach(res => {
        this.lineChartData[1].data.push(res.green_percentage);
        this.lineChartData[1].fill = false;
        this.lineChartData[1].borderColor = 'rgb(102,102,255)';
        this.lineChartData[1].label = district2 + ", " + year2;
      })
    });

  }

  onDistrict1Select(value: any) {
    this.district1 = value

  }

  onYear1Select(value: any) {
    this.year1 = value;

  }

  onDistrict2Select(value: any) {
    this.district2 = value;
  }

  onYear2Select(value: any) {
    this.year2 = value;

  }

  viewData() {
    this.lineChartLabels = [];
    this.lineChartData = [
      {data: [], label: 'X_Value'},
      {data: [], label: 'Y_Value'},
    ];

    this.getData(this.district1, this.year1, this.district2, this.year2)
  }
}

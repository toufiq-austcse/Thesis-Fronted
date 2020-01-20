import { Component, OnInit } from '@angular/core';
import { NotiDataService } from '../noti-data.service';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from "../shared/services/api.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  maxMinResult:any[] = [];
  // lineChart
  public lineChartData: Array<any> = [
    {data: []},
    {data: []},
  ];
  public lineChartLabels: Array<any> = ['January','February','March','April','May','June','July','August',"September",'October','November','December'];
  public lineChartOptions: any = {
    animation: false,
    responsive: true,
    title: {
    },
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          max: 100
        }
      }]
    },
    maintainAspectRatio:false

  };

  // public lineChartColours: Array<any> = [
  //   { // grey
  //     //backgroundColor: 'rgb(50,177,107)',
  //     borderColor: 'rgb(82,177,97)',
  //     // pointBackgroundColor: 'rgba(148,159,177,1)',
  //     // pointBorderColor: '#fff',
  //     //  pointHoverBackgroundColor: '#fff',
  //     // pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  //   },
  //   { // dark grey
  //     //backgroundColor: 'rgb(65,42,50)',
  //     borderColor: 'rgb(66,60,96)',
  //     // pointBackgroundColor: 'rgba(77,83,96,1)',
  //     //pointBorderColor: '#fff',
  //     // pointHoverBackgroundColor: '#fff',
  //     //pointHoverBorderColor: 'rgba(77,83,96,1)'
  //   },
  //   { // grey
  //     //backgroundColor: 'rgba(148,159,177,0.2)',
  //     // borderColor: 'rgba(148,159,177,1)',
  //     // pointBackgroundColor: 'rgba(148,159,177,1)',
  //     // pointBorderColor: '#fff',
  //     // pointHoverBackgroundColor: '#fff',
  //     // pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  //   }
  // ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  notificationDetails: any;
  videoDetails: any;
  notificationId: string;
  isShowSpinner: boolean = false;
  isScheduleNotification: boolean = false;
  private district: any = 'Dhaka';
  private startYear: any = '2001';
  private endYear: any = '2015';

  ngOnInit() {
    this.viewData();
  }
  constructor(private apiSerivice: ApiService){

  }


  onDistrictSelect(value: any) {
    this.district = value;

  }

  onStartYearSelect(value: any) {
    this.startYear = value;

  }

  onEndYearSelect(value: any) {
    this.endYear = value;
  }

  getRandomColor(){
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ", 0.5)";
  }


  viewData() {
    this.lineChartData = [];
    this.apiSerivice.getYearRangeComparison(this.district,this.startYear,this.endYear).subscribe(response=>{
     this.startYear = +this.startYear;
     this.endYear = +this.endYear;

     for(let i=this.startYear;i<=this.endYear;i++){
       let yearData = [];

       for(let j=0;j<response.length;j++){
         if(+response[j].year == i){
           yearData.push(response[j].green_percentage);
         }
       }
       this.lineChartData.push({
       data: yearData,fill:false,  borderColor: this.getRandomColor(),label: `${i} Year`,
       });
       console.log(i);
       console.log(yearData);

     }

     console.log( this.lineChartData);
    },(err)=>{},()=>{
      //this.lineChartOptions.title.text = `Graph shows the changes of greenness in ${this.district} from ${this.startYear}-${this.endYear}`;
      //this.lineChartOptions.title.display = true;
    });
    this.apiSerivice.getMaxMinData(this.district,this.startYear,this.endYear).subscribe(response =>{
      this.maxMinResult = response;
    },(err)=>{},()=>{
      this.maxMinResult.forEach(result =>{
        result.image = 'http://localhost:9090/'+this.district+"/"+result.image;
      });
      console.log(this.maxMinResult);
    });
  }
}

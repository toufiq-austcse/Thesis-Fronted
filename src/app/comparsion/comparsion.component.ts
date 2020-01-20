import { Component, OnInit } from '@angular/core';
import {ApiService} from "../shared/services/api.service";
import {LoadingComponent} from "../loading/loading.component";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-comparsion',
  templateUrl: './comparsion.component.html',
  styleUrls: ['./comparsion.component.css']
})
export class ComparsionComponent implements OnInit {
  allDatasetNames:any;
  dataset1name: any = 'Select Dataset 1';
  dataset2name: any = 'Select Dataset 2';

  comparisionResult1:any;
  comparisionResult2:any;

  currentDistrict:any;
  days1:string[] = ['001','017'];
  days2:string[] =  ['001','017'];
  district1: any = 'Dhaka';
  year1: any = '2001';
  month1: any = 'January';
  day1: any = this.days1[0];

  district2: any = 'Dhaka';
  year2: any = '2015';
  month2: any = 'January';
  day2: any = this.days2[0];

  constructor(private apiService:ApiService) { }

  ngOnInit() {
    this.getComparisonForDataset1(this.district1,this.year1,this.month1,this.day1);
    this.getComparisonForDataset2(this.district2,this.year2,this.month2,this.day2);

  }

  onDistrictSelect(value: any) {
    this.currentDistrict = value;
    LoadingComponent.display = true;
    this.apiService.getAllDataset(value).subscribe((response)=>{
      this.allDatasetNames =  response;

    },(err)=>{},()=>{
      LoadingComponent.display = false;
    })
  }

  onMonth1Select(value: any) {
    this.month1 = value;
    this.days1 = this.getDays(value);
    this.day1 = this.days1[0];
  
  }

  onMonth2Select(value: any) {
    this.month2 = value;
    this.days2 = this.getDays(value);
    this.day2 = this.days2[0];
  }

  getDays(monthName):string[]{
    if(monthName === 'January'){
      return ['001','017']

    }else if(monthName === 'February'){
      return ['033','049']

    }else if(monthName === 'March'){
      return ['065','081']

    }else if(monthName === 'April'){
      return ['097','113']

    }else if(monthName === 'May'){
      return ['129','145']

    }else if(monthName === 'June'){
      return ['161','177']

    }else if(monthName === 'July'){
      return ['193','209']

    }else if(monthName === 'August'){
      return ['225','241']

    }else if(monthName === 'September'){
      return ['257','273']

    }else if(monthName === 'October'){
      return ['289','305']

    }else if(monthName === 'November'){
      return ['321']

    }else if(monthName === 'December'){
      return ['337','353']

    }
  }

  onViewButtonClick(queryForm: NgForm) {

    console.log('Called');
    let submittedData = queryForm.value;
    console.log(this.day1,this.month1);
    this.comparisionResult1 = null;
    this.comparisionResult2 = null;

    this.getComparisonForDataset1(this.district1,this.year1,this.month1,this.day1);
    this.getComparisonForDataset2(this.district2,this.year2,this.month2,this.day2);

  }

  getComparisonForDataset1(district,year,month,day){
    LoadingComponent.display = true;
    this.apiService.getComparsionData(district,year,month,day).subscribe(res=>{
      console.log(res);
      this.comparisionResult1 = res;
      console.log(res);
    },(err)=>{},()=>{
      LoadingComponent.display = false;
      this.comparisionResult1.image = 'http://localhost:9090/'+this.district1+"/"+this.comparisionResult1.image;
    });
  }

  getComparisonForDataset2(district,year,month,day){
    LoadingComponent.display = true;
    this.apiService.getComparsionData(district,year,month,day).subscribe(res=>{
      console.log(res);
      this.comparisionResult2 = res;
    },(err)=>{},()=>{
      LoadingComponent.display = false;
      this.comparisionResult2.image = 'http://localhost:9090/'+this.district2+"/"+this.comparisionResult2.image;
      console.log(this.comparisionResult2.image)
    });
  }

  onDistrict1Select(value: any) {
    console.log(value);
    this.district1 = value;
  }

  onYear1Select(value: any) {
    this.year1 = value;
  }

  onDay1Select(value: any) {
    this.day1 = value;
  }

  onDistrict2Select(value: any) {
    this.district2 = value;
  }

  onYear2Select(value: any) {
    this.year2 = value;
  }

  onDay2Select(value: any) {
    this.day2 = value;

  }
}

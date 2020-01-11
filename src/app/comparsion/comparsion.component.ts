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

  comparisionResult:any[] = [];
  currentDistrict:any;
  days1:string[];
  days2:string[];

  constructor(private apiService:ApiService) { }

  ngOnInit() {

  }

  // showComparison() {
  //   console.log(this.dataset1name);
  //   console.log(this.dataset2name);
  //   LoadingComponent.display = true;
  //   this.apiService.getComparsionData(this.dataset1name,this.dataset2name,this.currentDistrict).subscribe((response)=>{
  //     this.comparisionResult = response;
  //
  //   },(err)=>{},()=>{
  //     this.comparisionResult.forEach(result =>{
  //       result.image = 'http://localhost:9090/'+this.currentDistrict+"/"+result.image;
  //     });
  //
  //     console.log(this.comparisionResult);
  //     LoadingComponent.display = false;
  //   })
  // }

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
    this.days1 = this.getDays(value);
  }

  onMonth2Select(value: any) {
    this.days2 = this.getDays(value);
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
    let submittedData = queryForm.value;
    this.comparisionResult = [];

    this.apiService.getComparsionData(submittedData.district1,submittedData.year1,submittedData.month1,submittedData.day1).subscribe(res=>{
      console.log(res);
      this.comparisionResult.push(res);
      console.log(res);
    },(err)=>{},()=>{
      this.comparisionResult[0].image = 'http://localhost:9090/'+submittedData.district1+"/"+this.comparisionResult[0].image;
    });

    this.apiService.getComparsionData(submittedData.district2,submittedData.year2,submittedData.month2,submittedData.day2).subscribe(res=>{
      console.log(res);
      this.comparisionResult.push(res);
    },(err)=>{},()=>{
      this.comparisionResult[1].image = 'http://localhost:9090/'+submittedData.district2+"/"+this.comparisionResult[1].image;
    });

  }
}

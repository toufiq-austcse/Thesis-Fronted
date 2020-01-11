import { Component, OnInit } from '@angular/core';
import {ApiService} from "../shared/services/api.service";
import {LoadingComponent} from "../loading/loading.component";

@Component({
  selector: 'app-comparsion',
  templateUrl: './comparsion.component.html',
  styleUrls: ['./comparsion.component.css']
})
export class ComparsionComponent implements OnInit {
  allDatasetNames:any;
  dataset1name: any = 'Select Dataset 1';
  dataset2name: any = 'Select Dataset 2';

  comparisionResult:any;
  currentDistrict:any;
  constructor(private apiService:ApiService) { }

  ngOnInit() {

  }

  showComparison() {
    console.log(this.dataset1name);
    console.log(this.dataset2name);
    LoadingComponent.display = true;
    this.apiService.getComparsionData(this.dataset1name,this.dataset2name,this.currentDistrict).subscribe((response)=>{
      this.comparisionResult = response;

    },(err)=>{},()=>{
      this.comparisionResult.forEach(result =>{
        result.image = 'http://localhost:9090/'+this.currentDistrict+"/"+result.image;
      });

      console.log(this.comparisionResult);
      LoadingComponent.display = false;
    })
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
}

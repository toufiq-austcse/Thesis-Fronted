import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:9090';

  constructor(private readonly http: HttpClient) { }

  getAllData(){
    const url = this.baseUrl+'/api/data';
    return this.http.get(url);
  }

  getAllDataset(distrcitname:string){
    const url = this.baseUrl+'/api/dataset?district='+distrcitname;
    return this.http.get(url);
  }

  getComparsionData(dataset1:any,dataset2:any,district:any){
    const url = this.baseUrl+ '/api/data?district='+district+'&dataset1Title='+dataset1+'&dataset2Title='+dataset2;
    console.log(url);
    return this.http.get(url);
  }

  getDataOfAZila(zilaName:string,year:string):Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:9090/api/percentage/district?district=${zilaName}&year=${year}`)
  }
  getYearRangeComparison(zilaName:string,startYear:any,endYear:any):Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:9090/api/percentage/year/range?district=${zilaName}&startYear=${startYear}&endYear=${endYear}`)
  }
}
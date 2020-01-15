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

  getComparsionData(district:any,year:any,month:any,day:any){
    console.log(district,year,month);
    const url = this.baseUrl+ `/api/data?district=${district}&year=${year}&month=${month}&day=${day}`;
    console.log(url)
    return this.http.get(url);
  }

  getDataOfAZila(zilaName:string,year:string):Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:9090/api/percentage/district?district=${zilaName}&year=${year}`)
  }
  getYearRangeComparison(zilaName:string,startYear:any,endYear:any):Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:9090/api/percentage/year/range?district=${zilaName}&startYear=${startYear}&endYear=${endYear}`)
  }

  getMaxMinData(district:string,year1:string,year2:string):Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:9090/api/data/maxmin?district=${district}&year1=${year1}&year2=${year2}`);
  }
}

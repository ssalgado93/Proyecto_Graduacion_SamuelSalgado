import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { dataChart,dataRegister } from '../../assets/interfaces'
import { BehaviorSubject, Observable } from 'rxjs';

const chartData:dataChart={
  data:[],
  labels:[],
  id:'0',
  y:true
}

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  url ='http://localhost:4200/api'

  constructor(private http:HttpClient) { }

  getDataCategory(data:number){
    return this.http.get(this.url+"/categoryChart/" + data)
  }

  getProductCategories(){
    return this.http.get(this.url+"/productCategory")
  }

  getRegisterUser(data:dataRegister){
    return this.http.post(this.url+"/registerChart",data)
  }

  getCategoriesChart(){
    return this.http.get(this.url+"/categoryChart")
  }
  
  setViews(){
    return this.http.get(this.url+"/views")
  }

  getViews(data:dataRegister){
    return this.http.post(this.url+"/getviews",data)

  }

  private class$ = new BehaviorSubject<dataChart>(chartData)

  get selectedData$(): Observable<dataChart>{
    return this.class$.asObservable()
  }

  setData(d:dataChart):void{
    this.class$.next(d)
  }


}

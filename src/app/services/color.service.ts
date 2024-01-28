import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Color } from '../models/color.model';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  // apiUrl = "https://apiv2.rentacar.yeyilmaz.online/api/Colors/";
  apiUrl = "https://localhost:5001/api/Colors/";
  // apiUrl = "https://localhost:44345/api/Colors/";
  constructor(private httpClient:HttpClient) { }


  
  getColors(): Observable<ListResponseModel<Color>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }

  addColor(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",color)
  }

  updateColor(color:Color):Observable<ResponseModel>{
    return this.httpClient.patch<ResponseModel>(this.apiUrl+"update",color);
  }

  deleteColor(color:Color):Observable<ResponseModel>{
    return this.httpClient.delete<ResponseModel>(this.apiUrl+"delete", {body:color});
  }




}

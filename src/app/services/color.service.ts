import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Color } from '../models/color.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = "https://localhost:5001/api/Colors/";
  constructor(private httpClient:HttpClient) { }


  
  getColors(): Observable<ListResponseModel<Color>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }


}

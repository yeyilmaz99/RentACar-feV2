import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/models/brand.model';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = "https://apiv2.rentacar.yeyilmaz.online/api/Brands/";
  // apiUrl = "https://localhost:5001/api/Brands/";
  constructor(private httpClient:HttpClient) { }

  getBrands(): Observable<ListResponseModel<Brand>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  addBrand(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "add", brand);
  }

  deleteBrand(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.delete<ResponseModel>(this.apiUrl+"delete", {body:brand});
  }

  updateBrand(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.patch<ResponseModel>(this.apiUrl+"update",brand);
  }

}

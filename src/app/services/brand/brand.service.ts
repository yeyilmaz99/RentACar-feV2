import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/models/brand.model';
import { BrandImage } from 'src/app/models/brandImage';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = "https://apiv2.rentacar.yeyilmaz.online/api/";
  // apiUrl = "https://localhost:5001/api/";
  constructor(private httpClient:HttpClient) { }

  getBrands(): Observable<ListResponseModel<Brand>> {
    let newPath = this.apiUrl + 'Brands/getdetail';
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  addBrand(formData:FormData):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "Brands/add", formData);
  }

  deleteBrand(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.delete<ResponseModel>(this.apiUrl+"Brands/delete", {body:brand});
  }

  updateBrand(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.patch<ResponseModel>(this.apiUrl+"Brands/update",brand);
  }

  getBrandImage(brandId:number):Observable<SingleResponseModel<BrandImage>>{
    return this.httpClient.get<SingleResponseModel<BrandImage>>(this.apiUrl+"BrandImages/get?brandId="+brandId);
  }


}

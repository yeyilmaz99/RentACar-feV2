import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { CarAndImageDto } from 'src/app/models/carAndImageDto';
import { CarImage } from 'src/app/models/carImage';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = 'https://apiv2.rentacar.yeyilmaz.online/api/';
  // apiUrl = 'https://localhost:5001/api/';
  constructor(private httpClient: HttpClient) { }


  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'Cars/getcarsdetails';
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarById(id:number):Observable<SingleResponseModel<Car>>{
    let newPath = this.apiUrl + "Cars/getcardetails?carId=";
    return this.httpClient.get<SingleResponseModel<Car>>(newPath+id);
  }

  getCarProfileImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl + 'CarImages/getall?carId=' + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  getCarDetailImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl + 'CarDetailImages/getall?carId=' + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  addCar(formData:FormData): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "Cars/add", formData);
  }

  deleteCar(car:any):Observable<ResponseModel>{
    return this.httpClient.delete<ResponseModel>(this.apiUrl+'Cars/delete', {body:car})
  }

  updateCar(car:Car):Observable<ResponseModel>{
    return this.httpClient.patch<ResponseModel>(this.apiUrl+'Cars/update',car);
  }

  addCarImages(carId:number, formData:FormData ):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'CarImages/add', {body: carId, formData})
  }

  getCarsByBrandAndColorId(colorId:number,brandId:number):Observable<ListResponseModel<Car>>{
    return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl+"Cars/getbybrandidandcolorid?colorId="+colorId+"&brandId="+brandId);
  }

}

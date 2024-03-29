import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Rent } from 'src/app/models/rentModel';
import { Rental } from 'src/app/models/rental';
import { RentalDetails } from 'src/app/models/rentalDetails';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = "https://apiv2.rentacar.yeyilmaz.online/api/Rentals/";
  // apiUrl = "https://localhost:5001/api/Rentals/";
  // apiUrl = "https://localhost:44345/api/Rentals/";
  constructor(private httpClient: HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>>{
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl+"getrentaldetails");
  }
  addRental(rent:Rent):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",rent);
  }
  checkIfCarIsReturned(id:number):Observable<ResponseModel>{
    return this.httpClient.get<ResponseModel>(this.apiUrl+"checkifcarisreturned?id="+id);
  }
  getAllRentals():Observable<ListResponseModel<Rental>>{
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl+"getall");
  }
  getRentalsByUserId(userId:number):Observable<ListResponseModel<RentalDetails>>{
    return this.httpClient.get<ListResponseModel<RentalDetails>>(this.apiUrl+"getrentaldetailsbyuserid?userId="+ userId);
  }
  getRecentRentalsByUserId(userId:number):Observable<ListResponseModel<RentalDetails>>{
    return this.httpClient.get<ListResponseModel<RentalDetails>>(this.apiUrl+"getrecentrentalsbyuserid?userId="+userId);
  }

}

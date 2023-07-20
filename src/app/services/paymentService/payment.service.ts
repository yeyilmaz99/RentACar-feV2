import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from 'src/app/models/payment';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  // apiUrl = "https://apiv2.rentacar.yeyilmaz.online/api/Payment/"
  apiUrl = "https://localhost:5001/api/Payment/"

  constructor(
    private httpClient:HttpClient
  ) { }

  add(payment:Payment):Observable<ResponseModel>{
    let newUrl = this.apiUrl +"add"
    return this.httpClient.post<ResponseModel>(newUrl,payment);
  }

}

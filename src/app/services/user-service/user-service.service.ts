import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActiveUser } from 'src/app/models/activeUser';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { UserList } from 'src/app/models/userList';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = "https://localhost:5001/api/Users/"
  constructor(
    private httpClient: HttpClient
  ) { }


  getActiveUsers():Observable<ListResponseModel<ActiveUser>>{
    let newPath = this.apiUrl + "getallfindeks"
    return this.httpClient.get<ListResponseModel<ActiveUser>>(newPath);
  }

  getAllUsers():Observable<ListResponseModel<UserList>>{
    let newPath = this.apiUrl + "getall"
    return this.httpClient.get<ListResponseModel<UserList>>(newPath);
  }

  updateUser(user:UserList):Observable<ResponseModel>{
    let newPath = this.apiUrl + "update"
    return this.httpClient.patch<ResponseModel>(newPath, user)
  }
}

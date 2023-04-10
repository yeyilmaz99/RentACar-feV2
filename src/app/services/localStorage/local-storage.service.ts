import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }



  getItem(name:string){
    return localStorage.getItem("token");
  }

  setItem(name:string, data:string){
    localStorage.setItem(name,data);
  }

  deleteItem(name:string){
    localStorage.removeItem(name);
  }


}

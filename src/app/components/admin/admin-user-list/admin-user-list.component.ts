import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActiveUser } from 'src/app/models/activeUser';
import { AppState } from 'src/app/store/app.state';
import { loadActiveUsers, loadUsers } from '../store/admin.actions';
import { getActiveUsers, getUsers } from '../store/admin.selector';
import { UserList } from 'src/app/models/userList';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {
  activeUsers:ActiveUser[] = [];
  users:UserList[] = [];
  constructor( private store:Store<AppState>) { }

  ngOnInit(): void {
    this.getUsers();
    this.getActiveUsers();
  }


  delete(){

  }

  getUsers(){
    this.store.dispatch(loadUsers());
    this.store.select(getUsers).subscribe(response => {
      this.users = response;
    })
    console.log("hello1")
  }

  getActiveUsers(){
    this.store.dispatch(loadActiveUsers());
    this.store.select(getActiveUsers).subscribe(response => {
      this.activeUsers = response
      })
      console.log("hello2")
  }

}

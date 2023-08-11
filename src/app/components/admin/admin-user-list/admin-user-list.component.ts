import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActiveUser } from 'src/app/models/activeUser';
import { AppState } from 'src/app/store/app.state';
import { loadActiveUsers, loadUsers, updateUser } from '../store/admin.actions';
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
    this.store.select(getUsers).subscribe(response => {
      this.users = response;
      if(this.users == null){
        this.store.dispatch(loadUsers());
      }
    })
  }

  getActiveUsers(){
    this.store.select(getActiveUsers).subscribe(response => {
      this.activeUsers = response
      if(this.users == null) {
        this.store.dispatch(loadActiveUsers());
      }
      })


  }


}

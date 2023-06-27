import { Component, OnInit } from '@angular/core';
import { loadUserRentals } from '../../car/state/car.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getUserId } from '../../auth/state/auth.selector';
import { getUserRentals } from '../../car/state/car.selector';
import { Rental } from 'src/app/models/rental';

@Component({
  selector: 'app-user-rentals',
  templateUrl: './user-rentals.component.html',
  styleUrls: ['./user-rentals.component.css']
})
export class UserRentalsComponent implements OnInit {
  userId:number;
  rentals:Rental[];
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(getUserId).subscribe(response => {
      this.userId = response
     })
     this.getRentals()
  }


  getRentals(){
    const userId = this.userId
    this.store.dispatch(loadUserRentals({userId}))
    this.store.select(getUserRentals).subscribe(response =>{
      this.rentals = response;
    })
  }
}

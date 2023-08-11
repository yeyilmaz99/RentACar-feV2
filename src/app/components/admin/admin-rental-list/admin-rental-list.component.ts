import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Rental } from 'src/app/models/rental';
import { AppState } from 'src/app/store/app.state';
import { loadRentals } from '../store/admin.actions';
import { getRentals } from '../store/admin.selector';

@Component({
  selector: 'app-admin-rental-list',
  templateUrl: './admin-rental-list.component.html',
  styleUrls: ['./admin-rental-list.component.css']
})
export class AdminRentalListComponent implements OnInit {
  rentals:Rental[] = [];
  constructor( private store:Store<AppState>) { }

  ngOnInit(): void {
    this.getRentals();
  }

  getRentals(){
    this.store.select(getRentals).subscribe(response=> {
      this.rentals = response
      if(this.rentals ==null){
        this.store.dispatch(loadRentals());
      }
    })
  }



}

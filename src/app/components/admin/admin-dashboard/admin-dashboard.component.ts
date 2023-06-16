import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/models/brand.model';
import { Car } from 'src/app/models/car.model';
import { Color } from 'src/app/models/color.model';
import { AppState } from 'src/app/store/app.state';
import { getColors } from '../../color/state/color.selector';
import { getCars } from '../../car/state/car.selector';
import { getBrands } from '../../brand/state/brand.selector';
import { loadBrands } from '../../brand/state/brand.actions';
import { loadColors } from '../../color/state/color.actions';
import { loadCars } from '../../car/state/car.actions';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  cars:Car[];
  brands:Brand[];
  colors:Color[];
  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.getColors();
    this.getCars();
    this.getBrands();
    this.store.dispatch(loadCars())
  }

  getColors(){
    this.store.select(getColors).subscribe(response => {
      this.colors = response;
      if(this.colors == null){
        this.store.dispatch(loadColors());
      }

    })
  }
  getCars(){
    this.store.select(getCars).subscribe(response => {
      this.cars = response
      if(this.cars == null){
        this.store.dispatch(loadCars());
      }
    });
  }
  getBrands(){
    this.store.select(getBrands).subscribe(response => {
      this.brands = response
      if(this.brands == null ) {
        this.store.dispatch(loadBrands());
      }
    })

  }



}

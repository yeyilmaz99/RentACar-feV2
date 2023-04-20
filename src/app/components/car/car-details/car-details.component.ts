import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { AppState } from 'src/app/store/app.state';
import { getCarById, getCarImages } from '../state/car.selector';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';
import { CarImage } from 'src/app/models/carImage';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  car:Observable<Car>
  carImages:Observable<CarImage[]>
  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.car = this.store.select(getCarById);
    this.carImages = this.store.select(getCarImages);
  }

}


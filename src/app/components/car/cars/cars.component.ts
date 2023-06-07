import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { getCars } from '../state/car.selector';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loadCars } from '../state/car.actions';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { OrderByPipe } from 'src/app/pipes/order-by.pipe';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  carFilterForm: FormGroup;
  cars:Car[];
  carsSlice: Car[];
  filterText: string = '';
  constructor(private store:Store<AppState>,private orderByPipe:OrderByPipe,private formBuilder: FormBuilder, ) { }

  ngOnInit(): void {
    this.getCars();
    this.createCarFilterForm();
  }

  getCars(){
    this.store.select(getCars).subscribe(response => {
      this.cars = response
      if(response){
        this.carsSlice = response.slice(0,12)
      }
      if(this.cars == null){

        this.store.dispatch(loadCars());
      }
    })
  }

  paginatorLength(){
    if(this.cars){
      return this.cars.length
    }
    return undefined
  }

  sortAll(){
    this.cars = this.orderByPipe.transform(this.cars, 'carId', 'asc')
    this.carsSlice = this.cars.slice(0,12)
    this.paginator.firstPage();
  }
  sortLow(){
    this.cars = this.orderByPipe.transform(this.cars, 'dailyPrice', 'asc')
    this.carsSlice = this.cars.slice(0,12)
    this.paginator.firstPage();
  }
  sortHigh(){
    this.cars = this.orderByPipe.transform(this.cars, 'dailyPrice', 'desc')
    this.carsSlice = this.cars.slice(0,12)
    this.paginator.firstPage();
  }


  OnPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.cars.length) {
      endIndex = this.cars.length;
    }
    this.carsSlice = this.cars.slice(startIndex, endIndex);
  }



  filter() {
  }

  createCarFilterForm() {
    this.carFilterForm = this.formBuilder.group({
      colorId: ['', Validators.required],
      brandId: ['', Validators.required],
    });
  }







}

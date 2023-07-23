import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { getCars, getFilteredCars } from '../state/car.selector';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loadCars, loadFilteredCars } from '../state/car.actions';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { OrderByPipe } from 'src/app/pipes/order-by.pipe';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Brand } from 'src/app/models/brand.model';
import { Color } from 'src/app/models/color.model';
import { getBrands } from '../../brand/state/brand.selector';
import { getColors } from '../../color/state/color.selector';
import { loadBrands } from '../../brand/state/brand.actions';
import { loadColors } from '../../color/state/color.actions';
import { FilterModel } from 'src/app/models/filterModel';
import { CarService } from 'src/app/services/car/car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  carFilterForm: FormGroup;
  cars:Car[];
  brands:Brand[];
  colors:Color[];
  carsSlice: Car[];
  filterText: string = '';
  removeFilter:boolean=false;
  constructor(private store:Store<AppState>,private orderByPipe:OrderByPipe,private formBuilder: FormBuilder, private carService:CarService) { }

  ngOnInit(): void {
    this.getCars();
    this.getBrands();
    this.getColors();
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

  getBrands(){
    this.store.select(getBrands).subscribe(response => {
      this.brands = response
      if(this.brands == null ) {
        this.store.dispatch(loadBrands());
      }
    })

  }

  getColors(){
    this.store.select(getColors).subscribe(response => {
      this.colors = response
      if(this.colors == null) {
        this.store.dispatch(loadColors());
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
    if (this.carFilterForm.valid) {
      const filter: FilterModel = Object.assign(
        {},
        this.carFilterForm.value
      );
      this.store.dispatch(loadFilteredCars({filter}));
      this.store.select(getFilteredCars).subscribe(response =>{
        this.cars = response
        this.carsSlice = response.slice(0,12)
        this.removeFilter = true;
      } )
    } else {
    }
  }

  createCarFilterForm() {
    this.carFilterForm = this.formBuilder.group({
      colorId: ['', Validators.required],
      brandId: ['', Validators.required],
    });
  }

  removeFilterbtn(){
    this.getCars();
    this.removeFilter = false;
  }







}

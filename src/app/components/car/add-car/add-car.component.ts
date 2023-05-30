import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/models/brand.model';
import { Car } from 'src/app/models/car.model';
import { Color } from 'src/app/models/color.model';
import { CarService } from 'src/app/services/car/car.service';
import { AppState } from 'src/app/store/app.state';
import { getBrands } from '../../brand/state/brand.selector';
import { loadBrands } from '../../brand/state/brand.actions';
import { getColors } from '../../color/state/color.selector';
import { loadColors } from '../../color/state/color.actions';
import { addCar } from '../state/car.actions';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  carAddForm : FormGroup;
  brands:Brand[];
  colors:Color[];
  constructor( private store:Store<AppState>,private formBuilder:FormBuilder, private carService:CarService, private toastrService:ToastrService) { }

  ngOnInit(): void {
  this.createCarAddForm();
    this.getBrands();
    this.getColors();

  }


  getBrands(){
    this.store.select(getBrands).subscribe(response => {
      this.brands = response;
    })
    this.store.dispatch(loadBrands());

  }

  getColors(){
    this.store.select(getColors).subscribe(response =>  {
      this.colors = response;
    });
    this.store.dispatch(loadColors());
  }



  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      carName: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
      findeksPoint: ['', Validators.required]
    });
  }

  addCar() {
    if (this.carAddForm.valid) {
      const car = Object.assign({},this.carAddForm.value)
      this.store.dispatch(addCar({car}))
      this.carAddForm.reset();
    }
  }



}

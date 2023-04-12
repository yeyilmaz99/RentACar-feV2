import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Brand } from 'src/app/models/brand.model';
import { AppState } from 'src/app/store/app.state';
import { addBrand } from '../state/brand.actions';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';
import { BrandService } from 'src/app/services/brand/brand.service';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {
  brandForm:FormGroup
  brands:Brand[];
  constructor(private formBuilder:FormBuilder, private store:Store<AppState> ,private brandService:BrandService) { }

  ngOnInit(): void {
    this.createBrandForm();
  }

  createBrandForm(){
    this.brandForm = this.formBuilder.group({
      brandName : ["", Validators.required]
    })
  }


  addBrand(){
    if(!this.brandForm.valid){
      return;
    }
    // this.store.dispatch(setLoadingSpinner({status:true}))
    const brand = Object.assign({},this.brandForm.value)
    this.store.dispatch(addBrand({brand}))
  }



}

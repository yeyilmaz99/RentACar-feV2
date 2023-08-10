import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Brand } from 'src/app/models/brand.model';
import { AppState } from 'src/app/store/app.state';
import { addBrand, deleteBrand, loadBrands, updateBrand } from '../state/brand.actions';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';
import { BrandService } from 'src/app/services/brand/brand.service';
import { getBrands } from '../state/brand.selector';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {
  brandForm:FormGroup
  brandToDeleteForm:FormGroup;
  brandToUpdateForm:FormGroup;
  brands:Brand[];
  brandValue:string
  constructor(private formBuilder:FormBuilder, private store:Store<AppState> ,private brandService:BrandService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createAddBrandForm();
    this.createBrandToDeleteForm();
    this.createBrandToUpdateForm();
    this.getBrands();
  }

  createAddBrandForm(){
    this.brandForm = this.formBuilder.group({
      brandName : ["", Validators.required],
      imageData : [File, Validators.required]
    })
  }

  getBrands(){
    this.store.select(getBrands).subscribe(response => {
      this.brands = response
      if(this.brands == null){
        this.store.dispatch(loadBrands());
      }
    });

  }


  addBrand(){
    if(!this.brandForm.valid){
      return;
    }
    // this.store.dispatch(setLoadingSpinner({status:true}))
    let brand = Object.assign({},this.brandForm.value)
    console.log(brand);
    const formData = new FormData();
    formData.append('BrandName', brand.brandName.toString());

    const blob = new Blob([brand.imageData], { type: 'image/jpeg' }); 
    formData.append('ImageData', blob, 'brand-image.png');

    console.log(this.brandForm.value);
    this.store.dispatch(addBrand({formData}))
  }

  onFileSelected(event: any) {
    const file = event.target.files[0]
    this.brandForm.patchValue({ imageData: file });
  }


  createBrandToDeleteForm(){
    this.brandToDeleteForm = this.formBuilder.group({
      brandId: ["", Validators.required]
    })
  }
  createBrandToUpdateForm(){
    this.brandToUpdateForm = this.formBuilder.group({
      brandId : ["", Validators.required],
      brandName: ["", Validators.required]
    })
  }


  deleteBrand(){
    if(!this.brandToDeleteForm.valid){
      this.toastrService.error("An unexpected error occurred, Please try again")
      this.store.dispatch(loadBrands());
      this.store.select(getBrands).subscribe(response => {
        this.brands = response
      })
      return;
    }
      let brand : Brand = Object.assign({}, this.brandToDeleteForm.value);
      this.store.dispatch(deleteBrand({brand}));
      this.brandToDeleteForm.reset();
      this.toastrService.success("Successfuly Deleted")
  }
  updateBrand(){
    if(!this.brandToUpdateForm.valid){
      this.toastrService.error("An unexpected error occurred, Please try again");
      this.store.dispatch(loadBrands());
      this.store.select(getBrands).subscribe(response => {
        this.brands = response
      })
      return;
    }
    let brand: Brand = Object.assign({}, this.brandToUpdateForm.value);
    this.store.dispatch(updateBrand({brand}));
    this.brandToDeleteForm.reset();
    this.toastrService.success("Successfuly Updated");
  }



}

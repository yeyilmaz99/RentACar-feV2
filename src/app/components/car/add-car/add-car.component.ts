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
import { addCar, addCarImage, loadCars } from '../state/car.actions';
import { CarImage } from 'src/app/models/carImage';
import { CarAndImageDto } from 'src/app/models/carAndImageDto';
import { CarAddModel } from 'src/app/models/carAddModel';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  carAddForm : FormGroup;
  carDetailImagesForm: FormGroup;
  selectedImages: File | null;
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
      findeksPoint: ['', Validators.required],
      imageData: [File, Validators.required],
      detailImages: [FileList, Validators.required]
    });
  }




  addCar() {
    if (this.carAddForm.valid) {
      let car: CarAddModel = Object.assign({}, this.carAddForm.value);      
      const formData = new FormData();
      formData.append('BrandId', car.brandId.toString());
      formData.append('ColorId', car.colorId.toString());
      formData.append('CarName', car.carName);
      formData.append('ModelYear', car.modelYear.toString());
      formData.append('DailyPrice', car.dailyPrice.toString());
      formData.append('Description', car.description);
      formData.append('FindeksPoint', car.findeksPoint.toString());
      
      const blob = new Blob([car.imageData], { type: 'image/jpeg' }); 
      formData.append('ImageData', blob, 'car-image.png');
  
      const detailImages: FileList = this.carAddForm.get('detailImages').value;

      for (let i = 0; i < detailImages.length; i++) {
        const image = detailImages[i];
        const blob = new Blob([image], { type: 'image/jpeg' });
        formData.append(`DetailImages`, blob, `car-image-${i}.png`);
      }
      this.store.dispatch(addCar({ formData }));
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0]
    this.carAddForm.patchValue({ imageData: file });
  }

  onFileSelectedForDetails(event: any) {
    const files: FileList = event.target.files;
    this.carAddForm.get('detailImages').setValue(files);
  }
  


}

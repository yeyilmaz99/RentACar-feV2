import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Color } from 'src/app/models/color.model';
import { getColors } from '../state/color.selector';
import { addColor, deleteColor, loadColors, updateColor } from '../state/color.actions';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { getBrands } from '../../brand/state/brand.selector';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';
import { PaymentService } from 'src/app/services/paymentService/payment.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeHtmlPipe } from 'src/app/pipes/example.pipe';
import { SignalRService } from 'src/app/services/signal-r/signal-r.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  colorForm:FormGroup
  colorUpdateForm:FormGroup
  colors:Color[];
  colorToDeleteForm:FormGroup;
  constructor(
    private formBuilder:FormBuilder, 
    private store:Store<AppState>, 
    private toastrService:ToastrService ) {    

   }
  

  ngOnInit(): void {
    this.createColorForm();
    this.createColorToDeleteForm();
    this.createColorUpdateForm();
    this.getColors();
  }



  getColors(){
    this.store.select(getColors).subscribe(response => {
      this.colors = response
      if(this.colors == null){
        this.store.dispatch(loadColors())
      }
    })
  }
  addColor(){
    if(!this.colorForm.valid){
      return;
    }
    const color = Object.assign({},this.colorForm.value)
    this.store.dispatch(addColor({color}))
    this.resetForms();
  }

  deleteColor(){
    if(!this.colorToDeleteForm.valid){
      this.toastrService.error("An unexpected error occurred, Please try again")
      this.store.dispatch(loadColors());
      this.store.select(getColors).subscribe(response => {
        this.colors = response
      })
      return;
    }
    let color : Color = Object.assign({}, this.colorToDeleteForm.value);
    this.store.dispatch(deleteColor({color}));
    this.toastrService.success("Successfuly Deleted")
    this.resetForms();
  }

  resetForms(){
    this.colorForm.reset();
    this.colorToDeleteForm.reset();
    this.colorUpdateForm.reset();
  }

  updateColor(){
    if(!this.colorUpdateForm.valid){
      this.toastrService.error("An unexpected error occurred, Please try again")
      this.store.dispatch(loadColors());
      this.store.select(getColors).subscribe(response => {
        this.colors = response
      })
      return;
    }
    let color :Color = Object.assign({}, this.colorUpdateForm.value);
    this.store.dispatch(updateColor({color}))
    this.toastrService.success("Successfuly Updated")
    this.resetForms();
  }


  createColorForm(){
    this.colorForm = this.formBuilder.group({
      colorName : ["", Validators.required]
    })
  }
  createColorUpdateForm(){
    this.colorUpdateForm = this.formBuilder.group({
      colorId : ["", Validators.required],
      colorName: ["", Validators.required]
    })
  }
  createColorToDeleteForm(){
    this.colorToDeleteForm = this.formBuilder.group({
      colorId: ["",Validators.required]
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Color } from 'src/app/models/color.model';
import { getColors } from '../state/color.selector';
import { deleteColor, loadColors } from '../state/color.actions';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { getBrands } from '../../brand/state/brand.selector';
import { Observable } from 'rxjs';

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
  constructor( private formBuilder:FormBuilder, private store:Store<AppState> ) { }

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

  deleteColor(){
    if(this.colorToDeleteForm.valid){
      let color : Color = Object.assign({}, this.colorToDeleteForm.value);
      this.store.dispatch(deleteColor({color}));
      this.colorToDeleteForm.reset();
    }
    this.getColors();
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

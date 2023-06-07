import { Component, OnInit } from '@angular/core';
import { loadBrands } from '../state/brand.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Brand } from 'src/app/models/brand.model';
import { getBrands } from '../state/brand.selector';
import { loadColors } from '../../color/state/color.actions';
import { Color } from 'src/app/models/color.model';
import { getColors } from '../../color/state/color.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  brands:Brand[];
  colors:Color[];
  constructor(private store:Store<AppState>, ) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
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


}

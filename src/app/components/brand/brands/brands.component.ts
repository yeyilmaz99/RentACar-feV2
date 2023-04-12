import { Component, OnInit } from '@angular/core';
import { loadBrands } from '../state/brand.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Brand } from 'src/app/models/brand.model';
import { getBrands } from '../state/brand.selector';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  brands:Brand[];
  constructor(private store:Store<AppState>, ) { }

  ngOnInit(): void {
    this.getBrands();
  }


  getBrands(){
    this.store.dispatch(loadBrands());
    this.store.select(getBrands).subscribe(response => {
      this.brands = response
    })
  }


}

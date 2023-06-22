import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Brand } from 'src/app/models/brand.model';
import { AppState } from 'src/app/store/app.state';
import { getBrands } from '../../brand/state/brand.selector';
import { loadBrands } from '../../brand/state/brand.actions';

@Component({
  selector: 'app-admin-brand-list',
  templateUrl: './admin-brand-list.component.html',
  styleUrls: ['./admin-brand-list.component.css']
})
export class AdminBrandListComponent implements OnInit {
  brands:Brand[] = [];
  dataLoaded:boolean = true;
  brandToDelete:Brand = {brandId:0, brandName:''};
  constructor(private store:Store<AppState>, ) { }

  ngOnInit(): void {
    this.getBrands();
  }



  getBrands(){
    this.store.select(getBrands).subscribe(response => {
      this.brands = response
      if(this.brands == null ) {
        this.store.dispatch(loadBrands());
      }
    })

  }

}

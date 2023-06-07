import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Brand } from 'src/app/models/brand.model';
import { Color } from 'src/app/models/color.model';
import { AppState } from 'src/app/store/app.state';
import { getBrands } from '../brand/state/brand.selector';
import { loadBrands } from '../brand/state/brand.actions';
import { getColors } from '../color/state/color.selector';
import { loadColors } from '../color/state/color.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private store:Store<AppState>, ) { }
  ngOnInit(): void {

  }

}

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CarsComponent } from "./cars/cars.component";
import { AddCarComponent } from "./add-car/add-car.component";
import { CarDetailsComponent } from './car-details/car-details.component';
import { EffectsModule } from "@ngrx/effects";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Car } from "src/app/models/car.model";
import { CarEffects } from "./state/car.effects";
import { StoreModule } from "@ngrx/store";
import { CAR_STATE_NAME } from "./state/car.selector";
import { carReducer } from "./state/car.reducers";
import { FilterPipe } from "src/app/pipes/filter.pipe";
import { MatPaginatorModule } from '@angular/material/paginator';




const routes: Routes = [

    {
        path: '', children: [
            {path:'',pathMatch:"full",redirectTo:'cars'},
            { path: 'cars', component: CarsComponent },
            { path: 'add-car', component: AddCarComponent },
            { path: 'car-details', component: CarDetailsComponent }

        ]
    }

]


  function sortByName(a:Car, b:Car){
    let compare = a.carName.localeCompare(b.carName);
    // if(compare>0) {return 1;}
    // if(compare<0) {return -1;}
    return compare
  }   



@NgModule({
    declarations: [
        CarsComponent,
        AddCarComponent,
        CarDetailsComponent,
        FilterPipe
    ],

    imports: [
        CommonModule,
        MatPaginatorModule,
        RouterModule.forChild(routes),
        EffectsModule.forFeature([CarEffects]),
        FormsModule,
        StoreModule.forFeature(CAR_STATE_NAME,carReducer)
    ],
    providers:[]
})


export class CarModule {

}
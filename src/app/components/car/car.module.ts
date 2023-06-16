import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CarsComponent } from "./cars/cars.component";
import { AddCarComponent } from "./add-car/add-car.component";
import { CarDetailsComponent } from './car-details/car-details.component';
import { EffectsModule } from "@ngrx/effects";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
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
            { path: '', component: CarsComponent },
            { path: 'add-car', component: AddCarComponent },
            { path: 'car/:id', component: CarDetailsComponent }
        ]
    }

]



@NgModule({
    declarations: [
        CarsComponent,
        AddCarComponent,
        CarDetailsComponent,
        FilterPipe
    ],

    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatPaginatorModule,
        RouterModule.forChild(routes),
        EffectsModule.forFeature([]),
        FormsModule,
        StoreModule.forFeature(CAR_STATE_NAME,carReducer)
    ],
    providers:[]
})


export class CarModule {

}
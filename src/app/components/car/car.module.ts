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
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { RentComponent } from "./car-details/rent/rent.component";
import { MatNativeDateModule } from "@angular/material/core";
import { LoginGuard } from "src/app/guards/login.guard";
import { ByteToImagePipe } from "src/app/pipes/byte-to-image-pipe.pipe";




const routes: Routes = [

    {
        path: '', children: [
            {path:'',pathMatch:"full",redirectTo:'cars'},
            { path: '', component: CarsComponent },
            { path: 'add-car', component: AddCarComponent },
            { path: 'car/:id', component: CarDetailsComponent , children:[
             {path: 'rent/:id', component:RentComponent, canActivate:[LoginGuard]} 
            ] }
        ]
    }

]



@NgModule({
    declarations: [
        CarsComponent,
        AddCarComponent,
        CarDetailsComponent,
        FilterPipe,
        RentComponent,
        ByteToImagePipe
    ],

    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatPaginatorModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        RouterModule.forChild(routes),
        EffectsModule.forFeature([CarEffects]),
        FormsModule,
        StoreModule.forFeature(CAR_STATE_NAME,carReducer),

    ],
    providers:[]
})


export class CarModule {

}
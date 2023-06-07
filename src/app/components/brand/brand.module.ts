import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrandEffects } from "./state/brand.effects";
import { BRAND_STATE_NAME } from "./state/brand.selector";
import { brandReducer } from "./state/brand.reducer";
import { StoreModule } from "@ngrx/store";
import { BrandsComponent } from "./brands/brands.component";
import { AddBrandComponent } from "./add-brand/add-brand.component";




const routes: Routes = [

    {path: '', children: [
        { path:'' , pathMatch:'full', component:BrandsComponent},
        { path: 'add', component:AddBrandComponent}
    ]}


]



@NgModule({
    declarations: [
        AddBrandComponent,
    ],

    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ReactiveFormsModule,
        FormsModule,
        MatPaginatorModule,
        RouterModule.forChild(routes),
        EffectsModule.forFeature([]),
        FormsModule,
        StoreModule.forFeature(BRAND_STATE_NAME,brandReducer)
    ],
    providers:[]
})


export class BrandModule {

}
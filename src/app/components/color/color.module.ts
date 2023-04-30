import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatPaginatorModule } from '@angular/material/paginator';
import { ColorEffects } from "./state/color.effects";
import { COLOR_STATE_NAME } from "./state/color.selector";
import { colorReducer } from "./state/color.reducer";
import { StoreModule } from "@ngrx/store";




const routes: Routes = [

    {path: '', children: [
    ]}


]



@NgModule({
    declarations: [
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
        StoreModule.forFeature(COLOR_STATE_NAME,colorReducer)
    ],

    providers:[]
})


export class ColorModule {

}
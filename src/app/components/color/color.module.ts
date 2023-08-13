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
import { ColorAddComponent } from './color-add/color-add.component';
import { AdminGuard } from "src/app/guards/admin.guard";




const routes: Routes = [

    {path: '', children: [
        { path: '', pathMatch:'full', redirectTo:'settings'},
        { path: 'settings', pathMatch:'full', component:ColorAddComponent, canActivate:[AdminGuard]}
    ]}
]



@NgModule({
    declarations: [
    ColorAddComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatPaginatorModule,
        RouterModule.forChild(routes),
        EffectsModule.forFeature([]),
        StoreModule.forFeature(COLOR_STATE_NAME,colorReducer)
    ],

    providers:[]
})


export class ColorModule {

}
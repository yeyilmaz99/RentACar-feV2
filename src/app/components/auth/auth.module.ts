import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EffectsModule } from "@ngrx/effects";

const routes: Routes = [
    {
        path: '', children: [
            { path: '', pathMatch:"full", redirectTo: 'login', },
            {
                path: 'login', component: LoginComponent
            },
            {path: 'signup', component:SignUpComponent}
        ]
    }
]


@NgModule({

    declarations: [LoginComponent, SignUpComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        EffectsModule.forFeature()
    ],

})

export class AuthModule {

}
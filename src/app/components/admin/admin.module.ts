import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatPaginatorModule } from '@angular/material/paginator';
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { AdminComponent } from './admin.component';
import { AdminCarListComponent } from './admin-car-list/admin-car-list.component';
import { StoreModule } from "@ngrx/store";
import { CAR_STATE_NAME } from "../car/state/car.selector";
import { carReducer } from "../car/state/car.reducers";
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { AdminRentalListComponent } from './admin-rental-list/admin-rental-list.component';
import { AdminColorListComponent } from './admin-color-list/admin-color-list.component';
import { ADMIN_PANEL_STATE_NAME } from "./store/admin.selector";
import { adminReducer } from "./store/admin.reducer";
import { EffectsModule } from "@ngrx/effects";
import { CarEffects } from "../car/state/car.effects";
import { AdminEffects } from "./store/admin.effects";




const routes: Routes = [

    {
        path: '', children: [
            {path:'',pathMatch:"full",redirectTo:'dashboard'},
            {path: 'dashboard', component:AdminDashboardComponent},
            {path: 'car-list', component:AdminCarListComponent},
            {path: 'user-list', component:AdminUserListComponent}
        ]
    }

]



@NgModule({
    declarations: [
        AdminDashboardComponent,
        AdminNavbarComponent,
        AdminSidebarComponent,
        AdminComponent,
        AdminCarListComponent,
        AdminUserListComponent,
        AdminRentalListComponent,
        AdminColorListComponent
    ],

    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatPaginatorModule,
        RouterModule.forChild(routes),
        FormsModule,
        EffectsModule.forFeature([CarEffects,AdminEffects]),
        StoreModule.forFeature(CAR_STATE_NAME,carReducer),
        StoreModule.forFeature(ADMIN_PANEL_STATE_NAME,adminReducer)
    ],
    providers:[]
})


export class AdminModule {

}
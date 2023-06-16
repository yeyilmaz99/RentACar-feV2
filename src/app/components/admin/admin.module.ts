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




const routes: Routes = [

    {
        path: '', children: [
            {path:'',pathMatch:"full",redirectTo:'dashboard'},
            {path: 'dashboard', component:AdminDashboardComponent},
            {path: 'car-list', component:AdminCarListComponent}
        ]
    }

]



@NgModule({
    declarations: [
        AdminDashboardComponent,
        AdminNavbarComponent,
        AdminSidebarComponent,
        AdminComponent,
        AdminCarListComponent
    ],

    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatPaginatorModule,
        RouterModule.forChild(routes),
        FormsModule,
    ],
    providers:[]
})


export class AdminModule {

}
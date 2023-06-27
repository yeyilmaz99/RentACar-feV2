import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import { UserFavoritesComponent } from './user-favorites/user-favorites.component';
import { UserRentalsComponent } from './user-rentals/user-rentals.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserInfoComponent } from './user-info/user-info.component';



export const UserRoutes:Routes = [
    {path: '' ,pathMatch:'full' ,redirectTo:'info'},
    {path: 'info', component:UserInfoComponent},
    {path: 'settings', component:UserSettingsComponent},
    {path: 'rentals', component:UserRentalsComponent}
]


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(UserRoutes),
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatTableModule,
    MatTabsModule

  ],
  declarations: [
    UserRentalsComponent,
    UserSettingsComponent,
    UserInfoComponent,
    UserFavoritesComponent
  ]
})

export class UserModule {}
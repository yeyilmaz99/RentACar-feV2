import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CarDetailsComponent } from './components/car/car-details/car-details.component';
import { ColorAddComponent } from './components/color/color-add/color-add.component';
import { AdminComponent } from './components/admin/admin.component';
import { FavoriteComponent } from './components/favorite/favorite.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
  },
  {path: "favorites", component:FavoriteComponent},
  { path: 'cars', loadChildren: () => import('./components/car/car.module').then(m => m.CarModule) },
  { path: 'brands', loadChildren:() => import('./components/brand/brand.module').then(m => m.BrandModule)},
  { path: 'colors', loadChildren:() => import('./components/color/color.module').then(m => m.ColorModule)},
  { path: 'admin', component:AdminComponent, loadChildren:() => import ('./components/admin/admin.module').then(m => m.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

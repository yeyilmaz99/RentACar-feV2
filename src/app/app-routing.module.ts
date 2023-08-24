import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CarDetailsComponent } from './components/car/car-details/car-details.component';
import { ColorAddComponent } from './components/color/color-add/color-add.component';
import { AdminComponent } from './components/admin/admin.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserRentalsComponent } from './components/user-profile/user-rentals/user-rentals.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
  },
  {path: "favorites", component:FavoriteComponent, canActivate:[LoginGuard]},
  { path: 'cars', loadChildren: () => import('./components/car/car.module').then(m => m.CarModule) },
  { path: 'brands', loadChildren:() => import('./components/brand/brand.module').then(m => m.BrandModule)},
  { path: 'colors', loadChildren:() => import('./components/color/color.module').then(m => m.ColorModule)},
  { path: 'admin', component:AdminComponent,loadChildren:() => import ('./components/admin/admin.module').then(m => m.AdminModule),canActivate:[AdminGuard], canActivateChild:[AdminGuard]},
  { path: 'user',loadChildren:() => import('./components/user-profile/user.module').then (m=> m.UserModule),canActivate:[LoginGuard]},
  { path: 'about', component:AboutUsComponent},
  { path: 'contact', component:ContactUsComponent},
  {path: 'testimonials', component:TestimonialsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

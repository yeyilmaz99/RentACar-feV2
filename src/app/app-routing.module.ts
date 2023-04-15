import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CarDetailsComponent } from './components/car/car-details/car-details.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
  },
  { path: 'cars', loadChildren: () => import('./components/car/car.module').then(m => m.CarModule) },
  { path: 'brands', loadChildren:() => import('./components/brand/brand.module').then(m => m.BrandModule)},
  { path: 'cars/car/:id', component: CarDetailsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

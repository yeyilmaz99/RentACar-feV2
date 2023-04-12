import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { CarsComponent } from './components/car/cars/cars.component';
import { AddCarComponent } from './components/car/add-car/add-car.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { EntityDataModule } from '@ngrx/data';
import { AuthEffects } from './components/auth/state/auth.effects';
import { appReducer } from './store/app.state';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './router/custom-serializer';
import { HomeComponent } from './components/home/home.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthTokenInterceptor } from './interceptors/auth.interceptor';
import { HeaderComponent } from './components/shared/header/header.component';
import { LoadingSpinnerComponent } from './components/shared/loading-spinner/loading-spinner.component';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { FooterComponent } from './components/shared/footer/footer.component';
import { BrandsComponent } from './components/brand/brands/brands.component';
import { AddBrandComponent } from './components/brand/add-brand/add-brand.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
    FooterComponent,
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({logOnly:environment.production}),
    EffectsModule.forRoot([AuthEffects]),
    EntityDataModule.forRoot({}),
    AppRoutingModule,
    StoreRouterConnectingModule.forRoot({ serializer: CustomSerializer }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      },
    }),
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:AuthTokenInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

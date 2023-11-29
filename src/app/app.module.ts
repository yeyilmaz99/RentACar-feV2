import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HeaderComponent } from './components/shared/header/header.component';
import { LoadingSpinnerComponent } from './components/shared/loading-spinner/loading-spinner.component';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { FooterComponent } from './components/shared/footer/footer.component';
import { ColorEffects } from './components/color/state/color.effects';
import { BrandEffects } from './components/brand/state/brand.effects';
import { BrandsComponent } from './components/brand/brands/brands.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { CarEffects } from './components/car/state/car.effects';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { SubscribeFormComponent } from './components/shared/subscribe-form/subscribe-form.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';


export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BrandsComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
    FooterComponent,
    FavoriteComponent,
    UserProfileComponent,
    AboutUsComponent,
    ContactUsComponent,
    SubscribeFormComponent,
    TestimonialsComponent,
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({logOnly:environment.production}),
    EffectsModule.forRoot([AuthEffects,ColorEffects,BrandEffects,CarEffects]),
    EntityDataModule.forRoot({}),
    AppRoutingModule,
    StoreRouterConnectingModule.forRoot({ serializer: CustomSerializer }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      },
    }),
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

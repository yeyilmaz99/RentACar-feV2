import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AppState } from '../store/app.state';
import { isAdmin } from '../components/auth/state/auth.selector';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  isAdmin;
  constructor( private toastrService:ToastrService, private router:Router,private store:Store<AppState>, private authService:AuthService){
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      if(this.authService.checkIsAdmin()){
        return true;
      }else{
        this.router.navigate(["/"])
        this.toastrService.info("You Dont Have The Permission!")
        return false;
      }

  }
  
}

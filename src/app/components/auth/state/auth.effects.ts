import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map, mergeMap, of, tap } from "rxjs";
import { autoLogin, autoLogout, loginStart, loginSuccess, signupStart, signupSuccess } from "./auth.actions";
import { AuthService } from "src/app/services/auth/auth.service";
import { setErrorMessage, setLoadingSpinner } from "src/app/store/shared/shared.actions";
import { AppState } from "src/app/store/app.state";
import { LocalStorageService } from "src/app/services/localStorage/local-storage.service";
import { ToastrService } from "ngx-toastr";



@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions, 
    private authService: AuthService, 
    private store: Store<AppState>,
    private router:Router,
    private localStorageService:LocalStorageService,
    private toastr:ToastrService
    
    ) {

  }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap(action => {
        return this.authService.login(action.email, action.password).pipe(
          map((response) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }))
            this.localStorageService.setItem('token',response.data.token)
            const userData = this.authService.formatUser(response.data);
            const user = userData.user
            const isAdmin = userData.isAdmin
            this.authService.setUserInLocalStorage(user);
            return loginSuccess({ user, redirect:true, admin:isAdmin});
          }),
          catchError((errResp) => {
            const errorMessage = errResp.error;
            this.toastr.error(errResp.error,errResp.error)
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });


  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSuccess,signupSuccess]),
        tap((action)=> {
          this.store.dispatch(setErrorMessage({message:''}))
          if(action.redirect) {
            this.router.navigate(['/']);
          }
        })
      )
    },
    {dispatch: false}
  )



  signUp$ = createEffect(() => {
    return this.actions$.pipe(ofType(signupStart),exhaustMap(action => {
      return this.authService.register(action.register).pipe(map(response =>{
        this.store.dispatch(setLoadingSpinner({status:false}))
        this.localStorageService.setItem('token',response.data.token)
        const userData = this.authService.formatUser(response.data);
        const user = userData.user
        const isAdmin = userData.isAdmin
        this.authService.setUserInLocalStorage(user);
        return signupSuccess({user, redirect:true, admin:isAdmin})
      }),catchError((errResp) => {
        const errorMessage = errResp.error;
        this.toastr.error(errResp.error,errResp.error)
        this.store.dispatch(setLoadingSpinner({ status: false }));
        return of(setErrorMessage({ message: errorMessage }));
      })
      );
    }))
  })

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(ofType(autoLogin), mergeMap((action) => {
      const user = this.authService.getUserFromLocalStorage();
      const isAdmin = this.authService.isAdmin();
      return of(loginSuccess({user, redirect:false, admin:isAdmin}))
    })
    )
  })

  logout$ = createEffect(() => {
    return this.actions$.pipe(ofType(autoLogout), map((action) => {
      this.authService.logout(); 
      this.router.navigate(['auth'])
    }))
  }, {dispatch:false})

}
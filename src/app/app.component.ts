import { Component , OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from './store/app.state';
import { Store } from '@ngrx/store';
import { autoLogin } from './components/auth/state/auth.actions';
import { getErrorMessage, getLoading } from './store/shared/shared.selector';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'recapProject-feV2';
  showLoading:Observable<boolean>;
  errorMessage:Observable<string>;

  constructor(private store:Store<AppState>, private router: Router){

  }

  ngOnInit(): void {
    this.showLoading = this.store.select(getLoading);
    this.errorMessage = this.store.select(getErrorMessage);
    if(localStorage.getItem('userData')){
      this.store.dispatch(autoLogin());
    }
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });

    
  }
}

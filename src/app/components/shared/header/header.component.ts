import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { autoLogout } from '../../auth/state/auth.actions';
import { isAdmin, isAuthenticated } from '../../auth/state/auth.selector';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated:Observable<boolean>;
  isAdmin:Observable<boolean>;
  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthenticated);
    this.isAdmin = this.store.select(isAdmin);
  }


  onLogout(event:Event){
    event.preventDefault();
    this.store.dispatch(autoLogout())
  }

}

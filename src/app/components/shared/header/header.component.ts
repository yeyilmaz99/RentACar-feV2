import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { autoLogout } from '../../auth/state/auth.actions';
import { isAdmin, isAuthenticated } from '../../auth/state/auth.selector';

declare const $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: Observable<boolean>;
  isAdmin: Observable<boolean>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthenticated);
    this.isAdmin = this.store.select(isAdmin);
  }


  onLogout(event: Event) {

    this.store.dispatch(autoLogout())

    let element = document.querySelector(".mat-typography") as HTMLElement;
    element.classList.toggle("offcanvas-menu");
    console.log("çalıştı")
  }

  menuToggle() {
    let element = document.querySelector(".mat-typography") as HTMLElement;
    element.classList.toggle("offcanvas-menu");
    console.log("çalıştı")
  }




}


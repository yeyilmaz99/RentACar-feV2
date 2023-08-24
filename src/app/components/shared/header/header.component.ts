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
  isAuthenticated:Observable<boolean>;
  isAdmin:Observable<boolean>;
  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthenticated);
    this.isAdmin = this.store.select(isAdmin);
  }


  onLogout(event:Event){
    $(document).on('click', '.js-menu-toggle', (e: Event) => {
      const $this = $(e.currentTarget);
      e.preventDefault();

      if ($('body').hasClass('offcanvas-menu')) {
        $('body').removeClass('offcanvas-menu');
        $this.removeClass('active');
      } else {
        $('body').addClass('offcanvas-menu');
        $this.addClass('active');
      }
    });

    this.store.dispatch(autoLogout())
    
  }

}

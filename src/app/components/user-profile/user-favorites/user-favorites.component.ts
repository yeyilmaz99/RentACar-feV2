import { Component, OnInit } from '@angular/core';
import { loadFavoriteCars } from '../../car/state/car.actions';
import { getFavorites } from '../../car/state/car.selector';
import { getUserId, isAuthenticated } from '../../auth/state/auth.selector';
import { FavoriteService } from 'src/app/services/favorite/favorite.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { Favorite } from 'src/app/models/favorite';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.css']
})
export class UserFavoritesComponent implements OnInit {
// claims:Claims | undefined = {email:"",fullName:"",roles:[""],userId:0};
favorites:Favorite[] = []
isAuthenticated:Observable<boolean>;
userId:number;
constructor(
  private favoriteService:FavoriteService,
  private toastrService:ToastrService,
  private authService:AuthService,
  private store:Store<AppState>
  ) { }


ngOnInit(): void {
  this.isAuthenticated = this.store.select(isAuthenticated);
   this.store.select(getUserId).subscribe(response => {
    this.userId = response
  });
  this.getFavorites();


}

getFavorites(){
  if(this.isAuthenticated){
    const userId = this.userId
    this.store.dispatch(loadFavoriteCars({userId}))
    this.store.select(getFavorites).subscribe(response => {
      this.favorites = response
    })
  }
}

checkFavorites(){
  if(this.favorites.length < 1 ){
    let element = document.querySelector(".favorites");
    element.innerHTML = "You dont have any favorites yet"
  }
}
}

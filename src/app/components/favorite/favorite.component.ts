import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Favorite } from 'src/app/models/favorite';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FavoriteService } from 'src/app/services/favorite/favorite.service';
import { AppState } from 'src/app/store/app.state';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { getUserId, isAuthenticated } from '../auth/state/auth.selector';
import { loadFavoriteCars } from '../car/state/car.actions';
import { getFavorites } from '../car/state/car.selector';
@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
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
      const id = this.userId
      this.store.dispatch(loadFavoriteCars({id}))
      this.store.select(getFavorites).subscribe(response => {
        this.favorites = response
      })
    }
  }






  // ngOnInit(): void {
  //   // this.getClaims();
  //   this.getFavoritesByUserId();
  // }


  // getFavoritesByUserId(){
  //   this.favoriteService.getFavorites(this.claims.userId).subscribe(response => {
  //     this.favorites = response.data;
  //     this.dataLoaded = true;
  //     this.checkFavorites();
  //   })
  // }

  // getClaims(){
  //   if(this.authService.isAuthenticated()){
  //     let claims:Claims | undefined = this.authService.getClaims();
  //     this.claims = claims;
  //   }
  // }

  deleteFromFavorites(carId:number){

    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to remove this car from favorites?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Removed from your favorites',
          'success'
        )
        // let favoriteToDelete:Favorite = {brandName:"",carName:"",carId:carId,colorName:"",dailyPrice:0,description:"",userId:this.claims.userId,userName:""}
        // this.favoriteService.deleteFromFavorites(favoriteToDelete).subscribe(response=>{
        //   this.toastrService.error(response.message,"Deleted From Favorites")
        //   // this.getFavoritesByUserId();
        // },responseError=>{
        //   this.toastrService.error(responseError.error.message);
        // })
      }

    })



  }


  checkFavorites(){
    if(this.favorites.length < 1 ){
      let element = document.querySelector(".favorites");
      element.innerHTML = "You dont have any favorites yet"
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, distinctUntilChanged } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { AppState } from 'src/app/store/app.state';
import { checkFavorites, getCarById, getCarDetails, getCarImages, getFavorites } from '../state/car.selector';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';
import { CarImage } from 'src/app/models/carImage';
import { getUserId, isAdmin, isAuthenticated } from '../../auth/state/auth.selector';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarDelete } from 'src/app/models/carDelete';
import { getCurrentId } from 'src/app/router/router.selector';
import { deleteCarAction, deleteFavoriteAction, loadCars, loadFavoriteCars, updateCarAction } from '../state/car.actions';
import { Router } from '@angular/router';
import { Brand } from 'src/app/models/brand.model';
import { Color } from 'src/app/models/color.model';
import { getBrands } from '../../brand/state/brand.selector';
import { getColors } from '../../color/state/color.selector';
import { loadBrands } from '../../brand/state/brand.actions';
import { loadColors } from '../../color/state/color.actions';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Favorite } from 'src/app/models/favorite';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  isAuthenticated:Observable<boolean>;
  userId:number;
  carId:number;
  car:Observable<Car>
  carImages:Observable<CarImage[]>
  edit:Boolean =false;
  updateForm:FormGroup;
  brands:Brand[];
  colors:Color[];
  favorites:Favorite[] = [];
  checkIfAlreadyAddedToFav:Boolean;
  checkIfCarIsReturnedClass:Boolean;
  constructor(private store:Store<AppState>, private formBuilder:FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthenticated);
    this.store.select(getFavorites).subscribe(response => {
      this.favorites = response
    })
    this.store.select(getUserId).subscribe(response => {
      this.userId = response;
    });
    this.isLoggedIn();
    this.getCar();
    this.createUpdateForm();
    this.store.select(getCurrentId).subscribe(response =>
      this.carId = response
    );
    this.getBrands();
    this.getColors();
    this.getCars();


  }

  isAdmin(){
    return this.store.select(isAdmin);
  }
  isLoggedIn() {
    this.isAuthenticated = this.store.select(isAuthenticated);
    if (this.isAuthenticated) {
        const userId = this.userId;
        this.store.dispatch(loadFavoriteCars({ userId }));
        this.store.select(getFavorites).subscribe(response => {
          this.favorites = response
          this.store.select(checkFavorites).subscribe(response => {
            this.checkIfAlreadyAddedToFav = response;
          });
        })
    }
  }

  getCar(){
    this.car = this.store.select(getCarDetails);
    this.carImages = this.store.select(getCarImages);
  }
  getCars(){
    this.store.dispatch(loadCars())
  }

  createUpdateForm(){
    this.updateForm = this.formBuilder.group({
      carName: ["",Validators.required],
      colorIdandName: ["",Validators.required],
      brandIdandName: ["",Validators.required],
      modelYear: ["",Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["",Validators.required],
      findeksPoint: ["",Validators.required],
    })
  }

æ



  getBrands(){
    this.store.select(getBrands).subscribe(response => {
      this.brands = response;
    })
    this.store.dispatch(loadBrands());

  }

  getColors(){
    this.store.select(getColors).subscribe(response =>  {
      this.colors = response;
    });
    this.store.dispatch(loadColors());
  }


  editForm(){
    this.edit = true;
  }


  delete(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        let carToDelete: CarDelete = {id:this.carId,brandId:0,carName:'',colorId:0,dailyPrice:0,description:'',modelYear:0}
        this.store.dispatch(deleteCarAction({carToDelete, redirect:true}))
      }
    })
  }

  // delete(){
  //   let carToDelete: CarDelete = {id:this.carId,brandId:0,carName:'',colorId:0,dailyPrice:0,description:'',modelYear:0}
  //   console.log(this.carId);
  //   this.store.dispatch(deleteCarAction({carToDelete}))
  //   this.router.navigate(['cars'])
  // }


  addToFavorites(){
  
  }

  deleteFromFavorites(carId:number){
    const userId = this.userId
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
        this.store.dispatch(deleteFavoriteAction({userId,carId}))
      }

    })
  }


  updateCar(){
    if(this.updateForm.valid){
      let car = Object.assign({},this.updateForm.value);
      car.Id = +this.carId;
      car.carId = +this.carId
      car.colorName = car.colorIdandName.colorName;
      car.colorId = car.colorIdandName.colorId;
      car.brandName = car.brandIdandName.brandName;
      car.brandId = car.brandIdandName.brandId;
      this.store.dispatch(updateCarAction({car}));
      this.edit = false;
    }
  } 
}


import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, distinctUntilChanged, map } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { AppState } from 'src/app/store/app.state';
import { checkFavorites, getCarById, getCarDetailImages, getCarDetails, getCarImages, getCars, getFavorites, getFindeksPoint, isReturned } from '../state/car.selector';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';
import { CarImage } from 'src/app/models/carImage';
import { getUserId, isAdmin, isAuthenticated } from '../../auth/state/auth.selector';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarDelete } from 'src/app/models/carDelete';
import { getCurrentId } from 'src/app/router/router.selector';
import { addFavoriteAction, checkIfCarIsReturned, deleteCarAction, deleteFavoriteAction, loadCars, loadFavoriteCars, updateCarAction } from '../state/car.actions';
import { Router } from '@angular/router';
import { Brand } from 'src/app/models/brand.model';
import { Color } from 'src/app/models/color.model';
import { getBrands } from '../../brand/state/brand.selector';
import { getColors } from '../../color/state/color.selector';
import { loadBrands } from '../../brand/state/brand.actions';
import { loadColors } from '../../color/state/color.actions';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Favorite } from 'src/app/models/favorite';
import { RentalModel } from 'src/app/models/rentalModel';
import { ToastrService } from 'ngx-toastr';
import { FindeksService } from 'src/app/services/findeksService/findeks.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ByteToImagePipe } from 'src/app/pipes/byte-to-image-pipe.pipe';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  isAuthenticated;
  isLoggedIn;
  isAdmin;
  fpSufficient:boolean;
  userId:number;
  allRentals:RentalModel[];
  carId:number;
  carFindeksPoint:number;
  car:Car
  carImages:string[] = [];
  carDetailImages:string[] = [];
  combinedImages:string[] = [];
  carImagesUrls:SafeResourceUrl[];
  carImagesBase64: SafeResourceUrl[] = [];
  edit:Boolean =false;
  updateForm:FormGroup;
  brands:Brand[];
  colors:Color[];
  defaultImage:boolean;
  favorites:Favorite[] = [];
  checkIfAlreadyAddedToFav:Boolean;
  checkIfCarIsReturnedClass:Boolean;
  constructor(private store:Store<AppState>, private formBuilder:FormBuilder, private router:Router, private toastrService:ToastrService, private findeksService:FindeksService,
    private sanitizer:DomSanitizer) {
     }

  ngOnInit(): void {
    this.getUserId()
    this.checkFavs();
    this.getCar();
    this.createUpdateForm();
    this.getCurrentCarId()
    this.getBrands();
    this.getColors();
    // this.getCars();
    this.checkIfCarIsReturned();
    this.checkAdmin();
    this.getCarFindeksPoint()
  }

  getCurrentCarId(){
    this.store.select(getCurrentId).subscribe(response =>
      this.carId = response
    );
  }

  changeImage(element: string): void {
    const mainProductImage: HTMLImageElement | null = document.getElementById('main_product_image') as HTMLImageElement;

    if (mainProductImage) {
        mainProductImage.src = element;
    }
}


  checkIfCarIsReturned(){
    this.store.select(isReturned).subscribe(response => {
      this.checkIfCarIsReturnedClass = response
    })
    const carId = this.carId
    this.store.dispatch(checkIfCarIsReturned({carId}))
  }

  getUserId(){
    this.store.select(getUserId).subscribe(response => {
      this.userId = response;
    });
  }

  checkAdmin(){
    this.store.select(isAdmin).subscribe(response => {
      if(response != null){
        this.isAdmin = response;
      }
    });
  }

  checkIsLoggedIn(){
    this.store.select(isAuthenticated).subscribe(response => {
      this.isLoggedIn = response;
      if(this.isLoggedIn != null){
        this.router.navigate(['auth'])
      }
    })
  }



  checkFavs() {
    // this.isAuthenticated = this.store.select(isAuthenticated);
    // if (this.isAuthenticated != null) {
    //     const userId = this.userId;
    //     this.store.dispatch(loadFavoriteCars({ userId }));
    //     this.store.select(getFavorites).subscribe(response => {
    //       this.favorites = response
    //       this.store.select(checkFavorites).subscribe(response => {
    //         this.checkIfAlreadyAddedToFav = response;
    //       });
    //     })
    // }
    this.store.select(isAuthenticated).subscribe(response => {
      this.isAuthenticated = response;
      if(response === true){
        this.isAuthenticated = response;
        const userId = this.userId;
        this.store.dispatch(loadFavoriteCars({ userId }));
        this.store.select(getFavorites).subscribe(response => {
          this.favorites = response
          this.store.select(checkFavorites).subscribe(response => {
            this.checkIfAlreadyAddedToFav = response;
          });
        })
      }
    })
  }

  getCar() {
    this.store.select(getCarDetails).subscribe(response => {
      this.carImages = [];
      this.car = response;
      if(response){
        this.carImages.push(this.car.imageData);
        this.store.select(getCarDetailImages).subscribe(response => {
          if(response){
            this.carDetailImages = [];
            response.forEach(image => {
              this.carDetailImages.push(image.imageData);
            });
            this.combinedImages = [...this.carImages, ...this.carDetailImages];
          }
        })
      }
    });


  }
  

  getCars(){
    let cars;
    this.store.select(getCars).subscribe(response => {
      cars = response
      if(cars == null){
        this.store.dispatch(loadCars())
      }
    })
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


  getBrands(){
    let brands;
    this.store.select(getBrands).subscribe(response => {
      this.brands = response;
      brands = response
      if(brands == null){
        this.store.dispatch(loadBrands());
      }
    })
  }

  getColors(){
    let colors;
    this.store.select(getColors).subscribe(response =>  {
      this.colors = response;
      colors = response
      if(colors == null){
        this.store.dispatch(loadColors());
      }
    });
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

  addToFavorites(){
    let newFavorite = {carId : this.carId, userId:this.userId}
    this.store.dispatch(addFavoriteAction(newFavorite));
    if(this.userId ===null){
      this.router.navigate(['auth'])
      this.toastrService.info("You should Log in");
    }
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

  rentNavigate(carId:number){
    this.store.select(isAuthenticated).subscribe(response => {
      this.isLoggedIn = response;
      if(this.isLoggedIn != null && this.isLoggedIn === false){
        this.router.navigate(['auth'])
        this.toastrService.info("You should Log in");
      }else{
        this.router.navigate([`cars/car/${carId}/rent/${carId}`])
      }
    })
  }


  // checkIfFpSufficient(){
  //   this.findeksService.checkIfFindeksSufficient(this.carFindeksPoint,this.userId).subscribe(response => {
  //   },responseError =>{
  //     if(!responseError.error.success){
  //       Swal.fire({
  //         title: 'Are you sure?',
  //         text: "You Dont have enough Findeks Point. Do you still want to rent this car with insurance for 250$ extra?",
  //         icon: 'warning',
  //         showCancelButton: true,
  //         confirmButtonColor: '#3085d6',
  //         cancelButtonColor: '#d33',
  //         confirmButtonText: 'Yes!'
  //       }).then((result) => {
  //         if (result.isDismissed) {
  //           Swal.fire(
  //             'OK!',
  //             'Please select another car.',
  //             'error'
  //           )
  //           this.router.navigate(['cars'])
  //         }
  //       })
  //     }
  //   })
  // }



  checkIfFpSufficientv1(){
    this.findeksService.checkIfFindeksSufficient(this.carFindeksPoint,this.userId).subscribe(response => {
      this.fpSufficient = response.success
      return response.success
    },responseError =>{
      this.fpSufficient = responseError.error.success;
      if(!responseError.error.success){
        Swal.fire({
          title: 'Are you sure?',
          text: "You Dont have enough Findeks Point. Do you still want to rent this car with insurance for 250$ extra?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes!'
        }).then((result) => {
          if (result.isDismissed) {
            Swal.fire(
              'OK!',
              'Please select another car.',
              'error'
            )
            this.router.navigate(['cars'])
          }
        })
      }
      return responseError.error.success
    })
  }

  getCarFindeksPoint(){
    this.store.select(getFindeksPoint).subscribe(response => {
      this.carFindeksPoint = response
      if(this.isAuthenticated ===true){
        this.checkIfFpSufficientv1();
      }
    })
  }




}




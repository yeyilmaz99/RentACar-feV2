import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, act, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, distinctUntilChanged, filter, map, mergeMap, of, switchMap, tap } from "rxjs";
import { AppState } from "src/app/store/app.state";
import { addCar, addCarDetailImages, addCarImage, addCarImageSuccess, addCarSuccess, addFavoriteAction, addFavoriteActionSuccess, checkIfCarIsReturned, checkIfCarIsReturnedFail, checkIfCarIsReturnedSuccess, deleteCarAction, deleteCarSuccess, deleteFavoriteAction, deleteFavoriteActionSuccess, loadCarDetailImagesSuccess, loadCarDetailsSuccess, loadCarImages, loadCarImagesSuccess, loadCars, loadCarsSuccess, loadFavoriteCars, loadFavoriteCarsSuccess, loadFilteredCars, loadFilteredCarsSuccess, loadUserRentals, loadUserRentalsSuccess, updateCarAction, updateCarSuccess } from "./car.actions";
import { CarService } from "src/app/services/car/car.service";
import { setErrorMessage, setLoadingSpinner } from "src/app/store/shared/shared.actions";
import { ROUTER_NAVIGATION, RouterNavigatedAction } from "@ngrx/router-store";
import { Car } from "src/app/models/car.model";
import { ToastrService } from "ngx-toastr";
import { FavoriteService } from "src/app/services/favorite/favorite.service";
import { RentalService } from "src/app/services/rentalService/rental.service";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable()
export class CarEffects {
    constructor(
        private actions$: Actions, 
        private carService: CarService, 
        private store: Store<AppState>, 
        private router: Router, 
        private toastrService:ToastrService,
        private favoriteService:FavoriteService,
        private rentalService:RentalService,
        private sanitizer:DomSanitizer
        ) {    }

    loadCar$ = createEffect(() => {
        return this.actions$.pipe(ofType(loadCars), mergeMap((action) => {
            this.store.dispatch(setLoadingSpinner({status:true}))
            return this.carService.getCars().pipe(map((response) => {
                const cars = response.data
                this.store.dispatch(setLoadingSpinner({status:false}))
                return loadCarsSuccess({ cars })
            }))
        }))
    })

    loadFavorite$ = createEffect(() => {
        return this.actions$.pipe(ofType(loadFavoriteCars), mergeMap((action) => {
            this.store.dispatch(setLoadingSpinner({status:true}))
            return this.favoriteService.getFavorites(action.userId).pipe(map((response)=> {
                this.store.dispatch(setLoadingSpinner({status:false}))
                const favorites = response.data
                return loadFavoriteCarsSuccess({favorites})
            }))
        }))
    })

    getFilteredCars$ = createEffect(() => {
        return this.actions$.pipe(ofType(loadFilteredCars), mergeMap((action => {
            return this.carService.getCarsByBrandAndColorId(action.filter.colorId,action.filter.brandId).pipe(map(response => {
                this.store.dispatch(setLoadingSpinner({status:false}))
                const cars = response.data
                console.log(response.data);
                this.toastrService.success("Successfully filtered");
                if(response.data.length == 0){
                    this.toastrService.error("No suitable vehicle found for this filter")
                }
                return loadFilteredCarsSuccess({cars});
            }))
        })))
    })




    loadUserRentasl$ = createEffect(()=> {
        return this.actions$.pipe(ofType(loadUserRentals), mergeMap((action)=> {
            this.store.dispatch(setLoadingSpinner({status:true}))
            return this.rentalService.getRentalsByUserId(action.userId).pipe(map((response) => {
                this.store.dispatch(setLoadingSpinner({status:false}))
                const rentals = response.data
                return loadUserRentalsSuccess({rentals});
            }))
        }))
    })

    // checkIfCarIsReturned$ = createEffect(() => {
    //     return this.actions$.pipe(ofType (checkIfCarIsReturned), mergeMap((action) => {
    //         return this.rentalService.checkIfCarIsReturned(action.carId).pipe(switchMap((resp)=> {
    //                 const response = resp.success
    //                 return checkIfCarIsReturnedSuccess({response});
    //         },(responseError=> {
    //                 const response = false
    //                 return checkIfCarIsReturnedFail({response})
    //         })))
    //     }))
    // })    


    checkIfCarIsReturned$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(checkIfCarIsReturned),
          switchMap(action => {
            return this.rentalService.checkIfCarIsReturned(action.carId).pipe(
              map(resp => {
                const response = resp.success;
                const checkIfCarIsReturnedSuccessAction = checkIfCarIsReturnedSuccess({ response });
                return checkIfCarIsReturnedSuccessAction;
              }),
              catchError(errResp => {
                const response = false;
                this.toastrService.error("Car is not returned yet");
                return of(checkIfCarIsReturnedSuccess({ response }));
              })
            );
          })
        );
      });


    
    getSingleCar$ = createEffect(() => {
        return this.actions$.pipe(ofType(ROUTER_NAVIGATION), filter((r: RouterNavigatedAction) => {
            return r.payload.routerState.url.startsWith('/cars/car')
        }), map((r: RouterNavigatedAction) => {
            return r.payload.routerState['params']['id'];
        }), switchMap((id) => {
            this.store.dispatch(setLoadingSpinner({status:true}))
            return this.carService.getCarById(id).pipe(map((response) => {
                const car = response.data
                return loadCarDetailsSuccess({ car })
            }))
        })
        )
    })

    getCarImages$ = createEffect(()=> {
        return this.actions$.pipe(ofType(ROUTER_NAVIGATION), filter((r: RouterNavigatedAction) => {
            return r.payload.routerState.url.startsWith('/cars/car')
        }), map((r: RouterNavigatedAction) => {
            return r.payload.routerState['params']['id'];
        }), switchMap((id) => {
            this.store.dispatch(setLoadingSpinner({status:true}))
            return this.carService.getCarProfileImagesByCarId(id).pipe(map((response) => {
                this.store.dispatch(setLoadingSpinner({status:false}))
                const carImages = response.data;
                return loadCarImagesSuccess({ carImages })
            }))
        })
        )
    },)


    getCarDetailImages$ = createEffect(()=> {
        return this.actions$.pipe(ofType(ROUTER_NAVIGATION), filter((r: RouterNavigatedAction) => {
            return r.payload.routerState.url.startsWith('/cars/car')
        }), map((r: RouterNavigatedAction) => {
            return r.payload.routerState['params']['id'];
        }), switchMap((id) => {
            this.store.dispatch(setLoadingSpinner({status:true}))
            return this.carService.getCarDetailImagesByCarId(id).pipe(map((response) => {
                this.store.dispatch(setLoadingSpinner({status:false}))
                const carImages = response.data;
                return loadCarDetailImagesSuccess({ carImages })
            }))
        })
        )
    },)


    addCar$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(addCar),
          mergeMap(action => {
            return this.carService.addCar(action.formData).pipe(
              mergeMap(response => {
                const message = response.message;
                this.toastrService.success(response.message, "Successfully Added");
                const addCarSuccessAction = addCarSuccess({ message });
                return of(addCarSuccessAction, loadCars());
              }),
              catchError(errResp => {
                const errorMessage = errResp.error;
                this.toastrService.error(errResp.error.message, errResp.error.message);
                return of(setErrorMessage({ message: errorMessage }));
              })
            );
          })
        );
      });






    //   addCarDetailImage$ = createEffect(() => {
    //     return this.actions$.pipe(
    //       ofType(addCarDetailImages),
    //       mergeMap(action => {
    //         return this.carService.addCarImages(action.formData).pipe(
    //           map(response => {
    //             const message = response.message;
    //             this.toastrService.success(response.message);
    //             return addCarImageSuccess({ message });
    //           }),
    //           catchError(errResp => {
    //             const errorMessage = errResp.error;
    //             this.toastrService.error(errResp.error.message, errResp.error.message);
    //             return of(setErrorMessage({ message: errorMessage }));
    //           })
    //         );
    //       })
    //     );
    //   });




    deleteCar$ = createEffect(() => {
        return this.actions$.pipe(ofType(deleteCarAction), mergeMap((action) => {
            return this.carService.deleteCar(action.carToDelete).pipe(mergeMap((response) => {
                const message = response.message
                const carId = action.carToDelete.id
                const deleteCarSuccessAction = deleteCarSuccess({message, redirect:action.redirect, carId})
                return of(deleteCarSuccessAction, loadCars())
            }))
        }))
    })

    deleteFavorite$ =createEffect(() => {
        return this.actions$.pipe(ofType(deleteFavoriteAction), mergeMap((action) => {
            return this.favoriteService.deleteFromFavorites(action.userId,action.carId).pipe(mergeMap((response) => {
                const message = response.message
                const carId = action.carId
                const userId = action.userId
                const deleteFavoriteSuccess = deleteFavoriteActionSuccess({message, carId})
                return of (deleteFavoriteSuccess, loadFavoriteCars({userId}))
            }))
        }))
    })

    addFavorite$ = createEffect(()=> {
        return this.actions$.pipe(ofType(addFavoriteAction), mergeMap((action) => {
            let favorite = {carId:action.carId,userId:action.userId}
            return this.favoriteService.addToFavorites(favorite).pipe(mergeMap((response)=> {
                const message = response.message
                const carId = action.carId;
                const userId = action.userId
                this.toastrService.success(message);
                const addFavoritesSuccess = addFavoriteActionSuccess({message,carId});
                return of (addFavoritesSuccess, loadFavoriteCars({userId}))
            }))
        }))
    })



    deleteRedirect$ = createEffect(() => {
        return this.actions$.pipe(ofType(...[deleteCarSuccess]),tap((action) => {
            this.store.dispatch(setErrorMessage({message:''}))
            if(action.redirect){
                this.router.navigate(['/cars'])
            }
        }))
    },
    {dispatch:false}
    )

    updateCar$ = createEffect(() => {
        return this.actions$.pipe(ofType(updateCarAction), mergeMap((action => {
            return this.carService.updateCar(action.car).pipe(mergeMap(response => {
                const updateCarSuccessAction = updateCarSuccess({car:action.car});
                return of (updateCarSuccessAction, loadCars())
            }))
        })))
    })


    // getImageUrlFromData(byteArray: number[], imageName:string) : string{
    //     const uint8Array = new Uint8Array(byteArray);
    //     const blob = new Blob([uint8Array]);
    //     return URL.createObjectURL(blob);
    // }




}
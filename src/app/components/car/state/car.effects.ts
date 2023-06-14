import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, filter, map, mergeMap, of, switchMap, tap } from "rxjs";
import { AppState } from "src/app/store/app.state";
import { addCar, addCarSuccess, deleteCarAction, deleteCarSuccess, loadCarImages, loadCarImagesSuccess, loadCars, loadCarsSuccess, updateCarAction, updateCarSuccess } from "./car.actions";
import { CarService } from "src/app/services/car/car.service";
import { setErrorMessage, setLoadingSpinner } from "src/app/store/shared/shared.actions";
import { ROUTER_NAVIGATION, RouterNavigatedAction } from "@ngrx/router-store";
import { Car } from "src/app/models/car.model";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class CarEffects {
    constructor(private actions$: Actions, private carService: CarService, private store: Store<AppState>, private router: Router, private toastrService:ToastrService) {
    }

    loadCar$ = createEffect(() => {
        this.store.dispatch(setLoadingSpinner({status:true}))
        return this.actions$.pipe(ofType(loadCars), mergeMap((action) => {
            return this.carService.getCars().pipe(map((response) => {
                this.store.dispatch(setLoadingSpinner({status:false}))
                const cars = response.data
                return loadCarsSuccess({ cars })
            }))
        }))
    })

    



    getSingleCar$ = createEffect(() => {
        return this.actions$.pipe(ofType(ROUTER_NAVIGATION), filter((r: RouterNavigatedAction) => {
            return r.payload.routerState.url.startsWith('/cars/car')
        }), map((r: RouterNavigatedAction) => {
            return r.payload.routerState['params']['id'];
        }), switchMap((id) => {
            this.store.dispatch(setLoadingSpinner({status:true}))
            return this.carService.getCarById(id).pipe(map((response) => {
                const cars = [{...response.data, id}]
                return loadCarsSuccess({ cars })
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
            return this.carService.getCarImagesByCarId(id).pipe(map((response) => {
                this.store.dispatch(setLoadingSpinner({status:false}))
                const carImages = response.data
                return loadCarImagesSuccess({ carImages })
            }))
        })
        )
    },)


    addCar$ = createEffect(() => {
        return this.actions$.pipe(ofType(addCar), mergeMap(action => {
            return this.carService.addCar(action.car).pipe(map(response => {
                const message = response.message
                this.toastrService.success(response.message);
                return addCarSuccess({message});
            }),catchError(errResp => {
                const errorMessage = errResp.error;
                this.toastrService.error(errResp.error.message,errResp.error.message)
                this.store.dispatch(setLoadingSpinner({ status: false }));
                return of(setErrorMessage({ message: errorMessage }));
            }))
        }))
    },)

    deleteCar$ = createEffect(() => {
        return this.actions$.pipe(ofType(deleteCarAction), switchMap((action) => {
            return this.carService.deleteCar(action.carToDelete).pipe(map((response) => {
                const message = response.message
                return deleteCarSuccess({message ,redirect:true})
            }))
        }))
    })

    // deleteRedirect$ = createEffect(() => {
    //     return this.actions$.pipe(ofType(...[deleteCarSuccess]),tap((action) => {
    //         this.store.dispatch(setErrorMessage({message:''}))
    //         if(action.redirect){
    //             this.router.navigate(['/cars'])
    //         }
    //     }))
    // })



    updateCar$ = createEffect(() => {
        return this.actions$.pipe(ofType(updateCarAction), switchMap((action => {
            return this.carService.updateCar(action.car).pipe(map(response => {
                return updateCarSuccess({car:action.car})
            }))
        })))
    })




}
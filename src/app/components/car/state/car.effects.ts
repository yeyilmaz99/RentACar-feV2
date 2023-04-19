import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { filter, map, mergeMap, switchMap, tap } from "rxjs";
import { AppState } from "src/app/store/app.state";
import { loadCars, loadCarsSuccess } from "./car.actions";
import { CarService } from "src/app/services/car/car.service";
import { setLoadingSpinner } from "src/app/store/shared/shared.actions";
import { ROUTER_NAVIGATION, RouterNavigatedAction } from "@ngrx/router-store";
import { Car } from "src/app/models/car.model";

@Injectable()
export class CarEffects {
    constructor(private actions$: Actions, private carService: CarService, private store: Store<AppState>, private router: Router) {

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
            return this.carService.getCarById(id).pipe(map((response) => {
                const cars: Car[] = [];
                const car = response.data
                cars.push(car);
                console.log(cars);
                return loadCarsSuccess({ cars })
            }))
        })
        )
    })

}
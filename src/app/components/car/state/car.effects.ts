import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { filter, map, mergeMap, switchMap, tap } from "rxjs";
import { AppState } from "src/app/store/app.state";
import { loadCars, loadCarsSuccess } from "./car.actions";
import { CarService } from "src/app/services/car/car.service";
import { setLoadingSpinner } from "src/app/store/shared/shared.actions";

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

}
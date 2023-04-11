import { createAction, props } from "@ngrx/store";
import { Car } from "src/app/models/car.model";
import { ListResponseModel } from "src/app/models/listResponseModel";





export const LOAD_CARS = '[car page] load cars'

export const LOAD_CARS_SUCCESS = '[car page] load cars success'



export const loadCars = createAction(LOAD_CARS);
export const loadCarsSuccess = createAction(LOAD_CARS_SUCCESS, props<{cars:Car[]}>());
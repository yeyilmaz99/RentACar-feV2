import { createAction, props } from "@ngrx/store";
import { Car } from "src/app/models/car.model";
import { CarImage } from "src/app/models/carImage";





export const LOAD_CARS = '[car page] load cars'
export const LOAD_CAR_IMAGES= '[car page] load images';

export const LOAD_CAR_IMAGES_SUCCESS= '[car page] load images success'
export const LOAD_CARS_SUCCESS = '[car page] load cars success'



export const loadCars = createAction(LOAD_CARS);
export const loadCarsSuccess = createAction(LOAD_CARS_SUCCESS, props<{cars:Car[]}>());

export const loadCarImages = createAction(LOAD_CAR_IMAGES);
export const loadCarImagesSuccess = createAction(LOAD_CAR_IMAGES_SUCCESS, props<{carImages:CarImage[]}>())
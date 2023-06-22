import { createAction, props } from "@ngrx/store";
import { Car } from "src/app/models/car.model";
import { CarAndImageDto } from "src/app/models/carAndImageDto";
import { CarDelete } from "src/app/models/carDelete";
import { CarImage } from "src/app/models/carImage";





export const LOAD_CARS = '[car page] load cars'
export const LOAD_CAR_IMAGES= '[car page] load images';

export const LOAD_CAR_IMAGES_SUCCESS= '[car page] load images success'
export const LOAD_CARS_SUCCESS = '[car page] load cars success'

export const ADD_CAR = '[car page] add car';
export const ADD_CAR_SUCCESS = '[car page] add car success';

export const DELETE_CAR_ACTION = '[car page] delete car action';
export const DELETE_CAR_SUCCESS = '[car page] delete car success';

export const UPDATE_CAR_ACTION ='[car page] update car action';
export const UPDATE_CAR_SUCCESS = '[car page] update car success';


export const LOAD_CAR_DETAILS_SUCCESS = '[car page] load car details success';


export const loadCars = createAction(LOAD_CARS);
export const loadCarsSuccess = createAction(LOAD_CARS_SUCCESS, props<{cars:Car[]}>());
export const loadCarDetailsSuccess = createAction(LOAD_CAR_DETAILS_SUCCESS, props<{car:Car}>());

export const loadCarImages = createAction(LOAD_CAR_IMAGES);
export const loadCarImagesSuccess = createAction(LOAD_CAR_IMAGES_SUCCESS, props<{carImages:CarImage[]}>())

export const addCar = createAction(ADD_CAR, props<{ formData: FormData }>());
export const addCarSuccess= createAction(ADD_CAR_SUCCESS, props<{message:string}>());

export const deleteCarAction = createAction(DELETE_CAR_ACTION, props<{carToDelete:CarDelete, redirect:boolean}>());
export const deleteCarSuccess = createAction(DELETE_CAR_SUCCESS, props<{message:string, redirect:boolean, carId:number}>());

export const updateCarAction = createAction(UPDATE_CAR_ACTION, props<{car:Car}>());
export const updateCarSuccess = createAction(UPDATE_CAR_SUCCESS, props<{car:Car}>());


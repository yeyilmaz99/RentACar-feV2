import { createAction, props } from "@ngrx/store";
import { create } from "lodash";
import { Car } from "src/app/models/car.model";
import { CarAndImageDto } from "src/app/models/carAndImageDto";
import { CarDelete } from "src/app/models/carDelete";
import { CarImage } from "src/app/models/carImage";
import { Favorite } from "src/app/models/favorite";
import { FilterModel } from "src/app/models/filterModel";
import { Rental } from "src/app/models/rental";





export const LOAD_CARS = '[car page] load cars'
export const LOAD_CAR_IMAGES= '[car page] load images';

export const LOAD_CAR_IMAGES_SUCCESS= '[car page] load images success'
export const LOAD_CARS_SUCCESS = '[car page] load cars success'


export const LOAD_CAR_DETAIL_IMAGES = "[car page] load car detail images";
export const LOAD_CAR_DETAIL_IMAGES_SUCCESS = "[car page] load car detail images success";

export const ADD_CAR_DETAIL_IMAGES = "[car page] add car detail images";
export const ADD_CAR_DETAIL_IMAGES_SUCCESS = "[car page] add car detail images success";
export const ADD_CAR = '[car page] add car';
export const ADD_CAR_SUCCESS = '[car page] add car success';

export const ADD_CAR_IMAGE = '[car page] add car image';
export const ADD_CAR_IMAGE_SUCCESS = '[car page] add car image success';

export const DELETE_CAR_ACTION = '[car page] delete car action';
export const DELETE_CAR_SUCCESS = '[car page] delete car success';

export const UPDATE_CAR_ACTION ='[car page] update car action';
export const UPDATE_CAR_SUCCESS = '[car page] update car success';

export const LOAD_CAR_DETAILS_SUCCESS = '[car page] load car details success';
export const LOAD_FILTERED_CARS = '[car page] load filtered cars';
export const LOAD_FILTERED_CARS_SUCCESS = '[car page] load filtered cars success';

export const LOAD_FAVORITE_CARS = '[car page] load favorite cars';
export const LOAD_FAVORITE_CARS_SUCCESS = '[car page] load favorite cars success';

export const LOAD_USER_RENTALS = '[car page] load user rentals';
export const LOAD_USER_RENTALS_SUCCESS = '[car page] load user rentals success';

export const ADD_FAVORITE_ACTION = '[car page] add favorite action';
export const ADD_FAVORITE_SUCCESS = '[car page] add favorite action success';

export const DELETE_FAVORITE_ACTION = '[car page] delete favorite action';
export const DELETE_FAVORITE_SUCCESS = '[car page] delete favorite action success';

export const CHECK_IF_CAR_IS_RETURNED_ACTION = '[car page] check if car is returned';
export const CHECK_IF_CAR_IS_RETURNED_ACTION_FAIL = '[car page] check if car is returned';
export const CHECK_IF_CAR_IS_RETURNED_ACTION_SUCCESS = '[car page] check if car is returned success';

export const loadCars = createAction(LOAD_CARS);
export const loadCarsSuccess = createAction(LOAD_CARS_SUCCESS, props<{cars:Car[]}>());
export const loadCarDetailsSuccess = createAction(LOAD_CAR_DETAILS_SUCCESS, props<{car:Car}>());


export const loadFilteredCars = createAction(LOAD_FILTERED_CARS, props<{filter:FilterModel}>());
export const loadFilteredCarsSuccess = createAction(LOAD_FILTERED_CARS, props<{cars:Car[]}>());


export const loadFavoriteCars = createAction(LOAD_FAVORITE_CARS, props<{userId:number}>());
export const loadFavoriteCarsSuccess = createAction(LOAD_FAVORITE_CARS_SUCCESS, props<{favorites:Favorite[]}>());

export const loadUserRentals = createAction(LOAD_USER_RENTALS, props<{userId:number}>());
export const loadUserRentalsSuccess = createAction(LOAD_USER_RENTALS_SUCCESS, props<{rentals:Rental[]}>());

export const loadCarImages = createAction(LOAD_CAR_IMAGES);
export const loadCarImagesSuccess = createAction(LOAD_CAR_IMAGES_SUCCESS, props<{carImages:CarImage[]}>())

export const loadCarDetailImages = createAction(LOAD_CAR_DETAIL_IMAGES);
export const loadCarDetailImagesSuccess= createAction(LOAD_CAR_DETAIL_IMAGES_SUCCESS, props<{carImages:CarImage[]}>());


export const addCarDetailImages = createAction(ADD_CAR_DETAIL_IMAGES, props<{formData:FormData}>());
export const addCarDetailImagesSuccess = createAction(ADD_CAR_DETAIL_IMAGES, props<{message:string}>());

export const addCar = createAction(ADD_CAR, props<{ formData:FormData }>());
export const addCarSuccess= createAction(ADD_CAR_SUCCESS, props<{message:string}>());

export const addCarImage = createAction(ADD_CAR, props<{ carId:number, formData:FormData }>());
export const addCarImageSuccess= createAction(ADD_CAR_SUCCESS, props<{message:string}>());

export const deleteCarAction = createAction(DELETE_CAR_ACTION, props<{carToDelete:CarDelete, redirect:boolean}>());
export const deleteCarSuccess = createAction(DELETE_CAR_SUCCESS, props<{message:string, redirect:boolean, carId:number}>());

export const updateCarAction = createAction(UPDATE_CAR_ACTION, props<{car:Car}>());
export const updateCarSuccess = createAction(UPDATE_CAR_SUCCESS, props<{car:Car}>());

export const addFavoriteAction = createAction(ADD_FAVORITE_ACTION, props<{carId:number, userId:number}>())
export const addFavoriteActionSuccess = createAction(ADD_FAVORITE_SUCCESS, props<{message:string, carId:number}>())

export const deleteFavoriteAction = createAction(DELETE_FAVORITE_ACTION, props<{userId:number, carId:number}>());
export const deleteFavoriteActionSuccess = createAction(DELETE_FAVORITE_SUCCESS, props<{message:string, carId:number}>());

export const checkIfCarIsReturned = createAction(CHECK_IF_CAR_IS_RETURNED_ACTION, props<{carId:number}>());
export const checkIfCarIsReturnedSuccess = createAction(CHECK_IF_CAR_IS_RETURNED_ACTION_SUCCESS, props<{response:boolean}>())
export const checkIfCarIsReturnedFail = createAction(CHECK_IF_CAR_IS_RETURNED_ACTION_FAIL, props<{response:boolean}>())



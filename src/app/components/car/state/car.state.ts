import { Car } from "src/app/models/car.model";
import { CarImage } from "src/app/models/carImage";
import { Favorite } from "src/app/models/favorite";



export interface CarState {
    cars:Car[];
    selectedCar:Car
    carImages:CarImage[];
    favorites:Favorite[];
}

export const initialState:CarState = {
    cars:null,
    selectedCar:null,
    carImages:null,
    favorites:null,
}
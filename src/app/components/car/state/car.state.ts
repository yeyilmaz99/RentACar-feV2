import { Car } from "src/app/models/car.model";
import { CarImage } from "src/app/models/carImage";



export interface CarState {
    cars:Car[];
    selectedCar:Car
    carImages:CarImage[];
}

export const initialState:CarState = {
    cars:null,
    selectedCar:null,
    carImages:null
}
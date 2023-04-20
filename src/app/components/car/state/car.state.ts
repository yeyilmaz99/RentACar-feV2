import { Car } from "src/app/models/car.model";
import { CarImage } from "src/app/models/carImage";



export interface CarState {
    cars:Car[];
    carImages:CarImage[];
}

export const initialState:CarState = {
    cars:null,
    carImages:null
}
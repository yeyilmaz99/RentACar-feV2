import { Car } from "src/app/models/car.model";



export interface CarState {
    cars:Car[];
}

export const initialState:CarState = {
    cars:null,
}
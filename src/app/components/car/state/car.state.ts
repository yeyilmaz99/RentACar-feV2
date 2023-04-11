import { Car } from "src/app/models/car.model";
import { ListResponseModel } from "src/app/models/listResponseModel";



export interface CarState {
    cars:Car[];
}

export const initialState:CarState = {
    cars:null
}
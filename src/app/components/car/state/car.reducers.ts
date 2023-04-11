import { createReducer, on } from "@ngrx/store";
import { initialState } from "./car.state";
import { loadCarsSuccess } from "./car.actions";




const _carReducer = createReducer(initialState,
    on(loadCarsSuccess, (state, action) => {
        return {
            ...state,
            cars: action.cars
        }
    }))


export function carReducer(state:any, action:any){
    return _carReducer(state,action);
}
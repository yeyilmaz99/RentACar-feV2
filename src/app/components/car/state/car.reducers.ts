import { createReducer, on } from "@ngrx/store";
import { initialState } from "./car.state";
import { deleteCarSuccess, loadCarDetailsSuccess, loadCarImagesSuccess, loadCarsSuccess, updateCarSuccess } from "./car.actions";




const _carReducer = createReducer(initialState,
    on(loadCarsSuccess, (state, action) => {
        return {
            ...state,
            cars: action.cars
        }
    }), on(loadCarImagesSuccess, (state, action) => {
        return {
            ...state,
            carImages:action.carImages
        }

    }), on(updateCarSuccess, (state, action) => {
        const updatedCars = state.cars.map(car => {
            return action.car.carId === car.carId ? action.car : car;
        })
        return {
            ...state,
            cars:updatedCars
        }
    }), on(loadCarDetailsSuccess, (state, action) => {
        return {
            ...state,
            selectedCar: action.car
        }

    }), on(deleteCarSuccess, (state,action) => {
        const updatedCars = state.cars.filter(car => {
            return car.carId !== action.carId
        })
        return {
            ...state,
            cars:updatedCars
        }
    })

    )


export function carReducer(state:any, action:any){
    return _carReducer(state,action);
}
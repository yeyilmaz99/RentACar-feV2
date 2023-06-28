import { createReducer, on } from "@ngrx/store";
import { initialState } from "./car.state";
import { addFavoriteActionSuccess, checkIfCarIsReturned, checkIfCarIsReturnedFail, checkIfCarIsReturnedSuccess, deleteCarSuccess, loadCarDetailsSuccess, loadCarImagesSuccess, loadCarsSuccess, loadFavoriteCarsSuccess, loadUserRentalsSuccess, updateCarSuccess } from "./car.actions";
import { act } from "@ngrx/effects";




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
            cars:updatedCars,
            selectedCar: action.car
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
    }), on(loadFavoriteCarsSuccess, (state,action)=> {
        return {
            ...state,
            favorites:action.favorites
        }
    }), on(loadUserRentalsSuccess, (state,action) => {
        return {
            ...state,
            userRentals:action.rentals
        }
    }), on(checkIfCarIsReturnedSuccess, (state,action) => {
        return {
            ...state,
            isReturned:action.response
        }
    }), on(checkIfCarIsReturnedFail, (state,action) => {
        return {
            ...state,
            isReturned: action.response
        }
    })

    )


export function carReducer(state:any, action:any){
    return _carReducer(state,action);
}
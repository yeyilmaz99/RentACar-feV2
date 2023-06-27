import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CarState } from "./car.state";
import { getCurrentRoute } from "src/app/router/router.selector";
import { RouterStateUrl } from "src/app/router/custom-serializer";
import { Car } from "src/app/models/car.model";



export const CAR_STATE_NAME = 'cars';

const getCarState = createFeatureSelector<CarState>(CAR_STATE_NAME);



export const getCars = createSelector(getCarState, (state) => {
    return state.cars;
})

export const getCarDetails = createSelector(getCarState, (state) => {
    return state.selectedCar
})

export const getCarById = createSelector(getCars,getCurrentRoute,(cars:Car[],route:RouterStateUrl) => {
    return cars ? cars.find((car:Car) => car.carId == route.params['id']) : null;
})

export const getCarImages = createSelector(getCarState, (state) => {
    return state.carImages;
})

export const getFavorites = createSelector(getCarState, (state) => {
    return state.favorites;
})

export const checkFavorites = createSelector(getCarState,(state) =>{
    return state.favorites.some(c => c.carId === state.selectedCar.carId)
} )

export const getUserRentals = createSelector(getCarState, (state) => {
    return state.userRentals
})
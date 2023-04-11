import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CarState } from "./car.state";
import { getCurrentRoute } from "src/app/router/router.selector";
import { RouterStateUrl } from "src/app/router/custom-serializer";



export const CAR_STATE_NAME = 'cars';

const getCarState = createFeatureSelector<CarState>(CAR_STATE_NAME);



export const getCars = createSelector(getCarState, (state) => {
    return state.cars;
})

export const getPostById = createSelector(getCars,getCurrentRoute,(cars:any,route:RouterStateUrl) => {
    return cars ? cars.find((car:any) => car.id === route.params['id']) : null;
})
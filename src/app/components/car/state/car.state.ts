import { Car } from "src/app/models/car.model";
import { CarImage } from "src/app/models/carImage";
import { Favorite } from "src/app/models/favorite";
import { Rental } from "src/app/models/rental";
import { RentalDetails } from "src/app/models/rentalDetails";



export interface CarState {
    cars:Car[];
    selectedCar:Car
    carProfileImage:CarImage[];
    carDetailImages:CarImage[];
    favorites:Favorite[];
    userRentals:Rental[];
    isReturned:boolean;
    filteredCars:Car[];
}

export const initialState:CarState = {
    cars:null,
    selectedCar:null,
    carProfileImage:null,
    carDetailImages:null,
    favorites:null,
    userRentals:null,
    isReturned:null,
    filteredCars:null
}
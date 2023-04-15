import { Color } from "src/app/models/color.model";



export interface ColorState {
    colors:Color[];
}

export const initialState:ColorState = {
    colors:null
}
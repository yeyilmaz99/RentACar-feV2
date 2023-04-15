import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ColorState } from "./color.state";
import { getCurrentRoute } from "src/app/router/router.selector";
import { RouterStateUrl } from "src/app/router/custom-serializer";
import { Color } from "src/app/models/color.model";




export const COLOR_STATE_NAME = 'colors';


const getColorState = createFeatureSelector<ColorState>(COLOR_STATE_NAME);



export const getColors = createSelector(getColorState, (state) => {
    return state.colors;
})

export const getColorById = createSelector(getColors, getCurrentRoute,(colors:Color[], route:RouterStateUrl) => {
    return colors ? colors.find((color:Color) => color.colorId === route.params['id']) : null;
})
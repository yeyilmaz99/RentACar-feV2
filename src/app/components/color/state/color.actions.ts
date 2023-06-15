import { createAction, props } from "@ngrx/store";
import { Color } from "src/app/models/color.model";



export const LOAD_COLORS = '[color] load colors';
export const LOAD_COLORS_SUCCESS = '[color] load colors success';

export const ADD_COLOR_ACTION = '[color] add color';
export const ADD_COLOR_SUCCESS = '[color] add color success';

export const DELETE_COLOR_ACTION ='[color] delete color';
export const DELETE_COLOR_SUCCESS ='[color] delete color success';

export const loadColors = createAction(LOAD_COLORS);
export const loadColorsSuccess = createAction(LOAD_COLORS_SUCCESS, props<{colors: Color[]}>())

export const addColor = createAction(ADD_COLOR_ACTION, props<{color:Color}>());
export const addColorSuccess = createAction(ADD_COLOR_SUCCESS, props<{message:string}>())

export const deleteColor = createAction(DELETE_COLOR_ACTION, props<{color:Color}>());
export const deleteColorSuccess = createAction(DELETE_COLOR_SUCCESS, props<{id:number, message:string}>())
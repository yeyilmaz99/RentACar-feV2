import { createReducer, on } from "@ngrx/store";
import { initialState } from "./color.state";
import { deleteColorSuccess, loadColorsSuccess } from "./color.actions";





const _colorReducer = createReducer(initialState, 
    on(loadColorsSuccess, (state,action) => {
        return {
            ...state,
            colors:action.colors
        }
    }), on(deleteColorSuccess, (state,action)=> {
        const updatedColors = state.colors.filter(color => {
            return color.colorId != action.id
        })
        return {
            ...state,
            colors:updatedColors
        }
    }))


    export function colorReducer(state:any, action:any){
        return _colorReducer(state,action);
    }
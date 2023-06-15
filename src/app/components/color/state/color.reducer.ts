import { createReducer, on } from "@ngrx/store";
import { initialState } from "./color.state";
import { addColorSuccess, deleteColorSuccess, loadColorsSuccess } from "./color.actions";





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
    }), on(addColorSuccess, (state,action)=> {
        let color = {...action.color};
        return {
            ...state,
            colors: [...state.colors, color]
        }
    }))


    export function colorReducer(state:any, action:any){
        return _colorReducer(state,action);
    }
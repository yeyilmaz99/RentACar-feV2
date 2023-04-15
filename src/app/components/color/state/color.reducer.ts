import { createReducer, on } from "@ngrx/store";
import { initialState } from "./color.state";
import { loadColorsSuccess } from "./color.actions";





const _colorReducer = createReducer(initialState, 
    on(loadColorsSuccess, (state,action) => {
        return {
            ...state,
            colors:action.colors
        }
    }))


    export function colorReducer(state:any, action:any){
        return _colorReducer(state,action);
    }
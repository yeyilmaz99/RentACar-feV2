import { createReducer, on } from "@ngrx/store";
import { initialState } from "./brand.state";
import { loadBrandsSuccess } from "./brand.actions";





const _brandReducer = createReducer(initialState,
    on(loadBrandsSuccess, (state, action) => {
        return {
            ...state,
            brands: action.brands
        }
    })    
    
    )



export function brandReducer(state:any, action:any){
    return _brandReducer(state,action);
}
import { createReducer, on } from "@ngrx/store";
import { initialState } from "./brand.state";
import { deleteBrand, deleteBrandSuccess, loadBrandsSuccess } from "./brand.actions";





const _brandReducer = createReducer(initialState,
    on(loadBrandsSuccess, (state, action) => {
        return {
            ...state,
            brands: action.brands
        }
    }), on(deleteBrandSuccess, (state,action) => {
        const updatedBrands = state.brands.filter(brand => {
            return brand.brandId != action.id
        })
        // console.log(updatedBrands);
        return {
            ...state,
            brands: updatedBrands,
        }
    })   
    
    )



export function brandReducer(state:any, action:any){
    return _brandReducer(state,action);
}
import { createAction, props } from "@ngrx/store"
import { Brand } from "src/app/models/brand.model";


export const LOAD_BRANDS = '[brand] load brands'
export const LOAD_BRANDS_SUCCESS = '[brand] load brands success'

export const ADD_BRAND_ACTION = '[brand] add brand';
export const ADD_BRAND_SUCCESS = '[brand] add brand success'


export const loadBrands = createAction(LOAD_BRANDS);
export const loadBrandsSuccess = createAction(LOAD_BRANDS_SUCCESS,props<{brands:Brand[]}>())


export const addBrand = createAction(ADD_BRAND_ACTION, props<{brand:Brand}>());
export const addBrandSuccess = createAction(ADD_BRAND_SUCCESS, props<{message:string}>())
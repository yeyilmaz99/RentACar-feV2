import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BrandState } from "./brand.state";
import { getCurrentRoute } from "src/app/router/router.selector";
import { RouterStateUrl } from "src/app/router/custom-serializer";



export const BRAND_STATE_NAME = 'brands';

const getBrandState = createFeatureSelector<BrandState>(BRAND_STATE_NAME);



export const getBrands = createSelector(getBrandState, (state) => {
    return state.brands
})

export const getBrandById = createSelector(getBrands, getCurrentRoute,(brands:any, route:RouterStateUrl) => {
    return brands ? brands.find((brand:any) => brand.id ===route.params['id']) : null;
})
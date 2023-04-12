import { Brand } from "src/app/models/brand.model";



export interface BrandState {
    brands:Brand[];
}

export const initialState:BrandState = {
    brands: null
}
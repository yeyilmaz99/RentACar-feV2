
import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { SharedReducer } from "./shared/shared.reducer";
import { SHARED_STATE_NAME } from "./shared/shared.selector";
import { SharedState } from "./shared/shared.state";
import { AuthState } from "../components/auth/state/auth.state";
import { AuthReducer } from "../components/auth/state/auth.reducer";
import { AUTH_STATE_NAME } from "../components/auth/state/auth.selector";
import { COLOR_STATE_NAME } from "../components/color/state/color.selector";
import { ColorState } from "../components/color/state/color.state";
import { colorReducer } from "../components/color/state/color.reducer";
import { BRAND_STATE_NAME } from "../components/brand/state/brand.selector";
import { BrandState } from "../components/brand/state/brand.state";
import { brandReducer } from "../components/brand/state/brand.reducer";



export interface AppState {
    [AUTH_STATE_NAME]:AuthState
    [SHARED_STATE_NAME]:SharedState;
    [COLOR_STATE_NAME]:ColorState;
    [BRAND_STATE_NAME]:BrandState;
    router:RouterReducerState;
}

export const appReducer = {
    [SHARED_STATE_NAME]:SharedReducer,
    [AUTH_STATE_NAME]:AuthReducer,
    [COLOR_STATE_NAME]:colorReducer,
    [BRAND_STATE_NAME]:brandReducer,
    router:routerReducer
}
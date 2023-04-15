
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


export interface AppState {
    [AUTH_STATE_NAME]:AuthState
    [SHARED_STATE_NAME]:SharedState;
    [COLOR_STATE_NAME]:ColorState
    router:RouterReducerState;
}

export const appReducer = {
    [SHARED_STATE_NAME]:SharedReducer,
    [AUTH_STATE_NAME]:AuthReducer,
    [COLOR_STATE_NAME]:colorReducer,
    router:routerReducer
}
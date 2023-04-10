
import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { SharedReducer } from "./shared/shared.reducer";
import { SHARED_STATE_NAME } from "./shared/shared.selector";
import { SharedState } from "./shared/shared.state";
import { AuthState } from "../components/auth/state/auth.state";
import { AuthReducer } from "../components/auth/state/auth.reducer";
import { AUTH_STATE_NAME } from "../components/auth/state/auth.selector";


export interface AppState {
    [AUTH_STATE_NAME]:AuthState
    [SHARED_STATE_NAME]:SharedState;
    router:RouterReducerState;
}

export const appReducer = {
    [SHARED_STATE_NAME]:SharedReducer,
    [AUTH_STATE_NAME]:AuthReducer,
    router:routerReducer
}
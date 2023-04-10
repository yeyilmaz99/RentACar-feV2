import { createReducer, on } from "@ngrx/store"
import { autoLogout, loginSuccess, signupSuccess } from "./auth.actions"
import { initialState } from "./auth.state"


const _authReducer = createReducer(initialState, on(loginSuccess, (state,action) => {
    return {
        ...state,
        user:action.user,
        admin:action.admin
    }
}),
on(signupSuccess, (state, action)=> {
    return {
        ...state,
        user:action.user,
        admin:action.admin
    }
}), on(autoLogout, (state)=> {
    return {
        ...state,
        user:null,
        admin:null
    }
})
)


export function AuthReducer(state:any,action:any){
    return _authReducer(state,action)
}
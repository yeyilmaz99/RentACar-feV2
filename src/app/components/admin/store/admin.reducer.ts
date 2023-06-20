import { createReducer, on } from "@ngrx/store"
import { initialState } from "./admin.state"
import { loadActiveUsersSuccess, loadUsersSuccess } from "./admin.actions";


const _adminReducer = createReducer(initialState, 
    on(loadUsersSuccess, (state, action)=> {
        return {
            ...state,
            users: action.users
        }
    }),on(loadActiveUsersSuccess, (state,action) => {
        return {
            ...state,
            activeUsers:action.activeUsers
        }
    })
    )






export function adminReducer(state:any, action:any){
    return _adminReducer(state,action);
}
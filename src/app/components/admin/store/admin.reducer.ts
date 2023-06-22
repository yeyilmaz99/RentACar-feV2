import { createReducer, on } from "@ngrx/store"
import { initialState } from "./admin.state"
import { loadActiveUsersSuccess, loadRentals, loadRentalsSuccess, loadUsersSuccess, updateActiveUserSuccess, updateUserSuccess } from "./admin.actions";


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
    }),on (updateUserSuccess, (state,action) => {
        const updatedUsers = state.users.map(user => {
            return action.user.id === user.id ? action.user : user;
        })
        return {
            ...state,
            users:updatedUsers
        }
    }), on(updateActiveUserSuccess, (state,action) => {
        const updatedActiveUsers = state.activeUsers.map(activeUser => {
            return action.activeUser.id === activeUser.id ? action.activeUser : activeUser;
        })
        return {
            ...state,
            activeUsers:updatedActiveUsers
        }
    }), on(loadRentalsSuccess, (state,action) => {
        return {
            ...state,
            rentals: action.rentals
        }
    })
    )






export function adminReducer(state:any, action:any){
    return _adminReducer(state,action);
}
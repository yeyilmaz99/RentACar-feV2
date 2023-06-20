import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AdminState } from "./admin.state";





export const ADMIN_PANEL_STATE_NAME = 'adminPanel';


const getAdminPanelState = createFeatureSelector<AdminState>(ADMIN_PANEL_STATE_NAME);


export const getUsers = createSelector(getAdminPanelState, (state)=> {
    return state.users
})

export const getActiveUsers = createSelector(getAdminPanelState, (state)=> {
    return state.activeUsers
})
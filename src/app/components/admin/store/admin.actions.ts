import { createAction, props } from "@ngrx/store";
import { ActiveUser } from "src/app/models/activeUser";
import { RentalDetails } from "src/app/models/rentalDetails";
import { User } from "src/app/models/user.model";
import { UserList } from "src/app/models/userList";


export const LOAD_USERS = '[admin page] load users';
export const LOAD_USERS_SUCCESS = '[admin page] load users success';

export const LOAD_ACTIVE_USERS = '[admin page] load active users';
export const LOAD_ACTIVE_USERS_SUCCESS = '[admin page] load active users success';

export const LOAD_RENTALS = '[admin page] load rentals';
export const LOAD_RENTALS_SUCCESS = '[admin page] load rentals success';

export const DELETE_USER_ACTION = '[admin page] delete user';
export const DELETE_USER_SUCCESS = '[admin page] delete user success';

export const UPDATE_USER_ACTION = '[admin page] update user';
export const UPDATE_USER_SUCCESS = '[admin page] update user success';
export const UPDATE_ACTIVE_USER_ACTION = '[admin page] update user';
export const UPDATE_ACTIVE_USER_SUCCESS = '[admin page] update user success';

export const loadUsers = createAction(LOAD_USERS);
export const loadUsersSuccess = createAction(LOAD_USERS_SUCCESS, props<{users:UserList[]}>());

export const loadActiveUsers = createAction(LOAD_ACTIVE_USERS);
export const loadActiveUsersSuccess = createAction(LOAD_ACTIVE_USERS_SUCCESS, props<{activeUsers:ActiveUser[]}>());

export const loadRentals = createAction(LOAD_RENTALS);
export const loadRentalsSuccess = createAction(LOAD_RENTALS_SUCCESS, props<{rentals:RentalDetails[]}>());

export const deleteUser = createAction(DELETE_USER_ACTION, props<{user:UserList | ActiveUser}>());
export const deleteUserSuccess = createAction(DELETE_USER_ACTION, props<{userId: number}>());

export const updateUser = createAction(UPDATE_USER_ACTION, props<{user:UserList}>());
export const updateUserSuccess = createAction(UPDATE_USER_SUCCESS, props<{user: UserList }>());

export const updateActiveUser = createAction(UPDATE_ACTIVE_USER_ACTION, props<{activeUser:ActiveUser}>());
export const updateActiveUserSuccess = createAction(UPDATE_ACTIVE_USER_SUCCESS, props<{activeUser: ActiveUser }>());
import { ActiveUser } from "src/app/models/activeUser";
import { UserList } from "src/app/models/userList";



export interface AdminState {
    users:UserList[];
    activeUsers:ActiveUser[];
}

export const initialState:AdminState = {
    users:null,
    activeUsers:null
}
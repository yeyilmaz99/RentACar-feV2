import { ActiveUser } from "src/app/models/activeUser";
import { Rental } from "src/app/models/rental";
import { UserList } from "src/app/models/userList";



export interface AdminState {
    users:UserList[];
    activeUsers:ActiveUser[];
    rentals:Rental[];
}

export const initialState:AdminState = {
    users:null,
    activeUsers:null,
    rentals:null
}
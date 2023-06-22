import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { Store } from "@ngrx/store"
import { ToastrService } from "ngx-toastr"
import { AppState } from "src/app/store/app.state"
import { deleteUser, loadActiveUsers, loadActiveUsersSuccess, loadRentals, loadRentalsSuccess, loadUsers, loadUsersSuccess, updateActiveUser, updateUser, updateUserSuccess } from "./admin.actions"
import { map, mergeMap, of } from "rxjs"
import { UserService } from "src/app/services/user-service/user-service.service"
import { RentalService } from "src/app/services/rentalService/rental.service"

@Injectable()
export class AdminEffects {
  constructor(private actions$: Actions, private store: Store<AppState>, private router: Router, private toastrService: ToastrService, private userService:UserService, private rentalService:RentalService) { }


    loadUsers$ = createEffect (() => {
        return this.actions$.pipe(ofType(loadUsers), mergeMap((action) => {
            return this.userService.getAllUsers().pipe(map((response) => {
                const users = response.data;
                return loadUsersSuccess({users});
            }))
        }))
    })


    loadActiveUsers$ = createEffect (() => {
        return this.actions$.pipe(ofType(loadActiveUsers), mergeMap((action) => {
            return this.userService.getActiveUsers().pipe(map((response) => {
                const activeUsers = response.data;
                return loadActiveUsersSuccess({activeUsers});
            }))
        }))
    })

    updateUser$= createEffect(() => {
        return this.actions$.pipe(ofType(updateUser), mergeMap((action) => {
            return this.userService.updateUser(action.user).pipe(mergeMap((response) => {
                const updateUserSuccessAction = updateUserSuccess({user:action.user});
                return of (updateUserSuccessAction, loadUsers());
            }))
        }))
    })


    updateActiveUser$= createEffect(() => {
        return this.actions$.pipe(ofType(updateActiveUser), mergeMap((action) => {
            return this.userService.updateUser(action.activeUser).pipe(mergeMap((response) => {
                const updateUserSuccessAction = updateUserSuccess({user:action.activeUser});
                return of (updateUserSuccessAction, loadActiveUsers());
            }))
        }))
    })

    loadRentals$ = createEffect(() => {
        return this.actions$.pipe(ofType(loadRentals), mergeMap((action) => {
            return this.rentalService.getRentals().pipe(map((response => {
                const rentals = response.data
                return loadRentalsSuccess({rentals})
            })))
        }))
    })






}
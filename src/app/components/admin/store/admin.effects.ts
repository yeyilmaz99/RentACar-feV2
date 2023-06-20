import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { Store } from "@ngrx/store"
import { ToastrService } from "ngx-toastr"
import { AppState } from "src/app/store/app.state"
import { loadActiveUsers, loadActiveUsersSuccess, loadUsers, loadUsersSuccess } from "./admin.actions"
import { map, mergeMap } from "rxjs"
import { UserService } from "src/app/services/user-service/user-service.service"

@Injectable()
export class AdminEffects {
  constructor(private actions$: Actions, private store: Store<AppState>, private router: Router, private toastrService: ToastrService, private userService:UserService) { }


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




}
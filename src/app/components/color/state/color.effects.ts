import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { Store } from "@ngrx/store"
import { ToastrService } from "ngx-toastr"
import { ColorService } from "src/app/services/color.service"
import { AppState } from "src/app/store/app.state"
import { addColor, addColorSuccess, deleteColor, deleteColorSuccess, loadColors, loadColorsSuccess } from "./color.actions"
import { mergeMap,map, switchMap, concatMap } from "rxjs"
import { merge } from "lodash"


@Injectable()
export class ColorEffects{
    constructor(private actions$:Actions, private colorService:ColorService, private store:Store<AppState>, private router:Router, private toastrService:ToastrService){}

    loadColors$ = createEffect(() => {
        return this.actions$.pipe(ofType(loadColors), mergeMap((action) => {

            return this.colorService.getColors().pipe(map((response) => {
                // this.store.dispatch(setLoadingSpinner({status:false}))
                const colors = response.data
                return loadColorsSuccess({ colors })
            }))
        }))
    })

    addColor$ = createEffect(() => {
        return this.actions$.pipe(ofType(addColor), mergeMap(action => {
            return this.colorService.addColor(action.color).pipe(map(response => {
                const message = response.message
                this.toastrService.success(message)
                return addColorSuccess({ message });
            }))
        }))
      },)


      deleteColor$ = createEffect(() => {
        return this.actions$.pipe(ofType(deleteColor), mergeMap((action) => {
            return this.colorService.deleteColor(action.color).pipe(map((data) => {
                const message = data.message;
                const id = action.color.colorId
                return deleteColorSuccess({ id:id, message })
            }))
        }))
    })



}
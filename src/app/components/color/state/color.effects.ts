import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { Store } from "@ngrx/store"
import { ToastrService } from "ngx-toastr"
import { ColorService } from "src/app/services/color.service"
import { AppState } from "src/app/store/app.state"
import { loadColors, loadColorsSuccess } from "./color.actions"
import { mergeMap,map } from "rxjs"


@Injectable()
export class ColorEffects{
    constructor(private actions$:Actions, private colorService:ColorService, private store:Store<AppState>, private router:Router, private toastrService:ToastrService){}

    loadBrands$ = createEffect(() => {
        return this.actions$.pipe(ofType(loadColors), mergeMap((action) => {

            return this.colorService.getColors().pipe(map((response) => {
                // this.store.dispatch(setLoadingSpinner({status:false}))
                const colors = response.data
                return loadColorsSuccess({ colors })
            }))
        }))
    })


}
import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { Store } from "@ngrx/store"
import { ToastrService } from "ngx-toastr"
import { ColorService } from "src/app/services/color.service"
import { AppState } from "src/app/store/app.state"
import { addColor, addColorSuccess, deleteColor, deleteColorSuccess, loadColors, loadColorsSuccess, updateColor, updateColorSuccess } from "./color.actions"
import { mergeMap, map, switchMap, concatMap, of } from "rxjs"
import { merge } from "lodash"
import { setLoadingSpinner } from "src/app/store/shared/shared.actions"


@Injectable()
export class ColorEffects {
  constructor(private actions$: Actions, private colorService: ColorService, private store: Store<AppState>, private router: Router, private toastrService: ToastrService) { }

  loadColors$ = createEffect(() => {
    return this.actions$.pipe(ofType(loadColors), mergeMap((action) => {
      return this.colorService.getColors().pipe(map((response) => {
        const colors = response.data
        return loadColorsSuccess({ colors })
      }))
    }))
  })

  addColor$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addColor),
      mergeMap((action) => {
        return this.colorService.addColor(action.color).pipe(
          mergeMap((response) => {
            const message = response.message;
            const color = action.color;
            this.toastrService.success(message);
            const addColorSuccessAction = addColorSuccess({ message, color });
            return of(addColorSuccessAction, loadColors()); // loadColors eylemini çağırın
          })
        );
      })
    );
  });


  deleteColor$ = createEffect(() => {
    return this.actions$.pipe(ofType(deleteColor), mergeMap((action) => {
      return this.colorService.deleteColor(action.color).pipe(map((data) => {
        const message = data.message;
        const id = action.color.colorId
        return deleteColorSuccess({ id: id, message })
      }))
    }))
  },)

  updateColor$ = createEffect(() => {
    return this.actions$.pipe(ofType(updateColor), mergeMap((action) => {
      return this.colorService.updateColor(action.color).pipe(mergeMap((data) => {
        const updateColorSuccessAction = updateColorSuccess({color:action.color});
        return of(updateColorSuccessAction, loadColors());
      }))
    }))
  })





}
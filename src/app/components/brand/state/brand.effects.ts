import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { setLoadingSpinner } from "src/app/store/shared/shared.actions";
import { addBrand, addBrandSuccess, deleteBrand, deleteBrandSuccess, loadBrands, loadBrandsSuccess } from "./brand.actions";
import { map, mergeMap, switchMap } from "rxjs";
import { BrandService } from "src/app/services/brand/brand.service";
import { ToastrService } from "ngx-toastr";



@Injectable()
export class BrandEffects{
    constructor(private actions$:Actions, private brandService:BrandService, private store:Store<AppState>, private router:Router, private toastrService:ToastrService){}

    loadBrands$ = createEffect(() => {
        return this.actions$.pipe(ofType(loadBrands), mergeMap((action) => {
            return this.brandService.getBrands().pipe(map((response) => {
                this.store.dispatch(setLoadingSpinner({status:false}))
                const brands = response.data
                return loadBrandsSuccess({ brands })
            }))
        }))
    })


    addBrand$ = createEffect(() => {
      return this.actions$.pipe(ofType(addBrand), mergeMap(action => {
          return this.brandService.addBrand(action.brand).pipe(map(response => {
              const message = response.message
              const brand = action.brand
              this.toastrService.success(message)
              return addBrandSuccess({ message, brand });
          }))
      }))
    },)

    deleteBrand$ = createEffect(() => {
        return this.actions$.pipe(ofType(deleteBrand), switchMap((action) => {
            return this.brandService.deleteBrand(action.brand).pipe(map((data) => {
                const message = data.message;
                return deleteBrandSuccess({ id:action.brand.brandId, message })
            }))
        }))
    })





}
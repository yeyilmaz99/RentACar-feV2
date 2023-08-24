import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { setLoadingSpinner } from "src/app/store/shared/shared.actions";
import { addBrand, addBrandSuccess, deleteBrand, deleteBrandSuccess, loadBrands, loadBrandsSuccess, updateBrand, updateBrandSuccess } from "./brand.actions";
import { map, mergeMap, of, switchMap } from "rxjs";
import { BrandService } from "src/app/services/brand/brand.service";
import { ToastrService } from "ngx-toastr";



@Injectable()
export class BrandEffects {
    constructor(private actions$: Actions, private brandService: BrandService, private store: Store<AppState>, private router: Router, private toastrService: ToastrService) { }

    loadBrands$ = createEffect(() => {
        return this.actions$.pipe(ofType(loadBrands), mergeMap((action) => {
            this.store.dispatch(setLoadingSpinner({status:true , from:"load brands"}))
            return this.brandService.getBrands().pipe(map((response) => {
                this.store.dispatch(setLoadingSpinner({ status: false, from:"load brands success" }))
                const brands = response.data
                return loadBrandsSuccess({ brands })
            }))
        }))
    })


    addBrand$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addBrand),
            mergeMap((action) => {
                this.store.dispatch(setLoadingSpinner({status:true , from:"add brand"}))
                return this.brandService.addBrand(action.formData).pipe(
                    mergeMap((response) => {
                        const message = response.message;
                        this.toastrService.success(message);
                        const addBrandSuccessAction = addBrandSuccess({ message });
                        this.store.dispatch(setLoadingSpinner({status:false, from:"add brand success"}))
                        return of(addBrandSuccessAction, loadBrands());
                    })
                );
            })
        );
    });


    deleteBrand$ = createEffect(() => {
        return this.actions$.pipe(ofType(deleteBrand), switchMap((action) => {
            this.store.dispatch(setLoadingSpinner({status:true, from:"delete brand"}))
            return this.brandService.deleteBrand(action.brand).pipe(map((data) => {
                const message = data.message;
                this.store.dispatch(setLoadingSpinner({status:false, from:"delete brand success"}))
                return deleteBrandSuccess({ id: action.brand.brandId, message })
            }))
        }))
    })

    updateBrand$ = createEffect(() => {
        return this.actions$.pipe(ofType(updateBrand), mergeMap((action) => {
            this.store.dispatch(setLoadingSpinner({status:true, from:"update brand"}))
          return this.brandService.updateBrand(action.brand).pipe(mergeMap((data) => {
            const updateBrandSuccessAction = updateBrandSuccess({brand:action.brand});
            this.store.dispatch(setLoadingSpinner({status:false, from:"update brand success"}))
            return of(updateBrandSuccessAction, loadBrands());
          }))
        }))
      })





}
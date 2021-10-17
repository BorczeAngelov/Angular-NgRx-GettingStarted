import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { ProductService } from '../product.service';
import * as ProductActions from '../state/product.actions'

@Injectable()
export class ProductEffects {

    constructor(private actions$: Actions,
        private productService: ProductService) { }


    loadProduct$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(ProductActions.loadProducts),
                mergeMap(() =>
                    this.productService.getProducts()
                        .pipe(
                            map(products => ProductActions.loadProductsSuccess({ products })),
                            catchError(error => of(ProductActions.loadProductsFailure({ error })))
                        )
                )
            )
    });


    updateProduct$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(ProductActions.updateProduct),
                concatMap(action =>
                    this.productService.updateProduct(action.product)
                        .pipe(
                            map(() => ProductActions.updateProductSuccess({ product: action.product })),
                            catchError(error => of(ProductActions.updateProductFailure({ error })))
                        )
                )
            )
    });


    deleteProduct$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(ProductActions.deleteProduct),
                concatMap(action =>
                    this.productService.deleteProduct(action.productId)
                        .pipe(
                            map(() => ProductActions.deleteProductSuccess({ productId: action.productId })),
                            catchError(error => of(ProductActions.deleteProductFailure({ error })))
                        )
                )
            )
    });
}
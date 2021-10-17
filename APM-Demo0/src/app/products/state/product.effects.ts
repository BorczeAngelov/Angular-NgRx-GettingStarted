import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { ProductService } from '../product.service';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductPageActions, ProductApiActions } from './actions'

@Injectable()
export class ProductEffects {

    constructor(private actions$: Actions,
        private productService: ProductService) { }


    loadProduct$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(ProductPageActions.loadProducts),
                mergeMap(() =>
                    this.productService.getProducts()
                        .pipe(
                            map(products => ProductApiActions.loadProductsSuccess({ products })),
                            catchError(error => of(ProductApiActions.loadProductsFailure({ error })))
                        )
                )
            )
    });

    addProduct$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(ProductPageActions.createProduct),
                concatMap(action =>
                    this.productService.createProduct(action.product)
                        .pipe(
                            map(() => ProductApiActions.createProductSuccess({ product: action.product })),
                            catchError(error => of(ProductApiActions.createProductFailure({ error })))
                        )
                )
            )
    });

    updateProduct$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(ProductPageActions.updateProduct),
                concatMap(action =>
                    this.productService.updateProduct(action.product)
                        .pipe(
                            map(() => ProductApiActions.updateProductSuccess({ product: action.product })),
                            catchError(error => of(ProductApiActions.updateProductFailure({ error })))
                        )
                )
            )
    });

    deleteProduct$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(ProductPageActions.deleteProduct),
                concatMap(action =>
                    this.productService.deleteProduct(action.productId)
                        .pipe(
                            map(() => ProductApiActions.deleteProductSuccess({ productId: action.productId })),
                            catchError(error => of(ProductApiActions.deleteProductFailure({ error })))
                        )
                )
            )
    });
}
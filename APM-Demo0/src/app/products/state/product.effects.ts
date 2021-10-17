import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { ProductService } from '../product.service';
import * as ProductActions from '../state/product.actions'

@Injectable()
export class ProductEffects {

    constructor(private actions$: Actions,
        private productService: ProductService) { }


    loadProduct$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductActions.loadProducts),
            mergeMap(() => this.productService.getProducts().pipe(
                map(products => ProductActions.loadProductsSuccess({ products }))
            ))
        )
    });
}
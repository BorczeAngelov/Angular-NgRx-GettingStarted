import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Product } from '../product';
import { getCurrentProduct, getError, getProducts, getShowProductCode, State } from '../state';
import * as ProductActions from '../state/product.actions'
import { Observable } from 'rxjs';

@Component({
  templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {
  errorMessage$: Observable<string>;
  displayCode$: Observable<boolean>;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());

    this.errorMessage$ = this.store.select(getError);
    this.products$ = this.store.select(getProducts);
    this.displayCode$ = this.store.select(getShowProductCode);
    this.selectedProduct$ = this.store.select(getCurrentProduct);
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initializeCurrentProduct())
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductActions.setCurrentProduct({ currentProductId: product.id }));
  }
}

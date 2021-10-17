import * as ProductActions from '../state/product.actions'
import { Product } from "../product";
import { createReducer, on } from "@ngrx/store";

export interface ProductState {
    showProductCode: boolean,
    currentProductId: number,
    products: Product[],
    error: string
}

const initialState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    error: ""
}

export const productReducer = createReducer<ProductState>(
    initialState,
    on(ProductActions.toggleProductCode, (state): ProductState => {
        return {
            ...state,
            showProductCode: !state.showProductCode
        };
    }),
    on(ProductActions.setCurrentProduct, (state, action): ProductState => {
        return {
            ...state,
            currentProductId: action.currentProductId
        };
    }),
    on(ProductActions.clearCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProductId: null
        };
    }),
    on(ProductActions.initializeCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProductId: 0
        };
    }),
    on(ProductActions.loadProductsSuccess, (state, action): ProductState => {
        return {
            ...state,
            products: action.products,
            error: ''
        }
    }),
    on(ProductActions.loadProductsFailure, (state, action): ProductState => {
        return {
            ...state,
            products: [],
            error: action.error
        }
    }),
    on(ProductActions.createProductSuccess, (state, action): ProductState => {
        const updatedProducts = state.products.concat(action.product)
        return {
            ...state,
            products: updatedProducts,
            currentProductId: action.product.id,
            error: ''
        }
    }),
    on(ProductActions.createProductFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        }
    }),
    on(ProductActions.updateProductSuccess, (state, action): ProductState => {
        const updatedProducts = state.products.map(item => item.id === action.product.id ? action.product : item)
        return {
            ...state,
            products: updatedProducts,
            currentProductId: action.product.id,
            error: ''
        }
    }),
    on(ProductActions.updateProductFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        }
    }),
    on(ProductActions.deleteProductSuccess, (state, action): ProductState => {
        const updatedProducts = state.products.filter(item => item.id != action.productId)
        return {
            ...state,
            products: updatedProducts,
            currentProductId: null,
            error: ''
        }
    }),
    on(ProductActions.deleteProductFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        }
    })
);
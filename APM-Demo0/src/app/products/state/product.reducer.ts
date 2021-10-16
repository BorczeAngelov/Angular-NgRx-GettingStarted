import { createAction, createReducer, on } from "@ngrx/store";

export const productReducer = createReducer(
    { showPoductCode: true },
    on(createAction('[Product] Toggle Product Code'), state => {
        console.log('original state: ' + JSON.stringify(state));
        return {
            ...state,
            showPoductCode: !state.showPoductCode
        };
    })
);
import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";

import { User } from "../user";


// State for this feature (User)
export interface UserState {
    maskUserName: boolean;
    currentUser: User;
  }
  
  const initialState: UserState = {
    maskUserName: true,
    currentUser: null
  };
  
  // Selector functions
  const getUserFeatureState = createFeatureSelector<UserState>('user');
  
  export const getMaskUserName = createSelector(
    getUserFeatureState,
    state => state.maskUserName //there is a bug
  );
  
  export const getCurrentUser = createSelector(
    getUserFeatureState,
    state => state.currentUser
  );
  

export const userReducer = createReducer<UserState>(
    initialState,
    on(createAction('[User] Mask User Name'), (state): UserState => {
        return {
            ...state,
            maskUserName: !state.maskUserName
        };
    })
);
import { GenderEnum } from '../interfaces/user';
import { createFeature, createFeatureSelector, createReducer, createSelector } from '@ngrx/store';

export interface UserState {
  name: string | null;
  surname: string | null;
  email: string | null;
  sex: GenderEnum | null,
  loading: boolean;
}

export const initialState: UserState = {
  name: null,
  surname: null,
  email: null,
  sex: null,
  loading: false,
}

export const userFeatureKey = 'user';

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer: createReducer(initialState),
});

export const selectUser = createFeatureSelector<UserState>(userFeatureKey);
export const isUserLogged = createSelector(selectUser, (state: UserState) => !!state.email);

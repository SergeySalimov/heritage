import { IUser } from '../core/interfaces/user';
import { createFeature, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { UserApiActions } from './user.actions';

export interface UserState {
  user: IUser,
  error: string | null;
  token: string | null;
  loading: boolean;
}

const initialUser = (): IUser => ({ name: null, surname: null, email: null, gender: null });

export const initialState: UserState = {
  user: initialUser(),
  error: null,
  token: null,
  loading: false,
}

export const userFeatureKey = 'user';

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer: createReducer(
    initialState,
    on(UserApiActions.registerUser, (state, {user: {name, email, gender, surname}}) => ({
        ...state, user: {...state.user, name, surname, email, gender }, loading: true,
      }),
    ),
    on(UserApiActions.registerUserSuccess, (state, { token }) => ({ ...state, token, loading: false })),
    on(UserApiActions.registerUserFailure, (state, { error }) => ({ ...state, error, user: initialUser() ,loading: false })),
  ),
});

export const selectUser = createFeatureSelector<UserState>(userFeatureKey);
export const isUserLogged = createSelector(selectUser, (state: UserState) => !!state.user.email);

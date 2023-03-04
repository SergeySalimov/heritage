import { IUser } from '../core/interfaces/user';
import { createFeature, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { UserActions, UserApiActions } from './user.actions';

export interface UserState {
  user: IUser,
  token: string | null;
  loading: boolean;
}

const initialUser = (): IUser => ({ name: null, surname: null, email: null, gender: null });

export const initialState: UserState = {
  user: initialUser(),
  token: null,
  loading: false,
}

export const userFeatureKey = 'userState';

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer: createReducer(
    initialState,
    on(UserApiActions.registerUser, (state, { user: { name, email, gender, surname } }) => ({
        ...state, user: {...state.user, name, surname, email, gender }, loading: true,
      }),
    ),
    on(UserApiActions.loginUser, (state, { user: { email }}) =>
      ({ ...state, user: { ...state.user, email }, loading: true }),
    ),
    on(
      UserApiActions.registerUserSuccess,
      UserApiActions.loginUserSuccess,
      (state, { token }) => ({ ...state, token, loading: false }),
    ),
    on(
      UserApiActions.registerUserFailure,
      UserApiActions.loginUserFailure,
      (state, { error }) => ({ ...state, error, user: initialUser(), loading: false }),
    ),
    on(UserActions.logout, state => ({ ...state, user: initialUser(), token: null })),
  ),
});

export const { selectLoading } = userFeature;

export const selectUser = createFeatureSelector<UserState>(userFeatureKey);
export const isUserLogged = createSelector(selectUser, (state: UserState) => !!state.user.email);

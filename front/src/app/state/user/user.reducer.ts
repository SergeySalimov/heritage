import { createFeature, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as UserActions from '../../state/user/user.actions';
import { IUser } from '../../core/interfaces/user';

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
    on(UserActions.registerUser, (state, { user: { name, email, gender, surname } }) => ({
        ...state, user: {...state.user, name, surname, email, gender }, loading: true,
      }),
    ),
    on(UserActions.loginUser, (state, { user: { email }}) =>
      ({ ...state, user: { ...state.user, email }, loading: true }),
    ),
    on(
      UserActions.registerUserSuccess,
      UserActions.loginUserSuccess,
      (state, { response: { token, id } }) => ({
        ...state, token, loading: false, user: { ...state.user, id }
      }),
    ),
    on(
      UserActions.registerUserFailure,
      UserActions.loginUserFailure,
      (state, { error }) => ({ ...state, error, user: initialUser(), loading: false }),
    ),
    on(UserActions.logout, state => ({ ...state, user: initialUser(), token: null })),
  ),
});

export const { selectLoading, selectUser } = userFeature;

export const selectUserState = createFeatureSelector<UserState>(userFeatureKey);
export const isUserLogged = createSelector(selectUserState, (state: UserState) => !!state.user.email);
export const getCurrentUserId = createSelector(selectUser, (user: IUser) => user?.id ?? null);

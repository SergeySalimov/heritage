import { createAction, props } from '@ngrx/store';
import { UserRegisterInterface } from '../../core/components/register-form/register-form.component';
import { UserLoginInterface } from '../../core/components/login-form/login-form.component';
import { TokenData } from '../../core/interfaces/token';
import { Family } from '../../core/interfaces/tree';

export enum UserActionTypes {
  EnterPage = '[User Page] Enter',
  LogoutPage = '[User Page] Logout',
  TokenExpiredPage = '[User Page] Token expired',
  ProvideUserData = '[User Page] User data provided',
  // API part
  RegisterUser = '[User API] Register User',
  RegisterUserSuccess = '[User API] Register User Success',
  RegisterUserFailure = '[User API] Register User Failure',
  LoginUser = '[User API] Login User',
  LoginUserSuccess = '[User API] Login User Success',
  LoginUserFailure = '[User API] Login User Failure',
}

export const enter = createAction(UserActionTypes.EnterPage);
export const logout = createAction(UserActionTypes.LogoutPage);
export const tokenExpired = createAction(UserActionTypes.TokenExpiredPage);
export const provideUserData = createAction(UserActionTypes.ProvideUserData, props<{ data: Family }>())
// API part
export const registerUser = createAction(UserActionTypes.RegisterUser, props<{ user: UserRegisterInterface }>());
export const registerUserSuccess = createAction(UserActionTypes.RegisterUserSuccess, props<{ response: TokenData }>());
export const registerUserFailure = createAction(UserActionTypes.RegisterUserFailure, props<{ error: string }>()); // TODO need to describe errors
export const loginUser = createAction(UserActionTypes.LoginUser, props<{ user: UserLoginInterface }>());
export const loginUserSuccess = createAction(UserActionTypes.LoginUserSuccess, props<{ response: TokenData }>());
export const loginUserFailure = createAction(UserActionTypes.LoginUserFailure, props<{ error: string }>()); // TODO need to describe errors

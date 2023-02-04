import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserRegisterInterface } from '../core/components/register-form/register-form.component';
import { UserLoginInterface } from '../core/components/login-form/login-form.component';

export const UserActions = createActionGroup({
  source: 'User Page',
  events: {
    'Enter': emptyProps(),
    'Logout': emptyProps(),
  },
});

export const UserApiActions = createActionGroup({
  source: 'User/API',
  events: {
    'Register User': props<{ user: UserRegisterInterface }>(),
    'Register User Success': props<{ token: string }>(),
    'Register User Failure': props<{ error: string }>(), // TODO need to describe errors
    'Login User': props<{ user: UserLoginInterface }>(),
    'Login User Success': props<{ token: string }>(),
    'Login User Failure': props<{ error: string }>(), // TODO need to describe errors
  },
});

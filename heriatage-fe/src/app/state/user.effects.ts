import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../core/services/user.service';
import { UserActions, UserApiActions } from './user.actions';
import { catchError, exhaustMap, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private router = inject(Router);

  registerUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserApiActions.registerUser),
    exhaustMap((action) => this.userService.registerUser(action.user).pipe(
      map(({ token }) => UserApiActions.registerUserSuccess({ token })),
      catchError((error) => of(UserApiActions.registerUserFailure({ error }))),
    )),
  ));

  loginUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserApiActions.loginUser),
    exhaustMap((action) => this.userService.loginUser(action.user).pipe(
      map(({ token }) => UserApiActions.loginUserSuccess({ token })),
      catchError((error) => of(UserApiActions.loginUserFailure({ error }))),
    )),
  ));

  afterAuthSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(
      UserApiActions.loginUserSuccess,
      UserApiActions.registerUserSuccess,
    ),
    tap(() => this.router.navigateByUrl('/tree')),
  ), { dispatch: false });

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.logout),
    tap(() => this.router.navigateByUrl('/login')),
  ), { dispatch: false });
}

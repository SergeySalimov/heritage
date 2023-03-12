import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../core/services/user.service';
import { UserActions, UserApiActions } from './user.actions';
import { catchError, exhaustMap, mergeMap, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StorageService, StorageType, TOKEN_STORAGE_KEY } from '../../core/services/storage.service';
import { ApiUtils } from '../../core/utils/api-utils';
import { AlertActions } from '../alert/alert.actions';
import { TOKEN_EXPIRED_ALERT } from '../alert/alert.reducer';

@Injectable({ providedIn: 'root' })
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private storageService = inject(StorageService);
  private router = inject(Router);
  private tokenKey = inject(TOKEN_STORAGE_KEY);

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
    tap((action) => {
      const token: string = action.token;
      const expDate: number|null = ApiUtils.getExpInMstFromJWT(token);
      this.storageService.set(this.tokenKey, token, StorageType.Session, expDate);
      this.router.navigate(['tree']);
    }),
  ), { dispatch: false });

  tokenExpired$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.tokenExpired),
    mergeMap(() => [
      UserActions.logout(),
      AlertActions.showAlert({ alert: TOKEN_EXPIRED_ALERT })
    ]),
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.logout),
    tap(() => {
      this.storageService.delete(this.tokenKey, StorageType.Session);
      this.router.navigate(['login']);
    }),
  ), { dispatch: false });
}

import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, mergeMap, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import * as UserActions from 'src/app/state/user/user.actions';
import * as AlertActions from 'src/app/state/alert/alert.actions';
import { TOKEN_EXPIRED_ALERT } from '../alert/alert.reducer';
import { UserService } from '../../core/services/user.service';
import { StorageService, StorageType, TOKEN_STORAGE_KEY } from '../../core/services/storage.service';
import { ApiUtils } from '../../core/utils/api-utils';

@Injectable({ providedIn: 'root' })
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private storageService = inject(StorageService);
  private router = inject(Router);
  private tokenKey = inject(TOKEN_STORAGE_KEY);

  registerUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.registerUser),
    exhaustMap((action) => this.userService.registerUser(action.user).pipe(
      map(({ token }) => UserActions.registerUserSuccess({ token })),
      catchError((error) => of(UserActions.registerUserFailure({ error }))),
    )),
  ));

  loginUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loginUser),
    exhaustMap((action) => this.userService.loginUser(action.user).pipe(
      map(({ token }) => UserActions.loginUserSuccess({ token })),
      catchError((error) => of(UserActions.loginUserFailure({ error }))),
    )),
  ));

  afterAuthSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(
      UserActions.loginUserSuccess,
      UserActions.registerUserSuccess,
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

import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, mergeMap, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import * as userActions from '../../state/user/user.actions';
import * as alertActions from '../../state/alert/alert.actions';
import { TOKEN_EXPIRED_ALERT } from '../alert/alert.reducer';
import { UserService } from '../../core/services/user.service';
import { StorageService, StorageType, TOKEN_STORAGE_KEY } from '../../core/services/storage.service';
import { ApiUtils } from '../../core/utils/api-utils';
import { TokenData } from '../../core/interfaces/token';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private storageService = inject(StorageService);
  private router = inject(Router);
  private tokenKey = inject(TOKEN_STORAGE_KEY);

  registerUser$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.registerUser),
    exhaustMap((action) => this.userService.registerUser(action.user).pipe(
      map((response: TokenData) => userActions.registerUserSuccess({ response })),
      catchError((error) => of(userActions.registerUserFailure({ error }))),
    )),
  ));

  loginUser$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.loginUser),
    exhaustMap((action) => this.userService.loginUser(action.user).pipe(
      map((response: TokenData) => userActions.loginUserSuccess({ response })),
      catchError((error) => of(userActions.loginUserFailure({ error }))),
    )),
  ));

  afterAuthSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(
      userActions.loginUserSuccess,
      userActions.registerUserSuccess,
    ),
    tap((action) => {
      const token: string = action.response.token;
      const expDate: number|null = ApiUtils.getExpInMstFromJWT(token);
      this.storageService.set(this.tokenKey, token, StorageType.Session, expDate);
      this.router.navigate(['tree']);
    }),
  ), { dispatch: false });

  tokenExpired$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.tokenExpired),
    mergeMap(() => [
      userActions.logout(),
      alertActions.showAlert({ alert: TOKEN_EXPIRED_ALERT })
    ]),
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.logout),
    tap(() => {
      this.storageService.delete(this.tokenKey, StorageType.Session);
      this.router.navigate(['login']);
    }),
  ), { dispatch: false });
}

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../core/services/user.service';
import { UserApiActions } from './user.actions';
import { catchError, exhaustMap, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);

  registerUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserApiActions.registerUser),
    exhaustMap((action) => this.userService.registerUser(action.user).pipe(
      map(({ token }) => UserApiActions.registerUserSuccess({ token })),
      catchError((error) => of(UserApiActions.registerUserFailure({ error })))
    )),
  ));
}

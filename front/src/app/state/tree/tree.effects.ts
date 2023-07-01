import { inject, Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import * as treeActions from '../../state/tree/tree.actions';
import * as fromUser from '../../state/user/user.reducer';
import { TreeService } from '../../core/services/tree.service';
import { Family } from '../../core/interfaces/tree';

@Injectable()
export class TreeEffects {
  private actions$: Actions = inject(Actions);
  private store: Store = inject(Store);
  private treeService: TreeService = inject(TreeService);

  enter$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(treeActions.enter),
    concatLatestFrom(() => this.store.select(fromUser.getCurrentUserId)),
    map(([_, userId]: [Action, string|null]) => userId
      ? treeActions.loadInitialFamilyUser({ userId })
      : treeActions.loadInitialFamilyUserFailure({ error: 'No user id' }) // TODO create logic to handle this situation
    ),
  ));

  load$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(treeActions.loadInitialFamilyUser),
    map(action => action.userId),
    switchMap((userId: string) => this.treeService.loadInitialFamilyUser(userId).pipe(
      map((response: Family) => treeActions.loadInitialFamilyUserSuccess({ response })),
      catchError((error) => of(treeActions.loadInitialFamilyUserFailure({ error }))),
    )),
  ));
}

import { createAction, props } from '@ngrx/store';
import { Family } from '../../core/interfaces/tree';

export enum TreeActionsType {
  EnterPage = '[Tree Page] Enter',
  // API part
  LoadInitialFamilyUser = '[Tree Api] Load initial family user',
  LoadInitialFamilyUserSuccess = '[Tree Api] Load initial family user Success',
  LoadInitialFamilyUserFailure = '[Tree Api] Load initial family user Failure',
}

export const enter = createAction(TreeActionsType.EnterPage);
export const loadInitialFamilyUser = createAction(TreeActionsType.LoadInitialFamilyUser, props<{ userId: string }>());
export const loadInitialFamilyUserSuccess = createAction(TreeActionsType.LoadInitialFamilyUserSuccess, props<{ response: Family }>());
export const loadInitialFamilyUserFailure = createAction(TreeActionsType.LoadInitialFamilyUserFailure, props<{ error: string }>()); // TODO need to describe errors

import { ActionReducerMap } from '@ngrx/store';

export interface IAppState {
  // treeState: ITreeState | null;
  // authState: IAuthState | null;
  // alerts: IAlert[];
  // globalSpinner: boolean;
}

export const initialAppState: IAppState = {};

export function getInitialAppState(): IAppState {
  return initialAppState;
}

export const appReducer: ActionReducerMap<IAppState, any> = {
  // authState: AuthReducer
};


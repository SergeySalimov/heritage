import { createFeature, createReducer, on } from '@ngrx/store';
import { AlertActions } from './alert.actions';

export enum AlertEnum {
  ERROR = 'error',
  INFO = 'info',
}

export interface IAlert {
  type: AlertEnum,
  text: string,
}

export const TOKEN_EXPIRED_ALERT: IAlert = { type: AlertEnum.INFO, text: 'Срок вашего токена истек, пожалуйста перелогинтесь' };

export interface AlertState {
  alert: IAlert | null;
}

export const initialState: AlertState = {
  alert: TOKEN_EXPIRED_ALERT,
}

export const alertFeatureKey = 'alertState';

export const alertFeature = createFeature({
  name: alertFeatureKey,
  reducer: createReducer(
    initialState,
    on(AlertActions.removeAlert, state => ({ ...state, alert: null })),
    on(AlertActions.showAlert, (state, { alert }) => ({ ...state, alert })),
  ),
});

export const { selectAlert } = alertFeature;

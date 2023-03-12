import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IAlert } from './alert.reducer';

export const AlertActions = createActionGroup({
  source: 'Alert',
  events: {
    'Show Alert': props<{ alert: IAlert }>(),
    'Remove Alert': emptyProps(),
  },
});

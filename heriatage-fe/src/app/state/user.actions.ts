import { createActionGroup, emptyProps } from '@ngrx/store';

export const UserActions = createActionGroup({
  source: 'User Page',
  events: {
    'Enter': emptyProps(),
  },
});

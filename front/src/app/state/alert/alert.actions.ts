import { createAction, props } from "@ngrx/store";
import { IAlert } from "./alert.reducer";

export enum AlertActionsTypes {
  Show = '[Alert] Show',
  Remove = '[Alert] Remove',
}

export const showAlert = createAction(AlertActionsTypes.Show, props<{ alert: IAlert }>());
export const removeAlert = createAction(AlertActionsTypes.Remove);

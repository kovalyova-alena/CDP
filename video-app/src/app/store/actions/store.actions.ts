import { Action } from '@ngrx/store';


export enum StoreActionTypes {
  RESTORE = '[Store] Restore',
}

export class Restore implements Action {
  readonly type = StoreActionTypes.RESTORE;
}

export type AllStore = Restore;

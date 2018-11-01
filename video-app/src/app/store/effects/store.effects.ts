import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/index';
import { tap, switchMap, withLatestFrom } from 'rxjs/operators';

import { StoreActionTypes, Restore } from '../actions/store.actions';
import { AppState, selectAuthState } from '../app.states';


@Injectable()
export class StoreEffects {
  getState: Observable<any>;

  constructor(
    private actions: Actions,
    private store: Store<AppState>,
    private router: Router,
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  @Effect({ dispatch: false })
  Restore =  this.actions.pipe(
    ofType(StoreActionTypes.RESTORE),
    withLatestFrom(this.store),
    switchMap((data) => {
      console.log(data);
      return data;
    // tap((action) => {
    //   if (localStorage.getItem('isAuthenticated')) {
    //     this.getState.pipe(
    //       switchMap((data) => {
    //         console.log(data);
    //         return data;
    //       }));
    //   }
    })
  );
}

import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs/index';
import { catchError, map, switchMap, tap } from 'rxjs/operators';


import { AuthenticationService } from '../../_services/authentication.service';
import {
  AuthActionTypes,
  LogIn, LogInSuccess, LogInFailure, LogOut,
} from '../actions/auth.actions';


@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthenticationService,
    private router: Router,
  ) {}


  @Effect()
  LogIn: Observable<Action> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LogIn) => action.payload),
    switchMap(payload => {
      return this.authService.login(payload.email, payload.password).pipe(
        map((data) => new LogInSuccess(data)),
        catchError((error) => {
          return of(new LogInFailure({ error: error }));
        }));
    }));


  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((data) => {
      this.router.navigate(['/courses']);
      localStorage.setItem('currentUser', JSON.stringify(data.payload));
      localStorage.setItem('isAuthenticated', 'true');
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((type) => {
      this.router.navigate(['/login']);
      localStorage.removeItem('currentUser');
    })
  );
}

import {Injectable} from '@angular/core';
import { Observable, of } from 'rxjs/index';
import { switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppState, selectAuthState } from '../store/app.states';


@Injectable(
  { providedIn: 'root' }
)

export class AuthGuard implements CanActivate {
  getState: Observable<any>;

  constructor(
    private router: Router,
    private store: Store<AppState>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.getState = this.store.select(selectAuthState);

    return this.getState.pipe(
      switchMap((data) => {
      if (!data.isAuthenticated) {
        this.router.navigate(['/login']);
        return of(false);
      } else {
        return of(true);
      }
    }));
  }
}

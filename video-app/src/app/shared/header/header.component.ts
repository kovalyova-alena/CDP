import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/index';
import { LogOut } from '../../store/actions/auth.actions';
import { AppState, selectAuthState } from '../../store/app.states';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedUser: boolean;
  currentUser: any;
  getState: Observable<any>;
  subscription: any;

  constructor(
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.subscription = this.getState.subscribe((state) => {
      this.isLoggedUser = state.isAuthenticated;
      this.currentUser = state.user;
    });
  }

  onLogout() {
    this.store.dispatch(new LogOut);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.states';
import { Restore } from './store/actions/store.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new Restore);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppState, selectAuthState } from '../../store/app.states';
import { Observable} from 'rxjs/index';
import { LogIn } from '../../store/actions/auth.actions';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  message: string;
  returnUrl: string;
  getState: Observable<any>;
  errorMessage: string | null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>) {
      this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')]]
    });

    this.getState.subscribe((state) => {
      this.message = state.errorMessage;
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const payload = {
      email: this.f.email.value,
      password: this.f.password.value
    };
    this.store.dispatch(new LogIn(payload));
  }
}

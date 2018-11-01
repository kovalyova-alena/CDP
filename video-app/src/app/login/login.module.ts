import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module'

import { LoginComponent } from './login.component';
import { SigninComponent } from './signin/signin.component';

const LOGIN_MODULE_COMPONENTS = [
    SigninComponent,
    LoginComponent
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: LOGIN_MODULE_COMPONENTS,
  exports: LOGIN_MODULE_COMPONENTS
})

export class LoginModule { }

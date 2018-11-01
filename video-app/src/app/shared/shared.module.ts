import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimengModule } from './primeng/primeng.module'
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from './header/header.component';


@NgModule({
  imports: [
    CommonModule,
    PrimengModule,
    ReactiveFormsModule
  ],
  declarations: [FooterComponent, HeaderComponent],
  exports: [PrimengModule, ReactiveFormsModule, FooterComponent, HeaderComponent]
})
export class SharedModule { }

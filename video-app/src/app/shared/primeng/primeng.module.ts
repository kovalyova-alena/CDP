import { NgModule } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

const PRIME_COMPONENTS = [
  InputTextModule,
  ButtonModule
];

@NgModule({
  imports: [...PRIME_COMPONENTS],
  exports: [...PRIME_COMPONENTS]

})
export class PrimengModule { }

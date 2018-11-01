import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { ServiceWorkerModule } from '@angular/service-worker';

// import { routerReducer, RouterStoreModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';
import { CoursesModule } from './courses/courses.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PushComponent } from './push-component';

import { fakeBackendProvider } from './_helpers';
import { CoursesListResolver } from './_resolves';

import { reducers } from './store/app.states';
import { AuthEffects } from './store/effects/auth.effects';
import { StoreEffects} from './store/effects/store.effects';
import { CoursesEffects } from './store/effects/courses.effects';


@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, {}),
    AppRoutingModule,
    SharedModule,
    LoginModule,
    CoursesModule,
    HttpClientModule,
    EffectsModule.forRoot([AuthEffects, StoreEffects, CoursesEffects]),
    ServiceWorkerModule.register('./ServiceWorker.js')
  ],
  declarations: [
    AppComponent, PushComponent
  ],
  providers: [fakeBackendProvider, CoursesListResolver ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }

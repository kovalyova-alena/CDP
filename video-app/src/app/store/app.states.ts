import { createFeatureSelector } from '@ngrx/store';

import * as auth from './reducers/auth.reducers';
import * as store from './reducers/store.reducers';
import * as courses from './reducers/courses.reducers';


export interface AppState {
  authState: auth.State;
  storeState: store.State;
  coursesState: courses.State;
}

export const reducers = {
  auth: auth.reducer,
  store: store.reducer,
  courses: courses.reducer
};

export  const  selectAuthState = createFeatureSelector<AppState>('auth');
export  const  selectCoursesState = createFeatureSelector<AppState>('courses');

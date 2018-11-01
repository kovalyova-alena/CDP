import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/index';
import { Store } from '@ngrx/store';

import { Course } from '../_models/course';
import { CourseService } from '../_services/courses.service';
import { GetCourses } from './../store/actions/courses.actions';
import { AppState, selectAuthState } from './../store/app.states';

@Injectable()
export class CoursesListResolver implements Resolve<Course[]> {

  constructor(private service: CourseService, private store: Store<AppState>) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Course[]> {
    this.store.dispatch(new GetCourses);
    return this.service.getCourses();
  }
}

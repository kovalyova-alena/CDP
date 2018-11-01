import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs/index';
import { catchError, map, switchMap } from 'rxjs/operators';


import { CourseService } from '../../_services/courses.service';
import {
  CoursesActionTypes,
  GetCourses, GetCoursesSuccess, GetCoursesFailure
} from '../actions/courses.actions';


@Injectable()
export class CoursesEffects {

  constructor(
    private actions$: Actions,
    private courseService: CourseService,
    private router: Router,
  ) {}


  @Effect() GetCourses$ = this.actions$.pipe(
    ofType(CoursesActionTypes.GET_COURSES),
    switchMap(action =>
      this.courseService.getCourses().pipe(
        map(courses => new GetCoursesSuccess(courses)),
        catchError((error) => {
          return of(new GetCoursesFailure({ error: error }));
        })
      )
    )
  );

  @Effect()
  AddCourses$: Observable<Action> = this.actions$.pipe(
    ofType(CoursesActionTypes.ADD_COURSE),
    switchMap(action => {
        console.log(action);
        return this.courseService.getCourses().pipe(
          map(courses => new GetCoursesSuccess(courses)),
          catchError((error) => {
            return of(new GetCoursesFailure({ error: error }));
          })
        );
      }
      // this.http.post(environment.client.base_url + '/api/todos', action.payload)
      //   .map((data: Response) => {
      //
      //
      //     return new TodoActions.CreateTodoSuccess({
      //       ...data["data"], loading: false
      //     });
      //   })
      //   .catch(() => of(new TodoActions.CreateTodoError()))
    ));
}

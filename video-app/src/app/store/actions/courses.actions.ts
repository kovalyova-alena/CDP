import { Action } from '@ngrx/store';
import { Course } from '../../_models/course';


export enum CoursesActionTypes {
  GET_COURSES = '[Courses] Get Courses',
  GET_COURSES_SUCCESS = '[Courses] Get Courses Success',
  GET_COURSES_FAILURE = '[Courses] Get Courses Failure',
  ADD_COURSE = '[Courses] Add Course',
  ADD_COURSE_SUCCESS = '[Courses] Add Course Success',
  ADD_COURSE_FAILURE = '[Courses] Add Course Failure',
}

export class GetCourses implements Action {
  readonly type = CoursesActionTypes.GET_COURSES;
  constructor() {}
}

export class GetCoursesSuccess implements Action {
  readonly type = CoursesActionTypes.GET_COURSES_SUCCESS;
  constructor(public payload: any) {}
}

export class GetCoursesFailure implements Action {
  readonly type = CoursesActionTypes.GET_COURSES_FAILURE;
  constructor(public payload: any) {}
}

export class AddCourse implements Action {
  readonly type = CoursesActionTypes.ADD_COURSE;
  constructor(public payload: Course[]) {}
}

export class AddCourseSuccess implements Action {
  readonly type = CoursesActionTypes.ADD_COURSE_SUCCESS;
  constructor(public payload: any) {}
}

export class AddCourseFailure implements Action {
  readonly type = CoursesActionTypes.ADD_COURSE_FAILURE;
  constructor(public payload: any) {}
}


export type AllCourses =
  | GetCourses
  | GetCoursesSuccess
  | GetCoursesFailure
  | AddCourse
  | AddCourseSuccess
  | AddCourseFailure;

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Course } from '../_models/course';

@Injectable({ providedIn: 'root' })
export class CourseService {
  constructor(private http: HttpClient) { }

  getCourses (): Observable<Course[]> {
    return this.http.get<Course[]>('/courses')
      .pipe(
        tap(courses => console.log('fetched courses')),
        catchError(this.handleError('getCourses', []))
      );
  }

  deleteCourse (id: number): Observable<Course> {
    const url = `/courses/${id}`;
    return this.http.delete<Course>(url).pipe(
      tap(_ => console.log(`deleted course id=${id}`)),
      catchError(this.handleError<Course>('deleteCourse'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}

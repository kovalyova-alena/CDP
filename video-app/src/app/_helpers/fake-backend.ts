import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const courses: any[] = JSON.parse(localStorage.getItem('courses')) || [
      { id: 12, title: 'course1', description: 'lorem', duration: 100, date: '12.12.2018' },
      { id: 13, title: 'course2', description: 'long lorem )', duration: 550, date: '05.08.2018' }
    ];
    const testUser = { email: 'test123@mail.com', password: 'test123' };

    return of(null).pipe(mergeMap(() => {

      // authenticate
      if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
        if (request.body.email === testUser.email && request.body.password === testUser.password) {
          const body = {
            email: testUser.email,
            token: 'fake-jwt-token'
          };
          return of(new HttpResponse({ status: 200, body }));
        } else {
          return throwError({  message: 'Username or password is incorrect' } );
        }
      }
      // get users
      if (request.url.endsWith('/courses') && request.method === 'GET') {
          return of(new HttpResponse({ status: 200, body: courses }));
      }
    }))

      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}

export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};

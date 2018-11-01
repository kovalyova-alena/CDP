import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { CoursesComponent } from './courses/courses.component';
import { ListCoursesComponent } from './courses/course-list/course-list.component';
import { CourseAddEditComponent } from './courses/course-add-edit/course-add-edit.component';

import { AuthGuard } from './_guards';
import { CoursesListResolver } from './_resolves/courses-list.resolver';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'courses', pathMatch: 'full' },
      {
        path: 'courses',
        component: CoursesComponent,
        resolve: [ CoursesListResolver ],
        children: [
          { path: '', component: ListCoursesComponent},
          { path: 'new', component: CourseAddEditComponent}
        ]
      },
      // {
      //   path: 'new',
      //   component: CourseAddEditComponent
      // },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

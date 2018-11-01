import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { CoursesRouting } from './courses.routing.module';

import { CoursesComponent } from './courses.component';
import { ListCoursesComponent } from './course-list/course-list.component';
import { SearchCourseComponent } from './search-course/search-course.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { CourseAddEditComponent } from './course-add-edit/course-add-edit.component';

const LIST_COURSES_COMPONENTS = [
  ListCoursesComponent,
  SearchCourseComponent,
  CourseItemComponent,
  CourseAddEditComponent,
  CoursesComponent
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoursesRouting
  ],
  declarations: LIST_COURSES_COMPONENTS,
  exports: LIST_COURSES_COMPONENTS
})
export class CoursesModule { }

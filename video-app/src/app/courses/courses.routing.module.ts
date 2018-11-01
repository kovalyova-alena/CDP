import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const coursesRoutes: Routes = [

];

@NgModule({
  imports: [ RouterModule.forChild(coursesRoutes) ],
  exports: [ RouterModule ]
})
export class CoursesRouting { }


import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Course } from '../../_models/course';
import { CourseService } from '../../_services/courses.service';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent implements OnInit, OnDestroy {
  @Input()
    course: Course;

  subscription;
  courses: Course[];

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.subscription = this.courseService.getCourses()
      .subscribe((data: Course[]) => {
        this.courses = data;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  delete(): void {
    this.courseService.deleteCourse(this.course.id).subscribe();
  }
    // this.h = this.heroes.filter(h => h !== hero);
    // this.heroService.deleteHero(hero).subscribe();
}

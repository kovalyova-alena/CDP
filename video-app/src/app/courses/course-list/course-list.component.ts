import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/index';
import { AppState, selectCoursesState } from '../../store/app.states';
import { CourseService } from '../../_services/courses.service';


@Component({
  selector: 'app-list-courses',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class ListCoursesComponent implements OnInit, OnDestroy {
  courses: Observable<any>;
  subscription: any;
  getState: Observable<any>;

  constructor(private courseService: CourseService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>) {
    this.getState = this.store.select(selectCoursesState);
  }

  ngOnInit() {
    console.log('List Course Component');
    this.subscription = this.getState.subscribe((state) => {
      this.courses = state.courses;
    });
  }

  onGoToCreateCourse() {
    console.log(this.router);
    this.router.navigate(['./courses/new']);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

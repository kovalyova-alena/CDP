import { CoursesActionTypes, AllCourses } from '../actions/courses.actions';
import { Course } from '../../_models/course';

export interface State {
  courses: Array<Course>;
  pending: boolean;
  error: string | null;
}

export const initialState: State = {
  courses: [],
  pending: false,
  error: null
};

export function reducer(state = initialState, action: AllCourses): State {
  switch (action.type) {
    case CoursesActionTypes.GET_COURSES: {
      return {
        ...state,
        pending: true,
        error: null
      };
    }
    case CoursesActionTypes.GET_COURSES_SUCCESS: {
      return {
        ...state,
        courses: action.payload,
        pending: false
      };
    }
    case CoursesActionTypes.GET_COURSES_FAILURE: {
      return {
        ...state,
        courses: action.payload,
        pending: false,
        error: 'Can\'t get courses'
      };
    }
    case CoursesActionTypes.ADD_COURSE: {
      return {
        ...state,
        courses: state.courses.map(course => {
         console.log(course);

          return course;
        })
      };
    }
    default: {
      return state;
    }
  }
}

import { StoreActionTypes, AllStore } from '../actions/store.actions';

export interface State {
  isAuthenticated: boolean;
}

export const initialState: State = {
  isAuthenticated: false,
};

export function reducer(state = initialState, action: AllStore): State {
  switch (action.type) {
    case StoreActionTypes.RESTORE: {
      return {
        ...state
      };
    }
    default: {
      return state;
    }
  }
}

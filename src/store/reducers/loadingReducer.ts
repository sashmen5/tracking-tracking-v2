import { handleActions } from 'redux-actions';
import { Reducer } from 'redux';
import set from 'lodash/fp/set';

// This is my own implementation of loading reducer
// But I think there are a lot of more best practices to implement this reducer

import {
  ADD_PROJECT,
  API_ERROR_REQUEST,
  EDIT_PROJECT,
  FETCH_PROJECTS,
  LOGIN,
  SAVE_PROJECTS,
  SAVE_USER
} from 'store/actionTypes';

export interface LoadingState {
  [key: string]: any;
}

const initialState: LoadingState = {};

const loadingReducer: Reducer<LoadingState> = handleActions(
  {
    [LOGIN]: (state: LoadingState) => {
      return set(LOGIN, true, state);
    },
    [SAVE_USER]: (state: LoadingState) => {
      return set(LOGIN, false, state);
    },
    [FETCH_PROJECTS]: (state: LoadingState) => {
      const newState = {
        ...state,
        FETCH_PROJECTS: true,
        ADD_PROJECT: false,
        EDIT_PROJECT: false
      };
      return newState;
    },
    [SAVE_PROJECTS]: (state: LoadingState) => {
      return set(FETCH_PROJECTS, false, state);
    },
    [ADD_PROJECT]: (state: LoadingState) => {
      return set(ADD_PROJECT, true, state);
    },
    [EDIT_PROJECT]: (state: LoadingState) => {
      return set(EDIT_PROJECT, true, state);
    },
    [API_ERROR_REQUEST]: () => {
      return initialState;
    }
  },
  initialState
);

export default loadingReducer;

import { handleActions } from 'redux-actions';
import { keyBy } from 'lodash/fp';

import { Keyed, Project } from 'models';
import {
  API_ERROR_REQUEST,
  ApiErrorRequestAction,
  SAVE_PROJECTS,
  SaveProjectsAction
} from 'store/actionTypes';

import { Reducer } from 'redux';

const initialState: Keyed<Project> = {};

const projectsReducer: Reducer<Keyed<Project>> = handleActions(
  {
    [SAVE_PROJECTS]: (state: Keyed<Project>, action: SaveProjectsAction) => {
      const { data } = action.payload;
      return keyBy('id', data);
    },
    [API_ERROR_REQUEST]: (
      state: Keyed<Project>,
      action: ApiErrorRequestAction
    ) => {
      const { error } = action.payload;
      // at this stage errors and loading scenarios are not handled in specific way
      // in next exercise (firebase) i want to add common reducer for errors and loaders
      console.log(error);
      return state;
    }
  },
  initialState
);

export default projectsReducer;

import { handleActions } from 'redux-actions';
import { keyBy } from 'lodash/fp';

import { Keyed, Project } from 'models';
import { SAVE_PROJECTS, SaveProjectsAction } from 'store/actionTypes';

import { Reducer } from 'redux';

const initialState: Keyed<Project> = {};

const projectsReducer: Reducer<Keyed<Project>> = handleActions(
  {
    [SAVE_PROJECTS]: (state: Keyed<Project>, action: SaveProjectsAction) => {
      const { data } = action.payload;
      return keyBy('id', data);
    }
  },
  initialState
);

export default projectsReducer;

import { handleActions } from 'redux-actions';
import { set, unset } from 'lodash/fp';

import { Keyed, Project } from 'models';
import {
  ADD_PROJECT,
  AddProjectAction,
  DELETE_PROJECT,
  DeleteProjectAction,
  EDIT_PROJECT,
  EditProjectAction
} from 'store/actionTypes';

import { Reducer } from 'redux';

const initialState: Keyed<Project> = {
  1: { id: 1, label: 'Thailand' },
  2: { id: 2, label: 'Wix' },
  3: { id: 3, label: 'Facebook' },
  4: { id: 4, label: 'Apple' }
};

const projectsReducer: Reducer<Keyed<Project>> = handleActions(
  {
    [ADD_PROJECT]: (state: Keyed<Project>, action: AddProjectAction) => {
      const { id, label } = action.payload;
      return set(id, { id, label }, state);
    },
    [DELETE_PROJECT]: (state: Keyed<Project>, action: DeleteProjectAction) => {
      const { id } = action.payload;
      return unset(id, state);
    },
    [EDIT_PROJECT]: (state: Keyed<Project>, action: EditProjectAction) => {
      const { id, label } = action.payload;
      return set(id, { id, label }, state);
    }
  },
  initialState
);

export default projectsReducer;

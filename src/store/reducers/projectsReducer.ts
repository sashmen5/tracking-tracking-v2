import { handleActions } from 'redux-actions';
import { set, unset } from 'lodash/fp';

import { Keyed, Project } from 'models';
import { ADD_PROJECT, DELETE_PROJECT, EDIT_PROJECT } from 'store/actionTypes';

const initialState: Keyed<Project> = {
  1: { id: 1, label: 'Thailand' },
  2: { id: 2, label: 'Wix' },
  3: { id: 3, label: 'Facebook' },
  4: { id: 4, label: 'Apple' }
};

const projectsReducer = handleActions(
  {
    [ADD_PROJECT]: (state, { payload: { id, label } }) => {
      return set(`${id}`, { id, label }, state);
    },
    [DELETE_PROJECT]: (state, { payload: { id } }) => {
      return unset(`${id}`, state);
    },
    [EDIT_PROJECT]: (state, { payload: { id, label } }) => {
      return set(`${id}`, { id, label }, state);
    }
  },
  initialState
);

export default projectsReducer;

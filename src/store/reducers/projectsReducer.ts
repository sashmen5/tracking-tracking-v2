import {handleActions} from 'redux-actions';
import {set, unset} from 'lodash/fp';

import {Keyed, Project} from '../../models';
import {actions} from '../actions';


const initialState: Keyed<Project> = {
  1: {id: 1, label: 'Thailand'},
  2: {id: 2, label: 'Wix'},
  3: {id: 3, label: 'Facebook'},
  4: {id: 4, label: 'Apple'}
};

const projectsReducer = handleActions(
    {
      [actions.addProject.toString()]: (state, {payload: {id, label}}) => {
        return set(`${id}`, {id, label}, state);
      },
      [actions.deleteProject.toString()]: (state, {payload: {id}}) => {
        return unset(`${id}`, state);
      },
      [actions.editProject.toString()]: (state, {payload: {id, label}}) => {
        return set(`${id}`, {id, label}, state);
      },
    },
    initialState
);


export default projectsReducer;
import {createActions} from 'redux-actions';

let nextProjectId = 4;

export const actions = createActions({
  ADD_PROJECT: (label: string) => ({id: ++nextProjectId, label}),
  EDIT_PROJECT: (id: number, label: string) => ({id, label}),
  DELETE_PROJECT: (id: number) => ({id}),

  EDIT_TIME_TRACKER: (projectId: number, date: string, amountOfHours: number) => ({projectId, date, amountOfHours}),
  DELETE_TIME_TRACKER: (projectId: number, date: string) => ({projectId, date})
});



import {addDays} from '../DateUtils';
import {
  ADD_PROJECT,
  DELETE_PROJECT, DELETE_TIME_TRACKER,
  EDIT_PROJECT,
  EDIT_TIME_TRACKER,
  ProjectActions, SWITCH_START_DATE,
  TimeTrackerActions
} from './actionTypes';

let nextProjectId = 4;

export function addProject(label: string): ProjectActions {
  return {
    type: ADD_PROJECT,
    payload: {id: ++nextProjectId, label}
  }
}

export function editProject(id: number, label: string): ProjectActions {
  return {
    type: EDIT_PROJECT,
    payload: {id, label}
  }
}

export function deleteProject(id: number): ProjectActions {
  return {
    type: DELETE_PROJECT,
    payload: {id}
  }
}

export function editTimeTracker(projectId: string | number, date: string, amountOfHours: number): TimeTrackerActions {
  return {
    type: EDIT_TIME_TRACKER,
    payload: {projectId, date, amountOfHours}
  }
}

export function deleteTimeTracker(projectId: string| number, date: string): TimeTrackerActions {
  return {
    type: DELETE_TIME_TRACKER,
    payload: {projectId, date}
  }
}

export function switchStartDate(date: Date, amountOfDays: number): TimeTrackerActions {
  return {
    type: SWITCH_START_DATE,
    payload: {
      newStartDate: addDays(date, amountOfDays)
    }
  }
}

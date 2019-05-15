export const ADD_PROJECT: string = 'ADD_PROJECT';
export const EDIT_PROJECT: string = 'EDIT_PROJECT';
export const DELETE_PROJECT: string = 'DELETE_PROJECT';

export const EDIT_TIME_TRACKER: string = 'EDIT_TIME_TRACKER';
export const DELETE_TIME_TRACKER: string = 'DELETE_TIME_TRACKER';
export const SWITCH_START_DATE: string = 'SWITCH_START_DATE';

export interface AddProjectAction {
  type: typeof ADD_PROJECT;
  payload: { id: number; label: string };
}

export interface EditProjectAction {
  type: typeof EDIT_PROJECT;
  payload: { id: number; label: string };
}

export interface DeleteProjectAction {
  type: typeof DELETE_PROJECT;
  payload: { id: number };
}

export interface EditTimeTracker {
  type: typeof EDIT_TIME_TRACKER;
  payload: { projectId: string | number; date: string; amountOfHours: number };
}

export interface DeleteTimeTracker {
  type: typeof DELETE_TIME_TRACKER;
  payload: { projectId: string | number; date: string };
}

export interface SwitchStartDate {
  type: typeof SWITCH_START_DATE;
  payload: { newStartDate: Date };
}

export type ProjectActions =
  | AddProjectAction
  | EditProjectAction
  | DeleteProjectAction;

export type TimeTrackerActions =
  | EditTimeTracker
  | DeleteTimeTracker
  | SwitchStartDate;

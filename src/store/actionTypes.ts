export const ADD_PROJECT = 'ADD_PROJECT';
export const EDIT_PROJECT = 'EDIT_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';

export const EDIT_TIME_TRACKER = 'EDIT_TIME_TRACKER';
export const DELETE_TIME_TRACKER = 'DELETE_TIME_TRACKER';
export const SWITCH_START_DATE = 'SWITCH_START_DATE';

interface AddProjectAction {
  type: typeof ADD_PROJECT;
  payload: {id: number, label: string};
}

interface EditProjectAction {
  type: typeof EDIT_PROJECT;
  payload: {id: number, label: string};
}

interface DeleteProjectAction {
  type: typeof DELETE_PROJECT;
  payload: {id: number}
}

interface EditTimeTracker {
  type: typeof EDIT_TIME_TRACKER;
  payload: {projectId: string | number, date: string, amountOfHours: number};
}

interface DeleteTimeTracker {
  type: typeof DELETE_TIME_TRACKER;
  payload: {projectId: string | number, date: string};
}


interface SwitchStartDate {
  type: typeof SWITCH_START_DATE;
  payload: {newStartDate: Date};
}

export type ProjectActions = AddProjectAction | EditProjectAction | DeleteProjectAction;

export type TimeTrackerActions = EditTimeTracker | DeleteTimeTracker | SwitchStartDate;


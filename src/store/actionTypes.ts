import { Project, User } from 'models';

export const ADD_PROJECT: string = 'ADD_PROJECT';
export const EDIT_PROJECT: string = 'EDIT_PROJECT';
export const DELETE_PROJECT: string = 'DELETE_PROJECT';

export const EDIT_TIME_TRACKER: string = 'EDIT_TIME_TRACKER';
export const DELETE_TIME_TRACKER: string = 'DELETE_TIME_TRACKER';
export const SWITCH_START_DATE: string = 'SWITCH_START_DATE';

export const FETCH_PROJECTS: string = 'FETCH_PROJECTS';
export const SAVE_PROJECTS: string = 'SAVE_PROJECTS';
export const API_ERROR_REQUEST: string = 'API_ERROR_REQUEST';

export const LOGIN: string = 'LOGIN';
export const SAVE_USER: string = 'SAVE_USER';

export const CLOSE_ERROR: string = 'CLOSE_ERROR';

export interface BaseAction {
  type: string;
  meta?: {
    [key: string]: any;
  };
  payload?: any;
}

export interface EditTimeTracker {
  type: typeof EDIT_TIME_TRACKER;
  payload: { projectId: string | number; date: string; amountOfHours: number };
}

export interface DeleteTimeTracker {
  type: typeof DELETE_TIME_TRACKER;
  payload: { projectId: string | number; date: string };
}

export interface SwitchStartDateAction {
  type: typeof SWITCH_START_DATE;
  payload: { newStartDate: Date };
}

export interface SaveProjectsAction {
  type: typeof SAVE_PROJECTS;
  payload: {
    data: Project[];
  };
}

export interface ApiErrorRequestAction {
  type: typeof API_ERROR_REQUEST;
  payload: {
    error: any;
  };
}

export interface CloseErrorAction {
  type: typeof CLOSE_ERROR;
}

export interface SaveUserAction {
  type: typeof SAVE_USER;
  payload: {
    user: User;
  };
}

export type OnSuccess<Response> = (data: Response) => any; //must be some global type of action;
export type OnError = (error: any) => void;

export interface ApiAction<Response> {
  type: string;
  meta: {
    api: boolean;
  };
  payload: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string;
    data?: any;
    onSuccess: OnSuccess<Response>;
    onError: OnError;
    headers?: any;
  };
}

export type ProjectActions =
  | SaveProjectsAction
  | CloseErrorAction
  | ApiErrorRequestAction
  | ApiAction<Response>;

export type TimeTrackerActions =
  | EditTimeTracker
  | DeleteTimeTracker
  | SwitchStartDateAction;

export type UserActions = SaveUserAction;

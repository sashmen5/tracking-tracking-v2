import { addDays } from 'utils';
import {
  ADD_PROJECT,
  ApiAction,
  DELETE_PROJECT,
  DELETE_TIME_TRACKER,
  EDIT_PROJECT,
  EDIT_TIME_TRACKER,
  API_ERROR_REQUEST,
  FETCH_PROJECTS,
  ProjectActions,
  SAVE_PROJECTS,
  SWITCH_START_DATE,
  TimeTrackerActions
} from 'store/actionTypes';
import { Project } from 'models';

export function fetchProjects(): ApiAction<Project[]> {
  return {
    type: FETCH_PROJECTS,
    meta: { api: true },
    payload: {
      method: 'GET',
      url: 'projects',
      onSuccess: saveProjects,
      onError: apiRequestError
    }
  };
}

export function addProject(label: string): ApiAction<Project> {
  return {
    type: ADD_PROJECT,
    meta: { api: true },
    payload: {
      method: 'POST',
      url: `projects`,
      onSuccess: fetchProjects,
      onError: apiRequestError,
      data: {
        label
      }
    }
  };
}

export function editProject(id: number, label: string): ApiAction<Project> {
  return {
    type: EDIT_PROJECT,
    meta: { api: true },
    payload: {
      method: 'PUT',
      url: `projects/${id}`,
      onSuccess: fetchProjects,
      onError: apiRequestError,
      data: {
        label
      }
    }
  };
}

export function deleteProject(id: number): ApiAction<Project> {
  return {
    type: DELETE_PROJECT,
    meta: { api: true },
    payload: {
      method: 'DELETE',
      url: `projects/${id}`,
      onSuccess: fetchProjects,
      onError: apiRequestError
    }
  };
}

export function editTimeTracker(
  projectId: string | number,
  date: string,
  amountOfHours: number
): TimeTrackerActions {
  return {
    type: EDIT_TIME_TRACKER,
    payload: { projectId, date, amountOfHours }
  };
}

export function deleteTimeTracker(
  projectId: string | number,
  date: string
): TimeTrackerActions {
  return {
    type: DELETE_TIME_TRACKER,
    payload: { projectId, date }
  };
}

export function switchStartDate(
  date: Date,
  amountOfDays: number
): TimeTrackerActions {
  return {
    type: SWITCH_START_DATE,
    payload: {
      newStartDate: addDays(date, amountOfDays)
    }
  };
}

export function saveProjects(data: Project[]): ProjectActions {
  return {
    type: SAVE_PROJECTS,
    payload: {
      data
    }
  };
}

export function apiRequestError(error: any): ProjectActions {
  return {
    type: API_ERROR_REQUEST,
    payload: {
      error
    }
  };
}

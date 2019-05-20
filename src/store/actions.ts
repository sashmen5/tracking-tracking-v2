import { addDays } from 'utils';
import { baseUrl, loginUrl } from 'utils/firebaseUtil';
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
  TimeTrackerActions,
  LOGIN,
  UserActions,
  SAVE_USER,
  CloseErrorAction,
  CLOSE_ERROR
} from 'store/actionTypes';

import { Project, User } from 'models';
import { ProjectFormValues } from 'components/ProjectForm';

const projectsUrl: string = `${baseUrl}projects.json`;
const projectUrl: (id: string) => string = (id: string) =>
  `${baseUrl}projects/${id}.json`;

export function fetchProjects(): ApiAction<Project[]> {
  return {
    type: FETCH_PROJECTS,
    meta: { api: true },
    payload: {
      method: 'GET',
      url: projectsUrl,
      onSuccess: saveProjects,
      onError: apiRequestError
    }
  };
}

export function addProject(
  projectValues: ProjectFormValues
): ApiAction<Project> {
  return {
    type: ADD_PROJECT,
    meta: {
      api: true
    },
    payload: {
      method: 'POST',
      url: projectsUrl,
      onSuccess: fetchProjects,
      onError: apiRequestError,
      data: projectValues
    }
  };
}

export function editProject(
  id: string,
  projectValues: ProjectFormValues
): ApiAction<Project> {
  return {
    type: EDIT_PROJECT,
    meta: { api: true },
    payload: {
      method: 'PUT',
      url: projectUrl(id),
      onSuccess: fetchProjects,
      onError: apiRequestError,
      data: projectValues
    }
  };
}

export function deleteProject(id: string): ApiAction<Project> {
  return {
    type: DELETE_PROJECT,
    meta: { api: true },
    payload: {
      method: 'DELETE',
      url: projectUrl(id),
      onSuccess: fetchProjects,
      onError: apiRequestError
    }
  };
}

export function logIn(email: string, password: string): ApiAction<User> {
  return {
    type: LOGIN,
    meta: { api: true },
    payload: {
      method: 'POST',
      url: loginUrl,
      data: {
        email,
        password
      },
      onSuccess: saveUser,
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

export function saveUser(user: User): UserActions {
  return {
    type: SAVE_USER,
    payload: {
      user
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

export function closeError(): CloseErrorAction {
  return {
    type: CLOSE_ERROR
  };
}

import request from 'utils/firebaseUtil';
import get from 'lodash/fp/get';
import { Dispatch, MiddlewareAPI } from 'redux';

import { BaseAction } from 'store/actionTypes';
import { AppState } from 'store/reducers';

const apiMiddleware = ({
  dispatch,
  getState
}: MiddlewareAPI<any, AppState>) => (next: Dispatch) => async (
  action: BaseAction
) => {
  if (!get('meta.api', action)) {
    return next(action);
  }

  next(action);
  const store: AppState = getState();
  const { idToken } = store.user;
  const { method, url, data, onSuccess, onError } = action.payload;
  let { headers } = action.payload;

  if (idToken) {
    headers = {
      ...headers,
      Authorization: `Bearer ${idToken}`
    };
  }

  try {
    const response = await request({ method, url, data, headers });
    dispatch(onSuccess(response.data));
  } catch (error) {
    dispatch(onError(error));
  }
};

export default apiMiddleware;

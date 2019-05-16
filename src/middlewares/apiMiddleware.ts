import request from 'utils/apiUtil';

const apiMiddleware = ({ dispatch }: any) => (next: Function) => async (
  action: any
) => {
  if (!action.meta || !action.meta.api) {
    return next(action);
  }

  const { method, url, data, headers, onSuccess, onError } = action.payload;

  request({ method, url, data, headers })
    .then(({ data }) => setTimeout(() => dispatch(onSuccess(data)), 1000))
    .catch(error => dispatch(onError(error)));

  return next(action);
};

export default apiMiddleware;

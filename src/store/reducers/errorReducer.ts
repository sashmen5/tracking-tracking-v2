import { Reducer } from 'redux';
import { handleActions } from 'redux-actions';
import { API_ERROR_REQUEST, BaseAction, CLOSE_ERROR } from 'store/actionTypes';

interface Error {
  [key: string]: any;
  isOccurred: boolean;
}

const initialState: Error = {
  message: 'Some error',
  isOccurred: false
};

const errorReducer: Reducer<Error> = handleActions(
  {
    [API_ERROR_REQUEST]: (state: Error, action: BaseAction) => {
      const { error } = action.payload;
      return { ...error, isOccurred: true };
    },
    [CLOSE_ERROR]: () => {
      return { isOccurred: false };
    }
  },
  initialState
);

export default errorReducer;

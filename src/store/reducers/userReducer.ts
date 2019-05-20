import { handleActions } from 'redux-actions';
import { User } from 'models';
import { SAVE_USER, SaveUserAction } from 'store/actionTypes';

import { Reducer } from 'redux';

const initialState: User = {
  displayName: '',
  email: '',
  idToken: '',
  kind: '',
  localId: '',
  registered: false
};

const userReducer: Reducer<User> = handleActions(
  {
    [SAVE_USER]: (state: User, action: SaveUserAction) => {
      const { user } = action.payload;
      return { ...user };
    }
  },
  initialState
);

export default userReducer;

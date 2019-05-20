import { combineReducers } from 'redux';
import projectsReducer from 'store/reducers/projectsReducer';
import timeTrackerReducer from 'store/reducers/timeTrackerReducer';
import userReducer from 'store/reducers/userReducer';
import errorReducer from 'store/reducers/errorReducer';
import loadingReducer from 'store/reducers/loadingReducer';

const rootReducer = combineReducers({
  projects: projectsReducer,
  timeTracker: timeTrackerReducer,
  user: userReducer,
  error: errorReducer,
  loading: loadingReducer
});
export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;

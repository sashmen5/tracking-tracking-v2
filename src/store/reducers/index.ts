import { combineReducers } from 'redux';
import projectsReducer from 'store/reducers/projectsReducer';
import timeTrackerReducer from 'store/reducers/timeTrackerReducer';

const rootReducer = combineReducers({
  projects: projectsReducer,
  timeTracker: timeTrackerReducer
});
export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;

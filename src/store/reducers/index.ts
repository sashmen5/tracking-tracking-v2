import { combineReducers } from 'redux';
import projectsReducer from './projectsReducer';
import timeTrackerReducer from './timeTrackerReducer';

const rootReducer = combineReducers({
  projects: projectsReducer,
  timeTracker: timeTrackerReducer
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;

import { handleActions } from 'redux-actions';
import { Reducer } from 'redux';
import { set, unset } from 'lodash/fp';

import { Keyed, DayTimeStat } from 'models';
import {
  DELETE_TIME_TRACKER,
  DeleteTimeTracker,
  EDIT_TIME_TRACKER,
  EditTimeTracker,
  SWITCH_START_DATE,
  SwitchStartDate
} from 'store/actionTypes';

export interface TimeTracker {
  projectsTimeSlots: Keyed<Keyed<DayTimeStat>>;
  startDate: Date;
}

const initialState: TimeTracker = {
  projectsTimeSlots: {},
  startDate: new Date()
};

const timeTrackerReducer: Reducer<TimeTracker> = handleActions(
  {
    [EDIT_TIME_TRACKER]: (state: TimeTracker, action: EditTimeTracker) => {
      const { projectId, date, amountOfHours } = action.payload;
      return set(
        `projectsTimeSlots.${projectId}[${date}]`,
        { amountOfHours, date },
        state
      );
    },
    [DELETE_TIME_TRACKER]: (state: TimeTracker, action: DeleteTimeTracker) => {
      const { projectId, date } = action.payload;
      return unset(`projectsTimeSlots.${projectId}[${date}]`, state);
    },
    [SWITCH_START_DATE]: (state: TimeTracker, action: SwitchStartDate) => {
      const { newStartDate } = action.payload;
      return set(`startDate`, newStartDate, state);
    }
  },
  initialState
);

export default timeTrackerReducer;

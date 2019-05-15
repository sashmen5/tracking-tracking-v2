import { handleActions } from 'redux-actions';
import { set, unset } from 'lodash/fp';

import { Keyed, DayTimeStat } from 'models';
import {
  DELETE_TIME_TRACKER,
  EDIT_TIME_TRACKER,
  SWITCH_START_DATE
} from 'store/actionTypes';
export interface TimeTracker {
  projectsTimeSlots: Keyed<Keyed<DayTimeStat>>;
  startDate: Date;
}

const initialState: TimeTracker = {
  projectsTimeSlots: {},
  startDate: new Date()
};

const timeTrackerReducer = handleActions(
  {
    [EDIT_TIME_TRACKER]: (state, { payload }) => {
      const { projectId, date, amountOfHours } = payload as any;
      return set(
        `projectsTimeSlots.${projectId}[${date}]`,
        { amountOfHours, date },
        state
      );
    },
    [DELETE_TIME_TRACKER]: (state, { payload }) => {
      const { projectId, date } = payload as any;
      return unset(`projectsTimeSlots.${projectId}[${date}]`, state);
    },
    [SWITCH_START_DATE]: (state, { payload }) => {
      const { newStartDate } = payload as any;
      return set(`startDate`, newStartDate, state);
    }
  },
  initialState
);

export default timeTrackerReducer;

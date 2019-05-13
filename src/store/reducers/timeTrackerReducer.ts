import {handleActions} from 'redux-actions';
import {set, unset} from 'lodash/fp';

import {Keyed, DayTimeStat} from '../../models';
import {actions} from '../actions';

const initialState: Keyed<Keyed<DayTimeStat>> = {};

const timeTrackerReducer = handleActions(
    {
      [actions.editTimeTracker.toString()]: (state, {payload: {projectId, date, amountOfHours}}) => {
        return set(`${projectId}[${date}]`, {amountOfHours, date}, state);
      },
      [actions.deleteTimeTracker.toString()]: (state, {payload: {projectId, date}}) => {
        return unset(`${projectId}[${date}]`, state);
      }
    },
    initialState
);

export default timeTrackerReducer;
import {AppState} from '../store/reducers';
import {createSelector} from "reselect";
import {DayTimeStat, Keyed, Project} from "../models";
import {formatFullDate, getCalendarDates, getDateLabels} from "../DateUtils";
import pick from 'lodash/fp/pick';

export const projectsSelector = (state: AppState): Keyed<Project> => state.projects;
export const timeTrackerSelector = (state: AppState): Keyed<Keyed<DayTimeStat>> => state.timeTracker.projectsTimeSlots;
export const startDateSelector = (state: AppState): Date => state.timeTracker.startDate;

export const projectLabelSelector = createSelector(
    projectsSelector,
    (state: AppState, id: string | number) => id,
    (projects, projectId): string => projects[projectId].label
);

export const projectSelector = createSelector(
    projectsSelector,
    (state: AppState, id: string | number) => id,
    (projects, projectId) => projects[projectId]
);

export const headerDateLabelSelector = createSelector(
    startDateSelector,
    (date: Date) => {
      const {startDate, endDate} = getCalendarDates(date);
      const startDateLabel: string = formatFullDate(startDate);
      const endDateLabel: string = formatFullDate(endDate);
      return {startDateLabel, endDateLabel};
    }
);

export const fullRangeDateLabelSelector = createSelector(
    startDateSelector,
    (startDate: Date): string[] => getDateLabels(startDate)
);

export const fullRangeTimeSlots = createSelector(
    projectSelector,
    fullRangeDateLabelSelector,
    timeTrackerSelector,
    (project: Project, dateLabels: string[], timeTracker: Keyed<Keyed<DayTimeStat>>) => {
      const projectTimeSlots: Keyed<DayTimeStat> = timeTracker[project.id] ? timeTracker[project.id] : {};
      return pick(dateLabels, projectTimeSlots);
    }
);


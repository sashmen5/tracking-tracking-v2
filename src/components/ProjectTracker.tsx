import React, { FC } from 'react';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from 'react-router';
import get from 'lodash/fp/get';
// @ts-ignore
import { useSelector } from 'react-redux';

import {
  fullRangeDateLabelSelector,
  fullRangeTimeSlots,
  headerDateLabelSelector,
  projectLabelSelector
} from 'selectors';

import { AppState } from 'store/reducers';

import { DayTimeStat, Keyed } from 'models';

import TimeSlot from 'components/TimeSlot';
import Header from 'components/Header';

const TimeTrackingContainer = styled.div`
  padding: 30px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: stretch;
  overflow: auto;
  border-radius: ${props => props.theme.borderRadius};
`;

const ProjectLabel = styled.div`
  min-width: 80px;
  margin-right: 18px;
  margin-top: 50px;
`;

interface MatchParams {
  project: string;
}

interface TimeTrackingProps extends RouteComponentProps<MatchParams> {}

const ProjectTracker: FC<TimeTrackingProps> = (props: TimeTrackingProps) => {
  const { project } = props.match.params;
  const projectLabel: string = useSelector((state: AppState) =>
    projectLabelSelector(state, project)
  );
  const dateLabels: string[] = useSelector((state: AppState) =>
    fullRangeDateLabelSelector(state)
  );
  const timeSlots: Keyed<DayTimeStat> = useSelector((state: AppState) =>
    fullRangeTimeSlots(state, project)
  );
  const { startDateLabel, endDateLabel } = useSelector((state: AppState) =>
    headerDateLabelSelector(state)
  );

  const getAmountOfHours = (dateLabel: string) =>
    get([dateLabel, 'amountOfHours'], timeSlots);
  return (
    <>
      <Header
        title="Time tracking"
        startDateLabel={startDateLabel}
        endDateLabel={endDateLabel}
        projectId={projectLabel}
      />
      <TimeTrackingContainer>
        <ProjectLabel>{projectLabel}</ProjectLabel>
        {dateLabels.map(item => (
          <TimeSlot
            key={item}
            dateLabel={item}
            projectId={project}
            amountOfHours={getAmountOfHours(item)}
          />
        ))}
      </TimeTrackingContainer>
    </>
  );
};

export default withRouter(ProjectTracker);

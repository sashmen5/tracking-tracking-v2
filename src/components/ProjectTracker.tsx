import React, {FC} from 'react';
import styled from 'styled-components';
import {RouteComponentProps, withRouter} from 'react-router';

import TimeSlot from './TimeSlot';
import Header from './Header';
import {DayTimeStat, Keyed} from "../models";
// @ts-ignore
import {useSelector} from "react-redux";
import {AppState} from "../store/reducers";
import {
  fullRangeDateLabelSelector,
  fullRangeTimeSlots,
  headerDateLabelSelector,
  projectLabelSelector
} from "../selectors";


const TimeTrackingContainer = styled.div`
    padding: 30px 0;                        
    display: flex;                        
    flex-direction: row;                  
    justify-content: space-between;       
    align-content: stretch;    
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

interface TimeTrackingProps extends RouteComponentProps<MatchParams> {
}

const ProjectTracker: FC<TimeTrackingProps> = (props: TimeTrackingProps) => {
  const {project} = props.match.params;
  const projectLabel: string = useSelector((state: AppState) => projectLabelSelector(state, project));
  const dateLabels: string[] = useSelector((state: AppState) => fullRangeDateLabelSelector(state));
  const timeSlots: Keyed<DayTimeStat> = useSelector((state: AppState) => fullRangeTimeSlots(state, project));
  const {startDateLabel, endDateLabel} = useSelector((state: AppState) => headerDateLabelSelector(state));

  return (
      <>
        <Header
            title='Time tracking'
            startDateLabel={startDateLabel}
            endDateLabel={endDateLabel}
            projectId={projectLabel}
        />
        <TimeTrackingContainer>
          <ProjectLabel>{projectLabel}</ProjectLabel>
          {
            dateLabels.map((item) =>
              <TimeSlot
                key={item}
                dateLabel={item}
                projectId={project}
                amountOfHours={timeSlots[item] && timeSlots[item].amountOfHours ? timeSlots[item].amountOfHours : null}
              />
            )
          }
        </TimeTrackingContainer>
      </>
  );
};

export default withRouter(ProjectTracker);

import React, {FC, Fragment, useState} from 'react';
import {RouteComponentProps, withRouter} from 'react-router';
import styled from 'styled-components';

import {addDays, formatFullDate, getCalendarDates, getDateLabels} from '../DateUtils';

import TimeSlot from './TimeSlot';
import Header from './Header';


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

interface TimeTrackingState {
    startDate: Date
}

interface MatchParams {
    project: string;
}

interface TimeTrackingProps extends RouteComponentProps<MatchParams> {
}

const ProjectTracker: FC<TimeTrackingProps> = (props: TimeTrackingProps) => {
    const [date, setDate] = useState<TimeTrackingState>({startDate: new Date()});
    const {startDate, endDate} = getCalendarDates(date.startDate);
    const dateLabels: string[] = getDateLabels(startDate);
    const startDateLabel: string = formatFullDate(startDate);
    const endDateLabel: string = formatFullDate(endDate);
    const {project} = props.match.params;

    const handleChangeTimeSlot = (daysToAdd: number) => {
        const newStartDate = addDays(date.startDate, daysToAdd);
        setDate({startDate: newStartDate});
    };

    return (
        <Fragment>
            <Header
                title='Time tracking'
                startDateLabel={startDateLabel}
                endDateLabel={endDateLabel}
                handleNextTimeSlot={() => handleChangeTimeSlot(1)}
                handlePreviousTimeSlot={() => handleChangeTimeSlot(-1)}
            />
            <TimeTrackingContainer>
                <ProjectLabel>{project}</ProjectLabel>
                {
                    dateLabels.map((item) => <TimeSlot key={item} dateLabel={item}/>)
                }
            </TimeTrackingContainer>
        </Fragment>
    );
};

export default withRouter(ProjectTracker);

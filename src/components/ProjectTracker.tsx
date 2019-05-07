import React, {Fragment} from 'react';
import Header from "./Header";
import {addDays, formatFullDate, getCalendarDates, getDateLabels} from "../DateUtils";
import styled from "styled-components";
import TimeSlot from "./TimeSlot";
import {RouteComponentProps, withRouter} from "react-router";

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

const ProjectTracker: React.FC<TimeTrackingProps> = (props: TimeTrackingProps) => {
    const [state, setState] = React.useState<TimeTrackingState>({startDate: new Date()});
    const {startDate, endDate} = getCalendarDates(state.startDate);
    const dateLabels: string[] = getDateLabels(startDate);
    const startDateLabel: string = formatFullDate(startDate);
    const endDateLabel: string = formatFullDate(endDate);
    const {project} = props.match.params;

    const handleChangeTimeSlot = (daysToAdd: number) => {
        const newStartDate = addDays(state.startDate, daysToAdd);
        setState({startDate: newStartDate});
    };

    return (
        <Fragment>
            <Header
                title="Time tracking"
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

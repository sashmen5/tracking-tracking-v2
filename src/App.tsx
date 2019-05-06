import React from 'react';
import './App.css';
import Header from "./components/Header";
import {addDays, formatFullDate, getCalendarDates, getDateLabels} from "./DateUtils";
import styled, {createGlobalStyle, ThemeProvider} from "styled-components";
import {mainTheme} from "./MainTheme";
import TimeSlot from "./components/TimeSlot";

const GlobalStyle = createGlobalStyle`
  body {
    font-weight: bold;
    font-family: 'Nunito', sans-serif;
  }
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;      
  padding-top: 20px;   
`;

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

const App: React.FC = () => {
    const [state, setState] = React.useState<TimeTrackingState>({startDate: new Date()});

    const {startDate, endDate} = getCalendarDates(state.startDate);
    const dateLabels: string[] = getDateLabels(startDate);
    const startDateLabel: string = formatFullDate(startDate);
    const endDateLabel: string = formatFullDate(endDate);

    function handleChangeTimeSlot(daysToAdd: number) {
        const newStartDate = addDays(state.startDate, daysToAdd);
        setState({startDate: newStartDate});
    }

    return (
        <ThemeProvider theme={mainTheme}>
            <Content>
                <GlobalStyle/>
                <Header
                    title="Time tracking"
                    startDateLabel={startDateLabel}
                    endDateLabel={endDateLabel}
                    handleNextTimeSlot={() => handleChangeTimeSlot(1)}
                    handlePreviousTimeSlot={() => handleChangeTimeSlot(-1)}
                />
                <TimeTrackingContainer>
                    <ProjectLabel>My project label</ProjectLabel>
                    {
                        dateLabels.map((item) => <TimeSlot key={item} dateLabel={item}/>)
                    }
                </TimeTrackingContainer>
            </Content>
        </ThemeProvider>
    );
};

export default App;

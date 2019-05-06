import React from 'react';
import './App.css';
import Content from "./components/Content";
import Header from "./components/Header";
import TimeTrackingContainer from "./components/TimeTrackingContainer";
import {addDays, formatFullDate, getCalendarDates, getDateLabels} from "./DateUtils";

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
        <Content>
            <Header
                title="Time tracking"
                startDateLabel={startDateLabel}
                endDateLabel={endDateLabel}
                handleNextTimeSlot={() => handleChangeTimeSlot(1)}
                handlePreviousTimeSlot={() => handleChangeTimeSlot(-1)}
            />
            <TimeTrackingContainer
                dateLabels={dateLabels}
            />
        </Content>
    );
};

export default App;

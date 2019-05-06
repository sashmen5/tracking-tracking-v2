import React from 'react';
import './App.css';
import Content from "./components/Content";
import Header from "./components/Header";
import TimeTrackingContainer from "./components/TimeTrackingContainer";
import {formatFullDate, getCalendarDates, getDateLabels} from "./DateUtils";

const App: React.FC = () => {
  const {startDate, endDate} = getCalendarDates();
  const dateLabels: string[] = getDateLabels(startDate);
  const startDateLabel: string = formatFullDate(startDate);
  const endDateLabel: string = formatFullDate(endDate);

  return (
        <Content>
          <Header
              title="Time tracking"
              startDateLabel={startDateLabel}
              endDateLabel={endDateLabel}
          />
          <TimeTrackingContainer dateLabels={dateLabels}/>
        </Content>
  );
};

export default App;

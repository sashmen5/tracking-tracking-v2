import React from 'react';
import TimeSlot from "./TimeSlot";

interface TimeTrackingContainerProps {
    dateLabels: string[]
}

const TimeTrackingContainer: React.FC<TimeTrackingContainerProps> = ({dateLabels}: TimeTrackingContainerProps) => {
    return (
        <div className="time-tracking-container">
            {
                dateLabels.map((item, index) => <TimeSlot key={index} dateLabel={item}/>)
            }
        </div>
    )
};

export default TimeTrackingContainer;
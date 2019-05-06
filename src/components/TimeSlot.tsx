import React from 'react';

interface TimeSlotProps {
    dateLabel: string;
}

const TimeSlot: React.FC<TimeSlotProps> = ({dateLabel}: TimeSlotProps) => {
    return (
        <div className="time-slot">
            {dateLabel}
        </div>
    )
};

export default TimeSlot;
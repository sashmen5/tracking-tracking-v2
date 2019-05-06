import React from 'react';

interface TimeSlotProps {
    dateLabel: string;
}

interface TimeSlotState {
    amountOfHours: number;
}

const TimeSlot: React.FC<TimeSlotProps> = ({dateLabel}: TimeSlotProps) => {
    const [state, setState] = React.useState<TimeSlotState>({amountOfHours: 0});

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {value} = e.target;
        if (!value) {
            setState({amountOfHours: 0});
        } else {
            setState({amountOfHours: parseInt(e.target.value)})
        }
    }

    return (
        <div className="time-slot">
            <div>{dateLabel}</div>
            <input
                type="text"
                value={state.amountOfHours !== 0 ? state.amountOfHours : ''}
                onChange={e => handleInputChange(e)}
            />
        </div>
    )
};

export default TimeSlot;
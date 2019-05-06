import React from 'react';

interface HeaderProps {
    title: string;
    startDateLabel: string;
    endDateLabel: string;
    handleNextTimeSlot: () => void;
    handlePreviousTimeSlot: () => void;
}

const Header: React.FC<HeaderProps> = ({title, startDateLabel, endDateLabel, handleNextTimeSlot, handlePreviousTimeSlot}: HeaderProps) => {

    return (
        <div className="margin-bottom header">
            <div>
                <div className="title">{title}</div>
                <div className="dates-period">{startDateLabel} - {endDateLabel}</div>
            </div>
            <div>
                <button
                    className="main-button margin-right-20"
                    onClick={handlePreviousTimeSlot}
                >
                    Previous
                </button>
                <button
                    className="main-button"
                    onClick={handleNextTimeSlot}
                >
                    Next
                </button>
            </div>
        </div>
    )
};

export default Header;
import React from 'react';

interface HeaderProps {
    title: string;
    startDateLabel: string;
    endDateLabel: string;
}

const Header: React.FC<HeaderProps> = ({title, startDateLabel, endDateLabel}: HeaderProps) => {

    return (
        <div className="margin-bottom">
            <div className="title">{title}</div>
            <div className="dates-period">{startDateLabel} - {endDateLabel}</div>
        </div>
    )
};

export default Header;
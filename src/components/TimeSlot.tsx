import React, {ChangeEvent, FC} from 'react';
import styled from 'styled-components';
// @ts-ignore
import {useDispatch} from 'react-redux';

import {Input} from './CommontStyledComponents';
import {deleteTimeTracker, editTimeTracker} from '../store/actions';

const Container = styled.div`
    height: 300px;                       
    width: 100%;                         
    text-align: center;                  
    padding: 20px 10px;       
    border-radius: ${props => props.theme.borderRadius}; 
    background-color: ${props => props.theme.colors.backgroundContainer};
    color: ${props => props.theme.colors.main};  
    
    &:not(:last-child) {
      margin-right: 18px;
    }         
`;

const TimeSlotInput = styled(Input)`
  width: 80px;
`;

interface TimeSlotProps {
    dateLabel: string;
    projectId: string | number;
    amountOfHours: string | null;
}

const TimeSlot: FC<TimeSlotProps> = ({projectId, dateLabel, amountOfHours}: TimeSlotProps) => {
    const dispatch = useDispatch();

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        const {value} = e.target;
        if (!value) {
            dispatch(deleteTimeTracker(projectId, dateLabel));
        } else  {
            const hours: number = parseInt(value);
            if (!isNaN(hours)) {
                dispatch(editTimeTracker(projectId, dateLabel, hours));
            }
        }
    }

    return (
        <Container>
            <div>{dateLabel}</div>
            <TimeSlotInput
                type='text'
                value={amountOfHours ? amountOfHours : ''}
                onChange={e => handleInputChange(e)}
            />
        </Container>
    )
};

export default TimeSlot;
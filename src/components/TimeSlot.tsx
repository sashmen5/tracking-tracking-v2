import React from 'react';
import styled from "styled-components";
import {Input} from "./CommontStyledComponents";

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
        } else  {
            const hours = parseInt(value);
            if (!isNaN(hours)) {
                setState({amountOfHours: hours})
            }
        }
    }

    return (
        <Container>
            <div>{dateLabel}</div>
            <TimeSlotInput
                type="text"
                value={state.amountOfHours !== 0 ? state.amountOfHours : ''}
                onChange={e => handleInputChange(e)}
            />
        </Container>
    )
};

export default TimeSlot;
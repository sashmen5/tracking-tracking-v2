import React from 'react';
import styled  from 'styled-components';
import {Button, Title} from "./CommontStyledComponents";



const DatesRange = styled.div`
  color: ${props => props.theme.colors.secondary}
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const HeaderButton = styled(Button)`
  width: 100px;
`;

const SpacedButton = styled(HeaderButton)`
  margin-right: 10px;
`;

interface HeaderProps {
    title: string;
    startDateLabel: string;
    endDateLabel: string;
    handleNextTimeSlot: () => void;
    handlePreviousTimeSlot: () => void;
}

const Header: React.FC<HeaderProps> = ({title, startDateLabel, endDateLabel, handleNextTimeSlot, handlePreviousTimeSlot}: HeaderProps) => {
    return (
            <Container>
                <div>
                    <Title>{title}</Title>
                    <DatesRange>{startDateLabel} - {endDateLabel}</DatesRange>
                </div>
                <div>
                    <SpacedButton
                        onClick={handlePreviousTimeSlot}
                    >
                        Previous
                    </SpacedButton>
                    <HeaderButton
                        onClick={handleNextTimeSlot}
                    >
                        Next
                    </HeaderButton>
                </div>
            </Container>
    )
};

export default Header;
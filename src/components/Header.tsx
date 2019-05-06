import React from 'react';
import styled  from 'styled-components';

const Button = styled.button`
  width: 100px;
  height: 30px;
  text-transform: uppercase;
  color: white;
  
  background-color: ${props => props.theme.colors.main};
  border-radius: ${props => props.theme.borderRadius};
  font-weight: ${props => props.theme.fontWeight};           
`;

const SpacedButton = styled(Button)`
  margin-right: 10px;
`;

const Title = styled.div`
  font-size: 30px;   
  color: ${props => props.theme.colors.main}
`;

const DatesRange = styled.div`
  color: ${props => props.theme.colors.secondary}
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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
                    <Button
                        onClick={handleNextTimeSlot}
                    >
                        Next
                    </Button>
                </div>
            </Container>
    )
};

export default Header;
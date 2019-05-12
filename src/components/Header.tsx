import React, {FC} from 'react';
import styled  from 'styled-components';
import {Link, RouteComponentProps, withRouter} from 'react-router-dom';

import {Button, Title} from './CommontStyledComponents';

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

interface MatchParams {
    project: string;
}

interface HeaderProps extends RouteComponentProps<MatchParams> {
    title: string;
    startDateLabel: string;
    endDateLabel: string;
    handleNextTimeSlot: () => void;
    handlePreviousTimeSlot: () => void;
}

const Header: FC<HeaderProps> = ({match, title, startDateLabel, endDateLabel, handleNextTimeSlot, handlePreviousTimeSlot}: HeaderProps) => {
    const {project} = match.params;

    return (
            <Container>
                <div>
                    <Title>{title}</Title>
                    <DatesRange>{startDateLabel} - {endDateLabel}</DatesRange>
                    <Link to={{pathname: `/projects/${project}/chart`}}>
                        <HeaderButton>
                            Open Chart
                        </HeaderButton>
                    </Link>
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

export default withRouter(Header);
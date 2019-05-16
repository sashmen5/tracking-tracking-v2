import React, { FC } from 'react';
import styled from 'styled-components';
// @ts-ignore
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button, Title } from 'components/CommontStyledComponents';
import { AppState } from 'store/reducers';
import { switchStartDate } from 'store/actions';

const DatesRange = styled.div`
  color: ${props => props.theme.colors.secondary};
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
  projectId: string;
  endDateLabel: string;
}

const Header: FC<HeaderProps> = ({
  title,
  startDateLabel,
  endDateLabel,
  projectId
}: HeaderProps) => {
  const startDate: Date = useSelector(
    (state: AppState) => state.timeTracker.startDate
  );
  const dispatch = useDispatch();

  return (
    <Container>
      <div>
        <Title>{title}</Title>
        <DatesRange>
          {startDateLabel} - {endDateLabel}
        </DatesRange>
        <Link to={{ pathname: `/project/${projectId}/chart` }}>
          <HeaderButton>Open Chart</HeaderButton>
        </Link>
      </div>
      <div>
        <SpacedButton onClick={() => dispatch(switchStartDate(startDate, -1))}>
          Previous
        </SpacedButton>
        <HeaderButton onClick={() => dispatch(switchStartDate(startDate, 1))}>
          Next
        </HeaderButton>
      </div>
    </Container>
  );
};

export default Header;

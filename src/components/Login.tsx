import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router';
// @ts-ignore
import { useDispatch, useSelector } from 'react-redux';

import { logIn } from 'store/actions';
import { AppState } from 'store/reducers';
import { LOGIN } from 'store/actionTypes';

import { loadingValueSelector, userSelector } from 'selectors/index';

import { PROJECTS } from 'constants/index';

import {
  Button,
  Container,
  SpacedBottomInput,
  Title
} from 'components/CommontStyledComponents';

import withLoader from 'hocs/withLoader';

const LoginContainer = styled(Container)`
  margin: 0 auto;
  width: 200px;
  text-align: left;
`;

const LoginTitle = styled(Title)`
  margin-bottom: 25px;
`;

const LoginWithLoader = withLoader(LoginContainer);

const Login: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();
  const { idToken } = useSelector((state: AppState) => userSelector(state));
  const isLoading = useSelector((state: AppState) =>
    loadingValueSelector(state, LOGIN)
  );

  console.log(isLoading);

  const handleLoginClicked = () => {
    dispatch(logIn(email, password));
  };

  if (idToken) {
    return <Redirect push to={PROJECTS} />;
  }

  return (
    <LoginWithLoader isLoading={isLoading}>
      <LoginTitle>Login</LoginTitle>
      <span>Email</span>
      <SpacedBottomInput
        type="email"
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <span>Password</span>
      <SpacedBottomInput
        type="password"
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button onClick={handleLoginClicked}>Login</Button>
    </LoginWithLoader>
  );
};

export default Login;

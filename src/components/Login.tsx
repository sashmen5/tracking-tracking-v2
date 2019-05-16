import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router';

import {
  Button,
  Container,
  SpacedBottomInput,
  Title
} from 'components/CommontStyledComponents';
import withLoader from 'hocs/withLoader';
import { PROJECTS } from '../constants';

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
  const [toHomePage, setToHomePage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLoginClicked = () => {
    if (email !== 'admin' || password !== '1234') {
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setToHomePage(true);
    }, 1000);
  };

  if (toHomePage) {
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

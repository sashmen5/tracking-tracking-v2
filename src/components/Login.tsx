import React from 'react';
import styled from "styled-components";
import {Redirect} from "react-router";
import {Button, Container, SpacedBottomInput, Title} from "./CommontStyledComponents";

const LoginContainer = styled(Container)`
  margin: 0 auto;
  width: 200px;
  text-align: left;
`;

const LoginTitle = styled(Title)`
  margin-bottom: 25px;
`;

const Login: React.FC = () => {
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [toHomePage, setToHomePage] = React.useState<boolean>(false);

    const handleLoginClicked = () => {
        if (email !== 'admin' || password !== '1234') {
            return;
        }

        setToHomePage(true);
    };

    if (toHomePage) {
        return <Redirect push to='/Projects' />
    }

    return (
        <LoginContainer>
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
        </LoginContainer>
    )
};

export default Login;
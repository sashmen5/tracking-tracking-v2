import React from 'react';
import './App.css';
import styled, {createGlobalStyle, ThemeProvider} from "styled-components";
import {mainTheme} from "./MainTheme";
import ProjectTracker from "./components/ProjectTracker";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Login from "./components/Login";
import Projects from "./components/Projects";
import WrongRouter from "./components/WrongRouter";

const GlobalStyle = createGlobalStyle`
  body {
    font-weight: bold;
    font-family: 'Nunito', sans-serif;
  }
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;      
  padding-top: 20px;   
`;

const App: React.FC = () => {
    return (
        <Router>
            <ThemeProvider theme={mainTheme}>
                <Content>
                    <GlobalStyle/>
                    <Switch>
                        <Route path="/" exact component={Login} />
                        <Route path="/Projects" exact component={Projects} />
                        <Route path="/Projects/:project" exact component={ProjectTracker} />
                        <Route component={WrongRouter}/>
                    </Switch>
                </Content>
            </ThemeProvider>
        </Router>
    );
};

export default App;

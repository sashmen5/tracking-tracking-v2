import React, { FC } from 'react';
import { Redirect, Route } from 'react-router';
// @ts-ignore
import { useSelector } from 'react-redux';

import { AppState } from 'store/reducers';

import { userSelector } from 'selectors/index';

import { HOME } from 'constants/index';

interface PrivateRouteProps {
  Component: FC<any>;
  [key: string]: any;
}

const PrivateRouter: FC<PrivateRouteProps> = ({ Component, ...rest }) => {
  const { idToken } = useSelector((state: AppState) => userSelector(state));
  return (
    <Route
      {...rest}
      render={props =>
        idToken ? <Component {...props} /> : <Redirect to={HOME} />
      }
    />
  );
};

export default PrivateRouter;

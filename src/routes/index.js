/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import SecureRoute from './secureRoute';
import { AccessDeniedPage, Login, User, NotFoundPage } from '../containers';

export const history = createBrowserHistory();

/**
 * This component can be used to show different components when user
 * visits to different paths. We use connected react router which stores the current path
 * and other route parameters to the redux store.
 */

const ApplicationRoutes = () => (
  <>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/">
          <Redirect to="/users" />
        </Route>
        <SecureRoute exact path="/users" component={User} />
        <Route path="/login" exact component={Login} />
        <Route path="/unauthorized" component={AccessDeniedPage} />
        <Route
          path="*"
          render={(props) => <NotFoundPage />}
        />
      </Switch>
    </ConnectedRouter>
  </>
);

export default ApplicationRoutes;

import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router';
import { asyncLocalStorage } from '../utils/asyncLocalStorage';

const SecureRotue = ({ component: Component, ...rest }) => {
  const token = asyncLocalStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              // eslint-disable-next-line react/prop-types
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

SecureRotue.propTypes = {
  component: PropTypes.node.isRequired
}

export default SecureRotue;
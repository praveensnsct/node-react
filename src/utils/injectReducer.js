import React, { useEffect } from 'react';
import { useStore } from 'react-redux';

/**
 * Dynamically injects a reducer
 */

export default ({ key, reducer }) => WrappedComponent => props => {
  const store = useStore();
  useEffect(() => {
    store.injectReducer(key, reducer);
    // could clean things up here
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <WrappedComponent {...props} />;
};

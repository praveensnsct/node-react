import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import registerServiceWorker from './registerServiceWorker';
import ErrorBoundary from './ErrorBoundary';
import configureStore from './configureStore';
import './index.css';

// Import all application routes
import Routes, { history } from './routes';

// Add promise support to the global window object if not found
if (!window.Promise) window.Promise = Promise;

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
          <Routes />
      </Provider>
    </ErrorBoundary>,
  </React.StrictMode>,
  MOUNT_NODE
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
registerServiceWorker();

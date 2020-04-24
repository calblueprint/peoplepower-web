import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import * as Sentry from '@sentry/browser';
import App from './App';
import { store, persistor } from './lib/redux/store';

Sentry.init({
  dsn:
    'https://b7796c6c9c1a4a41a8d40a9a0ae18596@o306199.ingest.sentry.io/5211924'
});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

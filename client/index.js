import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';
import {Provider} from 'react-redux';
import {configureStore, persistedStore} from './src/redux/configureStore';
import {PersistGate} from 'redux-persist/integration/react';

const RNRedux = () => {
  return (
    <Provider store={configureStore}>
      <PersistGate persistor={persistedStore}>
        <App />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => RNRedux);

import React from 'react';
import {Provider} from 'react-redux';
import RootNavigator from './navigator/RootNavigator';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;

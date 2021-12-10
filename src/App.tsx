import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import KeyboardBlockWrapper from './component/KeyboardBlockWrapper';
import LoadingScreenWrapper from './component/LoadingScreenWrapper';
import RootNavigator from './navigator/RootNavigator';
import store from './redux/store';

const App = () => {
  useEffect(() => {
    LogBox.ignoreLogs(['super()']);
  }, []);

  return (
    <Provider store={store}>
      <KeyboardBlockWrapper>
        <LoadingScreenWrapper>
          <RootNavigator />
        </LoadingScreenWrapper>
      </KeyboardBlockWrapper>
    </Provider>
  );
};

export default App;

import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import RootStack from './RootStack';

const RootNavigator = () => (
  <NavigationContainer>
    <StatusBar animated={true} hidden={false} />
    <RootStack />
  </NavigationContainer>
);

export default RootNavigator;

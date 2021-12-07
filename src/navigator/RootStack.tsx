import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from '../screen/LoginPage';
import LandingPage from '../screen/LandingPage';
import GamePage from '../screen/GamePage';

export type RootStackParamList = {
  Login: undefined;
  Landing: undefined;
  Game: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerBackTitle: 'Back'}}>
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Landing"
        component={LandingPage}
        options={{headerBackVisible: false}}
      />
      <Stack.Screen name="Game" component={GamePage} />
    </Stack.Navigator>
  );
};

export default RootStack;

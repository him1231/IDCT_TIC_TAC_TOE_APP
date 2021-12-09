import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from '../screen/LoginPage';
import LandingPage from '../screen/LandingPage';
import GamePage from '../screen/GamePage';
import SignUpPage from '../screen/SignUpPage';
import {Room} from '../utils/api';
import RoomPage from '../screen/RoomPage';

export type RootStackParamList = {
  Login: undefined;
  Landing: undefined;
  Game: {room: Room};
  SignUp: undefined;
  Room: undefined;
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
      <Stack.Screen name="SignUp" component={SignUpPage} />
      <Stack.Screen name="Room" component={RoomPage} />
    </Stack.Navigator>
  );
};

export default RootStack;

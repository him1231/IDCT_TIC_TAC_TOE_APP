import {NavigationProp, useNavigation} from '@react-navigation/core';
import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import Separator from '../component/Separator';
import {RootStackParamList} from '../navigator/RootStack';

const LoginPage = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onPressLogin = () => {
    navigation.navigate('Landing');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>#</Text>
      <TextInput style={styles.textInput} placeholder="User name" />
      <Separator size={20} />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        textContentType="password"
        secureTextEntry={true}
      />
      <Separator size={40} />
      <Button title="Login" onPress={onPressLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {width: 200, height: 40, borderBottomWidth: 1},
  logo: {
    top: '15%',
    position: 'absolute',
    fontSize: 100,
  },
});

export default LoginPage;
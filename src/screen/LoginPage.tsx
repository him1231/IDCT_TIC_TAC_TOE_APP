import {NavigationProp, useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {login} from '../utils/api';
import Divider from '../component/Divider';
import Separator from '../component/Separator';
import {RootStackParamList} from '../navigator/RootStack';
import {useDispatch} from 'react-redux';
import {hideLoading, showLoading} from '../redux/reducers/general';

const LoginPage = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onPressLogin = async () => {
    dispatch(showLoading());
    setPassword('');
    if (await login(username, password)) {
      navigation.navigate('Landing');
    } else {
      Alert.alert('login failed');
    }
    dispatch(hideLoading());
  };

  const onPressSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>#</Text>
      <TextInput
        style={styles.textInput}
        placeholder="User name"
        onChangeText={setUsername}
      />
      <Separator size={20} />
      <TextInput
        style={styles.textInput}
        value={password}
        placeholder="Password"
        textContentType="password"
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <Separator size={50} />
      <Button title="Login" onPress={onPressLogin} />
      <Divider width={80} marginVertical={5} />
      <Button title="SignUp" onPress={onPressSignUp} />
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

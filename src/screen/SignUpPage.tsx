import {NavigationProp, useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {Alert, Button, StyleSheet, TextInput, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {RootStackParamList} from 'src/navigator/RootStack';
import {showLoading, hideLoading} from '../redux/reducers/general';
import {signUp} from '../../src/utils/api';
import Separator from '../component/Separator';

const SignUpPage = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const onPressSignUp = async () => {
    dispatch(showLoading());

    const result = await signUp(username, password, password2);
    dispatch(hideLoading());

    if (result === 'success') {
      Alert.alert('Sign up success', undefined, [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    } else {
      Alert.alert(result);
    }
  };

  return (
    <View style={styles.container}>
      <Separator size={50} />
      <TextInput
        placeholderTextColor={'grey'}
        style={styles.textInput}
        placeholder="User name"
        onChangeText={setUsername}
      />
      <Separator size={20} />
      <TextInput
        placeholderTextColor={'grey'}
        style={styles.textInput}
        placeholder="Password"
        textContentType="password"
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <Separator size={20} />
      <TextInput
        placeholderTextColor={'grey'}
        style={styles.textInput}
        placeholder="Confirm Password"
        textContentType="password"
        secureTextEntry={true}
        onChangeText={setPassword2}
      />
      <Separator size={150} />

      <Button title="SignUp" onPress={onPressSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {width: 200, height: 40, borderBottomWidth: 1},
  logo: {
    top: '15%',
    position: 'absolute',
    fontSize: 100,
  },
});

export default SignUpPage;

import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import Separator from '../component/Separator';

const SignUpPage = () => {
  const onPressSignUp = () => {
    // console.log('SignUpPage', 'onPressSignUp');
  };
  return (
    <View style={styles.container}>
      <Separator size={50} />
      <TextInput style={styles.textInput} placeholder="User name" />
      <Separator size={20} />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        textContentType="password"
        secureTextEntry={true}
      />
      <Separator size={20} />
      <TextInput
        style={styles.textInput}
        placeholder="Confirm Password"
        textContentType="password"
        secureTextEntry={true}
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

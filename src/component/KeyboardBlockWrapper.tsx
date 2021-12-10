import React, {useEffect, useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '../redux/store';
import {
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
} from 'react-native';

const KeyboardBlockWrapper: React.FC = props => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const keyboardDidShow = () => setKeyboardVisible(true);
  const keyboardWillHide = () => setKeyboardVisible(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow,
    );
    const keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      keyboardWillHide,
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  const onPress = () => {
    Keyboard.dismiss();
  };

  return (
    <>
      {props.children}
      {isKeyboardVisible ? (
        <TouchableWithoutFeedback onPress={onPress} accessible={false}>
          <View style={styles.block} />
        </TouchableWithoutFeedback>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  block: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default KeyboardBlockWrapper;

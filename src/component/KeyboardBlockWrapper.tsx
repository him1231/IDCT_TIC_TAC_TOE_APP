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

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
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

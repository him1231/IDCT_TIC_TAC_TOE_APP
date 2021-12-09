import React, {useState} from 'react';
import {
  Modal,
  ModalProps,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  TouchableOpacityProps,
  TextProps,
} from 'react-native';
import Shadow from './Shadow';

interface Props extends ModalProps {
  title?: string;

  placeholder?: string;
  onCancel?: () => void;
  onDone?: (_: string) => void;
}

interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  textStyle?: TextProps;
}

const CustomButton = (props: ButtonProps) => {
  const {title, textStyle, ...touchableOpacityProps} = props;
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red',
        minWidth: 100,
        minHeight: 30,
      }}
      {...touchableOpacityProps}>
      <Text style={{color: '#007aff'}} {...textStyle}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const TextInputAlert = (props: Props) => {
  const {title, placeholder, onCancel, onDone, ...ModalProps} = props;
  const [input, setInput] = useState('');

  const onPressCancel = () => {
    if (onCancel) onCancel();
  };
  const onPressOK = () => {
    if (onDone) onDone(input);
  };

  return (
    <Modal transparent={true} {...ModalProps}>
      <View style={[styles.container, Shadow]}>
        <View style={styles.promptContainer}>
          {title && <Text style={styles.title}>{title}</Text>}
          <TextInput
            style={styles.textInput}
            placeholder={placeholder}
            onChangeText={setInput}
            onSubmitEditing={onPressOK}
          />
          <View style={styles.buttonContainer}>
            <CustomButton title={'Cancel'} onPress={onPressCancel} />
            <CustomButton title={'OK'} onPress={onPressOK} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  promptContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  textInput: {
    margin: 20,
    width: 180,
    height: 40,
    borderBottomWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

export default TextInputAlert;

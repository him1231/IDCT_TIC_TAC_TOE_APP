import React from 'react';
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  TextProps,
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  textStyle?: TextProps;
}

const TextButton = (props: ButtonProps) => {
  const {title, textStyle, ...touchableOpacityProps} = props;
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
      {...touchableOpacityProps}>
      <Text style={{color: '#007aff'}} {...textStyle}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;

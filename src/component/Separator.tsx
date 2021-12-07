import React from 'react';
import {View} from 'react-native';

type Props = {
  size?: number;
};

const Separator = (props: Props) => {
  const {size = 20} = props;
  return <View style={{width: size, height: size}} />;
};

export default Separator;

import React from 'react';
import {StyleSheet, View} from 'react-native';

type Props = {
  width?: number | string;
  height?: number | string;
  marginHorizontal?: number;
  marginVertical?: number;
};

const Divider = (prop: Props) => {
  return <View style={[styles.divider, {...prop}]} />;
};

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: 1,
    borderColor: 'grey',
  },
});

export default Divider;

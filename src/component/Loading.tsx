import {
  View,
  StyleSheet,
  ActivityIndicator,
  DeviceEventEmitter,
} from 'react-native';
import React from 'react';

let instance: Loading | null = null;

export default class Loading extends React.Component {
  constructor(props: any) {
    super(props);

    if (!instance) {
      instance = this;
    }

    this.state = {
      isLoading: true,
    };

    // instance.props = props;

    return instance;
  }

  static ShareInstance() {
    let singleton = new Loading({});
    return singleton;
  }

  render() {
    return (
      <View style={styles.background}>
        <ActivityIndicator size="large" color="white" style={styles.loading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 10000000,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {},
});

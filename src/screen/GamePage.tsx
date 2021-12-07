import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Separator from '../component/Separator';

type state = 'x' | 'o' | '';

interface TicTacToeButtonProps {
  index: number;
  state: state;
  onPress?: (_: number) => void;
}

const TicTacToeButton = (props: TicTacToeButtonProps) => {
  const {index, state} = props;

  const onPress = () => {
    if (props.onPress) props.onPress(index);
  };
  return (
    <TouchableOpacity style={styles.gameButton} onPress={onPress}>
      <Text style={styles.gameButtonIcon}>{state}</Text>
    </TouchableOpacity>
  );
};

const GamePad = () => {
  const [data, setData] = useState<state[]>([...Array(9).keys()].map(_ => ''));

  const onButtonPressed = (index: number) => {
    data[index] = data[index] === 'x' ? 'o' : data[index] === 'o' ? '' : 'x';

    setData([...data]);
  };

  const renderItem = ({item, index}: {item: state; index: number}) => {
    return (
      <TicTacToeButton
        index={index}
        state={data[index]}
        onPress={onButtonPressed}
      />
    );
  };

  return (
    <View style={styles.gamePadContainer}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, i) => i + 'gameButton'}
        numColumns={3}
        contentContainerStyle={styles.gamePad}
        columnWrapperStyle={styles.gamePadRow}
        scrollEnabled={false}
      />
    </View>
  );
};

const GameInfo = () => {
  return <></>;
};

const GamePage = () => {
  return (
    <View style={styles.container}>
      <GamePad />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  gamePadContainer: {
    height: 300,
    width: 300,
  },
  gamePad: {
    height: 300,
    backgroundColor: 'black',
    justifyContent: 'space-between',
  },
  gamePadRow: {
    width: 300,
    justifyContent: 'space-between',
  },
  gameButton: {
    width: 95,
    height: 95,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameButtonIcon: {
    fontSize: 80,
  },
});

export default GamePage;
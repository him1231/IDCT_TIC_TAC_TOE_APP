import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Separator from '../component/Separator';
import {RootStackParamList} from 'src/navigator/RootStack';
import {leave, room, Room} from '../utils/api';

type state = 'x' | 'o' | '';

interface TicTacToeButtonProps {
  index: number;
  buttonState: state;
  onPress?: (_: number) => void;
}

const TicTacToeButton = (props: TicTacToeButtonProps) => {
  const {index, buttonState} = props;

  const onPress = () => {
    if (props.onPress) props.onPress(index);
  };
  return (
    <TouchableOpacity style={styles.gameButton} onPress={onPress}>
      <Text style={styles.gameButtonIcon}>{buttonState}</Text>
    </TouchableOpacity>
  );
};

const GamePad = () => {
  const [data, setData] = useState<state[]>([...Array(9).keys()].map(_ => ''));

  const onButtonPressed = (index: number) => {
    data[index] = data[index] === 'x' ? 'o' : data[index] === 'o' ? '' : 'x';

    setData([...data]);
  };

  const renderItem = ({index}: {item: state; index: number}) => {
    return (
      <TicTacToeButton
        index={index}
        buttonState={data[index]}
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

const GamePage = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Game'>>();
  const [roomData, setRoomData] = useState(route.params.room);
  console.log('roomData', roomData);

  useEffect(() => {
    const interval = setInterval(fetchRoom, 1000);

    return () => {
      leave();
      clearInterval(interval);
    };
  }, []);

  const fetchRoom = async () => {
    const result = await room();
    if (result !== undefined) {
      setRoomData(result);
    } else {
      navigation.goBack();
      Alert.alert('Room Closed');
    }
  };

  const GameInfo = () => {
    return (
      <View style={styles.gameInfoContainer}>
        {roomData !== null &&
          roomData.players !== undefined &&
          roomData.players.map((player, index) => (
            <Text key={index}>{`Player${index + 1}: ${player}`}</Text>
          ))}

        <Separator size={20} />
        {roomData !== null &&
          roomData.spectators !== undefined &&
          Object.keys(roomData.spectators).map((key, index) => (
            <Text key={index}>{`Spectator${index + 1}: ${key}`}</Text>
          ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <GamePad />
      <Separator size={100} />
      <GameInfo />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  gameInfoContainer: {
    width: '100%',
    padding: 20,
    justifyContent: 'flex-start',
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

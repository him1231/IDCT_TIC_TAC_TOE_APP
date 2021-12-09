import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  Alert,
} from 'react-native';
import {join, Room, rooms} from '../utils/api';
import Shadow from '../component/Shadow';
import Separator from '../component/Separator';
import {useDispatch} from 'react-redux';
import {showLoading, hideLoading} from '../redux/reducers/general';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList} from 'src/navigator/RootStack';

interface CategoryButtonProps {
  data: string;
  onPress?: () => void;
}
const CategoryButton = (props: CategoryButtonProps) => {
  const {data, onPress} = props;

  return (
    <TouchableOpacity style={styles.categoryContainer} onPress={onPress}>
      <Text style={styles.categoryText}>{`Room: ${data}`}</Text>
    </TouchableOpacity>
  );
};

const RoomPage = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [roomList, setRoomList] = useState<Room[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchRoomList();
  }, []);

  const fetchRoomList = async () => {
    setRoomList(await rooms());
  };

  const renderItem = ({item}: {item: Room}) => {
    const onPress = async () => {
      dispatch(showLoading());
      const result = await join(item._id);
      if (result) {
        navigation.replace('Game', {room: result});
      } else {
        Alert.alert('Cannot join rooom');
      }

      dispatch(hideLoading());
    };
    return <CategoryButton data={item.name} onPress={onPress} />;
  };

  return (
    <FlatList
      data={roomList}
      renderItem={renderItem}
      keyExtractor={(_, i) => `${i}`}
      contentContainerStyle={styles.container}
      ItemSeparatorComponent={Separator}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  categoryContainer: {
    backgroundColor: 'white',
    height: 100,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    ...Shadow,
  },
  categoryText: {
    fontSize: 20,
  },
});

export default RoomPage;

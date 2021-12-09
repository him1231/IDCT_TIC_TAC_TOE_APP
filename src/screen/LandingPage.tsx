import {useNavigation, NavigationProp} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {Alert, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import TextInputAlert from '../component/TextInputAlert';
import Separator from '../component/Separator';
import Shadow from '../component/Shadow';
import {RootStackParamList} from '../navigator/RootStack';
import {create, logout} from '../utils/api';
import {useDispatch} from 'react-redux';
import {hideLoading, showLoading} from '../redux/reducers/general';
import TextButton from '../component/TextButton';

type LandingCategoryData = 'create' | 'join';

const landingCategoryData: LandingCategoryData[] = ['create', 'join'];

interface CategoryButtonProps {
  data: LandingCategoryData;
  onPress?: () => void;
}

const CategoryButton = (props: CategoryButtonProps) => {
  const {data, onPress} = props;

  return (
    <TouchableOpacity style={styles.categoryContainer} onPress={onPress}>
      <Text style={styles.categoryText}>
        {data === 'create' ? 'Create Room' : 'Join Room'}
      </Text>
    </TouchableOpacity>
  );
};

const LandingPage = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  useEffect(() => {
    const onPressLogout = async () => {
      dispatch(showLoading());
      await logout();
      navigation.navigate('Login');
      dispatch(hideLoading());
    };
    navigation.setOptions({
      headerRight: () => (
        <TextButton title={'Logout'} onPress={onPressLogout} />
      ),
    });
  }, []);

  const [shouldShowTextInputAlert, setShouldShowTextInputAlert] =
    useState(false);

  const renderItem = ({item}: {item: LandingCategoryData}) => {
    const onPress = () => {
      switch (item) {
        case 'create':
          setShouldShowTextInputAlert(true);
          break;

        case 'join':
          navigation.navigate('Room');
          break;
      }
    };
    return <CategoryButton data={item} onPress={onPress} />;
  };

  const onSubmitRoomName = async (name: string) => {
    dispatch(showLoading());
    setShouldShowTextInputAlert(false);
    const result = await create(name);
    if (result !== undefined) {
      navigation.navigate('Game', {room: result});
    } else {
      Alert.alert('Create Room Failed');
    }
    dispatch(hideLoading());
  };

  return (
    <>
      <FlatList
        data={landingCategoryData}
        renderItem={renderItem}
        keyExtractor={(_, i) => `${i}`}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={Separator}
      />
      <TextInputAlert
        title={'Room Name:'}
        visible={shouldShowTextInputAlert}
        onDone={onSubmitRoomName}
        onCancel={() => setShouldShowTextInputAlert(false)}
      />
    </>
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

export default LandingPage;

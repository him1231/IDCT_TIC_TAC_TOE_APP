import {useNavigation, NavigationProp} from '@react-navigation/core';
import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import Separator from '../component/Separator';
import Shadow from '../component/Shadow';
import {RootStackParamList} from '../navigator/RootStack';

type LandingCategoryData = {
  title: string;
};

const landingCategoryData: LandingCategoryData[] = [
  {
    title: 'Create Room',
  },
  {
    title: 'Join Room',
  },
  {
    title: 'Spectate Room',
  },
];

interface CategoryButtonProps {
  data: LandingCategoryData;
  onPress?: () => void;
}

const CategoryButton = (props: CategoryButtonProps) => {
  const {data, onPress} = props;
  const {title} = data;

  return (
    <TouchableOpacity style={styles.categoryContainer} onPress={onPress}>
      <Text style={styles.categoryText}>{title}</Text>
    </TouchableOpacity>
  );
};

const LandingPage = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const renderItem = ({item}: {item: LandingCategoryData}) => {
    const onPress = () => {
      navigation.navigate('Game');
    };
    return <CategoryButton data={item} onPress={onPress} />;
  };

  return (
    <FlatList
      data={landingCategoryData}
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

export default LandingPage;

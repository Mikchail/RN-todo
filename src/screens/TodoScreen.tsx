import React, {useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import CardItem from '../components/CardItem';

interface TodoScreenProps {}

const data = [
  {
    id: '1',
    title: 'Выучить react native',
    isComplite: false,
  },
  {
    id: '2',
    title: 'Выучить латынь',
    isComplite: false,
  },
  {
    id: '3',
    title: 'Выучить typescript',
    isComplite: false,
  },
];



const TodoScreen: React.FC<TodoScreenProps> = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(itemData) => itemData.id}
        renderItem={(itemData) => <CardItem item={itemData.item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 0,
  },
  container: {
    flex: 1,
    marginHorizontal: 20,
  }
});

export default TodoScreen;

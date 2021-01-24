import React, {useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import CardItem from '../components/CardItem';
import { StackNavigationProp } from '@react-navigation/stack';
import {TodoParamList} from '../navigator/TodoNavigator';
import { ITodoItem } from '../types/index.d';
import { RootStateOrAny, useSelector } from 'react-redux';

interface TodoScreenProps {
  navigation:  StackNavigationProp<TodoParamList>
}

const dataItem = [
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
    title: 'Выучить typescript typescript typescript typescript',
    isComplite: false,
  },
];



const TodoScreen: React.FC<TodoScreenProps> = (props) => {
  const [data,setData] = useState<ITodoItem[]>(dataItem)
  const dataTodo = useSelector((state: RootStateOrAny) => state.todo)
  
  const updateData = (item: ITodoItem) => {
    const newData = [...data];
    const elemIndex = data.findIndex((d)=> d.id === item.id)
    newData[elemIndex] = {
      id: item.id,
      title: item.title,
      isComplite: item.isComplite,
    }
    setData(newData);
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={dataTodo}
        keyExtractor={(itemData) => itemData.id}
        renderItem={(itemData) => <CardItem updateData={updateData} item={itemData.item} navigation={props.navigation} />}
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

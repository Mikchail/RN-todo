import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

import {RouteProp} from '@react-navigation/native';
import {TodoParamList} from '../navigator/TodoNavigator';
import FormEdit from './../components/FormEdit';
import {ITodoItem} from '../types/index.d';
import {StackNavigationProp} from '@react-navigation/stack';
import { useDispatch } from 'react-redux';

interface EditTodoProps {
  route: RouteProp<TodoParamList, 'Edit'>;
  navigation: StackNavigationProp<TodoParamList, 'Edit'>;
}

const EditTodo: React.FC<EditTodoProps> = (props) => {
  const item = props.route.params.item;
  const update = props.route.params.updateData;
 
  return (
    <View style={styles.container}>
      <Text>Edit todo</Text>
      <FormEdit navigation={props.navigation} item={item} />
    </View>
  );
};
export const screenOption = (navProps: EditTodoProps) => {
  const headerTitle = navProps.route.params.item.title;
  return {
    headerTitle: headerTitle,
  };
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  button: {
    marginRight: 20,
  },
});
export default EditTodo;

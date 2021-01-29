import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

import {RouteProp} from '@react-navigation/native';
import {TodoParamList} from '../navigator/TodoNavigator';
import FormEdit from './../components/FormEdit';
import {StackNavigationProp} from '@react-navigation/stack';

interface EditTodoProps {
  route: RouteProp<TodoParamList, 'Edit'>;
  navigation: StackNavigationProp<TodoParamList, 'Edit'>;
}

const EditTodo: React.FC<EditTodoProps> = (props) => {
  const defaultItem = {
    id: '',
    title: '',
    isComplite: false,
    description: '2',
    photo: null
  }
  const { item = defaultItem }= props.route.params;
 
  return (
    <View style={styles.container}>
      <FormEdit navigation={props.navigation} item={item} />
    </View>
  );
};
export const screenOption = (navProps: EditTodoProps) => {
  const item = navProps.route.params.item;
  return {
    headerTitle: item?.title || 'Create',
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

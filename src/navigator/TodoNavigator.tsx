import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TodoScreen from './../screens/TodoScreen';
import EditTodoScreen , {screenOption as editScreenOption} from '../screens/EditTodoScreen';
import { ITodoItem } from '../types/index.d';

interface TodoNavigatorProps {}

export type TodoParamList = {
  Todo: undefined;
  Edit: {
    item: ITodoItem;
  };
}

const TodoStack = createStackNavigator<TodoParamList>();

const TodoNavigator: React.FC<TodoNavigatorProps> = ({}) => {
  return <TodoStack.Navigator>
     <TodoStack.Screen name="Todo" component={TodoScreen} />
     <TodoStack.Screen name="Edit" options={editScreenOption} component={EditTodoScreen} />
  </TodoStack.Navigator>;
};

export default TodoNavigator;

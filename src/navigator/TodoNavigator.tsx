import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TodoScreen from './../screens/TodoScreen';

interface TodoNavigatorProps {}

type TodoParamList = {
  Todo: undefined;
}

const TodoStack = createStackNavigator<TodoParamList>();

const TodoNavigator: React.FC<TodoNavigatorProps> = ({}) => {
  return <TodoStack.Navigator>
     <TodoStack.Screen name="Todo" component={TodoScreen} />
  </TodoStack.Navigator>;
};

export default TodoNavigator;

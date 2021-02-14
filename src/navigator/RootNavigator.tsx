import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { NativeModules } from 'react-native';
import TodoNavigator from './TodoNavigator';
import AuthNavigator from './AuthNavigator';
import SchemaContext from '../context/context';
import {useTypedSelector} from './../hooks/useTypedSelector';

interface rootNavigatorProps {}
const {MyLibrary} = NativeModules
console.log(MyLibrary);

const RootNavigator: React.FC<rootNavigatorProps> = () => {
  const {user} = useTypedSelector((state) => state.auth);
  const isUser: boolean = Boolean(user.name)
  return (
    <SchemaContext>
      <NavigationContainer>
        {isUser && <TodoNavigator />}
        {!isUser && <AuthNavigator />}
      </NavigationContainer>
    </SchemaContext>
  );
};

export default RootNavigator;

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { NativeModules } from 'react-native';
import AuthNavigator from './AuthNavigator';
import SchemaContext from '../context/context';
import {useTypedSelector} from './../hooks/useTypedSelector';
import RootTabsNavigator from './TabNavigators';

interface rootNavigatorProps {}
const {MyLibrary} = NativeModules
console.log(MyLibrary);

const RootNavigator: React.FC<rootNavigatorProps> = () => {
  const {user} = useTypedSelector((state) => state.auth);
  const isUser: boolean = Boolean(user.name)
  return (
    <SchemaContext>
      <NavigationContainer>
        {isUser && <RootTabsNavigator />}
        {!isUser && <AuthNavigator />}
      </NavigationContainer>
    </SchemaContext>
  );
};

export default RootNavigator;

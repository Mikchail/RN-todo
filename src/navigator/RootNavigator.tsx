import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TodoNavigator from './TodoNavigator';
import AuthNavigator from './AuthNavigator';
import SchemaContext from '../context/context';
import {useTypedSelector} from './../hooks/useTypedSelector';

interface rootNavigatorProps {}

const RootNavigator: React.FC<rootNavigatorProps> = () => {
  const {user} = useTypedSelector((state) => state.auth);

  return (
    <SchemaContext>
      <NavigationContainer>
        {user.name && <TodoNavigator />}
        {!user.name && <AuthNavigator />}
      </NavigationContainer>
    </SchemaContext>
  );
};

export default RootNavigator;

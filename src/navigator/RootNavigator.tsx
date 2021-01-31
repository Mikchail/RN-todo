import React from 'react';
import { useSelector } from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import TodoNavigator from './TodoNavigator';
import AuthNavigator from './AuthNavigator';
import SchemaContext from '../context/context';
import { RootState } from './../store/index';

interface rootNavigatorProps {}

const RootNavigator: React.FC<rootNavigatorProps> = ({}) => {
  const user = useSelector<RootState>(state => state.auth.user)

  return (
      <SchemaContext>
        <NavigationContainer>
          {user && <TodoNavigator />}
          {!user && <AuthNavigator />}
        </NavigationContainer>
      </SchemaContext>
  );
};

export default RootNavigator;

import React, {useState} from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import TodoNavigator from './TodoNavigator';
import AuthNavigator from './AuthNavigator';
import store from '../store';

interface rootNavigatorProps {}

const RootNavigator: React.FC<rootNavigatorProps> = ({}) => {
  const [auth, setAuth] = useState(false);
  return (
    <Provider store={store}>
      <NavigationContainer>
        {auth && <TodoNavigator />}
        {!auth && <AuthNavigator login={setAuth} />}
      </NavigationContainer>
    </Provider>
  );
};

export default RootNavigator;

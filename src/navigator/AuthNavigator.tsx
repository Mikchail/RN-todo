import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthScreen from './../screens/AuthScreen';

interface AuthNavigatorProps {
}

export type AuthParamList = {
  Auth: {
  };
}

const AuthStack = createStackNavigator<AuthParamList>();

const AuthNavigator: React.FC<AuthNavigatorProps> = (props) => {
  return <AuthStack.Navigator>
     <AuthStack.Screen name="Auth" component={AuthScreen} />
  </AuthStack.Navigator>;
};

export default AuthNavigator;

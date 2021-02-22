import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthScreen from './../screens/AuthScreen';
import StartupScreen from '../screens/StartScreen';

interface AuthNavigatorProps {
}

export type AuthParamList = {
  Auth: undefined;
  Start: undefined;
}

const AuthStack = createStackNavigator<AuthParamList>();

const AuthNavigator: React.FC<AuthNavigatorProps> = () => {
  return <AuthStack.Navigator>
     <AuthStack.Screen name="Start" component={StartupScreen} />
     <AuthStack.Screen name="Auth" component={AuthScreen} />
  </AuthStack.Navigator>;
};

export default AuthNavigator;

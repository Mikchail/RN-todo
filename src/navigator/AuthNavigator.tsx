import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthScreen from './../screens/AuthScreen';

interface AuthNavigatorProps {
  login: React.Dispatch<React.SetStateAction<boolean>>;
}

export type AuthParamList = {
  Auth: {
    login: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const AuthStack = createStackNavigator<AuthParamList>();

const AuthNavigator: React.FC<AuthNavigatorProps> = (props) => {
  return <AuthStack.Navigator>
     <AuthStack.Screen name="Auth" component={AuthScreen} initialParams={{ login: props.login }} />
  </AuthStack.Navigator>;
};

export default AuthNavigator;

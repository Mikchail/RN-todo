import React from 'react';
import {View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {AuthParamList} from '../navigator/AuthNavigator';
import Form from '../components/FormAuth';

type AuthScreenProps = {
  route: RouteProp<AuthParamList, 'Auth'>;
};

const AuthScreen: React.FC<AuthScreenProps> = (props) => {
  const {login} = props.route.params;
  return (
    <View style={{flex: 1}}>
      <Form submit={login} />
    </View>
  );
};

export default AuthScreen;

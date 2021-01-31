import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {AuthParamList} from '../navigator/AuthNavigator';
import Form from '../components/FormAuth';
import {useSelector} from 'react-redux';
import {RootState} from './../store/index';

type AuthScreenProps = {
  route: RouteProp<AuthParamList, 'Auth'>;
};

const AuthScreen: React.FC<AuthScreenProps> = (props) => {
  const userWaiting = useSelector<RootState>((state) => state.auth.waiting);
  return (
    <>
      {userWaiting ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <Form />
        </View>
      )}
    </>
  );
};

export default AuthScreen;

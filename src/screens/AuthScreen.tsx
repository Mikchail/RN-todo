import React, {useEffect} from 'react';
import {ActivityIndicator, View, Alert} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {AuthParamList} from '../navigator/AuthNavigator';
import FormAuth from '../components/FormAuth';
import {useTypedSelector} from './../hooks/useTypedSelector';

type AuthScreenProps = {
  route: RouteProp<AuthParamList, 'Auth'>;
};

const AuthScreen: React.FC<AuthScreenProps> = (props) => {
  const {waiting: userWaiting, error: userError} = useTypedSelector(
    (state) => state.auth,
  );
    
  useEffect(() => {
    if (userError) {
      Alert.alert(
        'Error',
        `${userError}`,
        [
          {
            text: 'Ok',
          },
        ],
        {cancelable: false},
      );
    }
  }, [userError]);

  return (
    <>
      {userWaiting ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#f34545" />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <FormAuth />
        </View>
      )}
    </>
  );
};

export default AuthScreen;

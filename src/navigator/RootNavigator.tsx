import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import SchemaContext from '../context/context';
import { useTypedSelector } from './../hooks/useTypedSelector';
import RootTabsNavigator from './TabNavigators';
import { fcmService } from '../services/firebaseService';
import { localNotificationService } from '../services/localNotificationService';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

interface rootNavigatorProps { }

const RootNavigator: React.FC<rootNavigatorProps> = () => {
  const { user } = useTypedSelector((state) => state.auth);
  const isUser: boolean = Boolean(user.name);
  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);
  }, []);

  const onRegister = (token: string) => {
    console.log('[App] Token', token);
  };

  const onNotification = (notify?: FirebaseMessagingTypes.RemoteMessage) => {
    const options = {
      soundName: 'default',
      playSound: true,
    };

    localNotificationService.showNotification(
      0,
      notify?.notification?.title,
      notify?.notification?.body,
      notify,
      options,
    );
  };

  const onOpenNotification = async (notify?: FirebaseMessagingTypes.RemoteMessage) => {
    console.log('notify', notify);
  };

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

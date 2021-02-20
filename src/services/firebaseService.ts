import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import { localNotificationService } from './localNotificationService';

export type onRegisterType = (token: string) => void;
export type onNotificationType = (
  notify?: FirebaseMessagingTypes.RemoteMessage,
) => void;
export type onOpenNotificationType = (
  notify?: FirebaseMessagingTypes.RemoteMessage,
) => Promise<void>;

class FCMService {

  private messageListener: null | (() => void);

  constructor() {
    this.messageListener = null;
  }

  public register(
    onRegister: onRegisterType,
    onNotification: onNotificationType,
    onOpenNotification: onOpenNotificationType,
  ) {
    this.checkPermission(onRegister);
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification,
    );
  }

  public async registerAppWithFCM() {
    if (Platform.OS === 'ios') {
      await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled(true);
    }
  }

  public checkPermission(onRegister: onRegisterType) {
    messaging()
      .hasPermission()
      .then((enabled) => {
        if (enabled) {
          // User has permission
          this.getToken(onRegister);
        } else {
          // User don't have permission
          this.requestPermission(onRegister);
        }
      })
      .catch((error) => {
        console.log('[FCMService] Permission Rejected', error);
      });
  }

  public getToken(onRegister: onRegisterType) {
    messaging()
      .getToken()
      .then((fcmToken) => {
        if (fcmToken) {
          onRegister(fcmToken);
        } else {
          console.log('[FCMService] User does not have a devices token');
        }
      })
      .catch((error) => {
        console.log('[FCMService] getToken Rejected', error);
      });
  }

  private requestPermission(onRegister: onRegisterType) {
    messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister);
      })
      .catch((error) => {
        console.log('[FCMService] Request Permission Rejected', error);
      });
  }

  public deleteToken() {
    console.log('[FCMService] Delete Token');
    messaging()
      .deleteToken()
      .catch((error) => {
        console.log('[FCMService] Delete Token Error', error);
      });
  }

  private createNotificationListeners(
    onRegister: onRegisterType,
    onNotification: onNotificationType,
    onOpenNotification: onNotificationType,
  ) {
    // When Application Running on Background
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        '[FCMService] OnNotificationOpenedApp getInitialNotification',
        remoteMessage,
      );
      if (remoteMessage) {
        const notification = remoteMessage;
        onOpenNotification(notification);
      }
    });

    //When Application open from quit state
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        console.log(
          '[FCMService] getInitialNotification getInitialNotification',
          remoteMessage,
        );
        if (remoteMessage) {
          const notification = remoteMessage;
          localNotificationService.cancelAllLocalNotifications();
          onOpenNotification(notification);
        }
      });

    //Forground state message
    this.messageListener = messaging().onMessage(async (remoteMessage) => {
      console.log('[FCMService] A new FCm message arrived', remoteMessage);
      if (remoteMessage) {
        let notification = null;
        if (Platform.OS === 'ios') {
          notification = remoteMessage.data;
        } else {
          notification = remoteMessage;
        }
        onNotification(notification);
      }
    });

    // Triggered when have new Token
    messaging().onTokenRefresh((fcmToken) => {
      console.log('[FCMService] New token refresh', fcmToken);
      onRegister(fcmToken);
    });
  }

 protected unRegister(){
    if (this.messageListener) {
      this.messageListener();
    }
  };

  public async stopAlarmRing() {
    if (Platform.OS !== 'ios') {
      // await messaging().stopAlarmRing();
      // console.log('sdfghjkldfgh', 'stopAlarmRing');
    }
  };
}

export const fcmService = new FCMService();

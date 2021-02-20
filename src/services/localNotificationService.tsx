// @ts-ignore
import PushNotification, { PushNotificationObject } from 'react-native-push-notification';
import { onOpenNotificationType } from './firebaseService';

class LocalNotificationService {

  constructor() {
    this.init()
  }

  public configure(onOpenNotification: onOpenNotificationType) {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('[LocalNotificationService] onRegister:', token);
      },
      onNotification: function (notification) {
        console.log('[LocalNotificationService] onNotification:', notification);
        if (!notification?.data) {
          return;
        }
        notification.userInteraction = true;
        onOpenNotification(notification.data);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  };

  public unregister() {
    PushNotification.unregister();
  };

  public showNotification(id: number, title?: string, message?: string, data = {}, options: Partial<PushNotificationObject> = {}) {
    PushNotification.localNotification({
      /* Android Only Properties */
      ...this.buildAndroidNotification(id, title, message, data, options),
      title: title || '',
      message: message || '',
      playSound: options?.playSound || false,
      soundName: options?.soundName || 'default',
      // userInteraction: false, // BOOLEAN : If notification was opened by the user from notification
      channelId: '32',
      // badge: true,
    });
  };

  private buildAndroidNotification(id: number, title?: string, message?: string, data?: any, options: Partial<PushNotificationObject> = {}) {
    return {
      id: id,
      autoCancel: true,
      largeIcon: options.largeIcon || 'ic_launcher',
      smallIcon: options.smallIcon || 'ic_notification',
      bigText: message || '',
      subText: title || '',
      vibrate: options.vibrate || true,
      vibration: options.vibration || 300,
      priority: options.priority || 'high',
      importance: options.importance || 'high',
      data: data,
    };
  };

  public cancelAllLocalNotifications() {
    PushNotification.cancelAllLocalNotifications();
  };

  public removeDeliveredNotificationByID(notificationId: string) {
    console.log(
      '[LocalNotificationService] removeDeliveredNotificationByID:',
      notificationId,
    );
    PushNotification.cancelLocalNotifications({ id: `${notificationId}` });
  };


  public init() {
    PushNotification.createChannel(
      {
        channelId: '32', // (required)
        channelName: 'My channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }
  // applicationBadge = () => {
  //     // PushNotification.setApplicationIconBadgeNumber(2);
  //     // const ShortcutBadger = NativeModules.ShortcutBadger;
  //     // let count = 1;
  //     // ShortcutBadger.applyCount(count);
  // }
}

export const localNotificationService = new LocalNotificationService();

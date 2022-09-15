/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React from 'react';
import RootNavigator from './src/navigator/RootNavigator';
import { Provider } from 'react-redux';
import store from './src/store/index';
import SQLiteService from './src/services/db'
import OneSignal from 'react-native-onesignal';
import { getBadgeCount, getBadgeCountSync, setBadgeCount } from 'react-native-notification-badge';
import ShortcutBadge from 'react-native-app-badge';
SQLiteService.createTable();
declare const global: { HermesInternal: null | {} };
interface Props { }
//OneSignal Init Code
OneSignal.setLogLevel(6, 0);
OneSignal.setAppId("a95a5aba-9598-4f4e-871f-437af19a3dc0");
//END OneSignal Init Code

//Prompt for push on iOS
OneSignal.promptForPushNotificationsWithUserResponse(response => {
  console.log("Prompt response:", response);
});
//Method for handling notifications received while app in foreground

OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
  console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
  let notification = notificationReceivedEvent.getNotification();
  console.log("notification: ", notification);
  const data = notification.additionalData
  console.log("additionalData: ", data);
  // Complete with null means don't show a notification.
  notificationReceivedEvent.complete(notification);
});

//Method for handling notifications opened
OneSignal.setNotificationOpenedHandler(notification => {
  console.log("OneSignal: notification opened:", notification);
});


async function  badge() {
  const badgeCount = await getBadgeCount()
  console.log(badgeCount);
  
  await setBadgeCount(badgeCount)
}
badge()
console.log("asd");
console.log(ShortcutBadge.supported);
console.log("asd");

if (ShortcutBadge.supported) {
  ShortcutBadge.setCount(2);
}
const App: React.FC<Props> = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;

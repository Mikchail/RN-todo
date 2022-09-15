/**
 * @format
 */

import { AppRegistry } from 'react-native';
import OneSignal from 'react-native-onesignal';
import PushNotification from 'react-native-push-notification';
import App from './App';
import { name as appName } from './app.json';


AppRegistry.registerComponent(appName, () => App);

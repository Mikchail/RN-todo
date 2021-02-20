import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Pressable,
    Image,
    SafeAreaView,
    ScrollView,
    Alert,
    PermissionsAndroid,
    Platform,
} from 'react-native';
import PushNotification from "react-native-push-notification";
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import Card from '../../components/ui/Card';
import { RouteProp } from '@react-navigation/native';
import { CustomParamList } from '../../navigator/TabNavigators/CustomNavigator';
import Button from '../../components/ui/Button';

interface InfoTodoScreenProps {
    navigation: StackNavigationProp<CustomParamList, 'Google'>;
    route: RouteProp<CustomParamList, 'Google'>;
}

const ReminderScreen: React.FC<InfoTodoScreenProps> = (props) => {
    const hasAndroidPermission = async () => {
        const permission = PermissionsAndroid.PERMISSIONS.RECEIVE_WAP_PUSH;

        const hasPermission = await PermissionsAndroid.check(permission);
        if (hasPermission) {
            return true;
        }

        const status = await PermissionsAndroid.request(permission);
        return status === 'granted';
    };

    const triggerLocalNotification =  () => {
    //   const push =  PushNotification.localNotification({
    //         title: "My Notification Title", // (optional)
    //         message: "My Notification Message", // (required)
    //       });
    //       console.log(push);
          
        PushNotification.localNotificationSchedule({
            message: "My Notification Message", // (required)
            date: new Date(Date.now() + (10 * 1000)), // in 60 secs
            actions: ["ReplyInput"],
        });
    }

    return (
        <View style={styles.center}>
            <Text>ReminderScreen</Text>
            <Button label={'triger'} onPress={triggerLocalNotification} />
        </View>
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ReminderScreen;
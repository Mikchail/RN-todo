import React, { ReactNode, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Platform,
} from 'react-native';
import PushNotification from "react-native-push-notification";
import { StackNavigationProp } from '@react-navigation/stack';

import { RouteProp } from '@react-navigation/native';
import { CustomParamList } from '../../navigator/TabNavigators/CustomNavigator';
import Button from '../../components/ui/Button';
import DataPicker from '../../components/DataTimePicker';

interface InfoTodoScreenProps {
    navigation: StackNavigationProp<CustomParamList, 'Google'>;
    route: RouteProp<CustomParamList, 'Google'>;
}

const ReminderScreen: React.FC<InfoTodoScreenProps> = (props) => {
    
    const triggerLocalNotification = () => {
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
            <DataPicker/>
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
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
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import Card from '../../components/ui/Card';
import { RouteProp } from '@react-navigation/native';
import { CustomParamList } from '../../navigator/TabNavigators/CustomNavigator';

interface InfoTodoScreenProps {
    navigation: StackNavigationProp<CustomParamList, 'Google'>;
    route: RouteProp<CustomParamList, 'Google'>;
}

const ReminderScreen: React.FC<InfoTodoScreenProps> = (props) => {

    return (
        <View><Text>ReminderScreen</Text></View>
    );
};

const styles = StyleSheet.create({

});

export default ReminderScreen;
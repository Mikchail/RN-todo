import React from 'react';
import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import TodoNavigator from './TodoNavigator';
import CustomNavigator from './CustomNavigator';
import ReminderNavigator from './ReminderNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/core';
import { Image, ImageStyle, StyleSheet } from 'react-native';


type TabsParamList = {
    TodoTabs: undefined;
    CustomTabs: undefined;
    ReminderTabs: undefined;
};

type TabsScreenProps<T extends keyof TabsParamList> = {
    navigation?: StackNavigationProp<TabsParamList>;
    route: RouteProp<TabsParamList, T>;
}

const Tabs = createBottomTabNavigator();

const screenOptions = ({ route }: any): BottomTabNavigationOptions => ({
    tabBarIcon: ({ focused }: { focused: boolean }) => {
        let iconName = require('../../asserts/todo.png');
        console.log(route.name);

        if (route.name === 'TodoTabs') {
            iconName = require('../../asserts/todo.png')
        } else if (route.name === 'CustomTabs') {
            iconName = require('../../asserts/custom.png')
        } else if (route.name === 'ReminderTabs') {
            iconName = require('../../asserts/reminder.png')
        }
        const stylesArray = [styles.icon as ImageStyle]
        if (focused) {
            stylesArray.push(styles.focused)
        }
        return <Image source={iconName} style={stylesArray} />;
    },
})

const RootTabsNavigator = () => {
    return (
        <Tabs.Navigator screenOptions={screenOptions}>
            <Tabs.Screen options={{ title: 'Todo' }} name="TodoTabs" component={TodoNavigator} />
            <Tabs.Screen options={{ title: 'Custom' }} name="CustomTabs" component={CustomNavigator} />
            <Tabs.Screen options={{ title: 'Reminder' }} name="ReminderTabs" component={ReminderNavigator} />
        </Tabs.Navigator>

    )
}

const styles = StyleSheet.create({
    icon: {
        width: 25,
        height: 25,
    },
    focused: {
        tintColor: 'blue',
    }
})

export default RootTabsNavigator;
import React from 'react';
import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import TodoNavigator from './TodoNavigator';
import { RouteProp } from '@react-navigation/core';
import { Image, ImageStyle, StyleSheet, Text, View } from 'react-native';


type TabsParamList = {
    TodoTabs: undefined;
    CustomTabs: undefined;
    ReminderTabs: undefined;
};

type TabsScreenProps<T extends keyof TabsParamList> = {
    navigation?: any;
    route: RouteProp<TabsParamList, T>;
}

const Tabs = createBottomTabNavigator<TabsParamList>();



const RootTabsNavigator = () => {
    return (
        <Tabs.Navigator tabBarOptions={{ labelStyle: { paddingBottom: 10, fontSize: 20 } }}>
            <Tabs.Screen options={{ title: 'Todo list' }} name="TodoTabs" component={TodoNavigator} />
        </Tabs.Navigator>

    )
}

const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20,
    },
    focused: {
        tintColor: 'blue',
        width: 25,
        height: 25,
    }
})

export default RootTabsNavigator;
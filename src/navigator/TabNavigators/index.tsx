import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TodoNavigator from './TodoNavigator';
import CustomNavigator from './CustomNavigator';
import ReminderNavigator from './ReminderNavigator';

const Tabs = createBottomTabNavigator();

const RootTabsNavigator = () => {
    return (
        <Tabs.Navigator>
            <Tabs.Screen name="TodoTabs" component={TodoNavigator} />
            <Tabs.Screen name="CustomTabs" component={CustomNavigator} />
            <Tabs.Screen name="ReminderTabs" component={ReminderNavigator} />
        </Tabs.Navigator>

    )
}

export default RootTabsNavigator;
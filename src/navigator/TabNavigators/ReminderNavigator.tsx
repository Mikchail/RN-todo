import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ReminderScreen from '../../screens/ReminderScreens/ReminderScreen';

interface CustomkNavigatorProps { }

export type CustomParamList = {
    Reminder: undefined;
}

const Stack = createStackNavigator<CustomParamList>();

const ReminderNavigator: React.FC<CustomkNavigatorProps> = ({ }) => {
    return <Stack.Navigator>
        <Stack.Screen name="Reminder" component={ReminderScreen} />
    </Stack.Navigator>;
};

export default ReminderNavigator;

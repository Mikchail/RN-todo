import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GoogleScreen from '../../screens/CustomScreens/GoogleScreen';
import NewsScreen from '../../screens/CustomScreens/NewsScreen';

interface CustomkNavigatorProps { }

export type CustomParamList = {
    Google: undefined;
    News: undefined;
}

const CustomStack = createStackNavigator<CustomParamList>();

const CustomNavigator: React.FC<CustomkNavigatorProps> = ({ }) => {
    return <CustomStack.Navigator>
        <CustomStack.Screen name="Google" component={GoogleScreen} />
        <CustomStack.Screen name="News" component={NewsScreen} />
    </CustomStack.Navigator>;
};

export default CustomNavigator;

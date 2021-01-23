import React from 'react'
import { View, Text } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { TodoParamList } from '../navigator/TodoNavigator';

interface EditTodoProps {
    route: RouteProp<TodoParamList,'Edit'>
}

const EditTodo: React.FC<EditTodoProps> = (props) => {
    const item = props.route.params.item
    return (
        <View>
            <Text>{item.title}</Text>
        </View>
    );
}
export const screenOption = (navProps: EditTodoProps) => {
    const headerTitle = navProps.route.params.item.title
    return {
        headerTitle: headerTitle
    }
}
export default EditTodo
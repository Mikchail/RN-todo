import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {RouteProp} from '@react-navigation/native';
import {TodoParamList} from '../navigator/TodoNavigator';
import FormEdit from './../components/FormEdit';
import {StackNavigationProp} from '@react-navigation/stack';
import {ScrollView} from 'react-native-gesture-handler';

interface EditTodoProps {
  route: RouteProp<TodoParamList, 'Edit'>;
  navigation: StackNavigationProp<TodoParamList, 'Edit'>;
}

const EditTodo: React.FC<EditTodoProps> = (props) => {
  const defaultItem = {
    id: '',
    title: '',
    isComplite: false,
    description: '2',
    photo: undefined,
  };
  const {item = defaultItem} = props.route.params;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}
      keyboardVerticalOffset={100}>
      <ScrollView style={styles.container}>
        <FormEdit navigation={props.navigation} item={item} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export const screenOption = (navProps: EditTodoProps) => {
  const item = navProps.route.params.item;
  return {
    headerTitle: item?.title || 'Create',
  };
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 40,
    width: '100%',
  },
  button: {
    marginRight: 20,
  },
});

export default EditTodo;

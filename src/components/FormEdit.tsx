import React, {useEffect} from 'react';
import {useFormik} from 'formik';
import Input from './ui/Input';
import {ITodoItem} from '../types/index.d';
import {Pressable, StyleSheet, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TodoParamList} from '../navigator/TodoNavigator';
import { useDispatch } from 'react-redux';
import { updateTodoItem, createTodoItem } from './../store/reducers';

interface FormEditProps {
  item: ITodoItem;
  navigation: StackNavigationProp<TodoParamList, 'Edit'>;
}

const FormEdit: React.FC<FormEditProps> = (props) => {
  const {item, navigation} = props;
  const rippleAndroid = {color: '#000', borderless: false, radius: 20};
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: item.title,
    },
    onSubmit: (values) => {
      const newItem = {
        id: item.id || Math.random().toString(16).slice(2),
        title: values.title,
        isComplite: item.isComplite || false,
        description: 'item.isComplite || false',
        photo: false,
      }

      if(!item.id){
        dispatch(createTodoItem(newItem))
      } else {
        dispatch(updateTodoItem(newItem))
      }

      navigation.goBack();
    },
  });

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Pressable
          style={styles.button}
          {...props}
          android_ripple={rippleAndroid}
          onPress={() => {
            formik.handleSubmit();
          }}>
          <Text style={styles.buttonText}>Done</Text>
        </Pressable>
      ),
    });
  }, [item]);

  return (
    <Input
      onChangeText={formik.handleChange('title')}
      value={formik.values.title}
      label={'Title todo'}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  button: {
    marginRight: 5,
    padding: 15,
    borderRadius: 7,
  },
  buttonText: {},
});

export default FormEdit;

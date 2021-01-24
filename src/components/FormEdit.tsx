import React, {useEffect} from 'react';
import {useFormik} from 'formik';
import Input from './ui/Input';
import {ITodoItem} from '../types/index.d';
import {Pressable, StyleSheet, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TodoParamList} from '../navigator/TodoNavigator';

interface FormEditProps {
  item: ITodoItem;
  submit: (item: ITodoItem) => void;
  navigation: StackNavigationProp<TodoParamList, 'Edit'>;
}

const FormEdit: React.FC<FormEditProps> = (props) => {
  const {item, submit, navigation} = props;
  const {title = ''} = item;
  const rippleAndroid = {color: '#000', borderless: false, radius: 20};
  const formik = useFormik({
    initialValues: {
      title: title,
    },
    onSubmit: (values) => {
      submit({
        id: item.id,
        title: values.title,
        isComplite: item.isComplite,
      });
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
  }, [submit]);

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

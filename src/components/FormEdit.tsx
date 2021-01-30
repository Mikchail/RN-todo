import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import Input from './ui/Input';
import {ITodoItem} from '../types/index.d';
import { Pressable, StyleSheet, Text, Image } from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TodoParamList} from '../navigator/TodoNavigator';
import {useDispatch} from 'react-redux';
import {updateTodoItem, createTodoItem} from './../store/reducers';
import Camera from './Camera'
import { ImagePickerResponse } from 'react-native-image-picker';

interface FormEditProps {
  item: ITodoItem;
  navigation: StackNavigationProp<TodoParamList, 'Edit'>;
}

const FormEdit: React.FC<FormEditProps> = (props) => {
  const [photo,setPhoto] = useState<ImagePickerResponse['uri']>(undefined)
  const {item, navigation} = props;
  const rippleAndroid = {color: '#000', borderless: false, radius: 20};
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: item.title,
      description: item.description,
      photo: item.photo,
    },
    onSubmit: (values) => {
      const newItem = {
        id: item.id || Math.random().toString(16).slice(2),
        title: values.title,
        isComplite: item.isComplite || false,
        description: values.description,
        photo: photo || undefined,
      };

      if (!item.id) {
        dispatch(createTodoItem(newItem));
      } else {
        dispatch(updateTodoItem(newItem));
      }
      navigation.goBack();
      // setPhoto(undefined)
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
    <>
      <Input
        onChangeText={formik.handleChange('title')}
        value={formik.values.title}
        label={'Title todo'}
      />
      <Input
        multiline
        onChangeText={formik.handleChange('description')}
        value={formik.values.description}
        label={'Description todo'}
        inputStyle={styles.description}
      />
      {(item.photo || photo) &&  <Image source={{uri: item.photo || photo}} style={styles.image}/>}
      <Camera setPhoto={setPhoto} style={styles.buttonPhoto}/>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  buttonPhoto: {
    marginRight: 5,
    borderRadius: 7,
    marginBottom: 60,
  },
  button: {
    marginRight: 5,
    padding: 15,
  },
  image: {
    width: '100%',
    height: 300,
    marginVertical: 20,
  },
  description: {
    minHeight: 200,
  },
  buttonText: {},
});

export default FormEdit;

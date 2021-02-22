import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import Input from './ui/Input';
import {ITodoItem} from '../types/index.d';
import {Pressable, StyleSheet, Text, Image} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TodoParamList} from '../navigator/TabNavigators/TodoNavigator';
import {useDispatch} from 'react-redux';
import {createTodoOnServer, updateTodoOnServer} from '../store/todos/actions';
import Camera from './Camera';
import {ImagePickerResponse} from 'react-native-image-picker';

interface FormEditProps {
  item: ITodoItem;
  navigation: StackNavigationProp<TodoParamList, 'Edit'>;
}

const FormEdit: React.FC<FormEditProps> = (props) => {
  const [photo, setPhoto] = useState<ImagePickerResponse['uri']>(undefined);
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
      const newItem: ITodoItem = {
        id: item.id || '',
        title: values.title,
        isComplite: false,
        description: values.description,
        photo: photo || item.photo,
        ts: item.ts || Date.now(),
      };

      if (!item.id) {
        dispatch(createTodoOnServer(newItem));
      } else {
        dispatch(updateTodoOnServer(newItem));
      }
      navigation.goBack();
    },
  });

  useEffect(() => {
    if (item) {
      setPhoto(item.photo);
    }
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
    return () => {
      setPhoto(undefined);
    };
  }, [item]);

  return (
    <>
      <Input
        onChangeText={formik.handleChange('title')}
        value={formik.values.title}
        label={'Title'}
      />
      <Input
        multiline
        onChangeText={formik.handleChange('description')}
        value={formik.values.description}
        label={'Description'}
        inputStyle={styles.description}
      />
      {(photo || item.photo) && (
        <Image source={{uri: photo || item.photo }} style={styles.image} />
      )}
      <Camera setPhoto={setPhoto} style={styles.buttonPhoto} />
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
  },
  buttonText: {},
});

export default FormEdit;

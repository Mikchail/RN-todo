import React, {useState} from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import Card from './ui/Card';
import Input from './ui/Input';
import {Formik} from 'formik';
import Button from './ui/Button';
import { singUpToServer, loginToServer } from './../store/auth/reducer';
import { useDispatch } from 'react-redux';

interface IFormProps {
}

function validateEmail(value: string) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
}

function validatePassword(value: string) {
  let error;
  if (value.length < 2) {
    error = 'Nice try! more length';
  }
  if (!value) {
    error = 'Required';
  }
  return error;
}


const Form: React.FC<IFormProps> = (props) => {
  const dispatch = useDispatch()
  const [isLogin, setLogin] = useState<boolean>(true)
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View><Text>{`${isLogin ? 'Войти' : 'Регистрация'}`}</Text></View>
        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={(values) =>{
           
            if (validateEmail(values.email) !== undefined || validatePassword(values.password)!== undefined){
              Alert.alert(
                "You need to type the real email",
                "My Alert Msg",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
              );
                return
            }
            if(isLogin){
              dispatch(loginToServer(values.email,values.password));
            } else {
              dispatch(singUpToServer(values.email,values.password));
            }
          }}>
          {({handleChange, handleSubmit, values}) => (
            <>
              <Input
                onChangeText={handleChange('email')}
                value={values.email}
                label={'E-mail'}
                validate={validateEmail}
              />
              <Input
                onChangeText={handleChange('password')}
                value={values.password}
                label={'Password'}
                validate={validatePassword}
              />
              <View style={styles.center}>
                <Button onPress={handleSubmit} label={`Submit`} />
                <Button style={styles.button} onPress={() => setLogin((prev)=>!prev)} label={`${isLogin ? 'Зарегестрироваться' : 'Залогиниться'}`} />
              </View>
            </>
          )}
        </Formik>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 20,
  },
  card: {
    padding: 15,
  },
  center: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  button: {
    marginTop: 10,
  }
});

export default Form;

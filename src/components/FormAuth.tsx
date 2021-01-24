import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import Card from './ui/Card';
import Input from './ui/Input';
import {Formik} from 'formik';
import Button from './ui/Button';

interface IFormProps {
  submit: React.Dispatch<React.SetStateAction<boolean>>;
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
  const {submit} = props;

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={(values) =>{
            submit(true)
           
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
            console.log(values)
          }}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
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
                <Button onPress={handleSubmit} label={'Pressed'} />
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
});

export default Form;

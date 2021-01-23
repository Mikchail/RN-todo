import React, {useState} from 'react';
import {View, TextInput, Pressable, Text, StyleSheet} from 'react-native';
import Card from './ui/Card';

 interface IFormProps {
   submit: React.Dispatch<React.SetStateAction<boolean>>
 }

const Form: React.FC<IFormProps> = (props) => {
  const { submit } = props;
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View>
          <Text>E-mail</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(val) => setEmail(val)}
          />
        </View>
        <View>
          <Text>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(val) => setPassword(val)}
          />
        </View>
        <View style={styles.center}>
          <View style={styles.buttonWrapper}>
            <Pressable
              style={styles.button}
              onPress={() => submit(true)}
              android_ripple={{color: '#000000'}}>
              <Text>Pressed</Text>
            </Pressable>
          </View>
        </View>
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
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#817f7f',
    paddingVertical: 5,
    marginBottom: 5,
  },
  card: {
    padding: 15,
  },
  buttonWrapper: {
    width: 200,
    borderWidth: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  button: {
    width: 200,
    borderRadius: 10,
    textAlign: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  center: {
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default Form;

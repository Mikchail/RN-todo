import React, { useState } from 'react';
import {TextInput, Text, View, StyleSheet, ViewStyle, NativeSyntheticEvent, TextInputChangeEventData, TextInputProps} from 'react-native';

interface InputProps extends TextInputProps {
  value: string;
  onChangeText: (event: string | NativeSyntheticEvent<TextInputChangeEventData>) => void;
  label: string;
  inputStyle?: ViewStyle;
  validate?: (value: string) => string | undefined;
}

const Input: React.FC<InputProps> = (props) => {
  const [ isBlur, setIsBlur ] = useState(false);
  const {inputStyle = {},validate = () => {return undefined}} = props;
 
  
  return (
    <View>
      <Text>{props.label}</Text>
      <TextInput
        {...props}
        style={{...styles.input, ...inputStyle}}
        value={props.value}
        onBlur={() => setIsBlur(true)}
        onChangeText={props.onChangeText}
      />
      {(isBlur && validate(props.value) !== undefined) && <Text style={styles.errorMessage}>{validate(props.value)}</Text>}
    </View>
  );
};

// Input.defaultProps ={
//   validate: () => {return undefined}
// }

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#817f7f',
    paddingVertical: 5,
    marginBottom: 5,
  },
  errorMessage: {
    color: 'tomato',
    fontSize: 12,
    paddingTop: 0,
    position: 'relative',
    top: -5,
  }
});

export default Input;

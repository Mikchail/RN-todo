import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  label: string;
}

const Button: React.FC<ButtonProps> = (props) => {
  const {onPress,label} = props
  return (
    <View style={styles.buttonWrapper}>
      <Pressable
        style={styles.button}
        onPress={onPress}
        android_ripple={{color: '#817f7f'}}>
        <Text>{label}</Text>
      </Pressable>
    </View>
  );
};


const styles = StyleSheet.create({
  buttonWrapper: {
    width: 200,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#817f7f',
    overflow: 'hidden',
  },
  button: {
    width: 200,
    borderRadius: 10,
    textAlign: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
});

export default Button;

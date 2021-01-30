import React from 'react';
import { Pressable, View, Text, StyleSheet, ViewStyle } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  label: string;
  style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = (props) => {
  const {onPress,label} = props
  return (
    <View style={{...styles.buttonWrapper,...props.style}}>
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

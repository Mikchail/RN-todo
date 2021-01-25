import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

interface ButtonAddProps {
  onPress: () => void;
}

const ButtonAdd: React.FC<ButtonAddProps> = (props) => {
  return (
    <View style={styles.buttonWrapper}>
      <Pressable
        style={styles.button}
        onPress={props.onPress}
        android_ripple={{color: '#000'}}>
        <Text style={styles.plus}>+</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    position: 'absolute',
    bottom: 20,
    right: -10,
    width: 50,
    height: 50,
    zIndex: 21,
    borderRadius: 60,
    backgroundColor: '#3cbaec',
    overflow: 'hidden',
  },
  button:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: {
    fontSize: 30,
    lineHeight: 35,
    fontWeight: 'bold',
  },
});

export default ButtonAdd;

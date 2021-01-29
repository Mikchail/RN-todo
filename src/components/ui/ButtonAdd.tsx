import React, { useRef } from 'react';
import { Appearance, Text, StyleSheet, Pressable, Animated } from 'react-native';

interface ButtonAddProps {
  onPress: () => void;
}

const ButtonAdd: React.FC<ButtonAddProps> = (props) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const scaleIn = () => {
    console.log(Appearance.getColorScheme());
    
    Animated.timing(scaleAnim, {
      toValue: 0.7,
      duration: 500
    } as  Animated.TimingAnimationConfig).start();
  };

  const scaleOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 500
    } as  Animated.TimingAnimationConfig).start();
  };

  return (
    <Animated.View 
      style={[
        styles.buttonWrapper,
        {
          transform:  [{ scale:scaleAnim }], // Bind opacity to animated value
        }
      ]}
    >
      <Pressable
        onPressIn={scaleIn}
        onPressOut={scaleOut}
        style={styles.button}
        onPress={props.onPress}>
        <Text style={styles.plus}>+</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    position: 'absolute',
    bottom: 40,
    right: -10,
    zIndex: 21,
    width: 50,
    height: 50,
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

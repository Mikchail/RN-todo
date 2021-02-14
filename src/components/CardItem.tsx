import React, { useEffect, useRef } from 'react';
import Card from './ui/Card';
import CheckBox from '@react-native-community/checkbox';
import { StyleSheet, Text, Pressable, Image, Alert, AppState, } from 'react-native';
import { ITodoItem } from '../types/index.d';
import { StackNavigationProp, useGestureHandlerRef } from '@react-navigation/stack';
import { TodoParamList } from '../navigator/TodoNavigator';
import { useDispatch } from 'react-redux';
import { Swipeable } from 'react-native-gesture-handler';
import Theme, { useTheme } from '../context/context';
import { deleteTodoOnServer, updateTodoOnServer } from './../store/todos/actions';

interface ItemProps {
  item: ITodoItem;
  navigation: StackNavigationProp<TodoParamList>;
}

const CardItem: React.FC<ItemProps> = (props: ItemProps) => {
  const { item, navigation } = props;
  let swipeRef = useRef<Swipeable | null>(null);
  const dispatch = useDispatch();
  const theme = useTheme();
  const rippleAndroid = { color: '#000' };
  const styleTextDoneOrNot = item.isComplite
    ? StyleSheet.flatten([styles.text, styles.textDone])
    : styles.text;


  useEffect(() => {
  
  }, [])

  const renderCard = () => (
    <Card style={StyleSheet.flatten([styles.item, theme.styles?.background])}>
      <CheckBox
        disabled={false}
        value={item.isComplite}
        onValueChange={() => {
          dispatch(updateTodoOnServer({ ...item, isComplite: !item.isComplite }));
        }}
      />
      <Text
        style={StyleSheet.flatten([styleTextDoneOrNot, theme.styles?.text])}>
        {item.title}
      </Text>
    </Card>
  )

  const renderRightButton = () => (
    <>
      <Pressable style={[styles.rightButton, styles.editImage]}
        android_ripple={rippleAndroid}
        onPress={() => {
          Alert.alert('Are you sure?', '', [
            {
              text: 'no',
              style: 'cancel',
            },
            {
              text: 'yes',
              onPress: () => {
                dispatch(deleteTodoOnServer(item.id));
                navigation.goBack();
              },
              style: 'default',
            },
          ]);
        }}
      >
        <Image
          style={[styles.rightButtonImage]}
          source={require('../asserts/trash.png')}
        />
      </Pressable>
      <Pressable style={styles.rightButton}
        android_ripple={rippleAndroid}
        onPress={() => {
          close();
          navigation.navigate('Edit', { item });
        }}
      >
        <Image
          style={styles.rightButtonImage}
          source={require('../asserts/edit.png')}
        />
      </Pressable>
    </>
  )

  const close = (): void => {
    swipeRef?.current?.close();
  };

  return (
    <Swipeable
      ref={swipeRef}
      renderRightActions={renderRightButton}
      overshootRight={false}
    >
      <Pressable
        onPress={() => {
          navigation.navigate('Info', { id: item.id });
        }}>
        {renderCard()}
      </Pressable>
    </Swipeable>

  );
};

const styles = StyleSheet.create({
  rightButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    width: 40,
    height: 53,
    borderRadius: 10,
    backgroundColor: 'tomato',
  },
  editImage: {
    backgroundColor: 'green',
  },
  rightButtonImage: {
    tintColor: '#ffffff',
    width: 30,
    height: 30,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 0,
    padding: 10,
  },
  text: {
    paddingVertical: 4,
    paddingLeft: 4,
    maxWidth: 240,
    width: '90%',
    lineHeight: 20,
  },
  textDone: {
    textDecorationLine: 'line-through',
  },
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  button: {
    marginRight: 20,
  },
});

export default CardItem;

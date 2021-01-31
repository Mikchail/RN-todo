import React from 'react';
import Card from './ui/Card';
import CheckBox from '@react-native-community/checkbox';
import {StyleSheet, Text, Pressable} from 'react-native';
import {ITodoItem} from '../types/index.d';
import {StackNavigationProp} from '@react-navigation/stack';
import {TodoParamList} from '../navigator/TodoNavigator';
import {useDispatch} from 'react-redux';
import {donetTodoItem} from '../store/todos/reducer';
import Theme, {useTheme} from '../context/context';

interface ItemProps {
  item: ITodoItem;
  navigation: StackNavigationProp<TodoParamList>;
}

const CardItem: React.FC<ItemProps> = (props: ItemProps) => {
  const {item, navigation} = props;
  const dispatch = useDispatch();
  const theme = useTheme();
  const rippleAndroid = {color: '#000', borderless: true, radius: 20};
  const styleTextDoneOrNot = item.isComplite
    ? StyleSheet.flatten([styles.text, styles.textDone])
    : styles.text;

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('Info', {item});
      }}>
      <Card style={StyleSheet.flatten([styles.item,theme.styles?.background])}>
        <CheckBox
          disabled={false}
          value={item.isComplite}
          onValueChange={() => {
            dispatch(donetTodoItem(item));
          }}
        />
        <Text style={StyleSheet.flatten([styleTextDoneOrNot,theme.styles?.text])}>{item.title}</Text>
        <Pressable
          android_ripple={rippleAndroid}
          style={StyleSheet.flatten([styles.button,theme.styles?.text])}
          onPress={() => {
            navigation.navigate('Edit', {item});
          }}>
          <Text style={theme.styles?.text}>Edit</Text>
        </Pressable>
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

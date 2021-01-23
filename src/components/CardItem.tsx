import React, {useState} from 'react';
import Card from './ui/Card';
import CheckBox from '@react-native-community/checkbox';
import { StyleSheet, Text, Pressable } from 'react-native';
import { ITodoItem } from '../types/index.d';
import { StackNavigationProp } from '@react-navigation/stack';
import { TodoParamList } from '../navigator/TodoNavigator';

interface ItemProps {
  item: ITodoItem;
  navigation: StackNavigationProp<TodoParamList>
}

const CardItem: React.FC<ItemProps> = (props: ItemProps) => {
  const {item,navigation} = props;
  const [isComplite, setIsComplite] = useState<boolean>(
    item.isComplite || false,
  );
  return (
    <Card style={styles.item}>
      <CheckBox
        disabled={false}
        value={isComplite}
        onValueChange={() => setIsComplite(!isComplite)}
      />
      <Text style={styles.text}>{item.title}</Text>
      <Pressable android_ripple={{color: '#000',borderless: true,radius: 20}} style={styles.button} onPress={()=>{
        navigation.navigate('Edit', {item})
      }}><Text>Edit</Text></Pressable>
    </Card>
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
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  button:{
    marginRight: 20,
  }
});

export default CardItem;

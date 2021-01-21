import React, {useState} from 'react';
import {View, FlatList, Text, ListRenderItem, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Card from '../components/Card';

interface TodoScreenProps {}

const data = [
  {
    id: '1',
    title: 'Выучить react native',
    isComplite: false,
  },
  {
    id: '2',
    title: 'Выучить латынь',
    isComplite: false,
  },
  {
    id: '3',
    title: 'Выучить typescript',
    isComplite: false,
  },
];

interface ITodoItem {
  id: string;
  title: string;
  isComplite: boolean;
}

interface ItemProps {
  item: ITodoItem;
}

const Item: React.FC<ItemProps> = (props: ItemProps) => {
  const { item } = props;
  const [isComplite, setIsComplite] = useState<boolean>(item.isComplite);
  return (
      <Card style={styles.item}>
          <CheckBox
            disabled={false}
            value={isComplite}
            onValueChange={() => setIsComplite(!isComplite)}
          />
          <Text>{item.title}</Text>
      </Card>
  );
};

const TodoScreen: React.FC<TodoScreenProps> = ({}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(itemData) => itemData.id}
        renderItem={(itemData) => <Item item={itemData.item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 0,
  },
  container: {
    flex: 1,
    marginHorizontal: 20,
  }
});

export default TodoScreen;

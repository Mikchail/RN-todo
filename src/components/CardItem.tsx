import React, { useState } from 'react';
import Card from './ui/Card';
import CheckBox from '@react-native-community/checkbox';
import { StyleSheet, Text } from 'react-native';

interface ITodoItem {
  id: string;
  title: string;
  isComplite: boolean;
}

interface ItemProps {
  item: ITodoItem;
}

const CardItem: React.FC<ItemProps> = (props: ItemProps) => {
  const { item } = props;
  const [isComplite, setIsComplite] = useState<boolean>(item.isComplite || false);
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

export default CardItem;

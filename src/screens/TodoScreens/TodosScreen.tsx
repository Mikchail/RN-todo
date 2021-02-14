import React, { useEffect } from 'react';
import Theme, { useTheme } from '../../context/context';
import {
  View,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  ActivityIndicator,
} from 'react-native';
import CardItem from '../../components/CardItem';
import { StackNavigationProp } from '@react-navigation/stack';
import { TodoParamList } from '../../navigator/TabNavigators/TodoNavigator';
import { useDispatch } from 'react-redux';
import ButtonAdd from '../../components/ui/ButtonAdd';
import { fetchTodoItem } from '../../store/todos/actions';
import { RootState } from '../../store';
import { useTypedSelector } from '../../hooks/useTypedSelector';

interface TodoScreenProps {
  navigation: StackNavigationProp<TodoParamList>;
}

const TodoScreen: React.FC<TodoScreenProps> = (props) => {
  const { loading, todos: dataTodo } = useTypedSelector(
    (state: RootState) => state.todo,
  );

  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodoItem());
  }, []);

  const onOpenCreateScreen = () => {
    props.navigation.navigate('Edit', {});
  };

  const changeTheme = (value: boolean) => {
    theme.setMode(value ? 'dark' : 'light');
  };

  return (
    <View style={styles.container}>
      <ButtonAdd onPress={onOpenCreateScreen} />
      <View style={styles.switchWrapper}>
        <Text>Theme: {theme.mode}</Text>
        <Switch
          value={theme.mode === 'dark'}
          onValueChange={changeTheme}
          style={styles.switch}
        />
      </View>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#f34545" />
        </View>
      ) : (
        <FlatList
          data={dataTodo}
          style={{ paddingHorizontal: 20 }}
          keyExtractor={(itemData) => itemData.id}
          renderItem={(itemData) => (
            <CardItem item={itemData.item} navigation={props.navigation} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  switchWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 0,
  },
  switch: {
    marginBottom: 20,
    marginLeft: 15,
  },
  container: {
    position: 'relative',
    flex: 1,
    marginVertical: 30,
  },
});

export default TodoScreen;

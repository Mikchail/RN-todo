import React from 'react';
import Theme, {useTheme} from '../context/context';
import { View, FlatList, StyleSheet } from 'react-native';
import CardItem from '../components/CardItem';
import { StackNavigationProp } from '@react-navigation/stack';
import {TodoParamList} from '../navigator/TodoNavigator';
import { RootStateOrAny, useSelector } from 'react-redux';
import ButtonAdd from '../components/ui/ButtonAdd';
import { Switch } from 'react-native-gesture-handler';

interface TodoScreenProps {
  navigation:  StackNavigationProp<TodoParamList>
}




const TodoScreen: React.FC<TodoScreenProps> = (props) => {
  const dataTodo = useSelector((state: RootStateOrAny) => state.todo)
  const theme = useTheme()
  const onOpenCreateScreen = () => {
    props.navigation.navigate("Edit",{})
  }
  
  const changeTheme = (value: boolean) => {
    console.log(theme)
    theme.setMode(value ? "dark" : "light")
  }

  return (
    <View style={styles.container}>
      <ButtonAdd onPress={onOpenCreateScreen}/>
      {/* <Switch
        value={theme.mode === 'dark'}
        onValueChange={changeTheme}
      /> */}
      <FlatList
        data={dataTodo}
        keyExtractor={(itemData) => itemData.id}
        renderItem={(itemData) => <CardItem item={itemData.item} navigation={props.navigation} />}
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
    // backgroundColor: Theme
  },
  container: {
    position: 'relative',
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 30,
  }
});

export default TodoScreen;

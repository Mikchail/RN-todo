import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TodoParamList} from '../../navigator/TabNavigators/TodoNavigator';
import {useDispatch} from 'react-redux';
import Card from '../../components/ui/Card';
import {RouteProp} from '@react-navigation/native';
import {RootState} from '../../store/index';
import {deleteTodoOnServer} from '../../store/todos/actions';
import {useTypedSelector} from '../../hooks/useTypedSelector';

interface InfoTodoScreenProps {
  navigation: StackNavigationProp<TodoParamList, 'Info'>;
  route: RouteProp<TodoParamList, 'Info'>;
}

const InfoTodoScreen: React.FC<InfoTodoScreenProps> = (props) => {
  const {navigation} = props;
  const {id} = props.route.params;
  const item = useTypedSelector((state: RootState) =>
    state.todo.todos.find((item) => item.id === id),
  );
  if (!item) {
    navigation.goBack();
    return null;
  }
  const dispatch = useDispatch();
  const rippleAndroid = {color: '#000', borderless: true, radius: 20};
  const styleTextDoneOrNot = item.isComplite
    ? StyleSheet.flatten([styles.text, styles.textDone])
    : styles.text;

  return (
    <SafeAreaView>
      <ScrollView>
        <Card style={styles.itemWrapper}>
          <View style={styles.item}>
            <Text style={styleTextDoneOrNot}>{item.title}</Text>
          </View>
          <View>
            {item.photo && (
              <Image
                style={styles.image}
                resizeMode={'contain'}
                source={{
                  uri: item.photo,
                }}
              />
            )}
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  description: {
    paddingHorizontal: 20,
  },
  itemWrapper: {
    height: '100%',
    margin: 20,
    marginBottom: 50,
  },
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

export default InfoTodoScreen;

import React from 'react';
import {View, StyleSheet, Text, Pressable, Image} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TodoParamList} from '../navigator/TodoNavigator';
import {useDispatch} from 'react-redux';
import Card from './../components/ui/Card';
import {donetTodoItem} from '../store/reducers';
import CheckBox from '@react-native-community/checkbox';
import {RouteProp} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

interface InfoTodoScreenProps {
  navigation: StackNavigationProp<TodoParamList, 'Info'>;
  route: RouteProp<TodoParamList, 'Info'>;
}

const InfoTodoScreen: React.FC<InfoTodoScreenProps> = (props) => {
  console.log(props);
  const {navigation} = props;
  const {item} = props.route.params;
  const dispatch = useDispatch();
  const rippleAndroid = {color: '#000', borderless: true, radius: 20};
  const styleTextDoneOrNot = item.isComplite
    ? StyleSheet.flatten([styles.text, styles.textDone])
    : styles.text;

  return (
    <ScrollView>
      <Card style={styles.itemWrapper}>
        <View style={styles.item}>
          <CheckBox
            disabled={false}
            value={item.isComplite}
            onValueChange={() => {
              dispatch(donetTodoItem(item));
            }}
          />
          <Text style={styleTextDoneOrNot}>{item.title}</Text>
          <Pressable
            android_ripple={rippleAndroid}
            style={styles.button}
            onPress={() => {
              navigation.navigate('Edit', {item});
            }}>
            <Text>Edit</Text>
          </Pressable>
        </View>
        <View>
          <Image
            style={styles.image}
            resizeMode={'contain'}
            source={{
              uri:
                'data:image/jpeg;base64,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',
            }}
          />
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  description: {
    paddingHorizontal: 20,
  },
  itemWrapper: {
    height: '100%',
    margin: 20,
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

import React from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { CustomParamList } from '../../navigator/TabNavigators/CustomNavigator';
import MapView from 'react-native-maps';

interface InfoTodoScreenProps {
    navigation: StackNavigationProp<CustomParamList, 'Google'>;
    route: RouteProp<CustomParamList, 'Google'>;
}

const GoogleScreen: React.FC<InfoTodoScreenProps> = (props) => {
    return (
        <View style={styles.container}>
            <Text>GoogleScreen</Text>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      top: 20,
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    map: {
       ...StyleSheet.absoluteFillObject,
    },
  });

export default GoogleScreen;
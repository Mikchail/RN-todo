import React, {ChangeEvent} from 'react';
import { Text, View, TouchableOpacity, PermissionsAndroid, Alert, Platform, ViewStyle } from 'react-native';
import Button from './ui/Button';
import {
  launchCamera,
  CameraOptions,
} from 'react-native-image-picker';

interface CameraProps {
  setPhoto: React.Dispatch<React.SetStateAction<string | undefined>>;
  style: ViewStyle;
}

const Camera: React.FC<CameraProps> = (props) => {
  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
            buttonPositive: ''
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const takePhoto = async () => {
    const isPermitionStorage = await hasAndroidPermission();
    const isPermitionCamera = await requestCameraPermission();

    if(Platform.OS === 'android' && !(isPermitionStorage && isPermitionCamera)){
      Alert.alert(
        "You need Permisson",
        "You can try later",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
      return false
    }
    const options: CameraOptions = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
      includeBase64: true,
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        // const source = {uri: response.uri};
        console.log(response.base64)
        props.setPhoto('data:image/jpeg;base64,' + response.base64);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  };
  return (
    <View>
      <Button 
        style={{...props.style}}
        label="Take a photo"
        onPress={() => {
          takePhoto();
        }}>
      </Button>
    </View>
  );
};

export default Camera;

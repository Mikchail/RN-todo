import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet, Pressable, Text } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch } from "react-redux";
import { authenticate } from "../store/auth/reducer";
import Button from "../components/ui/Button";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthParamList } from "../navigator/AuthNavigator";
import ReactNativeBiometrics from 'react-native-biometrics'

interface StartScreenProps {
    navigation: StackNavigationProp<AuthParamList>;
}
const StartupScreen: React.FC<StartScreenProps> = (props) => {
    const dispatch = useDispatch();


    useEffect(() => {
        
        const tryLogin = async () => {
            if (!await checkBiometricks()) {
                return;
            }
            const userDataJson = await AsyncStorage.getItem("userData");
            if (!userDataJson) {
                props.navigation.navigate("Auth");
                return;
            }
            const transformedData = JSON.parse(userDataJson);
            const { userDate, expiryDate } = transformedData;
            const expirationDate = new Date(expiryDate);

            if (expirationDate <= new Date() || !userDate.token || !userDate.id) {
                props.navigation.navigate("Auth");
                return;
            }

            const expirationTime = new Date(expirationDate.getTime() - new Date().getTime());
            dispatch(authenticate(userDate, expirationTime));
        };

        tryLogin();
    }, [dispatch]);


    const checkBiometricks = async () => {
        const { biometryType } = await ReactNativeBiometrics.isSensorAvailable()
        console.log(biometryType);
        let hasBiometric = true;
        try {
            const resultObject = await ReactNativeBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' })
            const { success } = resultObject;
            if (success) {
                hasBiometric = true;
                console.log('successful biometrics provided')
            } else {
                hasBiometric = false;
                console.log('user cancelled biometric prompt')
            }
        } catch (error) {
            console.log('biometrics failed')
        }
        return hasBiometric
    }

    return (
        <View style={styles.screen}>
            {/* <ActivityIndicator size="large" /> */}
            <Text>Welocome!</Text>
            <Button style={{ marginTop: 10 }} label="Go" onPress={() => props.navigation.navigate('Auth')} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    welcome: {
        fontSize: 28,
    }
});

export default StartupScreen;
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Logo from './assets/logo.svg';
import colors from './colors';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';




SplashScreen.preventAutoHideAsync();


const RegisterScreen = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        async function loadFontsAndHideSplash() {
        try {
            // Load fonts asynchronously
            await Font.loadAsync({
            'Alike': require('./assets/fonts/Alike-Regular.ttf'),
            'SegoeUI': require('./assets/fonts/Segoe UI.ttf'),
            });

            setFontsLoaded(true); // Mark fonts as loaded
            await SplashScreen.hideAsync(); // Hide splash screen once fonts are loaded
        } catch (error) {
            console.warn(error);
        }
        }

        loadFontsAndHideSplash();
    }, []);

    if (!fontsLoaded) {
        return null; // Return null while fonts are loading
    }


    return (
        <View style={styles.container}>
            <Text>Register</Text>
        </View>
    );
}

export default RegisterScreen;
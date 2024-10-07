import React, { useState, useEffect } from 'react';
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


    const handleRegister = () => {
        // Add your login logic here
        navigation.navigate('Login'); // for now just navigate to main menu
      };


    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Logo width={100} height={100} />
                <Text style={styles.header}>Orangutan Oasis</Text>
            </View>

            <View style={styles.headerContainer}>
                <Text style={styles.title}>Register</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>
                        Back to Login
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}




const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: colors.background,
    },
    headerContainer: {
      marginTop: 30,
      marginLeft: -10,
      flex: 1,
      flexDirection: 'row',
      marginBottom: -150,
    },
    header: {
      marginTop: 30,
      fontSize: 35,
      color: colors.text,
      fontFamily: 'Alike',
    },
    main: {
      flex: 1,
      marginTop: -50,
      justifyContent: 'flex-start',
    },
    input: {
      height: 40,
      borderColor: colors.secondary,
      borderWidth: 1,
      marginBottom: 12,
      paddingHorizontal: 8,
      color: colors.text,
      fontFamily: 'SegoeUI',
    },
    title: {
      fontSize: 24,
      marginBottom: 16,
      color: colors.primary,
      fontFamily: 'Alike',
    },
    button: {
      backgroundColor: colors.primary, // Use your color variable for the button background
      padding: 10,
      alignItems: 'center',
      borderRadius: 5,
      height: 36,
    },
    buttonText: {
      color: colors.text, // Change this to your desired text color
      fontSize: 16,
      fontFamily: 'SegoeUI',
    },
  });

export default RegisterScreen;
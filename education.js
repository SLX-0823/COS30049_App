import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Logo from './assets/logo.svg';
import colors from './colors';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';
import Nav from './nav';




SplashScreen.preventAutoHideAsync();


const EducationScreen = () => {
    const navigation = useNavigation();
    const [fontsLoaded, setFontsLoaded] = useState(false);

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
            <View style={styles.headerContainer}>
                <Nav />
                <View style={styles.logo}>
                    <TouchableOpacity onPress={() => navigation.navigate('MainMenu')}>
                        <Logo width={100} height={100} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.main}>
                <Text style={styles.text}>Education Page!</Text>
            </View>
            
        </View>
    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: -10,
        padding: 0,
        backgroundColor: colors.background,
    },
    headerContainer: {
        marginTop: 30,
        minWidth: '100%',
        flex: 1,
        flexDirection: 'row',
        marginBottom: -150,
        backgroundColor: colors.background,
        zIndex: 999,
        position: 'absolute',
        alignContent: 'center',
        borderStyle: 'solid',
        borderColor: colors.secondary,
        borderBottomWidth: 0.2,
    },
    logo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 50,
    },
    header: {
        marginTop: 30,
        fontSize: 35,
        color: colors.text,
        fontFamily: 'Alike',
    },
    main: {
        marginTop: 130,
        padding: 10,
    },
    text: {
        color: colors.text,
    },
});

export default EducationScreen;
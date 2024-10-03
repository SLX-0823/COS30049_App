import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import Logo from './assets/logo.svg';
import colors from './colors';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';




SplashScreen.preventAutoHideAsync();


const MainMenuScreen = () => {
    const navigation = useNavigation();
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [isNavVisible, setNavVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(-100)).current; // Initial position

    const toggleNavMenu = () => {
        if (isNavVisible) {
            // Slide out
            Animated.timing(slideAnim, {
                toValue: -250,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setNavVisible(false)); // Update state after animation
        } else {
            setNavVisible(true);
            // Slide in
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };

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
                <TouchableOpacity
                    style={styles.hamburger}
                    onPress={toggleNavMenu}
                >
                    <Text style={styles.hamburgerText}>☰</Text>
                </TouchableOpacity>
                <View style={styles.logo}>
                    <TouchableOpacity onPress={() => navigation.navigate('MainMenu')}>
                        <Logo width={100} height={100} />
                    </TouchableOpacity>
                </View>
            </View>
            {isNavVisible && (
                <Animated.View style={[styles.navMenu, { transform: [{ translateX: slideAnim }] }]}>
                    <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Donation')}>
                        <Text style={styles.navItem}>Donation</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Education')}>
                        <Text style={styles.navItem}>Education</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Community')}>
                        <Text style={styles.navItem}>Community</Text>
                    </TouchableOpacity>
                </Animated.View>
            )}

            <View style={styles.main}>
                <Text style={styles.text}>Main Page!</Text>
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
    hamburger: {
        padding: 20,
        marginTop: 10,
    },
    hamburgerText: {
        fontSize: 30,
        color: colors.primary,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    navMenu: {
        flex: 1,
        position: 'absolute',
        top: 130,
        backgroundColor: colors.accent,
        flexDirection: 'column',
        width: '70%',
        minHeight: '100%',
        alignItems: 'flex-start',
        maxHeight: 45,
        borderStyle: 'solid',
        borderColor: colors.secondary,
        borderWidth: 0.3,
        overflow: 'hidden',
        zIndex: 1,
    },
    navButton: {
        width: '100%',
        maxHeight: 65,
        padding: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.accent,
        borderStyle: 'solid',
        borderColor: colors.secondary,
        borderWidth: 0.2,
    },
    navItem: {
        color: colors.primary,
        fontSize: 15,
        padding: 10,
        fontFamily: 'SegoeUI',
    },
    main: {
        marginTop: 130,
        padding: 10,
    },
    text: {
        color: colors.text,
    },
});

export default MainMenuScreen;
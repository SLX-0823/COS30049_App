import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Linking } from 'react-native';
import Logo from './assets/logo.svg';
import colors from './colors';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';
import Nav from './nav';




SplashScreen.preventAutoHideAsync();


const ContactUsScreen = () => {
    const navigation = useNavigation();
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        async function loadFontsAndHideSplash() {
            try {
                await Font.loadAsync({
                    'Alike': require('./assets/fonts/Alike-Regular.ttf'),
                    'SegoeUI': require('./assets/fonts/Segoe UI.ttf'),
                });

                setFontsLoaded(true);
                await SplashScreen.hideAsync();
            } catch (error) {
                console.warn(error);
            }
        }

        loadFontsAndHideSplash();
    }, []);

    if (!fontsLoaded) {
        return null;
    }

    // Function to handle phone call
    const handleCall = () => {
        const phoneNumber = 'tel:082618325'; // Format for dialing
        Linking.openURL(phoneNumber).catch((err) => console.error('Error opening dialer', err));
    };

    // Function to handle opening Facebook
    const handleFacebook = () => {
        const facebookUrl = 'fb://profile/100064335535613'; // Semmenggoh Wildlife Center profile ID
        Linking.canOpenURL(facebookUrl)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(facebookUrl);
                } else {
                    Linking.openURL('https://www.facebook.com/Semenggoh/'); // Fallback to web
                }
            })
            .catch((err) => console.error('Error opening Facebook', err));
    };

    // Function to handle opening Instagram
    const handleInstagram = () => {
        const instagramUrl = 'instagram://user?username=semenggohwildlifecentre'; // Semmenggoh Wildlife Center Insta username
        Linking.canOpenURL(instagramUrl)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(instagramUrl);
                } else {
                    Linking.openURL('https://www.instagram.com/semenggohwildlifecentre/'); // Fallback to web
                }
            })
            .catch((err) => console.error('Error opening Instagram', err));
    };

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
                <Text style={styles.title}>Contact Us</Text>
                <View style={styles.linkContainer}>
                    <Text style={styles.headerText}>Semenggoh Nature Reserve</Text>

                    <TouchableOpacity onPress={handleCall} style={styles.link}>
                        <Text style={styles.text}>Call Us: 082-618 325</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleFacebook} style={styles.link}>
                        <Text style={styles.text}>Visit our Facebook!</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleInstagram} style={styles.link}>
                        <Text style={styles.text}>Visit our Instagram!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};




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
    title: {
        color: colors.primary,
        fontSize: 40,
        fontFamily: 'Alike',
    },
    headerText: {
        margin: 5,
        marginTop: 20,
        marginBottom: 10,
        color: colors.secondary,
        fontSize: 30,
        fontFamily: 'SegoeUI',
    },
    linkContainer: {
        alignItems: 'center',
    },
    link: {
        width: '70%',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: colors.secondary,
    },
    text: {
        margin: 5,
        padding: 10,
        color: colors.accent,
        fontSize: 15,
        fontFamily: 'SegoeUI',
    },
});

export default ContactUsScreen;
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Logo from './assets/logo.svg';
import colors from './colors';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';
import Nav from './nav';




SplashScreen.preventAutoHideAsync();


const AboutUsScreen = () => {
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
                <Text style={styles.title}>About Us</Text>
                <Text style={styles.textTitle}>Greetings from Orangutan Oasis!</Text>
                <Text style={styles.text}>
                    Our mission at Orangutan Oasis is to preserve Bornean orangutans and their natural habitat. More than half of the orangutan's natural 
                    habitat has been lost due to human activity over the past 20 years, which has significantly reduced orangutan populations. We have teamed 
                    up with the Sarawak Forestry Corporation to develop a model for animal protection, ethical tourism, and environmental stewardship that can 
                    be expanded to other Sarawakian locations in response to the pressing need for action.
                </Text>

                <Text style={styles.text}>
                    Scientific research, data-driven decision-making, community involvement, and cutting-edge technologies form the cornerstones of our purpose. Our goal is to establish a balanced environment in which local people actively contribute to the preservation of their natural heritage, tourists obtain insightful knowledge about wildlife protection, and orangutans can flourish in secure havens.
                </Text>

                <Text style={styles.text}>
                    By means of our endeavors, we want to:
                </Text>

                <Text style={styles.text}>
                    • Provide thorough monitoring programs to protect the habitats of orangutans.
                </Text>
                <Text style={styles.text}>
                    • By giving visitors access to precise information and chances to see wildlife, you can improve their experience.
                </Text>
                <Text style={styles.text}>
                    • Encourage environmentally conscious travel and education.
                </Text>
   
                    <Text style={styles.text}>
                        Come along on our mission to save the orangutan and its ecosystems for coming generations. If we work together, we can change things!
                    </Text>
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
    title: {
        color: colors.primary,
        fontSize: 40,
        fontFamily: 'Alike',
    },
    textTitle: {
        color: colors.secondary,
        fontSize: 20,
        marginTop: 25,
        fontFamily: 'SegoeUI',
    },
    text: {
        color: colors.text,
        marginTop: 5,
        marginBottom: 10,
        fontFamily: 'SegoeUI',
    },
});

export default AboutUsScreen;
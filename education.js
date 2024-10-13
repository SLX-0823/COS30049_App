import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
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
                <Text style={styles.title}>Education</Text>
                <ScrollView 
                    style={styles.scrollContainer}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.headerText}>Eco-Friendly Tips for Tourists Visiting Orangutan Habitats</Text>
                    <Text style={styles.text}>
                        Hey there, adventurous souls! 🌿 Planning a trip to see our fuzzy, orange friends in their natural habitat? Let's ensure your visit is as kind to the 
                        environment as possible. Here's how you can be a responsible and eco-friendly tourist:
                    </Text>

                
                    <View style={styles.cards}>
                        <Text style={[styles.headerText, styles.cardHeader]}>Choose Ethical Tour Operators</Text>
                        <Text style={styles.text}>
                            Start your journey by picking tour operators who care about sustainability and conservation. These good folks put the environment first and help support 
                            local communities. Look for those with eco-certifications to ensure your adventure helps preserve orangutan habitats. Ethical tour operators often have 
                            policies and practices that minimize environmental impact, such as limiting the number of visitors per group, using eco-friendly transportation, and ensuring 
                            their activities don't disrupt local wildlife. Beyond certifications, do a bit of research. Read reviews and check out the operator's website and social media. 
                            Are they transparent about their conservation efforts? Do they support local communities by hiring local guides and using locally-owned accommodations? 
                            Choosing the right tour operator means your visit helps fund ongoing conservation projects, supports local economies, and ensures your impact is positive.
                        </Text>
                    </View>

                    <View style={styles.cards}>
                        <Text style={[styles.headerText, styles.cardHeader]}>Respect Wildlife</Text>
                        <Text style={styles.text}>
                            Remember, we're visitors in their home. Keep a respectful distance from orangutans and never feed them. It's better for their health and helps keep their
                             behaviours natural. Observing these majestic creatures from afar is a sight you'll never forget. It's essential to use binoculars or zoom lenses for a 
                             closer look without disturbing them. Feeding wildlife disrupts their natural diet and can make them more reliant on humans, which is detrimental to their 
                             survival in the wild. Always follow the guidelines provided by your tour guide. These are in place to protect both you and the animals. Avoid loud noises 
                             and sudden movements, and respect the boundaries set by your guides. Educate yourself on the behaviours and signs of stress in orangutans to help ensure 
                             their well-being during your visit.
                        </Text>
                    </View>

                    <View style={styles.cards}>
                        <Text style={[styles.headerText, styles.cardHeader]}>Leave No Trace</Text>
                        <Text style={styles.text}>
                            This one's a golden rule! Always pack out what you pack in. Bring a small bag for trash and make sure nothing is left behind in the forest. By reducing 
                            litter, you're helping to keep these beautiful places pristine. Avoid single-use plastics whenever possible. Bring reusable water bottles, utensils, and 
                            bags. This reduces waste and keeps harmful substances out of the environment. Think about your carbon footprint, too. Travel light and use biodegradable 
                            or reusable products. Even small actions, like turning off lights and conserving water, can make a big difference. Remember, the less impact you leave 
                            behind, the better it is for the environment and its inhabitants.
                        </Text>
                    </View>

                    <View style={styles.cards}>
                        <Text style={[styles.headerText, styles.cardHeader]}>Use Eco-Friendly Products</Text>
                        <Text style={styles.text}>
                            Bring along reusable water bottles, utensils, and bags. Avoid single-use plastics and opt for biodegradable options. This way, you'll reduce waste and keep
                             harmful chemicals out of the environment. When choosing personal care products, opt for biodegradable and free from toxic chemicals. This includes items 
                             like sunscreen, insect repellent, and toiletries. Supporting businesses that prioritize sustainability can also make a significant difference. Choose 
                             accommodations that have eco-friendly practices, such as recycling programs, energy-efficient systems, and water conservation measures. Every little bit 
                             helps in reducing your overall environmental impact.
                        </Text>
                    </View>

                    <View style={styles.cards}>
                        <Text style={[styles.headerText, styles.cardHeader]}>Support Local Communities</Text>
                        <Text style={styles.text}>
                            Shop local! Buy souvenirs and services from local vendors. This not only supports the local economy but also reduces your carbon footprint. Your purchases 
                            can make a big difference. Supporting local businesses means your money stays within the community, helping to improve living standards and promote sustainable
                             development. Look for community-based tourism projects that give you a deeper connection to the area's culture and people. This not only enriches your 
                             travel experience but also helps to preserve local traditions and ways of life. Remember, your visit can have a lasting positive impact on the communities 
                             you support.
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    headerContainer: {
        marginTop: 30,
        minWidth: '100%',
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
    main: {
        marginTop: 130,
        padding: 10,
        flex: 1,
    },
    title: {
        color: colors.primary,
        fontSize: 40,
        fontFamily: 'Alike',
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100, // Extra space at bottom for the navigation bar
    },
    cards: {
        margin: 5,
        marginTop: 15,
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: colors.accent,
    },
    cardHeader: {
        marginBottom: 20,
        fontSize: 25,
    },
    headerText: {
        marginTop: 15,
        marginBottom: 10,
        color: colors.secondary,
        fontSize: 20,
        fontFamily: 'SegoeUI',
    },
    text: {
        color: colors.text,
        fontFamily: 'SegoeUI',
        textAlign: 'justify',
    },
});

export default EducationScreen;

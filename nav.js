import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from './colors';

const Nav = () => {
    const navigation = useNavigation();
    const [isNavVisible, setNavVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(-100)).current;

    const toggleNavMenu = () => {
        if (isNavVisible) {
            Animated.timing(slideAnim, {
                toValue: -250,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setNavVisible(false));
        } else {
            setNavVisible(true);
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };

    return (
        <View styles={styles.navContainer}>
            <TouchableOpacity style={styles.hamburger} onPress={toggleNavMenu}>
                <Text style={styles.hamburgerText}>☰</Text>
            </TouchableOpacity>

            {isNavVisible && (
                <Animated.View style={[styles.navMenu, { transform: [{ translateX: slideAnim }] }]}>
                    <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Dashboard')}>
                        <Text style={styles.navItem}>Dashboard</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Donation')}>
                        <Text style={styles.navItem}>Donation</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Education')}>
                        <Text style={styles.navItem}>Learn</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Community')}>
                        <Text style={styles.navItem}>Community</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('AboutUs')}>
                        <Text style={styles.navItem}>About Us</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('ContactUs')}>
                        <Text style={styles.navItem}>Contact Us</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.navButton, styles.logoutButton]} onPress={() => navigation.navigate('Login')}>
                        <Text style={[styles.navItem, styles.logoutText]}>Logout</Text>
                    </TouchableOpacity>
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    navContainer: {

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
        top: 100,
        backgroundColor: colors.accent,
        flexDirection: 'column',
        width: '400%',
        minHeight: '1000%',
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
    logoutButton: {
        backgroundColor: colors.primary,
        marginTop: '67%',
    },
    logoutText: {
        color: colors.accent,
    },
});

export default Nav;
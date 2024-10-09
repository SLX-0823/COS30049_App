import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Logo from './assets/logo.svg';
import colors from './colors';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';
import API from './apiConfig';

SplashScreen.preventAutoHideAsync();

const LoginScreen = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

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
    return null; // Return null while fonts are loading
  }

  const handleLogin = async () => {
    // Login Logic
    try {
      const response = await fetch(`${API}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,  // Use username for the email field
          password,
        }),
      });
  
      const data = await response.json();
      if (data.success) {
        navigation.navigate('MainMenu');
      } else {
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error occurred: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Logo width={100} height={100} />
        <Text style={styles.header}>Orangutan Oasis</Text>
      </View>

      <View style={styles.main}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor={colors.text}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={colors.text}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Haven't had an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signUpLink}>Sign up now!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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
  },
  buttonText: {
    color: colors.text, // Change this to your desired text color
    fontSize: 16,
    fontFamily: 'SegoeUI',
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 16, // Space between the button and sign-up text
  },
  signUpText: {
    color: colors.text,
    fontFamily: 'SegoeUI',
  },
  signUpLink: {
    color: colors.secondary,
    textDecorationLine: 'underline',
    fontFamily: 'SegoeUI',
  },
});

export default LoginScreen;
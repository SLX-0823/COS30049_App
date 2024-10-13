import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Logo from './assets/logo';
import colors from './colors'; 
import config from './config.js';




const RegisterScreen = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      address: '',
      city: '',
      state: '',
      country: '',
      postalCode: ''
  });
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
      return null;
  }

  const handleInputChange = (field, value) => {
      setFormData({
          ...formData,
          [field]: value,
      });
  };

  const handleRegister = async () => {
    try {
        const response = await fetch(`${config.SERVER}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                country: formData.country,
                postal_code: formData.postalCode,
                phone_number: formData.phoneNumber,
                password: formData.password,
            }),
        });

        // Log the response text to see the result
        const responseText = await response.text();
        console.log('Response Text:', responseText);

        // Parse the response as JSON and handle success/failure
        const result = JSON.parse(responseText);
        if (result.success) {
            Alert.alert("Registration Successful", "You have successfully registered.", [
                { text: "OK", onPress: () => navigation.navigate('Login') }
            ]);
        } else {
            Alert.alert("Registration Failed", result.message || "Please try again.");
        }
    } catch (error) {
        console.error(error);
        Alert.alert("Error", "Something went wrong, please try again later.");
    }
  };


  return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.logoContainer}>
                    <Logo width={80} height={80} style={styles.logo} />
                </View>
                <Text style={styles.header}>Orangutan Oasis</Text>
            </View>

            <View style={styles.main}>
                <Text style={styles.title}>Register</Text>

                <ScrollView>
                  <TextInput
                      style={styles.input}
                      placeholder="Name"
                      placeholderTextColor={colors.text}
                      value={formData.name}
                      onChangeText={(value) => handleInputChange('name', value)}
                  />
                  <TextInput
                      style={styles.input}
                      placeholder="Email"
                      placeholderTextColor={colors.text}
                      value={formData.email}
                      onChangeText={(value) => handleInputChange('email', value)}
                      keyboardType="email-address"
                  />
                  <TextInput
                      style={styles.input}
                      placeholder="Password"
                      placeholderTextColor={colors.text}
                      value={formData.password}
                      onChangeText={(value) => handleInputChange('password', value)}
                      secureTextEntry
                  />
                  <TextInput
                      style={styles.input}
                      placeholder="Address"
                      placeholderTextColor={colors.text}
                      value={formData.address}
                      onChangeText={(value) => handleInputChange('address', value)}
                  />
                  <TextInput
                      style={styles.input}
                      placeholder="City"
                      placeholderTextColor={colors.text}
                      value={formData.city}
                      onChangeText={(value) => handleInputChange('city', value)}
                  />
                  <TextInput
                      style={styles.input}
                      placeholder="State"
                      placeholderTextColor={colors.text}
                      value={formData.state}
                      onChangeText={(value) => handleInputChange('state', value)}
                  />
                  <TextInput
                      style={styles.input}
                      placeholder="Country"
                      placeholderTextColor={colors.text}
                      value={formData.country}
                      onChangeText={(value) => handleInputChange('country', value)}
                  />
                  <TextInput
                      style={styles.input}
                      placeholder="Postal Code"
                      placeholderTextColor={colors.text}
                      value={formData.postalCode}
                      onChangeText={(value) => handleInputChange('postalCode', value)}
                      keyboardType="numeric"
                  />
                </ScrollView>

                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.linkText}>Back to Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};




const styles = StyleSheet.create({
  scrollContainer: {
      flexGrow: 1,
      paddingBottom: 50,
  },
  container: {
      flex: 1,
      padding: 16,
      backgroundColor: colors.background,
  },
  headerContainer: {
      marginTop: 40,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
  },
  logoContainer: {
      marginRight: 10,
  },
  header: {
      fontSize: 26,
      color: colors.text,
      fontFamily: 'Alike',
  },
  main: {
      flex: 1,
      justifyContent: 'flex-start',
  },
  title: {
      fontSize: 28,
      color: colors.primary,
      fontFamily: 'Alike',
      marginBottom: 20,
  },
  input: {
      height: 40,
      borderColor: colors.secondary,
      borderWidth: 1,
      marginBottom: 16,
      paddingHorizontal: 10,
      color: colors.text,
      fontFamily: 'SegoeUI',
  },
  button: {
      backgroundColor: colors.primary,
      padding: 12,
      alignItems: 'center',
      borderRadius: 5,
  },
  buttonText: {
      color: colors.text,
      fontSize: 16,
      fontFamily: 'SegoeUI',
  },
  link: {
      marginTop: 16,
      alignItems: 'center',
  },
  linkText: {
      color: colors.secondary,
      textDecorationLine: 'underline',
      fontFamily: 'SegoeUI',
  },
});

export default RegisterScreen;
import React, { useEffect } from 'react';
import { StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import colors from './colors';
import LoginScreen from './login';
import RegisterScreen from './register';
import MainMenuScreen from './mainMenu'; 
import DashboardScreen from './dashboard';
import DonationScreen from './donation';
import EducationScreen from './education';
import CommunityScreen from './community';
import AboutUsScreen from './aboutUs';
import ContactUsScreen from './contactUs';





const Stack = createNativeStackNavigator();
// All app navigation would be here 
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden={false} translucent={true} backgroundColor={colors.background} />
      
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainMenu" component={MainMenuScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Donation" component={DonationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Education" component={EducationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Community" component={CommunityScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AboutUs" component={AboutUsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ContactUs" component={ContactUsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

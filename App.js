import React, { useEffect } from 'react';
import { StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import colors from './colors';
import LoginScreen from './login';
import MainMenuScreen from './mainMenu'; 
import RegisterScreen from './register';
import DonationScreen from './donation';
import EducationScreen from './education';
import CommunityScreen from './community';





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
        <Stack.Screen name="Donation" component={DonationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Education" component={EducationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Community" component={CommunityScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

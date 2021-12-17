import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import SettingScreen from './SettingScreen';
import { Ionicons } from '@expo/vector-icons'
import { createStackNavigator } from '@react-navigation/stack';
import Loginscreen from './Loginscreen';


export default function App() {

const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false}} name="Login" component={Loginscreen} />
        <Stack.Screen options={{ headerShown: false}} name="Home" component={HomeScreen} />
        <Stack.Screen name="Plant info" component={SettingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

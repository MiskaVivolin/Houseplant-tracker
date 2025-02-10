import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Homescreen from './src/screens/Homescreen';
import Settingscreen from './src/screens/Settingscreen';
import { createStackNavigator } from '@react-navigation/stack';
import Loginscreen from './src/screens/Loginscreen';
import Viewplantscreen from './src/screens/Viewplantscreen';


export default function App() {

const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false}} name="Login" component={Loginscreen} />
        <Stack.Screen options={{ headerShown: false}} name="Home" component={Homescreen} />
        <Stack.Screen options={{ headerShown: false}} name="Viewlist" component={Viewplantscreen} />
        <Stack.Screen name="Plant info" component={Settingscreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

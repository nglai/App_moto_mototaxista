import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/component/Login';
import Principal from './src/component/Principal';

//constante de navegação stack
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <StatusBar/>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
        <Stack.Screen name="Home" component={Principal} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
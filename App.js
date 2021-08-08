import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/component/Login';
import Principal from './src/component/Principal';
import { UserContext } from './src/component/UserContext';
import LogOut from './src/component/LogOut';

export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  
  const logado = async (user) => {
    setIsLogged(true);
    setUser(user);
  }
  
  const deslogado = async () =>{
    setIsLogged(false);
    setUser(null);
  }
  
  return (
    <NavigationContainer>
      <StatusBar/>
      <UserContext.Provider value={{user, logado, deslogado}}>
        {isLogged && user ? <Principal /> : <Login />}
      </UserContext.Provider>
    </NavigationContainer>
  );
}
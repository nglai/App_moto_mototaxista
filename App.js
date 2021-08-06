import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/component/Login';
import Principal from './src/component/Principal';
import { UserContext } from './src/component/UserContext';

//constante de navegação stack
const Stack = createStackNavigator();

export default function App() {
  // verifica se está logado
  const [isLogged, setIsLogged] = useState(false);
  //recebe o usuário logado
  const [user, setUser] = useState(null);

  const logado = async (user) => {
    setIsLogged(true);//alterando para principal
    setUser(user);//passando os dados do u (usuários) para user
  }
  const deslogado = async () => {
    setIsLogged(false);// voltando para login
    setUser(null);//eu retiro o state do nosso usuário
  }

  return (
    <NavigationContainer>
      <StatusBar />
      <UserContext.Provider value={{ user, logado, deslogado }}>
        {isLogged && user ? <Principal /> : <Login />}
      </UserContext.Provider>
    </NavigationContainer>
  );
}

{/* <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Principal" component={Principal} options={{ headerShown: false }} /> */}
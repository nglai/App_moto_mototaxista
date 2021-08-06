import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Principal from './src/component/Principal';
import Login from './src/component/Login';
//importando o UserContext
import {UserContext} from './src/component/UserContext';


export default function App(){
// verifica se está logado
  const[isLogged, setIsLogged] = useState(false);
  //recebe o usuário logado
  const[user, setUser] = useState(null);

  const logado = async (user) => {
    setIsLogged(true);//alterando para principal
    setUser(user);//passando os dados do u (usuários) para user
  }
  const deslogado = async () =>{
    setIsLogged(false);// voltando para login
    setUser(null);//eu retiro o state do nosso usuário
  }

  return(
    <NavigationContainer>
      <StatusBar/>
      <UserContext.Provider value={{user, logado, deslogado}}>
        {isLogged && user ? <Principal/> : <Login/>}
      </UserContext.Provider>
    </NavigationContainer>
  );
}

// import React from 'react';
// import { StyleSheet, Text, View, StatusBar } from 'react-native';
// import 'react-native-gesture-handler';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Login from './src/component/Login';
// import Principal from './src/component/Principal';

// //constante de navegação stack
// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//     <StatusBar/>
//       <Stack.Navigator>
//         <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
//         <Stack.Screen name="Home" component={Principal} options={{headerShown:false}} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
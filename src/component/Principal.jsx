import React from 'react';
import 'react-native-gesture-handler';
import { View, Text, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Perfil from './Perfil';
import Corrida from './Corrida';
import Historico from './Historico';
import LogOut from './LogOut';
  
const Tab = createBottomTabNavigator();

export default function Principal() {
  return (
    <Tab.Navigator
      initialRouteName="Perfil"
      tabBarOptions={{
        activeTintColor: '#FF6701',
      }}
    >
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='body' color={color} size={size} />
          ),
          headerShown:false,
        }}
      />
      <Tab.Screen
        name="Corrida"
        component={Corrida}
        options={{
          tabBarLabel: 'Corrida',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='map-outline' color={color} size={size} />
          ),
          headerShown:false,
        }}
      />
      <Tab.Screen
        name="Historico"
        component={Historico}
        options={{
          tabBarLabel: 'Histórico',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='list' color={color} size={size} />
          ),
          headerShown:false,
        }}
      />
      <Tab.Screen
        name="LogOut"
        component={LogOut}
        options={{
          tabBarLabel: 'LogOut',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='exit' color={color} size={size} />
          ),
          headerShown:false,
        }}
      />
    </Tab.Navigator>
  );
}
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Perfil(){
    return(
        <View style={styles.container}>
            <Text>Perfil</Text>
            <Text>Dados do motoca</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FCECDD'
    }
})
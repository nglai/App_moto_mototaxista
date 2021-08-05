import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Corrida(){
    return(
        <View style={styles.container}>
            <Text>Corrida</Text>
            <Text>Dados do cliente do banco de dados</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FCECDD'
    }
})
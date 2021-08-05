import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Historico(){
    return(
        <View style={styles.container}>
            <Text>Histórico</Text>
            <Text>Mostra os historicos da corrida olha que beleza</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FCECDD'
    }
})
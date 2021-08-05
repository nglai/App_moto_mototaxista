import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function LogOut(){
    return(
        <View style={styles.container}>
            <Text>Componente de logout</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FCECDD'
    }
})
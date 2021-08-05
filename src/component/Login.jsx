import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function Login({navigation}){
    const [email,setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const entrar = () => {
        navigation.reset({
            index:0,
            routes: [{name:'Home'}]
        })
    }
    const cadastrar = () => {
        navigation.navigate('Cadastro')
    }

    return(
        <View style={styles.container}>
            <View style={styles.viewLogo}>
                <Image
                style={styles.logo}
                source={require('../../imagens/MotoApp.png')}
                />
            </View>

            <View style={styles.viewText}>
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    autoCorrect={false}
                    keyboardType='email-address'
                    onChangeText={(value) => setEmail(value)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Senha'
                    autoCorrect={false}
                    keyboardType='numeric'
                    secureTextEntry={true}
                    onChangeText={(value) => setPassword(value)}
                />
                <TouchableOpacity
                    style={styles.btnSubmit}
                    onPress={() => entrar()}
                    >
                    <Text style={styles.textSubmit}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnElse}>
                    <Text style={styles.btnColor}>Esqueci minha senha</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FEA82F',
        alignItems:'center',
        justifyContent:'center',

    },
    viewLogo:{
        flex:1,
    },
    logo:{
        width:300,
        height:300,
        marginTop:'15%'
    },
    viewText:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        width:'90%',
        paddingBottom:15,
    },
    input:{
        backgroundColor:'white',
        width:'90%',
        marginBottom:15,
        color:'#222',
        borderRadius:10,
        fontSize:17,
        padding:10,
    },
    btnSubmit:{
        backgroundColor: '#FF6701',
        width:'30%',
        height:'15%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
    },
    textSubmit:{
        color:'white',
        fontSize:18,
    },
    btnElse:{
        marginTop:10,
    },
    btnColor:{
        color:'black'
    },
});
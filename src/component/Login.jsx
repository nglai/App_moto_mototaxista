import React, { useState, useEffect, useContext } from 'react';
import { View, ActivityIndicator, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { UserContext } from './UserContext';
import firebase from '../../firebase';

export default function Login() {
    const {logado, deslogado} = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState({
        email: '',
        senha: '',
        msg: ''
    })

    const handleInputChange = (name, value) => {
        setState({
            ...state, [name]: value
        })
    }

    useEffect(
        () => {
            const auth = firebase.auth;
            const unsubscribed = auth.onAuthStateChanged(
                user => {
                    if (user) {
                        if (user.emailVerified) {logado(user);
                        } else {
                            auth.signOut();
                            deslogado();
                            setLoading(false);
                        }
                    } else {
                        setLoading(false);
                    }
                }
            )
            return () => {
                unsubscribed();
            }
        }, []
    )

    const login = async () => {
        const auth = firebase.auth;
        const {email, senha} = state;
        try {
            const resposta = await auth.signInWithEmailAndPassword(email, senha);
        } catch (error) {
            setState({
                ...state, msg: 'email ou senha inválidos'
            })
        }
    }
    if (loading) {
        return <ActivityIndicator />
    }
    return (
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
                    defaultValue={state.email}
                    autoCorrect={false}
                    keyboardType='email-address'
                    onChangeText={
                        (value) => handleInputChange('email', value)
                    }

                />
                <TextInput
                    style={styles.input}
                    placeholder='Senha'
                    defaultValue={state.senha}
                    autoCorrect={false}
                    keyboardType='default'
                    secureTextEntry={true}
                    onChangeText={
                        (value) => handleInputChange('senha', value)
                    }

                />
                <TouchableOpacity
                    style={styles.btnSubmit}
                    onPress={login}
                >
                    <Text style={styles.textSubmit}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnElse}>
                    <Text style={styles.btnColor}>Esqueci minha senha</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.msg}>{state.msg}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEA82F',
        alignItems: 'center',
        justifyContent: 'center',

    },
    viewLogo: {
        flex: 1,
    },
    logo: {
        width: 300,
        height: 300,
        marginTop: '15%'
    },
    viewText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        paddingBottom: 15,
    },
    input: {
        backgroundColor: 'white',
        width: '90%',
        marginBottom: 15,
        color: '#222',
        borderRadius: 10,
        fontSize: 17,
        padding: 10,
    },
    btnSubmit: {
        backgroundColor: '#FF6701',
        width: '30%',
        height: '15%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    textSubmit: {
        color: 'white',
        fontSize: 18,
    },
    btnElse: {
        marginTop: 10,
    },
    btnColor: {
        color: 'black'
    },
    msg:{
        color:'red'
    }
});
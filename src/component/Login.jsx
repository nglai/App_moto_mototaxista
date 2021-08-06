import React, {useState,useEffect, useContext} from 'react';
import firebase from '../../firebase';
import { StyleSheet, TextInput, Text, View, Button, ActivityIndicator,image, TouchableOpacity} from 'react-native';
import {UserContext} from './UserContext';


export default function Login(){

    const {logado, deslogado} = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const[state, setState] = useState({
        email:'',
        senha:'',
        msg:''
    })

    const [newUser, setNewUser] =useState(false);

    const handleInputChange = (name,value) => {
        setState ({
            ...state, [name]:value
        })
    }

    useEffect(
        () => {
            const auth = firebase.auth;
            const unsubscribed = auth.onAuthStateChanged(
                user => {
                    if(user){
                        if(user.emailVerified){
                            logado(user);
                        }else{
                            auth.signOut();
                            deslogado();
                            setLoading(false);
                        }
                    }else{
                        setLoading(false);
                    }
                }
            )

            return () => {
                unsubscribed();
            }
        },[]
    )
    
    const login = async () => {
        const auth = firebase.auth;
        const {email, senha} = state;
        try{
            const resposta = await auth.signInWithEmailAndPassword(email, senha);
        }catch(error){
            setState({
                ...state, msg: 'email ou senha inválidos'
            })
        }
    }
    const cadastrar = async () =>{
        const auth = firebase.auth;
        const {email, senha} = state;
        if(senha.length >= 6) {
            try{
                const resposta = await auth.createUserWithEmailAndPassword (email, senha);
                auth.currentUser.sendEmailVerification();
                setNewUser(false);
                setState({
                    ...state, msg: "Verifique sua conta de email"
                })
            }catch(error){
                setState({
                    ...state, msg: "não foi possível cadastrar o usuário"
                })
            }
        }else{
            setState({
                ...state, msg: "senha deve conter no mínimo 6 caracteres"
            })
        }
    }

    if(loading){
        return <ActivityIndicator/>
    }
    return(
        <View style={styles.loginView}>
            <View style={styles.formView}>
                <Text>{newUser ? "Novo Usuário" : "Login"}</Text>
                <TextInput style={styles.input} 
                    placeholder='email'
                    defaultValue={state.email}
                    onChangeText={(value)=>handleInputChange('email', value)}/>

                <TextInput style={styles.input} 
                    placeholder='senha'
                    defaultValue={state.senha}
                    onChangeText={(value)=>handleInputChange('senha', value)}
                    secureTextEntry={true}/>
                    {/**Comando para não mostrar a senha secureTextEntry **/}
                
                {newUser ?
                
                <Button title='Cadastrar' onPress={cadastrar}/>:
                <Button title='Logar' onPress={login}/>
                }
                <Text style={styles.msg}>{state.msg}</Text>
                <Text onPress={() => setNewUser(true)}>Cadastre-se</Text>   

            </View>
            

        </View>
    )
}

const styles = StyleSheet.create({
    loginView:{
        width:'100%',
        flex:1, 
        justifyContent:'center',
        alignItems:'center',
    },

    formView:{
        width:'80%',
    },

    input:{
        fontSize:16,
        padding:5,
        margin:5
    },

    msg:{
        color:'red'
    },



})


// import React from 'react';
// import { useState } from 'react';
// import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';

// export default function Login({navigation}){
//     const [email,setEmail] = useState(null);
//     const [password, setPassword] = useState(null);
//     const entrar = () => {
//         navigation.reset({
//             index:0,
//             routes: [{name:'Home'}]
//         })
//     }
//     const cadastrar = () => {
//         navigation.navigate('Cadastro')
//     }

//     return(
//         <View style={styles.container}>
//             <View style={styles.viewLogo}>
//                 <Image
//                 style={styles.logo}
//                 source={require('../../imagens/MotoApp.png')}
//                 />
//             </View>

//             <View style={styles.viewText}>
//                 <TextInput
//                     style={styles.input}
//                     placeholder='Email'
//                     autoCorrect={false}
//                     keyboardType='email-address'
//                     onChangeText={(value) => setEmail(value)}
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder='Senha'
//                     autoCorrect={false}
//                     keyboardType='numeric'
//                     secureTextEntry={true}
//                     onChangeText={(value) => setPassword(value)}
//                 />
//                 <TouchableOpacity
//                     style={styles.btnSubmit}
//                     onPress={() => entrar()}
//                     >
//                     <Text style={styles.textSubmit}>Entrar</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.btnElse}>
//                     <Text style={styles.btnColor}>Esqueci minha senha</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container:{
//         flex:1,
//         backgroundColor:'#FEA82F',
//         alignItems:'center',
//         justifyContent:'center',

//     },
//     viewLogo:{
//         flex:1,
//     },
//     logo:{
//         width:300,
//         height:300,
//         marginTop:'15%'
//     },
//     viewText:{
//         flex:1,
//         alignItems:'center',
//         justifyContent:'center',
//         width:'90%',
//         paddingBottom:15,
//     },
//     input:{
//         backgroundColor:'white',
//         width:'90%',
//         marginBottom:15,
//         color:'#222',
//         borderRadius:10,
//         fontSize:17,
//         padding:10,
//     },
//     btnSubmit:{
//         backgroundColor: '#FF6701',
//         width:'30%',
//         height:'15%',
//         alignItems:'center',
//         justifyContent:'center',
//         borderRadius:10,
//     },
//     textSubmit:{
//         color:'white',
//         fontSize:18,
//     },
//     btnElse:{
//         marginTop:10,
//     },
//     btnColor:{
//         color:'black'
//     },
// });
import React, {useEffect, useState} from 'react';
import firebase from '../../firebase';
import { StyleSheet,Text, View, ActivityIndicator, Button, Image } from 'react-native';

export default function Perfil(){
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState([]);

    console.log(firebase.auth.currentUser.uid)
    console.log(state)
    useEffect(
     ()=>{pegaDados()},[]
    )

    //busca o conteúdo da coleção:
    const  pegaDados = async () => {

        //Referência do firebase firestore, acessando a coleção:
        const motot = firebase.db.collection('mototaxista');

        //constante de armazenamento esperando o retorno da função:
        const resposta = await motot.doc(firebase.auth.currentUser.uid).get();

        //constante que recebe os documentos alinhados no formato de array com as informações:
      

        //Trazer um a um para receber e mostrar os dados organizados em objeto:  
        setState(resposta.data());
        setLoading(false);
      }

    if(loading){
        return <ActivityIndicator animating={true} size="large" color="orange"/>
    }

    return(
        <View style={styles.container}>
                  
            <View style={styles.container}>
             <Image
                 style={styles.logo}
                 source={require('../../imagens/logoperfil.jpeg')}
                 />  
                <Text style={styles.h1}>Nome: {state.nomeMotorista} </Text>
                <View style={styles.box}>
                <Text style={styles.texto}>Licença: {state.licenca}</Text>
                <Text style={styles.texto}>Endereço: {state.endereco}</Text>
                <Text style={styles.texto}>Modelo Moto: {state.modeloMoto} </Text>
                <Text style={styles.texto}>Cor: {state.cor}</Text>
                <Text style={styles.texto}>Placa: {state.placa} </Text>
                <Text style={styles.texto}>Status: {state.status}</Text>
                </View>
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
    logo:{
        width:300,
        height:300,
        // marginTop:'15%'
    },
    texto:{
        fontSize:18
    },
    h1:{
        fontSize:20,
        margin:20,
        fontWeight:'bold'
    },
    box:{
        borderWidth:2,
        borderRadius:20,
        borderColor:'#FCECDD',
        margin:10,
        padding:10,
        textAlign:'center'
    }
  });
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
        return <ActivityIndicator/>
    }

    return(
        <View style={styles.container}>
           <Image
        style={styles.logo}
        source={require('../../imagens/logoperfil.jpeg')}
            />         
            <View style={styles.container}>
                <Text>Nome: {state.nomeMotorista} </Text>
                <Text>Licença: {state.licenca}</Text>
                <Text>Endereço: {state.endereco}</Text>
                <Text>Modelo Moto: {state.modeloMoto} </Text>
                <Text>Cor: {state.cor}</Text>
                <Text>Placa: {state.placa} </Text>
                <Text>Status: {state.status}</Text>
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
        marginTop:'15%'
    }
  });
import React, {useEffect, useState} from 'react';
import firebase from '../../firebase';
import { StyleSheet,Text, View, ActivityIndicator, Button, Image } from 'react-native';

export default function Cliente(){
    const [state, setState] = useState([]);

    useEffect(
     ()=>{pegaDados()},[]
    )

    //busca o conteúdo da coleção:
    const  pegaDados = async () => {
        const cli = firebase.db.collection('clientes');
        const resposta = await cli.doc('06yJarCQ4dZuiKhr4m9kmk3CD2f2').get();
        setState(resposta.data());
      }
console.log(setState)
    return(
        <View style={styles.container}>        
            <View style={styles.container}>
                <Text>Nome do Cliente: {state.nome} </Text>
                <Text>Celular: {state.celular}</Text>
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
import React, {useEffect, useState} from 'react';
import firebase from '../../firebase';
import { StyleSheet,Text, View, ActivityIndicator, Button, Image } from 'react-native';
import Cliente from './Cliente';

export default function Corrida(){
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState([]);

    console.log(firebase.auth.currentUser.uid)
    console.log(state)
    useEffect(
     ()=>{pegaDados()},[]
    )

    //busca o conteúdo da coleção:
    const  pegaDados = async () => {
        const cli = firebase.db.collection('viagensTeste');
        const resposta = await cli.doc('OnhvOsxBnNvP00O2nK2C').get();
        setState(resposta.data());
        setLoading(false);
      }

    if(loading){
        return <ActivityIndicator/>
    }

    return(
        <View style={styles.container}>      
            <View style={styles.container}>
                <Cliente/>
                <Text>Origem</Text>
                <Text>Endereço: {state.origem.endereco}</Text>
                <Text>Bairro: {state.origem.bairro}</Text>
                <Text>Número: {state.origem.numero}</Text>
                <Text>Destino</Text>
                <Text>Endereço: {state.destino.endereco}</Text>
                <Text>Bairro: {state.destino.bairro}</Text>
                <Text>Número: {state.destino.numero}</Text>
            </View>
            <Text>Aceita a Corrida?</Text>
            <Button title='SIM'/>
            <Button title='NÃO'/>
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
        marginTop:'5%'
    }
  });
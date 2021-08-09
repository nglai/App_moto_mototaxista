import React, {useEffect, useState} from 'react';
import firebase from '../../firebase';
import { StyleSheet,Text, View, ActivityIndicator, Button, Image, TouchableOpacity } from 'react-native';
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
        return <ActivityIndicator animating={true} size="large" color="orange"/>
    }

    return(
        <View style={styles.container}>      
            <View style={styles.centro}>
                <Text style={styles.h1}>Nova corrida disponível:</Text>
                <Cliente/>
                <View style={styles.box}>
                <Text style={styles.h1}>Origem</Text>
                <Text style={styles.texto}>Endereço: {state.origem.endereco}</Text>
                <Text style={styles.texto}>Bairro: {state.origem.bairro}</Text>
                <Text style={styles.texto}>Número: {state.origem.numero}</Text>
                </View>
                <View style={styles.box}>
                <Text style={styles.h1}>Destino</Text>
                <Text style={styles.texto}>Endereço: {state.destino.endereco}</Text>
                <Text style={styles.texto}>Bairro: {state.destino.bairro}</Text>
                <Text style={styles.texto}>Número: {state.destino.numero}</Text>
                </View>
            </View>
            <Text style={styles.h1}>Aceita a Corrida?</Text>
            <View style={styles.botoes}>
            <TouchableOpacity><Text style={styles.sim}>SIM</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.nao}>NÃO</Text></TouchableOpacity>
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
        
    },    
    h1:{
        fontSize:20,
        margin:20,
        fontWeight:'bold'
    },
    texto:{
        fontSize:18
    },
    botoes:{
        flexDirection:'row',
        marginBottom:20
        
    },
    sim:{
        fontSize:20,
        backgroundColor:'#FF6701',
        color:'white',
        marginHorizontal:10,
        borderWidth:2,
        borderRadius:20,
        width:80,
        textAlign:'center',
        padding:'2%'
    },
    nao:{
        fontSize:20,
        backgroundColor:'#FF6701',
        color:'white',
        marginHorizontal:10,
        borderWidth:2,
        borderRadius:20,
        width:80,
        textAlign:'center',
        padding:'2%'
        
    },
    centro:{
        textAlign:'center'
    },
    box:{
        borderWidth:2,
        borderRadius:20,
        borderColor:'#FCECDD',
        margin:10,
        padding:10,
        alignItems:'center',
    }
  });
import React, {useEffect,useState} from 'react';
import firebase from '../../firebase';
import {StyleSheet, Button, View,Text, ActivityIndicator,FlatList} from 'react-native';


export default function listHistorico({navigation}){
    const[loading, setLoading] = useState(true);
    const[state,setState] = useState([]);

    //executa a funçao e traz os dados 
    useEffect( 
        () => navigation.addListener('focus', () => {
            pegaDados()
        }), []
    )
    console.log(state);

    const pegaDados = async () => {
        const historico = firebase.db.collection("mototaxista");
        const resposta = await historico.get();
        const dados = resposta.docs; // chamando como os documentos 
        const listHistorico = []; //array vazio para colocar os objetos do forEach
        dados.forEach(
        doc => {  // variavel que vai receber o objeto
            listHistorico.push({
                ...doc.data(),
                key: doc.id
            })
        })
        setState(listHistorico);//recebe a lista depois que a função terminar
        setLoading(false);//alterar o estado do Loading para falso 
    }
    console.log(state)
    if(loading){
        return <ActivityIndicator animating={true} size="large" color="red"/>
    }

    return(
        <View style={styles.container}>
            <Text style={styles.h1}>Histórico de viagens </Text>
            <FlatList
                data={state}
                renderItem={({ item })  => (
                <View style={styles.box} >
                    <Text>Nome do Cliente: {item.viagens.nomeCliente}</Text>
                    <Text>Data: {item.viagens.data}</Text>
                    <Text>Destino: {item.viagens.destino}</Text>
                    <Text>Hora: {item.viagens.hora}</Text>
                    <Text>Origem: {item.viagens.origem}</Text>
                    <Text>Telefone: {item.viagens.telefoneCliente}</Text>

                </View>
                )}    
            /> 
        </View>
    )
}

const styles = StyleSheet.create({
    
    container:{
        flex:1,
        backgroundColor:'#FCECDD',
        alignItems:'center',
        padding:12
    },
    h1:{
        fontSize:20,
        fontWeight:'bold',
        padding:12
    },
    input:{
        height:60,
        width:'90%',
        borderWidth:1,
        padding:10,
        marginTop:5,          
    },
    alert:{
        color:'red'
    },
    box:{
        backgroundColor:'#FEA82F',
        borderWidth:2,
        borderRadius:10,
        margin:20,
        padding:30,
    }
});
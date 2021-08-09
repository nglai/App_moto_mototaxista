import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, FlatList } from 'react-native';
import firebase from '../../firebase';

export default function Historico(){
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState([]);

    useEffect(
        ()=>{corridas()},[]
       )

    const  corridas = async () => {
        const info = firebase.db.collection('viagensTeste');
        const resposta = await info.where('keyMotorista', '==', firebase.auth.currentUser.uid).get();
        const dados = resposta.docs;
        const listCorridas = [];
        dados.forEach(
        doc => {
            listCorridas.push({
                ...doc.data(),
                key: doc.id
            })
        })    
        setState(listCorridas);
        setLoading(false);
    }
    
    // const {destino} = state;

    if(loading){
        return <ActivityIndicator animating={true} size="large" color="orange"/>
    }

    return(
        <View style={styles.container}>
            <View style={styles.titulo}>
                <Text style={styles.titulo}>Histórico de Corridas</Text>    
            </View>
            <FlatList 
                data={state}
                renderItem={
                    ({item})=>(
                        <View style={styles.box}>
                            <Text style={styles.subtitulo}>Data: {item.data}</Text>
                            <Text style={styles.subtitulo}>Origem</Text>
                            <Text style={styles.texto}>Endereço: {item.origem.endereco}</Text>
                            <Text style={styles.texto}>Bairro: {item.origem.bairro}</Text>
                            <Text style={styles.texto}>Número: {item.origem.numero}</Text>
                            <Text style={styles.subtitulo}>Destino</Text>
                            <Text style={styles.texto}>Endereço: {item.destino.endereco}</Text>
                            <Text style={styles.texto}>Bairro: {item.destino.bairro}</Text>
                            <Text style={styles.texto}>Número: {item.destino.numero}</Text>
                        </View>
                    ) 
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    
    container:{
        flex:1,
        backgroundColor:'#FEA82F',
        alignItems:'center',
        padding:12,
       
    },
    box:{
        backgroundColor:'#FEA82F',
        borderWidth:2,
        borderRadius:10,
        borderColor:'white',
        margin:20,
        padding:30,
        textAlign:'center',
    },
    titulo:{
        fontSize:30,
        fontWeight:'bold',
    },
    subtitulo:{
        fontSize:20,
        fontWeight:'bold',
    },
    texto:{
        fontSize:18,
    }

});
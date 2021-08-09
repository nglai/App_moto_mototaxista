import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, FlatList } from 'react-native';
import firebase from '../../firebase';

export default function Corrida(){
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
        return <ActivityIndicator/>
    }

    return(
        <View style={styles.container}>
            <View>
                <Text>Corridas</Text>    
            </View>
            <FlatList
                data={state}
                renderItem={
                    ({item})=>(
                        <View style={styles.container}>
                            <Text>Data: {item.data}</Text>
                            <Text>Origem</Text>
                            <Text>Endereço: {item.origem.endereco}</Text>
                            <Text>Bairro: {item.origem.bairro}</Text>
                            <Text>Número: {item.origem.numero}</Text>
                            <Text>Destino</Text>
                            <Text>Endereço: {item.destino.endereco}</Text>
                            <Text>Bairro: {item.destino.bairro}</Text>
                            <Text>Número: {item.destino.numero}</Text>
                        </View>
                    )}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FCECDD'
    }
})
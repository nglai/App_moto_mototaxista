import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, Button, ActivityIndicator, FlatList} from 'react-native';
import firebase from '../../firebase'

export default function LogOut(){

    //esse state será responsavel por escolher a renderização após o carregamento de dados
    const [loading, setLoading] = useState(true);

    //esse estado vai ser responsavel por receber os dados do banco de dados
    const [state, setState] = useState([])

    useEffect(
        ()=>(pegaDados())
    )

    const pegaDados = async () => {
        const mototaxista = firebase.db.collection('mototaxista');
        const resposta = await mototaxista.doc.get();
        const listMototaxista = [];
        resposta.forEach(
            doc => {
                listMototaxista.push({
                    ...doc.data(),
                    key: doc.id
                })
            }
        )
        setState(listMototaxista);
        setLoading(false);
    }

    if(loading){
        return <ActivityIndicator animating={true} size="large" color="#FF6701" />
    }

    return(
        <View style={styles.container}>
            <Text>Olá!</Text>
            <FlatList
                data = {state}
                renderItem={
                    ({item}) => (
                        <View style={styles.container}>
                            <Text>{item.nomeMotorista}</Text>
                            <Text>Modelo da moto: {item.modeloMoto}</Text>
                            <Text>Placa da moto: {item.placaMoto}</Text>
                        </View>
                    )
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FCECDD'
    }
})
import React, {useEffect, useState} from 'react';
import firebase from '../../firebase';
import { StyleSheet,Text, View, ActivityIndicator, FlatList, Button, Image } from 'react-native';

export default function ({navigation}){
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState([]);

    
    useEffect(
        () => navigation.addListener('focus', () => {
            pegaDados()
        }), []
    )

    console.log(state);



    //busca o conteúdo da coleção:
    const  pegaDados = async () => {

        //Referência do firebase firestore, acessando a coleção:
        const motot = firebase.db.collection('mototaxista');

        //constante de armazenamento esperando o retorno da função:
        const resposta = await motot.get();

        //constante que recebe os documentos alinhados no formato de array com as informações:
        const dados = resposta.docs;

        //Trazer um a um para receber e mostrar os dados organizados em objeto:
        const listMotos = [];
        dados.auth(
        doc => {
            listMotos.push({
                ...doc.data(),
                key: doc.id
            })
        })    
        setState(listMotos);
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
           
            <FlatList
                data={state}
                renderItem={
                    ({item})=>(
                        <View style={styles.container}>
                            <Text>Nome: {item.dados.nomeMotorista} </Text>
                            <Text>Modelo Moto: {item.dados.modeloMoto} </Text>
                            <Text>Placa: {item.dados.placa} </Text>
                           
                            <View style={styles.container2}>
                            
                        </View>
                        </View>
                )}/>
                
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
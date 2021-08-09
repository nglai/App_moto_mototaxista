import React, {useEffect, useState} from 'react';
import firebase from '../../firebase';
import { StyleSheet,Text, View, ActivityIndicator } from 'react-native';

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
        const cli = firebase.db.collection('clientes');
        const resposta = await cli.doc('06yJarCQ4dZuiKhr4m9kmk3CD2f2').get();
        setState(resposta.data());
        setLoading(false);
      }

    if(loading){
        return <ActivityIndicator animating={true} size="large" color="orange"/>
    }

    return(
        <View style={styles.container}>      
            
                <Text style={styles.h1}>Dados do Cliente:</Text>
                <Text style={styles.texto}>Nome: {state.dados.nome}</Text>
                <Text style={styles.texto}>Celular: {state.dados.celular}</Text>         
            
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        // flex:1,
        backgroundColor:'#FEA82F',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:2,
        borderRadius:20,
        borderColor:'#FCECDD',
        margin:10,
        padding:10
    }, 
     h1:{
        fontSize:20,
        margin:20,
        fontWeight:'bold'
    },
    texto:{
        fontSize:18,  
    },
    botoes:{
        flexDirection:'row',
    }
  });
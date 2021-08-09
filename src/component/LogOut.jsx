import React, {useEffect, useState, useContext} from 'react';
import firebase from '../../firebase';
import { StyleSheet,Text, View, ActivityIndicator, FlatList, Button, Image } from 'react-native';
import { UserContext } from './UserContext';

export default function LogOut(){
    const {deslogado} = useContext(UserContext);

    const [loading, setLoading] = useState(false);
    const [state, setState] = useState([]);

    const logout = async () =>{
        const auth = firebase.auth;
        await auth.signOut();
        deslogado();
    }
    
    useEffect(
        () => {pegaDados()}, []
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
           
            <View>
                <Text style={styles.texto}>Nome: {state.nomeMotorista} </Text>
                <Text>Licença: {state.licenca}</Text>
                <Text>Endereço: {state.endereco}</Text>
                <Text>Modelo Moto: {state.modeloMoto} </Text>
                <Text>Cor: {state.cor}</Text>
                <Text>Placa: {state.placa} </Text>
                <Text>Status: {state.status}</Text>
            </View>
           
            <View>
                <Button title="Logout" onPress={logout} />
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FCECDD'
    },
    texto:{
        fontSize:30,
    }
})
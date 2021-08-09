import React, {useEffect, useState, useContext} from 'react';
import firebase from '../../firebase';
import { StyleSheet,Text, View, ActivityIndicator, FlatList, Button, Image, TouchableOpacity } from 'react-native';
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
        return <ActivityIndicator animating={true} size="large" color="orange"/>
    }

    return(
        <View style={styles.container}>
            <View style={styles.viewImage}>
            <Image
                style={styles.logo}
                source={require('../../imagens/foto.png')}
            />
            <Text style={styles.texto}>{state.nomeMotorista} </Text>
            </View>
            <View style={styles.viewDados}>
                <Text style={styles.textDados}>Modelo Moto: {state.modeloMoto} </Text>
                <Text style={styles.textDados}>Cor: {state.cor}</Text>
                <Text style={styles.textDados}>Placa: {state.placa} </Text>
                <Text style={styles.textDados}>Status: {state.status}</Text>
            </View>
           
            <View style={styles.viewBotao}>
                <TouchableOpacity
                    style={styles.botao}
                    onPress={logout}  
                >
                    <Text style={styles.botaoText}>LogOut</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FEA82F'
    },
    viewImage:{
        flex:2,
        justifyContent:'center',
        alignItems:'center',
        marginTop:'10%',
    },
    logo:{
        height:125,
        width:125,
        borderRadius:'60%'
    },
    texto:{
        fontSize:30,
        marginTop:'2%',
    },
    viewDados:{
        flex:3,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:2,
        borderRadius:20,
        borderColor:'#FCECDD',
        margin:'15%',
        // padding:10

    },
    textDados:{
        fontSize:18
    },
    viewBotao:{
        flex:1,
        alignItems:'center',
    },
    botao:{
        backgroundColor:'#FF6701',
        borderWidth:1,
        borderRadius:50,
        width:'50%',
        padding:'3%',
        textAlign:'center',
        
    },
    botaoText:{
        color:'white',
        fontSize:20, 
    }
})
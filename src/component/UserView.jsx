import {Text, View, Button} from 'react-native';
import React, {useContext, useState} from 'react';
import { UserContext } from './UserContext';
import firebase from '../../firebase';

export default function UserView(){

    const {user, deslogado} = useContext(UserContext);
    const[userView, setUserView] = useState(false);

    const logout = async () => {
        const auth = firebase.auth;
        await auth.signOut();
        deslogado();

    }

    if(userView){
        return(
            <View>
                <Text>Usuário {user.email} Logado</Text>
                <Button title="Logout" onPress={logout}/>
                <Text onPress={() => setUserView(false)}>Ocultar</Text>
            </View>
        )
    }else{
        return(
            <View>
                <Text onPress={() => setUserView(true)}>Usuário</Text>
            </View>
        )
    }
}
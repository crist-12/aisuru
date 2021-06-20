import React, {useLayoutEffect} from 'react'
import { View, Text, Button } from 'react-native'
import styled from 'styled-components'
import  AntDesign  from 'react-native-vector-icons';

const HomeScreen=({navigation})=> {


const signOut = () => {
    auth.signOut().then(()=>{
        navigation.replace('Login');
    }).catch((error)=>{

    });
}

    return (
        <View>
            <Text>HomeScreen</Text>
            <Button title= "SignOut" onPress={()=>signOut()}></Button>
            <Button title= "Chat" onPress={()=>navigation.navigate('Chat')}></Button>
        </View>
    )
}

export default HomeScreen;

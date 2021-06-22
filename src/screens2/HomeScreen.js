import React, {useEffect, useLayoutEffect, useState} from 'react'
import { View, Text, Button, ImageBackground } from 'react-native'
import styled from 'styled-components'
import  AntDesign  from 'react-native-vector-icons';
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import firebase from "../firebase/config";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    flex-direction: column
`


const HomeScreen=({navigation})=> {

let arrayParejas = [];
const [flag, setFlag] = useState(false);


useEffect(()=>{

  handleParejas();
  setTimeout(handleParejas,1000);
},[navigation])


const getTodo = () => {
    const id = firebase.auth().currentUser.uid;
    firebase.firestore().collection('parejas').where('iduser1','==',id).onSnapshot((querySnapShot) => {
        querySnapShot.forEach(doc => {
            arrayParejas.push(doc.data());
        })
    }
    )

    arrayParejas.map(element=>{
        console.log(element);
    })


  /*  firebase.database().ref('users').on('value', (dataSnapshot)=>{
        dataSnapshot.forEach(doc =>{
            console.log(doc.val());
        })
    }) */

}

const qryA = async(id) =>{
  firebase.firestore().collection('parejas').where('iduser1','==',id).onSnapshot((querySnapShot) => {
        querySnapShot.forEach(doc => {
            arrayParejas.push(doc.data());
        })
    }
    )
}

const qryB = async(id)=>{
    firebase.firestore().collection('parejas').where('iduser2','==',id).onSnapshot((querySnapShot) => {
        querySnapShot.forEach(doc => {
            arrayParejas.push(doc.data());
        })
    }
    )
}

const handleParejas = async() => {
    const id = firebase.auth().currentUser.uid;
    await qryA(id);
    setTimeout(qryA,1000);
    if(arrayParejas.length==0){
    await qryB(id);
    setTimeout(qryA,1000);
    }else
    console.log("Tiene pareja :3");


    if(arrayParejas.length==0){
        setFlag(false);
    }else{
        setFlag(true);
    }


    arrayParejas.map(element=>{
        console.log(element);
    })
    
   
}




const signOut = () => {
    firebase.auth().signOut().then(()=>{
        navigation.replace('Login');
    }).catch((error)=>{

    });
}

    return (
        <Container>
            <ImageBackground 
            source = {require('../../assets/background.jpg')}
            resizeMode = {'stretch'}
            style = {{width: '100%', height: '100%'}}
            >
            <Text>HomeScreen</Text>
            <Button title= "SignOut" onPress={()=>signOut()}></Button>
            <Button title= "Chat" onPress={()=>navigation.navigate('Chat')}></Button>
            <Button title= "Get Todo" onPress={()=>handleParejas()}></Button>
                    <View>
                        {
                            flag?
                            <Text>Tiene pareja</Text>
                            :
                            <Text>No tiene pareja</Text>
                        }
                    </View>
</ImageBackground>
        </Container>
    )
}



export default HomeScreen;

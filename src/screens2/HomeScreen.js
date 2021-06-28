import React, {useEffect, useLayoutEffect, useState} from 'react'
import { View, Text, Button, ImageBackground, StyleSheet, Image, TouchableOpacity} from 'react-native'
import styled from 'styled-components'
import  AntDesign  from 'react-native-vector-icons';
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import firebase from "../firebase/config";
import LottieView from 'lottie-react-native'
import { Dimensions } from 'react-native';
import { black } from 'color-name';
import colores from '../utility/colors/colores'
import AwesomeAlert from 'react-native-awesome-alerts';
import DateTimePicker from '@react-native-community/datetimepicker';
import {setIdPareja, getIdPareja} from '../../data_store'


const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const SecondaryContainer = styled.View`
    flex: 1;
  
`

const TrueView = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;   
`

const TextView = styled.View`
    flex: 1;
    width: 100%;
    justify-content: center;
    flex-direction: column;
    padding-left: 20px;
    padding-top: 40px;
`

const CircleView = styled.View`
    flex: 10;
    width: 100%;
    justify-content: center;
    align-items: center;
`

const TextDiv = styled.View`
    flex: 1;
`

const TextName = styled.Text`
    font-size: 20px;
    font-weight: bold;
`

const GreetName = styled.Text`
    font-size: 18px;
    color: gray;
`

const TextoInferior = styled.Text`
    color: ${props => colores.darkviolet};
    font-size: 20;
    font-weight: bold;
`

const SupView =  styled.View`
    flex: 1;
    margin: 20px;
    align-items: center;
`

const MiddleView = styled.View`
    flex: 3;
    margin: 10px;
`

const InputEmail = styled.TextInput`
    flex: 1;
    padding-left: 10;
    color: #05375A;
`

const Action = styled.View`
    flex-direction: row;
    margin-top: 10;
    border-bottom-width: 1;
    border-bottom-color: #F2F2F2;
    padding-bottom: 5;
`

const SignUpText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${props => colores.lightpurple};
`

const BottomView = styled.View`
    flex: 3;
    padding: 15px;
`

const HomeScreen=({navigation})=> {

let arrayParejas = [];
let [searchObject, setSearchObject]=useState('');
const [userSearch, setUserSearch]=useState('');
const [flag, setFlag] = useState(false);
const [loading, setLoading] = useState(true);
const [searching, setSearching] = useState(false);
const [user, setUser] = useState(firebase.auth().currentUser.displayName);
const [search, setSearch] = useState('');
const [date, setDate] = useState(new Date(1598051730000));
const [mode, setMode] = useState('date');
const [show, setShow] = useState(false);


let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;



useEffect(()=>{
  setLoading(true);
  handleParejas();
  setTimeout(handleParejas,1000);
  setTimeout(handleParejas,1000);
  setLoading(false);
},[navigation])

//console.log(firebase.auth().currentUser)


const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };


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
    if(arrayParejas.length==0){
        setFlag(false);
    }else{
        setFlag(true);
    }


    arrayParejas.map(element=>{
        console.log(element);
        setIdPareja(element._id);
    })  
}

//console.log("My Id de pareja es: "+getIdPareja())

const searchPareja = () => {
    if(search){
    setSearching(true);
    firebase.firestore().collection('users').where('email','==',search).onSnapshot((querySnapShot) => {
        querySnapShot.forEach(doc => {

            setUserSearch(doc.data().name);
            setSearchObject(doc.data().id);
            //console.log(doc.data().name);
        })
    }
    )
  //  console.log(firebase.auth().currentUser.email);
    if(firebase.auth().currentUser.email == setUserSearch){
        alert("No puedes agregarte a tí mismo como tu pareja");
        
    }
    setSearching(false);

}else{
    alert("El campo no debe estar vacío")
}
}

const createParejas = () =>{
handleParejas();
if(arrayParejas.length==0){
if(searchObject){
    let data = {
        _id : firebase.auth().currentUser.uid + Math.random(),
        iduser1 : firebase.auth().currentUser.uid,
        iduser2 : searchObject,
        date : date,
        state : true,
    }
    const usersRef = firebase.firestore().collection("parejas");
    usersRef
    .doc()
    .set(data)
    .then(() => {
        console.log("Usuario creado :)");
        alert("Tu relación está registrada");
        handleParejas();
        setUser(firebase.auth().currentUser.displayName);
    })
    
}else{
    alert("Debes buscar primero el email de tu pareja");
}
}else{
    alert("Ya estás en una relación");
}
}

const signOut = () => {
    firebase.auth().signOut().then(()=>{
        navigation.replace('Login');
    }).catch((error)=>{

    });
}

console.log(getIdPareja())
    return (


        <Container>
            {
                loading?
                <LottieView
                style = {{flex:1}}
                source = {require('../lottie/loader.json')}
                autoPlay = {true}
                loop = {true}/>
:
            <ImageBackground 
            source = {require('../../assets/background.jpg')}
            resizeMode = {'stretch'}
            style = {{width: '100%', height: '100%', flex: 1}}
            > 
            
                    <View style={{flex: 1}}>
                        {
                            flag?
                            <SecondaryContainer>
                                <TrueView>
                                    <TextView>
                                        <TextDiv>
                                            <TextName>¡Hola, {user}! </TextName>
                                            <GreetName>¿Cómo ha estado tu día hoy?</GreetName>
                                        </TextDiv>
                                        </TextView>
                                    <CircleView>

                                        <View style={styles.bigCircle}>
                                            <TouchableOpacity onPress={()=>signOut()}>
                                        <View style={styles.smallCircle}>
                                           <Image
                                           source= {require('../../assets/6.png')}
                                           width = {Dimensions.get('window').width*0.5}
                                           height = {Dimensions.get('window').width*0.5}
                                           resizeMode = "center"
                                           
                                           />
                                        </View>
                                        </TouchableOpacity>
                                        </View>
                                    </CircleView>
                                </TrueView>
                            </SecondaryContainer>
                            :
                           <SecondaryContainer>
                               <TrueView>
                                  <View style={styles.cardView}>
                                      <View style={{flex: 1}}>
                                          <SupView>
                                      <TextoInferior>Agrega a tu pareja</TextoInferior>
                                         </SupView>
                                         <MiddleView>
                                         <Text>Email</Text>
                                             <Action>
                                             <InputEmail
                                             placeholder = "Escribe el correo de tu pareja"
                                             value = {search}
                                             onChangeText = {(search) => setSearch(search)}
                                             />
                                             </Action>
                                        <View>
                                            {searching?
                                            <Text>Buscando registros...</Text>
                                            :
                                            <View style={{padding: 15}}>  
                                                <Text>Email: {search}</Text>
                                                <Text>Nombre : {userSearch}</Text>
                                                <Text>Fecha de inicio de relación: </Text>
                                                <TouchableOpacity style={{backgroundColor: "#fff"}} onPress={()=>{setShow(true)}}>
                                                <Text style={{color: "blue", textDecorationLine: 'underline'}}>Definir fecha</Text>
                                                </TouchableOpacity>
                                                {
                                                    show?
                                                    <DateTimePicker
                                                    testID="dateTimePicker"
                                                    value={date}
                                                    mode={mode}
                                                    is24Hour={true}
                                                    display="default"
                                                    onChange={onChange}
                                                    />:
                                                    null
                                                }
                                                <Text>Iniciaron el: {date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</Text>
                                            </View>
                                            
                                            }
                                        </View>
                                        
                                         </MiddleView>
                                         <BottomView>
                                         <View style={styles.button}>
                                         <TouchableOpacity
                                                        onPress = {searchPareja}
                                                        style = {[styles.login, {
                                                            borderColor: colores.lightpurple,  
                                                            borderWidth: 1,
                                                            marginTop: 15
                                                        }]}>
                                                            <SignUpText>Buscar pareja</SignUpText>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                        onPress = {createParejas}
                                                        style = {[styles.login, {
                                                            borderColor: colores.lightpurple,  
                                                            borderWidth: 1,
                                                            marginTop: 15
                                                        }]}>
                                                            <SignUpText>Registrar pareja</SignUpText>
                                            </TouchableOpacity>
                                    </View>
                                    </BottomView>
                                      </View>  
                                  </View>
                               </TrueView>
                            </SecondaryContainer>
                        }
                    </View>
    </ImageBackground>
    }
        </Container>
    )
}


/*<Text>HomeScreen</Text>
            <Button title= "SignOut" onPress={()=>signOut()}></Button>
            <Button title= "Chat" onPress={()=>navigation.navigate('Chat')}></Button>
            <Button title= "Get Todo" onPress={()=>handleParejas()}></Button> */


export default HomeScreen;


const styles = StyleSheet.create({
    bigCircle : {
        width: Dimensions.get('window').width*0.8,
        height: Dimensions.get('window').width*0.8,
        borderRadius: Dimensions.get('window').width*0.8,
        backgroundColor: colores.bigCircleColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    smallCircle : {
        width: Dimensions.get('window').width*0.65,
        height: Dimensions.get('window').width*0.65,
        borderRadius: Dimensions.get('window').width*0.65,
        backgroundColor: colores.smallCircleColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardView: {
        width: Dimensions.get('window').width*0.9,
        height: Dimensions.get('window').height*0.65,
        borderRadius: 20,
        backgroundColor : '#fff'
    },
    login: {
        width: "100%",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
})
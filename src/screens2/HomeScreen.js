import React, {useEffect, useLayoutEffect, useState, LogBox} from 'react'
import { View, Text, Button, ImageBackground, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native'
import styled from 'styled-components'
import firebase from "../firebase/config";
import LottieView from 'lottie-react-native'
import { Dimensions } from 'react-native';
import colores from '../utility/colors/colores'
import {MaterialIcons} from 'react-native-vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker';
import {setIdPareja, getIdPareja} from '../../data_store'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { keyboardVerticalOffset, setUniqueValue } from '../utility/constants'


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
    flex: 1;
    padding: 15px;
`

const HomeScreen=({navigation})=> {

let arrayParejas = [];
let [searchObject, setSearchObject]=useState(null);
const [userSearch, setUserSearch]=useState('');
const [flag, setFlag] = useState(false);
const [loading, setLoading] = useState(true);
const [searching, setSearching] = useState(false);
const [user, setUser] = useState(firebase.auth().currentUser.displayName);
const [search, setSearch] = useState('');
const [date, setDate] = useState(new Date(1598051730000));
const [mode, setMode] = useState('date');
const [show, setShow] = useState(false);
const [status, setStatus] = useState(null);
const [statusSearch, setStatusSearch] = useState(null);
const [banderita, setBanderita] = useState(false);


useEffect(()=>{
  setLoading(true);
  //handleParejas();
  //setTimeout(handleParejas,1000);
  getStatusUser();
  setTimeout(getStatusUser,1000);
  //setTimeout(handleParejas,1000);
  setLoading(false);
},[navigation])


const getStatusUser = () =>{
    var status;
    const id = firebase.auth().currentUser.uid;
    return firebase.firestore().collection('users').where('id','==',id).onSnapshot((querySnapShot) => {
        querySnapShot.forEach(doc => {
          //  console.log(doc.data());
            status = doc.data().status;
            setStatus(doc.data().status);
        })
    })
}
getStatusUser();
console.log("El estatus de pareja es: "+status);
console.log("El estatus de searchObject es: "+searchObject);


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
     //   console.log(element);
        setIdPareja(element._id);
    })  
}

const searchPareja = () => {
    
    setBanderita(true);
    if(search){
    setSearching(true);
    firebase.firestore().collection('users').where('email','==',search).onSnapshot((querySnapShot) => {
        querySnapShot.forEach(doc => {

            setUserSearch(doc.data().name);
            setSearchObject(doc.data().id);
            setStatusSearch(doc.data().status);
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

if(!searchObject){
    alert("Primero debes buscar el registro de tu pareja");
    return;
}
if(statusSearch){
    alert("El usuario que quieres registrar ya tiene pareja");
    return;
}

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

    const usRef = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid);
    usRef.update({
        "status" : true
    })
    .then(()=>{
        console.log("Usuario en pareja");
    })
    .catch(()=>{
        console.log("Hubo un error al setear pareja");
    });

    const usRef2 = firebase.firestore().collection("users").doc(searchObject);
    usRef2.update({
        "status" : true
    })
    .then(()=>{
        console.log("Usuario en pareja 2");
    })
    .catch(()=>{
        console.log("Hubo un error al setear pareja 2");
    });

    let chatdata = {
        _id : data._id,
    }
    const chatRef = firebase.firestore().collection("chats");
    chatRef
    .add({
        _id : chatdata._id
    })
    .then(()=>{console.log("Sala de chat creada exitosamente")})
    .catch(()=>{console.log("Algo salió mal al crear la sala de chat")})
}
}


const signOut = () => {
    firebase.auth().signOut().then(()=>{
        navigation.replace('Login');
    }).catch((error)=>{

    });
}

    return (
        <KeyboardAvoidingView 
        style = {{flex: 1}}
        behavior = {Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset = {keyboardVerticalOffset}
    >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                            status?
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
                                   <View style={[{flex: 1}, styles.prueba]}>
                                   <LottieView
                                                    style = {{flex:1}}
                                                    source = {require('../lottie/sleepy-cat.json')}
                                                    autoPlay = {true}
                                                    loop = {true}/>
                                        </View>
                                    
                                    <View style={styles.cardView}>
                                        <ProgressSteps>
                                            <ProgressStep label="Paso 1" nextBtnText="¡Adelante!">
                                            <View style={{alignItems: 'center', flex:1}}>
                                            
                                                <View style={{flex: 1, marginBottom: 15}}>
                                                <TextoInferior>¡Bienvenido a Aisuru!</TextoInferior>
                                                <TouchableOpacity onPress={signOut}><Text>SignOut</Text></TouchableOpacity>
                                                <Text style={{marginTop: 15}}>Aisuru es más divertido con tu pareja</Text>
                                                <Text style={{marginTop: 10, color: 'gray'}}>¡Comencemos esta aventura!</Text>
                                                </View>
                                            </View>

                                            </ProgressStep>
                                            <ProgressStep label="Paso 2" nextBtnText="¡Adelante!" previousBtnText="Regresar" nextBtnDisabled={!(searchObject && !statusSearch)}>
                                                <View style={{ alignItems: 'center' }}>
                                                <TextoInferior>¡Búsqueda de tu pareja!</TextoInferior>
                                                <Action>
                                                <InputEmail
                                                    placeholder = "Escribe el correo de tu pareja"
                                                    value = {search}
                                                    onChangeText = {(search) => setSearch(search)}
                                             />
                                             </Action>
                                             <TouchableOpacity
                                                onPress={searchPareja}
                                                style = {[styles.login, {
                                                    borderColor: colores.lightpurple,  
                                                    borderWidth: 1,
                                                    marginTop: 15
                                                }]}>
                                            <SignUpText>Buscar</SignUpText>
                                            </TouchableOpacity>
                                            <>
                                            {
                                                !banderita?<></>:
                                            <>
                                            {!statusSearch?
                                                <>
                                                <Text style={{marginTop: 15, fontWeight: 'bold'}}>La persona está <Text style={{color: "green"}}>disponible</Text></Text>
                                                </>:
                                                <>
                                                <Text style={{marginTop: 15, fontWeight: 'bold'}}>La persona está <Text style={{color: "red"}}>en una relación ya</Text></Text>
                                                </>
                                            }
                                            </>
                                                }
                                            </>
                                                </View>
                                            </ProgressStep>
                                            <ProgressStep label="Paso 3" nextBtnText="¡Adelante!" previousBtnText="Regresar">
                                                <View style={{ alignItems: 'center' }}>
                                                <TextoInferior>Fecha de Aniversario</TextoInferior>
                                                <Text style={{margin: 10}}>Selecciona en qué fecha inició tu relación</Text>
                                                <TouchableOpacity
                                                onPress={()=>{setShow(true)}}
                                                style = {[styles.login, {
                                                    borderColor: colores.lightpurple,  
                                                    borderWidth: 1,
                                                    marginTop: 15
                                                }]}>
                                            <SignUpText>Seleccionar Fecha</SignUpText>
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
                                                <Text style={{margin: 10, fontWeight: 'bold'}}>Iniciaron el: {date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</Text>
                                                </View>
                                            </ProgressStep>
                                            <ProgressStep label="Paso 4" previousBtnText="Regresar" finishBtnText="Finalizar" onSubmit={createParejas}>
                                                <View style={{ alignItems: 'center' }}>
                                                <TextoInferior>Ya casi terminamos</TextoInferior>
                                                <Text style={{margin: 10}}>Confirma que los datos son los correctos</Text>
                                                <Text style={{fontWeight: 'bold'}}>Nombre de tu pareja: <Text style={{fontWeight: 'normal'}}>{search}</Text></Text>
                                                <Text style={{fontWeight: 'bold'}}>Email de tu pareja: <Text style={{fontWeight: 'normal'}}>{userSearch}</Text></Text>
                                                <Text style={{fontWeight: 'bold'}}>Su relación inició un <Text style={{fontWeight: 'normal'}}>{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</Text></Text>
                                                </View>
                                            </ProgressStep>
                                        </ProgressSteps>
                                    </View>
                               </TrueView>
                            </SecondaryContainer>
                        }
                    </View>
    </ImageBackground>
    }
        </Container>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}


/* 
<Image 
                                                                source = {require('../../assets/4.png')}
                                                                width = {30}
                                                                height = {30}
                                                                style = {{alignItems: 'center', justifyContent: 'center'}}
                                                                resizeMode = {"center"}
                                                            />


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
                                             <View style={{alignItems: 'center'}}>
                                              <TouchableOpacity
                                                      onPress = {searchPareja}
                                                   // onPress = {signOut}
                                                        style = { {
                                                            borderColor: colores.lightpurple,  
                                                            borderWidth: 1,
                                                         //   marginTop: 15,
                                                            backgroundColor: colores.lightpurple,
                                                           // borderRadius: ""
                                                           width: 30,
                                                           height: 30,
                                                           borderRadius: 15
                                                        }}>
                                                            <MaterialIcons
                                                            name = "person-search"
                                                            size = {22}
                                                            />
                                            </TouchableOpacity>
                                            </View>
                                             </Action>
                                        <View>
                                            {!banderita?
                                            <Text>La persona está <Text>Aqui</Text></Text>
                                            :
                                            <View style={{padding: 15}}>  
                                                <Text>Email: {search}</Text>
                                                <Text>Nombre : {userSearch}</Text>
                                                {!statusSearch?
                                                <>
                                                <Text>La persona está <Text style={{color: "green"}}>disponible</Text></Text>
                                                </>:
                                                <>
                                                <Text>La persona está <Text style={{color: "red"}}>en una relación ya</Text></Text>
                                                </>
                                                }
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
                                         <BottomView >
                                         <View style={styles.button}>
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
                                  </View> */


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
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor : '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1.7
    },
    login: {
        width: "100%",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    progressCard : {
        width : "100%",
        height : "100%",
        backgroundColor : 'gray',
        flex: 1
    },
    prueba: {
        width: Dimensions.get('window').width*0.9,
        height: Dimensions.get('window').height*0.65,
        backgroundColor: 'white'
    }
})
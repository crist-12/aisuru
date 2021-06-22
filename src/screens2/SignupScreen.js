import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme, KeyboardAvoidingView, TouchableWithoutFeedback,Keyboard } from 'react-native'
import styled from 'styled-components'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Fontisto from 'react-native-vector-icons/Fontisto'
import AntDesign from 'react-native-vector-icons/AntDesign'
import AwesomeAlert from 'react-native-awesome-alerts';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import {SignUpRequest, AddUser} from '../network';
import firebase from '../firebase/config';
import { Store } from '../context/store'
import { setAsyncStorage, keys } from '../asyncStorage';
import { setUniqueValue } from '../utility/constants'

import colores from '../utility/colors/colores'
import { LOADING_STOP } from '../context/actions/type'


const Container = styled.View`
    flex:1;
    background: ${props => colores.background_splash};
`

const Header = styled.View`
    flex:1; 
    background: ${props => colores.background_splash};
    justify-content: center;
    align-items: center;
    paddingHorizontal: 20;
    paddingBottom: 25;
`

const TextHeader = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 30;
`
const TextFooter = styled.Text`
    color: ${props => colores.background_splash};
    font-size: 18;
`
const Action = styled.View`
    flex-direction: row;
    margin-top: 10;
    border-bottom-width: 1;
    border-bottom-color: #F2F2F2;
    padding-bottom: 5;
`
const InputEmail = styled.TextInput`
    flex: 1;
    padding-left: 10;
    color: #05375A;
`
const ForgotText = styled.Text`
    color: #009BD1;
    margin-top: 15;
`
const SignText = styled.Text`
    font-size: 18;
    font-weight: bold;
    color: white;
`
const SignUpText = styled.Text`
    font-size: 18;
    font-weight: bold;
    color: ${props => colores.lightpurple};
`

const SignUpScreen=({navigation}) => {

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [password2, setPassword2] = useState('');
const [urlPhoto, setUrlPhoto] = useState('');
const [error, setError] = useState(false);
const [error2, setError2] = useState(false);
const [eye, setEye] = useState(true);
const [eye2, setEye2] = useState(true);



//const globalState = useContext(Store);
//const { dispatchLoaderAction } = globalState;


const handleCancel = () =>{
    setError(false);
}

const handleCancel2 = () =>{
    setError2(false);
}

const handleEye = () => {
    setEye(!eye);
}

const handleEye2 = () => {
    setEye2(!eye2);
}


const Register = () =>{
/*
    auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) =>{
        var user = userCredential.user;

        user.updateProfile({
            displayName: name,
            photoURL: urlPhoto ? urlPhoto : "https://i.pinimg.com/564x/d2/97/a3/d297a3eced48990f8001c8624ec84145.jpg"
          }).then(function() {
            // Update successful.
          }).catch(function(error) {
            alert(errorMessage);
          });
          navigation.popToTop();
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
    });*/

    if(!email){
        setError(true);
      } else if(!password){
          setError(true);
        }else if(!password2){
            setError(true);
            }else if(password !== password2){
                setError2(true);
    }else{
       /* dispatchLoaderAction({
          type: LOADING_START,
        }); */
        SignUpRequest(name, email, password)
          .then((res) => {
            if (!res.additionalUserInfo) {
            /*  dispatchLoaderAction({
                type: LOADING_STOP,
              });
              alert(res);*/
              return;
            }
            let uid = firebase.auth().currentUser.uid;
            let profileImg = "";
            AddUser(name, email, uid, profileImg)
              .then(() => {
                setAsyncStorage(keys.uuid, uid);
                setUniqueValue(uid);
                /*dispatchLoaderAction({
                  type: LOADING_STOP,
                }); */
                navigation.replace("Home");
              })
              .catch((err) => {
              /*  dispatchLoaderAction({
                  type: LOADING_STOP,
                }); */
                alert(err);
              });
          })
          .catch((err) => {
          /*  dispatchLoaderAction({
              type: LOADING_STOP,
            }); */
          //  alert(err);
          });
      }

}

    return (
        <KeyboardAvoidingView 

        style = {{flex: 1}}
        keyboardVerticalOffset={-50}
        behavior = {Platform.OS === 'ios' ? 'padding' : 'height'}
    >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
            <Header>
                <TextHeader>Crear una cuenta</TextHeader>
            </Header>
            <AwesomeAlert
                show={error}
                showProgress={false}
                title="¡Oh, oh!"
                message="Ingresa todos los datos solicitados"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                cancelText="Entendido"
                confirmButtonColor="#DD6B55"
                onCancelPressed={() => handleCancel()}
            />
            <AwesomeAlert
                show={error2}
                showProgress={false}
                title="¡Oh, oh!"
                message="Tus contraseñas no coinciden"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                cancelText="Entendido"
                confirmButtonColor="#DD6B55"
                onCancelPressed={() => handleCancel2()}
            />
            <Animatable.View animation={"fadeInUpBig"} style={styles.footer}>
                <TextFooter>Nombre: </TextFooter>
                <Action>
                    <FontAwesome                 
                    name = "user-o"
                    color = {colores.darkpurple}
                    size = {20}/>
                    <InputEmail
                    placeholder = "Escriba su nombre"
                    value = {name}
                    onChangeText = {name => setName(name)}
                    />
                    <Feather 
                    name = "check-circle"
                    color = "green"
                    size = {20}
                    />
                </Action>
                <TextFooter style={styles.password}>Correo electrónico: </TextFooter>
                <Action>
                    <Fontisto                 
                    name = "email"
                    color = {colores.darkpurple}
                    size = {20}/>
                    <InputEmail
                    placeholder = "Escriba su correo"
                    value = {email}
                    onChangeText = {email => setEmail(email)}
                    />
                    <Feather 
                    name = "check-circle"
                    color = "green"
                    size = {20}
                    />
                </Action>

                <TextFooter style={styles.password}>Contraseña: </TextFooter>
                <Action>
                    <FontAwesome                 
                    name = "lock"
                    color = {colores.darkpurple}
                    size = {20}/>
                    <InputEmail
                    placeholder = "Escriba su contraseña"
                    value  = {password}
                    onChangeText = {(password) => setPassword(password)}
                    secureTextEntry = {eye}
                    />
                <TouchableOpacity onPress={()=>handleEye()}>
                    {
                    eye ?
                    <Feather 
                        name = "eye-off"
                        color = "gray"
                        size = {20}
                    />:
                    <Feather 
                        name = "eye"
                        color = "gray"
                        size = {20}
                    />
                }
                    </TouchableOpacity>
                </Action>

                <TextFooter style={styles.password}>Confirmar contraseña: </TextFooter>
                <Action>
                    <FontAwesome                 
                    name = "lock"
                    color = {colores.darkpurple}
                    size = {20}/>
                    <InputEmail
                    placeholder = "Escriba su contraseña"
                    value  = {password2}
                    onChangeText = {(password2) => setPassword2(password2)}
                    secureTextEntry = {eye2}
                    />
                <TouchableOpacity onPress={()=>handleEye2()}>
                    {
                    eye2 ?
                    <Feather 
                        name = "eye-off"
                        color = "gray"
                        size = {20}
                    />:
                    <Feather 
                        name = "eye"
                        color = "gray"
                        size = {20}
                    />
                }
                    </TouchableOpacity>
                </Action>
                <View style={styles.button}>
                            <TouchableOpacity
                            onPress= {Register}
                            style = {[styles.login, {
                                borderColor: colores.lightpurple,
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                            >
                                <SignUpText>Crear cuenta</SignUpText>
                            </TouchableOpacity>
                </View>
            </Animatable.View>
        </Container>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default SignUpScreen;

const styles = StyleSheet.create({
    footer: {
        flex:4,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
    password: {
        marginTop: 15,
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    login: {
        width: "100%",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
});
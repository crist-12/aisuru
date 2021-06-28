import React, {useState, useEffect, useContext} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native'
import styled from 'styled-components'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import * as Animatable from 'react-native-animatable';
import {LoginRequest} from '../network';
import colores from '../utility/colors/colores'
import AwesomeAlert from 'react-native-awesome-alerts';
import { Store } from '../context/store'
import { LOADING_START, LOADING_STOP } from '../context/actions/type'
import { setAsyncStorage, keys } from '../asyncStorage'
import { keyboardVerticalOffset, setUniqueValue } from '../utility/constants'

import firebase from "../firebase/config";

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
    paddingBottom: 50;
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
    color: ${props => colores.lightpurple};
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

const LoginScreen=({navigation}) => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState(false);
const [eye, setEye] = useState(true);
const [catchError, setCatchError] = useState(false); 

const globalState = useContext(Store);
const { dispatchLoaderAction } = globalState;

const signIn = () => {
    if(!email){
      setError(true);
    }else if(!password){
        setError(true);
    }else{
       /* dispatchLoaderAction({
            type: LOADING_START,
        });
        setTimeout(()=>{
            dispatchLoaderAction({
                type: LOADING_STOP,
            });
        },2000); */
        LoginRequest(email, password)
        .then((res)=>{
            setAsyncStorage(keys.uuid, res.user.uid);
            setUniqueValue(res.user.uid);
           // navigation.replace("Home");
           navigation.replace("myTabs",{screen: "Home"});
        })
        .catch((error)=>{
            var errorCode = error.code;
            var errorMessage = error.message;
            <AwesomeAlert
                    show={catchError}
                    showProgress={false}
                    title="¡Oh, no!"
                    message= {errorMessage}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    cancelText="Entendido"
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => handleError()}
                />
        })
    }

    /*
    auth.signInWithEmailAndPassword(email, password)
    .catch((error)=>{
        var errorCode = error.code;
        var errorMessage = error.message;
        <AwesomeAlert
                show={catchError}
                showProgress={false}
                title="¡Oh, no!"
                message= {errorMessage}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                cancelText="Entendido"
                confirmButtonColor="#DD6B55"
                onCancelPressed={() => handleError()}
            />
    }) */
}

const handleCancel = () =>{
    setError(false);
}

const handleError = () =>{
    setCatchError(false);
}

const handleEye = () => {
    setEye(!eye);
}

useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(
        function(user){
            if(user){
                navigation.replace("myTabs",{screen: "Home"});
            }else{
               
            }
        }
    )
    return unsubscribe; 
}, [])


    return (
    <KeyboardAvoidingView 
        style = {{flex: 1}}
        behavior = {Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset = {keyboardVerticalOffset}
    >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
            <Header>
                <TextHeader>¡Bienvenido, Christopher! :)</TextHeader>
            </Header>
            <AwesomeAlert
                show={error}
                showProgress={false}
                title="¡Oh, oh!"
                message="Ingresa tu correo y tu contraseña"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                cancelText="Entendido"
                confirmButtonColor="#DD6B55"
                onCancelPressed={() => handleCancel()}
            />
            <Animatable.View animation={"fadeInUpBig"} style={styles.footer}>

                <TextFooter>Email: </TextFooter>
                <Action>
                    <FontAwesome                 
                    name = "user-o"
                    color = {colores.darkpurple}
                    size = {20}/>
                    <InputEmail
                    placeholder = "Escriba su email"
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
                <ForgotText>¿Olvidaste tu contraseña?</ForgotText>
                <View style={styles.button}>

                    <TouchableOpacity
                                onPress= {signIn}
                                style = {[styles.login, {
                                    borderColor: colores.lightpurple,  
                                    borderWidth: 1,
                                    marginTop: 15
                                }]}>
                                    <SignUpText>Entrar</SignUpText>
                    </TouchableOpacity>

                    <TouchableOpacity
                                onPress= {()=>navigation.navigate("SignUp")}
                                style = {[styles.login, {
                                    borderColor:colores.lightpurple,  
                                    borderWidth: 1,
                                    marginTop: 15
                                }]}>
                                    <SignUpText>Crear cuenta</SignUpText>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </Container>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    footer: {
        flex:3,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
    password: {
        marginTop: 35,
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
import React from 'react';
import { View, Text, StatusBar, Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import * as Animatable from 'react-native-animatable';
//import  LinearGradient  from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colores from '../utility/colors/colores'

const Container = styled.View`
    flex:1;
    background: ${props => colores.background_splash};
`
const Header = styled.View`
    flex:2;
    background: ${props => colores.background_splash};
    justify-content: center;
    align-items: center;
`

const Footer = styled.View`
    flex:1;
    justify-content: center;
    background: white;
    border-top-left-radius: 30;
    border-top-right-radius: 30;
    paddingVertical: 50;
    paddingHorizontal: 30;
`

const TextoInferior = styled.Text`
    color: ${props => colores.darkviolet};
    font-size: 30;
    font-weight: bold;
`

const SignIn = styled.Text`
    color: gray;
    margin-top: 5;
`

const SignText = styled.Text`
    color: white;
    font-weight: bold;
`



const {height} = Dimensions.get("screen");
const height_logo = height * 0.7 * 0.4;

const SplashScreen=({navigation})=>{
    return (
        <Container>
            <StatusBar barStyle="light-content"/>
                <Header>
                    <Animatable.Image 
                    animation = "bounceIn"
                    duration = {1500}
                    source= {require('../../assets/5.png')}
                    resizeMode = {"center"}
                    height = {100}
                    width = {100}
                    />
                </Header>
                <Animatable.View style={styles.footer} animation={"fadeInUpBig"}>
                <TextoInferior>Mantente conectado con quien quieres</TextoInferior>
                    <SignIn>Ingresa con tu cuenta</SignIn>
                    <View style={styles.button}>
                        <TouchableOpacity
                        onPress = {()=>navigation.navigate('Login')}
                        >
                            <LinearGradient 
                            colors={["#4C2882", "#4C2882"]}
                            style={styles.login}
                            >
                                <SignText>¡Empecemos!</SignText>
                                <MaterialIcons name="navigate-next"
                                color="white"
                                size={20}
                                />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
        </Container>
    )
}

const styles = StyleSheet.create({
    footer: {
        flex:1,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    login: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    }
})

export default SplashScreen;

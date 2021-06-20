
import { useEffect } from 'react';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ShakeEventExpo } from './shake';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'; 
import  LoginScreen  from './src/screens2/LoginScreen';
import  SplashScreen  from './src/screens2/SplashScreen';
import  SignUpScreen  from './src/screens2/SignupScreen';
import { Loader } from './src/components/loader'
import { StoreProvider } from './src/context/store';
import  HomeScreen from './src/screens2/HomeScreen';
//import  ChatScreen from './src/screens2/ChatScreen';

export default function App() {

 /* useEffect(() => {
    ShakeEventExpo.addListener(()=>{
      console.log("Shake shake shake");
    })
  }, []) */

  const Stack = createStackNavigator();

  return (
    <StoreProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}}/> 
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}}/> 
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/> 
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/> 
      </Stack.Navigator>
    </NavigationContainer>
    </StoreProvider>
  );
}

/*   <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}}/> 
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/> 
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/> 
        <Stack.Screen name="Chat" component={ChatScreen} /> */
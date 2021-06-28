
import { useEffect } from 'react';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ShakeEventExpo } from './shake';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  LoginScreen  from './src/screens2/LoginScreen';
import  SplashScreen  from './src/screens2/SplashScreen';
import  SignUpScreen  from './src/screens2/SignupScreen';
import  ProfileScreen  from './src/screens2/ProfileScreen';
import  EventScreen  from './src/screens2/EventScreen';
import  ChatScreen  from './src/screens2/ChatScreen';
import  AboutScreen from './src/screens2/AboutScreen';
import { Loader } from './src/components/loader'
import { StoreProvider } from './src/context/store';
import  HomeScreen from './src/screens2/HomeScreen';
import colores from './src/utility/colors/colores';
import {Ionicons, MaterialCommunityIcons} from 'react-native-vector-icons'

import firebase from './src/firebase/config';
//import  ChatScreen from './src/screens2/ChatScreen';

export default function App() {


 /* useEffect(() => {
    ShakeEventExpo.addListener(()=>{
      console.log("Shake shake shake");
    })
  }, []) */

  //if(firebase.auth().currentUser.uid == null) flag = false;

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();



  function myTabs(){
    return(
      <Tab.Navigator tabBarOptions={{activeTintColor: colores.darkviolet}}>
         <Tab.Screen name="Perfil" component={ProfileScreen} options={{tabBarIcon:({color,size})=>(<Ionicons name="person" size={18} color={colores.darkviolet} />)}}/> 
         <Tab.Screen name="Chat" component={ChatScreen} options={{tabBarIcon:({color,size})=>(<Ionicons name="chatbubble-ellipses" size={18} color={colores.darkviolet} />)}}/> 
          <Tab.Screen name="Home" component={HomeScreen} options={{tabBarIcon:({color,size})=>(<Ionicons name="home" size={18} color={colores.darkviolet} />)}} /> 
          <Tab.Screen name="Event" component={EventScreen} options={{tabBarIcon:({color,size})=>(<MaterialCommunityIcons name="party-popper" size={18} color={colores.darkviolet} />)}}/> 
          <Tab.Screen name="Acerca" component={AboutScreen} options={{tabBarIcon:({color,size})=>(<Ionicons name="information" size={18} color={colores.darkviolet} />)}}/> 
      </Tab.Navigator>
    )
  }

  return (
    <StoreProvider>
      <NavigationContainer>
        {
          <>
            <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}}/> 
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/> 
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}}/> 
            <Stack.Screen name = "myTabs" component = {myTabs} options={{headerShown: false}}/>
            </Stack.Navigator>
          </>
        }
      </NavigationContainer>
      </StoreProvider>
  );
}
// navigation.navigate("App", {screen: "Home"});

/*   <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}}/> 
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/> 
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/> 
        <Stack.Screen name="Chat" component={ChatScreen} /> 
        
        
        
        
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
        
        
        
        
        
        
        */
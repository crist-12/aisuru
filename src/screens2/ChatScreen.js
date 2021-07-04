import React, { useLayoutEffect, useEffect, useState, useCallback } from 'react'
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements' 
import firebase from "../firebase/config"
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import { getIdPareja, setIdPareja } from "../../data_store";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import colores from '../utility/colors/colores'
import ImgToBase64 from 'react-native-image-base64'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-picker';
import * as Permissions from 'expo-permissions';
import CircleButton from 'react-native-circle-floatmenu';
import Icon from 'react-native-vector-icons/Ionicons';

const ChatScreen = ({navigation}) => {

const [messages, setMessages] = useState([]);
const [id, setId] = useState(getIdPareja());
const [image, setImage] = useState(null);
const [uploading, setUploading] = useState(false);
const [transferred, setTransferred] = useState(0);


  useEffect(()=>{
      console.log("El id de chat es: "+getIdPareja())
      setId(getIdPareja());
      console.log(id);
  },[])


  useLayoutEffect(()=>{
    let objArray = {
      _id : "",
      createdAt : new Date(),
      text : "",
      user : {}
    }
    let msgObject = []
    const unsubscribe = firebase.firestore().collection("chats").doc(id).collection("mensajes").orderBy('createdAt','desc')
    .onSnapshot((snap)=> setMessages(
      snap.docs.map(doc =>({
        _id : doc.data()._id,
        createdAt : doc.data().createdAt.toDate(),
        text : doc.data().text,
        user : doc.data().user
       // msgObject.push(objArray);
        //console.log(messages);
        //console.log(msgObject);
       // console.log(objArray);
        //msgObject.push(objArray);
        //setMessages(msgObject);
      }))
      )
    )
    
  //  setMessages(msgObject);
    
    return unsubscribe;
  },[])


  const askForPermission = async () => {
    const permissionResult = 
    await Permissions.askAsync(Permissions.CAMERA)
    if (permissionResult.status !== 'granted') {
      Alert.alert('no permissions to access camera!', 
      [{ text: 'ok'}])
      return false
    }
    return true
  }

const uploadImage = async () => {
// make sure that we have the permission
const hasPermission = await askForPermission()
if (!hasPermission) {
  return
} else {
  // launch the camera with the following settings
  let result = await ImagePicker.launchImageLibrary({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [3, 3],
    quality: 1,
    base64: true,
  })
  // make sure a image was taken:
  if (!result.cancelled) {
    console.log(result.uri);
   // setImage(result.uri);
  }
}
}

const takeImage = async () => {
  // make sure that we have the permission
  const hasPermission = await askForPermission()
  if (!hasPermission) {
    return
  } else {
    // launch the camera with the following settings
    let result = await ImagePicker.launchImageLibrary({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
      base64: true,
    })
    // make sure a image was taken:
    if (!result.cancelled) {
      uploadImage(result.uri)
      .then(()=>{
        alert("Exito")
      })
      .catch((error)=>{
        alert(error);
      })
    }
  }
}

const photo = (props) =>{
return(
      <TouchableOpacity style={{margin: 10}} onPress={uploadImage}>
        <Feather name="camera" size={22} color={colores.darkviolet}/>
      </TouchableOpacity>
)
}

  const scrollToBottomComponent = (props) => {
    return (
      <FontAwesome
      name = "angle-double-down"
      size = {22}
      color = "#333"
       />
    )
  }

  const renderSend = (props) =>{
    return(
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
          name = "send-circle"
          size = {32}
          style = {{marginBottom: 5, marginRight: 5}}
          color = {colores.middlepurple}
          />
        </View>
      </Send>
    )
  }


  const onSend = useCallback((messages = []) => {





    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    const {
        _id,
        createdAt,
        text,
        user
    }=messages[0];

      var chatRef = firebase.firestore().collection("chats").doc(id).collection("mensajes");
        chatRef
        .doc((Math.random()*(999999-1)+1).toString())
        .set({
          _id,
          createdAt,
          text,
          user
        })
        .then(()=>{
          console.log("Mensaje enviado :)");
        })
        .catch((error)=>{
          console.log("Pasó algo malo :(");
        })

  }, [])


    return (
      <ImageBackground 
      source = {require('../../assets/background.jpg')}
      resizeMode = {'stretch'}
      style = {{width: '100%', height: '100%', flex: 1}}
      > 
        <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.navigate('myTabs',{screen: 'Home'})}>
          <AntDesign
          name= "back"
          color = "black"
          size = {22}/>
        </TouchableOpacity>
          <View style={{marginLeft: 15}}>
            <Text style={{fontWeight: 'bold'}}>Mensajería</Text>
          </View>
        </View>
 
        <GiftedChat
        renderBubble={props => {
            return (
              
              <Bubble
                {...props}
      
                textStyle={{
                  right: {
                    color: 'white',
                  },
                  left: {
                    color: '#24204F',
                  },
                }}
                wrapperStyle={{
                  left: {
                    backgroundColor: '#E6F5F3',
                  },
                  right: {
                    backgroundColor: "#3A13C3",
                  },
                }}
              />
            );
          }}  
            messages={messages}
            placeholder = "Escribe..."
            showAvatarForEveryMessage = {true}
            onSend={messages => onSend(messages)}
            user={{
                _id: firebase.auth().currentUser?.email,
                name : firebase.auth().currentUser?.displayName
            }}
            alwaysShowSend = {true}
            renderSend ={renderSend}
            scrollToBottom = {true}
            scrollToBottomComponent = {scrollToBottomComponent}
            renderActions = {photo}
        />
        </ImageBackground>
    )
}

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 40
  },
  header: {
    height: 40,
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
  }
})

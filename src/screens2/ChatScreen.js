import React, { useLayoutEffect, useEffect, useState, useCallback } from 'react'
import { View, Text } from 'react-native'
import { Avatar } from 'react-native-elements' 
import firebase from "../firebase/config"
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { getIdPareja, setIdPareja } from "../../data_store";


const ChatScreen = ({navigation}) => {

const [messages, setMessages] = useState([]);
const [id, setId] = useState(null);


  useEffect(()=>{
      console.log("El id de chat es: "+getIdPareja())
      setId(getIdPareja());
  },[])


  useLayoutEffect(()=>{
    let objArray = {
      _id : "",
      createdAt : "",
      text : "",
      user : {}
    }
    let msgObject = []
    const unsubscribe = firebase.firestore().collection("chats").doc(getIdPareja()).collection("mensajes").orderBy('createdAt','desc')
    .onSnapshot((snap)=> setMessages(
      snap.docs.map(doc =>({
        _id : doc.data()._id,
        createdAt : doc.data().createdAt,
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
            showAvatarForEveryMessage = {true}
            onSend={messages => onSend(messages)}
            user={{
                _id: firebase.auth().currentUser?.email,
                name : firebase.auth().currentUser?.displayName
            }}
        />
    )
}

export default ChatScreen;

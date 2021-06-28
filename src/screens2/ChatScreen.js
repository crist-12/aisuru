import React, { useLayoutEffect, useEffect, useState, useCallback } from 'react'
import { View, Text } from 'react-native'
import { Avatar } from 'react-native-elements' 

import { GiftedChat, Bubble } from 'react-native-gifted-chat';


const ChatScreen = ({navigation}) => {

const [messages, setMessages] = useState([]);

  useLayoutEffect(()=>{
     const unsubscribe = db.collection('chats').orderBy('createdAt','desc').onSnapshot(
          snapshot => setMessages(
              snapshot.docs.map(doc=>({
                _id : doc.data()._id,
                createdAt : doc.data().createdAt.toDate(),
                text : doc.data().text,
                user : doc.data().user
              }))
          )
      )
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
    db.collection('chats').add({
        _id,
        createdAt,
        text,
        user
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
        /*    user={{
                _id: auth.currentUser?.email,
                name : auth.currentUser?.displayName,
                avatar: auth.currentUser?.photoURL
            }} */
        />
    )
}

export default ChatScreen;

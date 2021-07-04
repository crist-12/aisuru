import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import styled from 'styled-components'
import { Avatar, Accessory } from 'react-native-elements'
import { getCoupleObject, getDateData, getIdPareja, getUserCod } from '../../data_store'
import firebase from "../firebase/config"
import * as ImagePicker from 'expo-image-picker';
import colores from '../utility/colors/colores'
import moment from 'moment'

const Container = styled.View`
    flex: 1;
`

const HeaderView = styled.View`
    flex : 1;
    justify-content: space-around;
    margin-top: 40;
`

const AvatarView = styled.View`
    flex : 1;
    flex-direction: row;
    justify-content: space-around;
`


const MiddleView = styled.View`
    flex : 1;
    background-color : ${props => colores.lightpurple};
`

const AlbumView = styled.View`
    flex : 2;
    background-color : green;
`


const ProfileScreen=({navigation}) => {
const [coupleName, setCoupleName] = useState("");
const [couplePhoto, setCouplePhoto] = useState();
const [image, setImage] = useState("");
const [link, setLink] = useState("");
const [days, setDays] = useState(0);
const [hours, setHours] = useState(0);
const [minutes, setMinutes] = useState(0);
const [seconds, setSeconds] = useState(0);


useEffect(() => {
    getIdPareja();
    coupleData();
    setImage(firebase.auth().currentUser.photoURL);
    console.log(getDateData());
    diffDates();
   // console.log(firebase.auth().currentUser.photoURL);
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

const coupleData = () => {
    return firebase.firestore().collection('users').where('id','==',getUserCod().toString()).onSnapshot((querySnapShot) => {
        querySnapShot.forEach(doc => {
          console.log(doc.data());
          setCoupleName(doc.data().name);
          setCouplePhoto(doc.data().photoUrl);
        })
    })
}

const diffDates = () =>{
    var aux = getDateData();
    var now = new Date().getTime();
    now = Math.floor(now / 1000);



    var secPerMinute = 60;
    var secPerHour = secPerMinute * 60;
    var SecPerDay = secPerHour * 24;
    

    console.log("Aux es: "+aux);
    console.log("Hoy es: "+now);
    var diff = now - aux;


    var days = Math.floor(diff/SecPerDay);
    diff = diff - (days * SecPerDay);

    var hours = Math.floor(diff/secPerHour);
    diff = diff - (hours * secPerHour);
    
    var minutes = Math.floor(diff/secPerMinute);
    diff = diff - (minutes * secPerMinute);

    var seconds = Math.floor(diff);

    console.log(days);
    setDays(days);
    console.log(hours);
    setHours(hours);
    console.log(minutes);
    setMinutes(minutes);
    console.log(seconds);
    setSeconds(seconds);
}





const pickImage = async() =>{
    let result = await ImagePicker.launchImageLibraryAsync();
    //let result = await ImagePicker.launchImageLibraryAsync();
    //console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
      example(result.uri, "Holi");
        
    }
  }

  const example = async(uri, imageName) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  
    const ref = firebase
      .storage()
      .ref()
      .child("profiles/"+firebase.auth().currentUser.uid);
    const snapshot = await ref.put(blob);
  
    // We're done with the blob, close and release it
    blob.close();
  
    const link3 = await snapshot.ref.getDownloadURL();
    setLink(link3);

  //  console.log(firebase.auth().currentUser);

    firebase.auth().currentUser.updateProfile({
        photoURL : link3
      })
      .then(()=>{
       // console.log(firebase.auth().currentUser)
        console.log("Foto actualizado")
        //console.log(response.user)
      })
      .catch(()=>{
        alert("OCURRIO UN ERROR")
      })

    const usRef = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid);
    usRef.update({
        "photoUrl" : link3
    })
    .then(()=>{
        console.log("Foto actualizadas");
    })
    .catch(()=>{
        console.log("Ocurrió un error al actualizar la foto");
    });
  }

    return (
        <Container>
           <HeaderView>
               <AvatarView>
               <Avatar
               size="large"
               rounded
               source={{
               uri : firebase.auth().currentUser.photoURL
              }}
              onPress = {pickImage}
              avatarStyle = {{borderWidth: 2, borderColor: colores.middlepurple}}
                >
                    <Avatar.Accessory
                        name="pencil-alt"
                        type="font-awesome-5"
                        size={20}
                    />
                </Avatar>
                <Text style={{fontSize:18}}>&</Text>
                <Avatar
               size="large"
               rounded
               source={{
                uri: couplePhoto
              }}
              avatarStyle = {{borderWidth: 2, borderColor: colores.middlepurple}}
                />
            </AvatarView>
            <AvatarView>
                <Text style={{marginTop: 20}}>{firebase.auth().currentUser.displayName}</Text>
                <Text style={{fontSize:18, color: 'white'}}>.</Text>
                <Text style={{marginTop: 20}}>{coupleName}</Text>
            </AvatarView>
           </HeaderView>
           <MiddleView style={{alignItems: 'center'}}>
               <Text>En una relación con {coupleName} desde hace</Text>
               <Text>{days} días</Text>
               <Text>{hours} horas</Text>
               <Text>{minutes} minutos</Text>
               <Text>{seconds} segundos</Text>
           </MiddleView>
           <AlbumView><Text>H</Text></AlbumView>
        </Container>
    )
}

export default ProfileScreen;

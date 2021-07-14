import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView , TouchableOpacity, FlatList, Image} from 'react-native'
import styled from 'styled-components'
import { Avatar, Accessory } from 'react-native-elements'
import { getCoupleObject, getDateData, getIdPareja, getUserCod } from '../../data_store'
import firebase from "../firebase/config"
import * as ImagePicker from 'expo-image-picker';
import colores from '../utility/colors/colores'
import { Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from'react-native-vector-icons/MaterialIcons'
import Gallery from 'react-native-image-gallery';

const Container = styled.View`
    flex: 1;
`

const HeaderView = styled.View`
    flex : 1;
    
`

const AvatarView = styled.View`
    flex : 1;
`


const MiddleView = styled.View`
    flex : 1;
    background-color : ${props => colores.lightpurple};
    border-radius: 20px;
`

const AlbumView = styled.View`
    flex : 2;
    background-color : green;
`


const ProfileScreen=({navigation}) => {
let arrayPhotos = [];
const [coupleName, setCoupleName] = useState("");
const [couplePhoto, setCouplePhoto] = useState();
const [image, setImage] = useState("");
const [link, setLink] = useState("");
const [days, setDays] = useState(0);
const [hours, setHours] = useState(0);
const [minutes, setMinutes] = useState(0);
const [seconds, setSeconds] = useState(0);
const [years, setYears] = useState(0);
const [datos, setDatos] = useState([
  {image: 'http://i.imgur.com/XP2BE7q.jpg', key: 'http://i.imgur.com/XP2BE7q.jpg'},
  {image: 'http://i.imgur.com/XP2BE7q.jpg', key: 'http://i.imgur.com/XP2BE7q.jpg'},
  {image: 'http://i.imgur.com/XP2BE7q.jpg', key: 'http://i.imgur.com/XP2BE7q.jpg'},
  {image: 'http://i.imgur.com/XP2BE7q.jpg', key: 'http://i.imgur.com/XP2BE7q.jpg'},
  {image: 'http://i.imgur.com/XP2BE7q.jpg', key: 'http://i.imgur.com/XP2BE7q.jpg'},
])


useEffect(() => {
    getIdPareja();
    coupleData();
    setImage(firebase.auth().currentUser.photoURL);
    console.log(getDateData());
    diffDates();
    obtenerDatos();
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

/*
* Esta será la funcion para obtener las fotos :)
const getAllPhotos = () =>{
  return firebase.firestore().collection('photos').where('id','==',getIdPareja()).onSnapshot((querySnapShot) => {
    querySnapShot.forEach(doc => {

    })
  })
}*/





const diffDates = () =>{
    var aux = getDateData();
    var now = new Date().getTime();
    now = Math.floor(now / 1000);



    var secPerMinute = 60;
    var secPerHour = secPerMinute * 60;
    var SecPerDay = secPerHour * 24;
    var secPerYear = SecPerDay * 365;

    console.log("Aux es: "+aux);
    console.log("Hoy es: "+now);
    var diff = now - aux;


    var years = Math.floor(diff/secPerYear);
    diff = diff - (years * secPerYear);

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
    setYears(years);
}


const listAllPhotos = async() => {
 var listRef = firebase.storage().ref().child('profiles/');


  listRef.listAll().then(function(res){
     res.items.forEach(function(itemRef){
      itemRef.getDownloadURL().then(function (link) {
        console.log(link);
        arrayPhotos.push(link);
      })
    
   })
 })
}

const obtenerDatos = async() => {
  await listAllPhotos();
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

    return(
      <Container style={{flex: 1}}>  
        <View style={{backgroundColor: colores.middlepurple, flex:1}}>
        <View style={styles.header}>
          <View style={styles.leftView}>
          <Avatar
               size="large"
               rounded
               source={{
               uri : firebase.auth().currentUser.photoURL
              }}
              onPress = {pickImage}
            //  avatarStyle = {{borderWidth: 2, borderColor: colores.middlepurple}}
                >
                    <Avatar.Accessory
                        name="pencil-alt"
                        type="font-awesome-5"
                        size={20}
                    />
                </Avatar>
          </View>
          <View style={styles.rightView}>
          <Avatar
               size="large"
               rounded
               source={{
               uri : couplePhoto
              }}
                >
                    
                </Avatar>
          </View>
        </View>
        <Text style={styles.TopText}>En una relación con {coupleName}</Text>
        </View>

        <View style={{flex: 2, backgroundColor: colores.middlepurple}}>
        <AlbumView style={styles.footer}>
        <ScrollView>
          <View style={{alignItems: 'center'}}>

          <View style={styles.row}>
              <View styles={styles.celda}>
              </View>
              <View styles={styles.celda}>
              <View style={[styles.circle, {backgroundColor: '#d378b2'}]}>
              <Text style={styles.circleText}>{years}</Text>
                <Text style={styles.circleText}>Años</Text>
                </View>
              </View>
              <View styles={styles.celda}>
              </View>
            </View>


            <View style={styles.row2}>
              <View styles={styles.celda}>
              <View style={[styles.circle, {backgroundColor: '#b52e94'}]}>
                <Text style={styles.circleText}>{minutes}</Text>
                <Text style={styles.circleText}>Minutos</Text>
                </View>
              </View>
              <View styles={styles.celda}>
              <View style={[styles.circle, {backgroundColor: '#ae91c4'}]}>
                  <MaterialCommunityIcons
                      name="heart-box"
                      size={40}
                      color="#fff"
                  />
                </View>
              </View>
              <View styles={styles.celda}>
              <View style={[styles.circle, {backgroundColor: '#a62a93'}]}>
              <Text style={styles.circleText}>{days}</Text>
                <Text style={styles.circleText}>Días</Text>
                </View>
              </View>
            </View>


            <View style={styles.row}>
              <View styles={styles.celda}>
                
              </View>
              <View styles={styles.celda}>
              <View style={[styles.circle, {backgroundColor: '#701960'}]}>
              <Text style={styles.circleText}>{hours}</Text>
                <Text style={styles.circleText}>Horas</Text>
                </View>
              </View>
              <View styles={styles.celda}>
              
              </View>
            </View>
            
          </View>


          <View style={styles.albumLine}>
            <View style= {{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.albumText}> Nuestro álbum</Text>
            <TouchableOpacity style={{backgroundColor: colores.lightpurple, height: 30, width: 30, borderRadius: 30, justifyContent: 'center', alignItems: 'center'}}>
                <MaterialIcons
                name = "add-photo-alternate"
                size = {22}
                color = "#fff"
                />
              </TouchableOpacity>
            </View>
            <View style={{backgroundColor: 'white'}}>
              <Text>Hola</Text>
            </View>
            <FlatList
              data={arrayPhotos}
              numColumns = {2}
              renderItem={({item})=>(
                <>
                <Image 
                source = {{uri: item.image}}
                style = {styles.imageStyle}
                />
                </>
              )}
              
          />
          </View>

         
          
        </ScrollView>
        </AlbumView>
        </View>
        
      </Container>
    )
}

export default ProfileScreen;


const styles = StyleSheet.create({

  albumText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10
  },
  albumLine: {
    marginTop: 20,
    padding: 20,
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 2
  },
  circleText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white'
  },

 header:{
  borderBottomRightRadius: 90,
  backgroundColor: colores.middlepurple,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center'
 },
 footer: {
  justifyContent: 'center',
  backgroundColor: 'white',
  borderTopLeftRadius: 800,
  flex: 1,
  padding: 20
 },
 leftView: {
   width: Dimensions.get('window').width*0.3,
   height: Dimensions.get('window').width*0.3,
   backgroundColor: 'white',
   justifyContent: 'center',
   alignItems: 'center',
  borderRadius: Dimensions.get('window').width*0.3,
 },
 rightView: {
   width: Dimensions.get('window').width*0.3,
   height: Dimensions.get('window').width*0.3,
   backgroundColor: colores.lightpurple,
   justifyContent: 'center',
   alignItems: 'center',
   borderRadius: Dimensions.get('window').width*0.3,
   marginTop: 50
 },
 TopText: {
   color: 'white',
   fontSize: 20,
   fontWeight: 'bold',
   padding: 20
 },
 timeView: {
   flex: 1,
   backgroundColor: 'blue',
   flexDirection: 'row'
 },
 celda: {
   backgroundColor: 'yellow',
   borderWidth: 2,
   borderColor: 'black',
   width: Dimensions.get('window').width*0.3333
 },
 row: {
   width: Dimensions.get('window').width*0.8,
   flexDirection: 'row',
   height: 90,
   justifyContent: 'space-between',
   //alignItems: 'center'
 },
  circle: {
    width: 90,
    height: 90,
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center'
  },
  row2: {
  width: Dimensions.get('window').width*0.8,
   flexDirection: 'row',
   height: 90,
   justifyContent: 'center',
  },
  imageStyle: {
    height: Dimensions.get('window').width*0.3333,
    width: Dimensions.get('window').width*0.3333,
    margin: 10

  },

});

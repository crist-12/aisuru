import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, Pressable, Input, FlatList } from 'react-native'
import colores from '../utility/colors/colores'
import {MaterialCommunityIcons} from 'react-native-vector-icons'
import { getIdPareja, setIdPareja, getDateData } from "../../data_store";
import styled from 'styled-components'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Dialog from "react-native-dialog";
import LottieView from 'lottie-react-native'
import firebase from "../firebase/config"
import DateTimePicker from '@react-native-community/datetimepicker';


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

const ProfileScreen=({navigation})=> {

const [modalVisible, setModalVisible] = useState(false);
const [title, setTitle] = useState(null);
const [desc, setDesc] = useState(null);
const [dateEvent, setDateEvent] = useState(null);
const [date, setDate] = useState(new Date(1598051730000));
const [mode, setMode] = useState('date');
const [show, setShow] = useState(false);
const [id, setId] = useState(getIdPareja());
const [dialog, setDialog] = useState(false);
const [dialog2, setDialog2] = useState(false);
const [dialog3, setDialog3] = useState(false);
const [arrayEvento, setArrayEvento] = useState([]);
const [loading, setLoading] = useState(true);
const [aniversario, setAniversario] =useState(getDateData());
const [clTitle, setclTitle] = useState("No hay eventos cercanos");
const [clDate, setclDate] = useState("");
const [clDesc, setclDesc] = useState("");
var aux = [];


useEffect(() =>{
    getAllEvents();
    setLoading(false);
   closestEvent();
}, [])





const getAllEvents = async() =>{
    let docName = getIdPareja().toString();
    firebase.firestore().collection("listado").doc(docName).collection("eventos").where('visible','==',true)
       .onSnapshot((snap) => {
           snap.docs.map((doc) => {
               //  console.log(doc.data());
               //console.log(aux.length);
               let data = {
                   title: doc.data().title,
                   desc: doc.data().desc,
                   date: doc.data().date,
                   createdAt: doc.data().createdAt,
                   createdBy: doc.data().createdBy,
                   id: doc.data().id
               };
               aux.push(data);
               //console.log(aux.length);
               setArrayEvento(aux);
           });
       }
       )
}

const updateEvent = (_id, _title, _desc, _createdAt, _createdBy, _visible) =>{
    var eventoRef = firebase.firestore().collection("listado").doc(id).collection("eventos");
    var eventoObject = {
        id: _id,
        title : _title,
        desc: _desc,
        date: date,
        createdAt: _createdAt,
        createdBy: _createdBy,
        visible : _visible
    }

    eventoRef
    .doc(_id)
    .set(eventoObject)
    .then(()=>{ 
    if(_visible)
      alert("Evento actualizado exitosamente");
    else
       alert("Evento eliminado");
      navigation.reset({
          index: 0,
          routes: [{name: 'Event'}]
      })
    })
    .catch((error)=>{
      console.log("Pasó algo malo :(");
    })
}


const closestEvent = () => {
    let docName = getIdPareja().toString();
    let today = new Date();

    firebase.firestore().collection("listado").doc(docName).collection("eventos").where('date','>=', today).where('visible','==',true).orderBy('date','asc').limit(1)
       .onSnapshot((snap) => {
           snap.docs.map((doc) => {
               //  console.log(doc.data());
               //console.log(aux.length);
             //  alert("ENTRE A CONDICIONAL");
               setclTitle(doc.data().title);
               setclDesc(doc.data().desc);
               setclDate(doc.data().date.toDate().toLocaleDateString());
              // console.log(closest);
           //    alert("He entrado a "+doc.data().title)
           });
       }
       )
}


const onChangeDT = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

const addEvento = ()=>{
    var eventoRef = firebase.firestore().collection("listado").doc(id).collection("eventos");
    let today = new Date();
    let UID = (Math.random()*(99999999-1)+1).toString()
    var eventoObject = {
        id: UID,
        title : title,
        desc: desc,
        date: date,
        createdAt: today,
        createdBy: firebase.auth().currentUser.displayName,
        visible : true
    }

    eventoRef
    .doc(UID)
    .set(eventoObject)
    .then(()=>{ 
      console.log("Mensaje enviado :)");
      navigation.reset({
          index: 0,
          routes: [{name: 'Event'}]
      })
    })
    .catch((error)=>{
      console.log("Pasó algo malo :(");
    })
    console.log(title);
    console.log(desc);
    console.log(date);
}

    return (
        <View style={styles.container}>
            {
              loading?
                <LottieView
                style = {{flex:1}}
                source = {require('../lottie/loader.json')}
                autoPlay = {true}
                loop = {true}/>
            :
            <>
           <View style={styles.header}>
               <View style={styles.headerText}>
               <Text style={styles.title}>Mis Eventos</Text>
               </View>
               <View style={styles.headerCircle}>
               <View style={styles.circle}>
               </View>
               </View>
           </View>
           <View style={styles.body}>

            <View style={styles.supBody}>
                <View style={{flexDirection:'row'}}>
                    <MaterialCommunityIcons
                    name = "heart-multiple"
                    size = {18}
                    color = {colores.darkviolet}
                    /> 
                <Text style={{marginLeft: 10}}>
                    Nuestro Aniversario: {aniversario}
                </Text>
                </View>
                <View style={{flexDirection:'row'}}>
                <MaterialCommunityIcons
                name = "cake"
                size = {18}
                color = {colores.darkviolet}
                /> 
                 <Text style={{marginLeft: 10}}>
                    Mi cumpleaños
                </Text>
                </View>
                <View style={{flexDirection:'row'}}>
                <MaterialCommunityIcons
                name = "cake"
                size = {18}
                color = {colores.darkviolet}
                /> 
                 <Text style={{marginLeft: 10}}>
                    Cumpleaños de
                </Text>
                </View>
                </View>
                <View style={{flex: 4}}>
                <View style={{flex:2,  flexDirection: 'row'}}>
                    <View style={styles.cakeCard}>
                        <MaterialCommunityIcons
                        name = "cake"
                        size = {90}
                        color ="white"
                        />
                    </View>
                    <View style={{flex: 3, marginTop: 10}}>
                        <Text style={styles.cakeText}>Evento Próximo</Text>
                        <Text style={styles.cakeDesc}>{clTitle}</Text>
                        <Text style={styles.cakeDesc}>{clDesc}</Text>
                        <Text>{clDate}</Text>
                    </View>
                </View>
                <View style={{flex: 3, marginTop: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', flex:1}}>
                    <Text style={{margin: 10, fontSize: 16, fontWeight: 'bold'}}>Listado de Eventos</Text>
                    <View style={{ justifyContent: 'flex-end', flex:1, flexDirection: 'row', margin: 10}}>
                        <View>
                            <Text style={{color: "white"}}>.</Text>
                        </View>
                        <View style={{margin: 10,width: 40, height: 40, borderRadius: 40, backgroundColor: colores.darkviolet, justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => setDialog(true)}>
                                <MaterialCommunityIcons
                                    name="book-plus-multiple"
                                    size= {20}
                                    color = "white"
                                />
                            </TouchableOpacity>
                                  {
                                      show?
                                      <DateTimePicker
                                      testID="dateTimePicker"
                                      value={date}
                                      mode={mode}
                                      is24Hour={true}
                                      display="default"
                                      onChange={onChangeDT}
                                      />:
                                      null
                                  }                              
                        </View>
                        <View>
                        <Dialog.Container visible={dialog}>
                        <Dialog.Title>Nuevo Evento</Dialog.Title>
                        <Dialog.Description>
                            Los eventos son celebraciones que merencen ser recordadas.
                            ¡Vamos a registrar un nuevo evento!
                        </Dialog.Description>
                        <Dialog.Input label="Título" placeholder="Ingrese título" value={title} onChangeText={setTitle}/>
                        <Dialog.Input label="Descripción" placeholder="Ingrese descripción" value={desc} onChangeText={setDesc}/>
                        <Dialog.Input label="Fecha" placeholder= {date.toString()} value={date.toLocaleDateString('es-ES')} editable={false}/>
                        <Dialog.Description> Define la fecha presionando la opción "Establecer Fecha"</Dialog.Description>
                        <Dialog.Button label="ESTABLECER FECHA" onPress={()=>setShow(true)}/>
                        <Dialog.Button label="Aceptar"  onPress={()=>addEvento()}/>
                        <Dialog.Button label="Cancelar" onPress={()=>setDialog(false)}/>
                        </Dialog.Container>
                        </View>

                    </View>
                    </View>
                    <FlatList
                        data={arrayEvento}
                        keyExtractor={(item) => item.key}
                        style={{marginTop: 40}}
                        renderItem={({item})=>(
                            <>
                            <View style={styles.cardView}>
                                    <View style={styles.topBar}>
                                        <View style={[styles.crudButton, {backgroundColor: 'green'}]}>
                                            <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} onPress={()=>setDialog2(true)}>
                                            <MaterialCommunityIcons
                                                name="comment-edit-outline"
                                                size= {18}
                                                color = "white"
                                            />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={[styles.crudButton, {backgroundColor: 'red'}]}>
                                            <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} onPress={()=>setDialog3(true)}>
                                            <MaterialCommunityIcons
                                                name="delete-empty"
                                                size= {18}
                                                color = "white"
                                            />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={styles.bodyCard}>
                                        <View style={styles.dataView}>
                                            <Text style={styles.dataText}>{item.title}</Text>
                                            <Text style={{fontWeight: 'bold'}}>{item.date.toDate().toLocaleDateString()}</Text>
                                            <Text>{item.desc}</Text>
                                            <Text>Creado por {item.createdBy}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View>
                        <Dialog.Container visible={dialog2}>
                        <Dialog.Title>Editar Evento</Dialog.Title>
                        <Dialog.Input label="Código" placeholder= {item.id} value={item.id} editable={false}/>
                        <Dialog.Input label="Título" placeholder="Ingrese título" value={item.title} onChangeText={(text)=>{item.title = text; setTitle(item.title)}}/>
                        <Dialog.Input label="Descripción" placeholder="Ingrese descripción" value={item.desc} onChangeText={(text)=>{item.desc = text; setDesc(item.desc)}}/>
                        <Dialog.Input label="Fecha" placeholder= {item.date.toDate().toLocaleDateString()} value={date.toLocaleDateString()} editable={false}/>
                        <Dialog.Description> Define la fecha presionando la opción "Establecer Fecha"</Dialog.Description>
                        <Dialog.Button label="Definir fecha" onPress={()=>setShow(true)}/>
                        <Dialog.Button label="Actualizar"  onPress={()=>updateEvent(item.id, item.title, item.desc, item.createdAt, item.createdBy, true)}/>
                        <Dialog.Button label="Cancelar" onPress={()=>setDialog2(false)}/>
                        </Dialog.Container>
                        </View>

                        <View>
                        <Dialog.Container visible={dialog3}>
                        <Dialog.Title>Eliminar Evento</Dialog.Title>
                        <Dialog.Description>Estás a punto de eliminar el evento "{item.title}"</Dialog.Description>
                        <Dialog.Description>Esta acción no puede deshacerse</Dialog.Description>
                        <Dialog.Button label="Sí, quiero eliminar"  onPress={()=>updateEvent(item.id, item.title, item.desc, item.createdAt, item.createdBy, false)}/>
                        <Dialog.Button label="Cancelar" onPress={()=>setDialog3(false)}/>
                        </Dialog.Container>
                        </View>
                            </>
                        )}  
                    />   
                </View>
            </View>       
            </View>
            </>
}
        </View>
    )
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header : {
        height: 100,
        backgroundColor: colores.darkviolet,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    body: {
        flex: 4
    },
    circle: {
        backgroundColor: colores.lightpurple,
        height: 100,
        width: 100,
        borderTopLeftRadius: 100,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    },
    headerCircle: {
        justifyContent: 'flex-end'
    },
    headerText: {
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold'
    },
    supBody: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-around',
    },
    cakeCard: {
        flex: 2, 
        backgroundColor: colores.middlepurple, 
        borderRadius: 30, 
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    cakeText: {
        color: colores.darkviolet,
        fontWeight: 'bold',
        fontSize: 22
    },
    cakeDesc: {
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 10
    },
    cardView: {
        height: 150,
        backgroundColor: "white",
        margin: 10,
        borderStyle: 'solid',
        borderWidth: 1
    },
    crudButton: {
        height: 25,
        width: 25,
        borderRadius: 25,
        marginHorizontal: 10
    },
    topBar: {
        height: 30,
        backgroundColor: colores.smallCircleColor,
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    bodyCard: {
        flexDirection: 'row',
    },
    typeView: {
        height: 80,
        width: 80,
        backgroundColor: 'gray',
        margin: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dataView: {
        margin: 15,
        justifyContent: 'center'
    },
    dataText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: colores.darkviolet
    },


    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }

})
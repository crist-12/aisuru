import React, {useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, Pressable } from 'react-native'
import colores from '../utility/colors/colores'
import {MaterialCommunityIcons} from 'react-native-vector-icons'
import styled from 'styled-components'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Dialog from "react-native-dialog";
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
const [title, setTitle] = useState("");
const [desc, setDesc] = useState("");
const [dateEvent, setDateEvent] = useState(null);
const [date, setDate] = useState(new Date(1598051730000));
const [mode, setMode] = useState('date');
const [show, setShow] = useState(false);

 

const onChangeDT = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };


    return (
        <View style={styles.container}>
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
                    Nuestro Aniversario
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
                        <Text style={styles.cakeDesc}>Descripción del Evento</Text>
                        <Text>Fecha</Text>
                    </View>
                </View>
                <View style={{flex: 3}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', flex:1}}>
                    <Text style={{margin: 10, fontSize: 16, fontWeight: 'bold'}}>Listado de Eventos</Text>
                    <View style={{ justifyContent: 'flex-end', flex:1, flexDirection: 'row', margin: 10}}>
                        <View>
                            <Text style={{color: "white"}}>.</Text>
                        </View>
                        <View style={{width: 40, height: 40, borderRadius: 40, backgroundColor: colores.darkviolet, justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
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
                        <Dialog.Container visible={true}>
                        <Dialog.Title>Nuevo Evento</Dialog.Title>
                        <Dialog.Description>
                            Los eventos son celebraciones que merencen ser recordadas.
                            ¡Vamos a registrar un nuevo evento!
                        </Dialog.Description>
                        <Dialog.Input label="Título" placeholder="Ingrese título" value={title} onChange={text => setTitle(text)}/>
                        <Dialog.Input label="Descripción" placeholder="Ingrese descripción" value={desc} onChange={desc => setDesc(text)}/>
                        <Dialog.Input label="Fecha" placeholder= {date.toString()} value={date} editable={false}/>
                        <Dialog.Description> Define la fecha presionando la opción "Establecer Fecha"</Dialog.Description>
                        <Dialog.Button label="ESTABLECER FECHA" onPress={()=>setShow(true)}/>
                        <Dialog.Button label="Aceptar" />
                        <Dialog.Button label="Cancelar" />
                        </Dialog.Container>
                        </View>

                    </View>
                    </View>
                    <View style={styles.cardView}>
                        <View style={styles.topBar}>

                        </View>
                        <View style={styles.bodyCard}>
                            <View style={styles.typeView}>
                             <MaterialCommunityIcons
                             name="cake"
                             size={50}
                             />   
                            </View>
                            <View style={styles.dataView}>
                                <Text style={styles.dataText}>Título de la celebración</Text>
                                <Text style={{fontWeight: 'bold'}}>17-07-2019</Text>
                                <Text>Esta es una Descripciónon</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>       
            </View>
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
    topBar: {
        height: 30,
        backgroundColor: colores.smallCircleColor,
        borderBottomWidth: 1
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
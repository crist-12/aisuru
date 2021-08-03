import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import colores from '../utility/colors/colores'
import { Avatar } from 'react-native-elements'
import { Dimensions } from 'react-native';
import firebase from "../firebase/config"
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Dialog from "react-native-dialog";
import { Alert } from 'react-native';
import * as EmailValidator from 'email-validator';
import { getUserCod } from '../../data_store'
import * as Print from 'expo-print';


const AboutScreen= ({navigation})=> {


const [visible1, setVisible1] = useState(false); // Dialog de cambio de contraseña
const [visible2, setVisible2] = useState(false); // Dialog de cambio de email
const [visible3, setVisible3] = useState(false); // Dialog de cambio de nombre
const [newPassword1, setNewPassword1] = useState("");
const [image, setImage] = useState("");
const [link, setLink] = useState("");
const [newPassword2, setNewPassword2] = useState("");
const [newDisplayName, setNewDisplayName] = useState("");
const [newEmail, setNewEmail] = useState("");
const [coupleName, setCoupleName] = useState("");
const [couplePhoto, setCouplePhoto] = useState();
const [aisuN, setAisuN] = useState(0);

useEffect(() => {
  coupleData();
  getAisus();
}, [])


const pickImage = async() =>{
  let result = await ImagePicker.launchImageLibraryAsync();
  if (!result.cancelled) {
    setImage(result.uri);
    example(result.uri, "Holi");
      
  }
}

const coupleData = () => {
  return firebase.firestore().collection('users').where('id','==',getUserCod().toString()).onSnapshot((querySnapShot) => {
      querySnapShot.forEach(doc => {
     //   console.log(doc.data());
        setCoupleName(doc.data().name);
        setCouplePhoto(doc.data().photoUrl);
      })
  })
}

/* PDF - HTML SECTION */

const createPDF3=async()=> {

  const filePath = await Print.printAsync({
    html:`
    <!DOCTYPE html><html lang="es" itemscope itemtype="http://schema.org/WebPage"><head><meta charset="utf-8"><script nonce="sCsrsGAZI/O7bwONm79e1Q">var DOCS_timing={}; DOCS_timing['sl']=new Date().getTime();</script><script nonce="sCsrsGAZI/O7bwONm79e1Q">function _DumpException(e) {throw e;}</script><script nonce="sCsrsGAZI/O7bwONm79e1Q">_docs_flag_initialData={"atari-eiicg":false,"docs-sup":"","docs-eea":false,"docs-ecci":false,"docs-ipmmp":true,"docs-esi":false,"docs-liap":"/logImpressions","ilcm":{"eui":"AHKXmL2pisrhu5-KySr-GUh5wybaa4mjWb0ZTU1XSgnTOvsOtUC43WcKe7MJTQr975qDjdyPANEd","je":1,"sstu":1627853990391000,"si":"COjZ39bkkPICFQs8HwodED8LTw","gsc":null,"ei":[5734573,5707711,5737443,5712373,5727319,5713211,5740249,5711850,5714628,14101462,5708870,5729074,5713049,5711977,5712211,5720060,14101510,5737339,5703022,5736245,5719651,14101530,5709892,5722370,5706832,14101502,14100834,5742464,5720927,5721004,5713207,5734693,14101534,5738531,5742780,5706836,14101550,5714550,5732944,5734956,5703839,5711808,5735808,5704621],"crc":0,"cvi":[]},"docs-ccdil":false,"docs-eil":true,"docs-eoi":false,"info_params":{"token":"AHL0AtJoB7TrFJTvVguYbyhjlfV5fkCBSw:1627853990338"},"docs-enpf":true,"atari-jefp":"/_/view/jserror","docs-jern":"view","atari-rhpp":"/_/view"}; _docs_flag_cek= null ; if (window['DOCS_timing']) {DOCS_timing['ifdld']=new Date().getTime();}</script><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="referrer" content="strict-origin-when-cross-origin"><link rel="icon" href="https://ssl.gstatic.com/atari/images/public/favicon.ico"><meta property="og:title" content="Inicio"><meta property="og:type" content="website"><meta property="og:url" content="https://sites.google.com/unicah.edu/asf/inicio"><meta property="og:description" content="
AISURU APP"><meta itemprop="name" content="Inicio"><meta itemprop="description" content="
AISURU APP"><meta itemprop="url" content="https://sites.google.com/unicah.edu/asf/inicio"><link href="https://fonts.googleapis.com/css?family=Lato%3A300%2C300italic%2C400%2C400italic%2C700%2C700italic&display=swap" rel="stylesheet" nonce="F96PmBS1y6wMD4QD1u0cHA"><link href="https://fonts.googleapis.com/css?family=Google+Sans:400,500|Roboto:300,400,500,700|Source+Code+Pro:400,700&display=swap" rel="stylesheet" nonce="F96PmBS1y6wMD4QD1u0cHA"><style nonce="F96PmBS1y6wMD4QD1u0cHA">@media only screen and (max-width: 479px){.puwcIf{font-size: 20.0pt;}}@media only screen and (min-width: 480px) and (max-width: 767px){.puwcIf{font-size: 22.0pt;}}@media only screen and (min-width: 768px) and (max-width: 1279px){.puwcIf{font-size: 24.0pt;}}@media only screen and (min-width: 1280px){.puwcIf{font-size: 24.0pt;}}</style><link rel="stylesheet" href="https://www.gstatic.com/_/atari/_/ss/k=atari.vw.P7vE-BciFxw.L.F4.O/d=1/rs=AGEqA5kBFY-aNVCYMCKa4ndJqgWWO2oJ5g" nonce="F96PmBS1y6wMD4QD1u0cHA"><title>Inicio</title><style jsname="ptDGoc" nonce="F96PmBS1y6wMD4QD1u0cHA">.M63kCb{background-color: rgba(255,255,255,1);}.OUGEr{color: rgba(33,33,33,1);}.duRjpb .OUGEr{color: rgba(116,31,138,1);}.JYVBee .OUGEr{color: rgba(116,31,138,1);}.OmQG5e .OUGEr{color: rgba(33,33,33,1);}.iwQgFb{background-color: rgba(0,0,0,0.150000006);}.ySLm4c{font-family: Lato, sans-serif;}.CbiMKe{background-color: rgba(129,71,147,1);}.qeLZfd .zfr3Q{color: rgba(33,33,33,1);}.qeLZfd .qnVSj{color: rgba(33,33,33,1);}.qeLZfd .Glwbz{color: rgba(33,33,33,1);}.qeLZfd .duRjpb{color: rgba(116,31,138,1);}.qeLZfd .qLrapd{color: rgba(116,31,138,1);}.qeLZfd .JYVBee{color: rgba(116,31,138,1);}.qeLZfd .aHM7ed{color: rgba(116,31,138,1);}.qeLZfd .OmQG5e{color: rgba(33,33,33,1);}.qeLZfd .NHD4Gf{color: rgba(33,33,33,1);}.qeLZfd .aw5Odc{color: rgba(116,31,138,1);}.qeLZfd .dhtgD:hover{color: rgba(166,57,197,1);}.qeLZfd .dhtgD:visited{color: rgba(116,31,138,1);}.qeLZfd .iwQgFb{background-color: rgba(0,0,0,0.150000006);}.qeLZfd .OUGEr{color: rgba(33,33,33,1);}.qeLZfd .duRjpb .OUGEr{color: rgba(116,31,138,1);}.qeLZfd .JYVBee .OUGEr{color: rgba(116,31,138,1);}.qeLZfd .OmQG5e .OUGEr{color: rgba(33,33,33,1);}.qeLZfd:before{background-color: rgba(242,242,242,1); display: block;}.lQAHbd .zfr3Q{color: rgba(255,255,255,1);}.lQAHbd .qnVSj{color: rgba(255,255,255,1);}.lQAHbd .Glwbz{color: rgba(255,255,255,1);}.lQAHbd .duRjpb{color: rgba(255,255,255,1);}.lQAHbd .qLrapd{color: rgba(255,255,255,1);}.lQAHbd .JYVBee{color: rgba(255,255,255,1);}.lQAHbd .aHM7ed{color: rgba(255,255,255,1);}.lQAHbd .OmQG5e{color: rgba(255,255,255,1);}.lQAHbd .NHD4Gf{color: rgba(255,255,255,1);}.lQAHbd .aw5Odc{color: rgba(255,255,255,1);}.lQAHbd .dhtgD:hover{color: rgba(255,255,255,1);}.lQAHbd .dhtgD:visited{color: rgba(255,255,255,1);}.lQAHbd .iwQgFb{background-color: rgba(255,255,255,0.150000006);}.lQAHbd .OUGEr{color: rgba(255,255,255,1);}.lQAHbd .duRjpb .OUGEr{color: rgba(255,255,255,1);}.lQAHbd .JYVBee .OUGEr{color: rgba(255,255,255,1);}.lQAHbd .OmQG5e .OUGEr{color: rgba(255,255,255,1);}.lQAHbd .CbiMKe{background-color: rgba(255,255,255,1);}.lQAHbd:before{background-color: rgba(129,71,147,1); display: block;}.cJgDec .zfr3Q{color: rgba(255,255,255,1);}.cJgDec .zfr3Q .OUGEr{color: rgba(255,255,255,1);}.cJgDec .qnVSj{color: rgba(255,255,255,1);}.cJgDec .Glwbz{color: rgba(255,255,255,1);}.cJgDec .qLrapd{color: rgba(255,255,255,1);}.cJgDec .aHM7ed{color: rgba(255,255,255,1);}.cJgDec .NHD4Gf{color: rgba(255,255,255,1);}.cJgDec .IFuOkc:before{background-color: rgba(33,33,33,1); opacity: 0; display: block;}.O13XJf{height: 340px; padding-bottom: 60px; padding-top: 60px;}.O13XJf .IFuOkc{background-color: rgba(116,31,138,1); background-image: url(https://ssl.gstatic.com/atari/images/simple-header-blended-small.png);}.O13XJf .IFuOkc:before{background-color: rgba(33,33,33,1); opacity: 0.4; display: block;}.O13XJf .zfr3Q{color: rgba(255,255,255,1);}.O13XJf .qnVSj{color: rgba(255,255,255,1);}.O13XJf .Glwbz{color: rgba(255,255,255,1);}.O13XJf .duRjpb{color: rgba(255,255,255,1);}.O13XJf .qLrapd{color: rgba(255,255,255,1);}.O13XJf .JYVBee{color: rgba(255,255,255,1);}.O13XJf .aHM7ed{color: rgba(255,255,255,1);}.O13XJf .OmQG5e{color: rgba(255,255,255,1);}.O13XJf .NHD4Gf{color: rgba(255,255,255,1);}.tpmmCb .zfr3Q{color: rgba(33,33,33,1);}.tpmmCb .zfr3Q .OUGEr{color: rgba(33,33,33,1);}.tpmmCb .qnVSj{color: rgba(33,33,33,1);}.tpmmCb .Glwbz{color: rgba(33,33,33,1);}.tpmmCb .qLrapd{color: rgba(33,33,33,1);}.tpmmCb .aHM7ed{color: rgba(33,33,33,1);}.tpmmCb .NHD4Gf{color: rgba(33,33,33,1);}.tpmmCb .IFuOkc:before{background-color: rgba(255,255,255,1); display: block;}.tpmmCb .Wew9ke{fill: rgba(33,33,33,1);}.aw5Odc{color: rgba(116,31,138,1);}.dhtgD:hover{color: rgba(166,57,197,1);}.dhtgD:active{color: rgba(166,57,197,1);}.dhtgD:visited{color: rgba(116,31,138,1);}.Zjiec{color: rgba(255,255,255,1); font-family: Lato, sans-serif; font-size: 19pt; font-weight: 300; letter-spacing: 1px; line-height: 1.3; padding-bottom: 62.5px; padding-left: 48px; padding-right: 36px; padding-top: 11.5px;}.XMyrgf{margin-top: 0px; margin-left: 48px; margin-bottom: 24px; margin-right: 24px;}.TlfmSc{color: rgba(255,255,255,1); font-family: Lato, sans-serif; font-size: 15pt; font-weight: 300; line-height: 1.333;}.Mz8gvb{color: rgba(255,255,255,1);}.zDUgLc{background-color: rgba(33,33,33,1);}.QTKDff.chg4Jd:focus{background-color: rgba(255,255,255,0.1199999973);}.YTv4We{color: rgba(178,178,178,1);}.YTv4We:hover:before{background-color: rgba(255,255,255,0.1199999973); display: block;}.YTv4We.chg4Jd:focus:before{border-color: rgba(255,255,255,0.3600000143); display: block;}.eWDljc{background-color: rgba(33,33,33,1);}.eWDljc .hDrhEe{padding-left: 8px;}.ZXW7w{color: rgba(255,255,255,1); opacity: 0.26;}.PsKE7e{color: rgba(255,255,255,1); font-family: Lato, sans-serif; font-size: 12pt; font-weight: 300;}.lhZOrc{color: rgba(213,77,255,1);}.hDrhEe:hover{color: rgba(213,77,255,1);}.M9vuGd{color: rgba(213,77,255,1); font-weight: 400;}.jgXgSe:hover{color: rgba(213,77,255,1);}.j10yRb:hover{color: rgba(213,77,255,1);}.j10yRb.chg4Jd:focus:before{border-color: rgba(255,255,255,0.3600000143); display: block;}.iWs3gf{color: rgba(255,255,255,1);}.wgxiMe{background-color: rgba(33,33,33,1);}.fOU46b .TlfmSc{color: rgba(255,255,255,1);}.fOU46b .KJll8d{background-color: rgba(255,255,255,1);}.fOU46b .Mz8gvb{color: rgba(255,255,255,1);}.fOU46b .Mz8gvb.chg4Jd:focus:before{border-color: rgba(255,255,255,1); display: block;}.fOU46b .qV4dIc{color: rgba(255,255,255,0.8700000048);}.fOU46b .jgXgSe:hover{color: rgba(255,255,255,1);}.fOU46b .M9vuGd{color: rgba(255,255,255,1);}.fOU46b .iWs3gf{color: rgba(255,255,255,0.8700000048);}.fOU46b .G8QRnc .Mz8gvb{color: rgba(0,0,0,0.8000000119);}.fOU46b .G8QRnc .Mz8gvb.chg4Jd:focus:before{border-color: rgba(0,0,0,0.8000000119); display: block;}.fOU46b .G8QRnc .ZXW7w{color: rgba(0,0,0,0.8000000119);}.fOU46b .G8QRnc .TlfmSc{color: rgba(0,0,0,0.8000000119);}.fOU46b .G8QRnc .KJll8d{background-color: rgba(0,0,0,0.8000000119);}.fOU46b .G8QRnc .qV4dIc{color: rgba(0,0,0,0.6399999857);}.fOU46b .G8QRnc .jgXgSe:hover{color: rgba(0,0,0,0.8199999928);}.fOU46b .G8QRnc .M9vuGd{color: rgba(0,0,0,0.8199999928);}.fOU46b .G8QRnc .iWs3gf{color: rgba(0,0,0,0.6399999857);}.fOU46b .usN8rf .Mz8gvb{color: rgba(0,0,0,0.8000000119);}.fOU46b .usN8rf .Mz8gvb.chg4Jd:focus:before{border-color: rgba(0,0,0,0.8000000119); display: block;}.fOU46b .usN8rf .ZXW7w{color: rgba(0,0,0,0.8000000119);}.fOU46b .usN8rf .TlfmSc{color: rgba(0,0,0,0.8000000119);}.fOU46b .usN8rf .KJll8d{background-color: rgba(0,0,0,0.8000000119);}.fOU46b .usN8rf .qV4dIc{color: rgba(0,0,0,0.6399999857);}.fOU46b .usN8rf .jgXgSe:hover{color: rgba(0,0,0,0.8199999928);}.fOU46b .usN8rf .M9vuGd{color: rgba(0,0,0,0.8199999928);}.fOU46b .usN8rf .iWs3gf{color: rgba(0,0,0,0.6399999857);}.fOU46b .aCIEDd .qV4dIc{color: rgba(33,33,33,1);}.fOU46b .aCIEDd .TlfmSc{color: rgba(33,33,33,1);}.fOU46b .aCIEDd .KJll8d{background-color: rgba(33,33,33,1);}.fOU46b .aCIEDd .ZXW7w{color: rgba(33,33,33,1);}.fOU46b .aCIEDd .jgXgSe:hover{color: rgba(33,33,33,1); opacity: 0.82;}.fOU46b .aCIEDd .Mz8gvb{color: rgba(33,33,33,1);}.fOU46b .aCIEDd .iWs3gf{color: rgba(33,33,33,1);}.fOU46b .a3ETed .qV4dIc{color: rgba(255,255,255,1);}.fOU46b .a3ETed .TlfmSc{color: rgba(255,255,255,1);}.fOU46b .a3ETed .KJll8d{background-color: rgba(255,255,255,1);}.fOU46b .a3ETed .ZXW7w{color: rgba(255,255,255,1);}.fOU46b .a3ETed .jgXgSe:hover{color: rgba(255,255,255,1); opacity: 0.82;}.fOU46b .a3ETed .Mz8gvb{color: rgba(255,255,255,1);}.fOU46b .a3ETed .iWs3gf{color: rgba(255,255,255,1);}@media only screen and (min-width: 1280px){.XeSM4.b2Iqye.fOU46b .LBrwzc .iWs3gf{color: rgba(255,255,255,0.8700000048);}}@media only screen and (min-width: 1280px){.KuNac.b2Iqye.fOU46b .iWs3gf{color: rgba(0,0,0,0.6399999857);}}.fOU46b .zDUgLc{opacity: 0;}.LBrwzc .ZXW7w{color: rgba(0,0,0,1);}.LBrwzc .KJll8d{background-color: rgba(0,0,0,1);}.GBy4H .ZXW7w{color: rgba(255,255,255,1);}.GBy4H .KJll8d{background-color: rgba(255,255,255,1);}.eBSUbc{background-color: rgba(33,33,33,1); color: rgba(0,188,212,0.6999999881);}.BFDQOb:hover{color: rgba(213,77,255,1);}.ImnMyf{background-color: rgba(255,255,255,1); color: rgba(33,33,33,1);}.Vs12Bd{background-color: rgba(242,242,242,1); color: rgba(33,33,33,1);}.S5d9Rd{background-color: rgba(129,71,147,1); color: rgba(255,255,255,1);}.zfr3Q{color: rgba(33,33,33,1); font-family: Lato, sans-serif; font-size: 11pt; font-weight: 400; line-height: 1.6667; margin-top: 12px;}.qnVSj{color: rgba(33,33,33,1);}.Glwbz{color: rgba(33,33,33,1);}.duRjpb{color: rgba(116,31,138,1); font-family: Lato, sans-serif; font-size: 34pt; font-weight: 300; letter-spacing: 0.5px; line-height: 1.2; margin-top: 30px;}.Ap4VC{margin-bottom: -30px;}.qLrapd{color: rgba(116,31,138,1);}.JYVBee{color: rgba(116,31,138,1); font-family: Lato, sans-serif; font-size: 19pt; font-weight: 400; line-height: 1.4; margin-top: 20px;}.CobnVe{margin-bottom: -20px;}.aHM7ed{color: rgba(116,31,138,1);}.OmQG5e{color: rgba(33,33,33,1); font-family: Lato, sans-serif; font-size: 15pt; font-style: normal; font-weight: 400; line-height: 1.25; margin-top: 16px;}.GV3q8e{margin-bottom: -16px;}.NHD4Gf{color: rgba(33,33,33,1);}.LB7kq .duRjpb{font-size: 64pt; letter-spacing: 2px; line-height: 1; margin-top: 40px;}.LB7kq .JYVBee{font-size: 25pt; font-weight: 300; line-height: 1.1; margin-top: 25px;}@media only screen and (max-width: 479px){.LB7kq .duRjpb{font-size: 40pt;}}@media only screen and (min-width: 480px) and (max-width: 767px){.LB7kq .duRjpb{font-size: 53pt;}}@media only screen and (max-width: 479px){.LB7kq .JYVBee{font-size: 19pt;}}@media only screen and (min-width: 480px) and (max-width: 767px){.LB7kq .JYVBee{font-size: 22pt;}}.O13XJf{height: 340px; padding-bottom: 60px; padding-top: 60px;}@media only screen and (min-width: 480px) and (max-width: 767px){.O13XJf{height: 280px; padding-bottom: 40px; padding-top: 40px;}}@media only screen and (max-width: 479px){.O13XJf{height: 250px; padding-bottom: 30px; padding-top: 30px;}}.SBrW1{height: 520px;}@media only screen and (min-width: 480px) and (max-width: 767px){.SBrW1{height: 520px;}}@media only screen and (max-width: 479px){.SBrW1{height: 400px;}}.Wew9ke{fill: rgba(255,255,255,1);}.gk8rDe{height: 180px; padding-bottom: 32px; padding-top: 60px;}.gk8rDe .zfr3Q{color: rgba(0,0,0,1);}.gk8rDe .duRjpb{color: rgba(116,31,138,1); font-size: 45pt; line-height: 1.1;}.gk8rDe .qLrapd{color: rgba(116,31,138,1);}.gk8rDe .JYVBee{color: rgba(116,31,138,1); font-size: 27pt; line-height: 1.35; margin-top: 15px;}.gk8rDe .aHM7ed{color: rgba(116,31,138,1);}.gk8rDe .OmQG5e{color: rgba(33,33,33,1);}.gk8rDe .NHD4Gf{color: rgba(33,33,33,1);}@media only screen and (max-width: 479px){.gk8rDe .duRjpb{font-size: 30pt;}}@media only screen and (min-width: 480px) and (max-width: 767px){.gk8rDe .duRjpb{font-size: 38pt;}}@media only screen and (max-width: 479px){.gk8rDe .JYVBee{font-size: 20pt;}}@media only screen and (min-width: 480px) and (max-width: 767px){.gk8rDe .JYVBee{font-size: 24pt;}}@media only screen and (min-width: 480px) and (max-width: 767px){.gk8rDe{padding-top: 45px;}}@media only screen and (max-width: 479px){.gk8rDe{padding-bottom: 0px; padding-top: 30px;}}.dhtgD{text-decoration: underline;}.JzO0Vc{background-color: rgba(33,33,33,1); font-family: Lato, sans-serif; width: 250px;}@media only screen and (min-width: 1280px){.JzO0Vc{padding-top: 48.5px;}}.Zjiec{font-family: Lato, sans-serif; font-size: 19pt; font-weight: 300; letter-spacing: 1px; line-height: 1.3; padding-bottom: 62.5px; padding-left: 48px; padding-right: 36px; padding-top: 11.5px;}.TlfmSc{font-family: Lato, sans-serif; font-size: 15pt; font-weight: 300; line-height: 1.333;}.PsKE7e{font-family: Lato, sans-serif; font-size: 12pt;}.IKA38e{line-height: 1.21;}.hDrhEe{padding-bottom: 11.5px; padding-top: 11.5px;}.zDUgLc{opacity: 1;}.QmpIrf{background-color: rgba(129,71,147,1); border-color: rgba(255,255,255,1); color: rgba(255,255,255,1); font-family: Lato, sans-serif; font-size: 11pt; line-height: normal;}.xkUom{border-color: rgba(129,71,147,1); color: rgba(129,71,147,1); font-family: Lato, sans-serif; font-size: 11pt; line-height: normal;}.xkUom:hover{background-color: rgba(129,71,147,0.1000000015);}.KjwKmc{color: rgba(129,71,147,1); font-family: Lato, sans-serif; font-size: 11pt; line-height: normal; line-height: normal;}.KjwKmc:hover{background-color: rgba(129,71,147,0.1000000015);}.lQAHbd .QmpIrf{background-color: rgba(255,255,255,1); border-color: rgba(116,31,138,1); color: rgba(116,31,138,1); font-family: Lato, sans-serif; font-size: 11pt; line-height: normal;}.lQAHbd .xkUom{border-color: rgba(242,242,242,1); color: rgba(242,242,242,1); font-family: Lato, sans-serif; font-size: 11pt; line-height: normal;}.lQAHbd .xkUom:hover{background-color: rgba(255,255,255,0.1000000015);}.lQAHbd .KjwKmc{color: rgba(242,242,242,1); font-family: Lato, sans-serif; font-size: 11pt; line-height: normal;}.lQAHbd .KjwKmc:hover{background-color: rgba(255,255,255,0.1000000015);}.cJgDec .QmpIrf{background-color: rgba(255,255,255,1); border-color: rgba(116,31,138,1); color: rgba(116,31,138,1); font-family: Lato, sans-serif; font-size: 11pt; line-height: normal;}.cJgDec .xkUom{border-color: rgba(242,242,242,1); color: rgba(242,242,242,1); font-family: Lato, sans-serif; font-size: 11pt; line-height: normal;}.cJgDec .xkUom:hover{background-color: rgba(255,255,255,0.1000000015);}.cJgDec .KjwKmc{color: rgba(242,242,242,1); font-family: Lato, sans-serif; font-size: 11pt; line-height: normal;}.cJgDec .KjwKmc:hover{background-color: rgba(255,255,255,0.1000000015);}.tpmmCb .QmpIrf{background-color: rgba(255,255,255,1); border-color: rgba(116,31,138,1); color: rgba(116,31,138,1); font-family: Lato, sans-serif; font-size: 11pt; line-height: normal;}.tpmmCb .xkUom{border-color: rgba(129,71,147,1); color: rgba(129,71,147,1); font-family: Lato, sans-serif; font-size: 11pt; line-height: normal;}.tpmmCb .xkUom:hover{background-color: rgba(129,71,147,0.1000000015);}.tpmmCb .KjwKmc{color: rgba(129,71,147,1); font-family: Lato, sans-serif; font-size: 11pt; line-height: normal;}.tpmmCb .KjwKmc:hover{background-color: rgba(129,71,147,0.1000000015);}.gk8rDe .QmpIrf{background-color: rgba(129,71,147,1); border-color: rgba(255,255,255,1); color: rgba(255,255,255,1); font-family: Lato, sans-serif; font-size: 11pt; line-height: normal;}.gk8rDe .xkUom{border-color: rgba(129,71,147,1); color: rgba(129,71,147,1); font-family: Lato, sans-serif; font-size: 11pt; line-height: normal;}.gk8rDe .xkUom:hover{background-color: rgba(129,71,147,0.1000000015);}.gk8rDe .KjwKmc{color: rgba(129,71,147,1); font-family: Lato, sans-serif; font-size: 11pt; line-height: normal;}.gk8rDe .KjwKmc:hover{background-color: rgba(129,71,147,0.1000000015);}.O13XJf .QmpIrf{background-color: rgba(255,255,255,1); border-color: rgba(116,31,138,1); color: rgba(116,31,138,1); font-family: Lato, sans-serif; font-size: 11pt; line-height: normal;}.O13XJf .xkUom{border-color: rgba(242,242,242,1); color: rgba(242,242,242,1); font-family: Lato, sans-serif; font-size: 11pt; line-height: normal;}.O13XJf .xkUom:hover{background-color: rgba(255,255,255,0.1000000015);}.O13XJf .KjwKmc{color: rgba(242,242,242,1); font-family: Lato, sans-serif; font-size: 11pt; line-height: normal;}.O13XJf .KjwKmc:hover{background-color: rgba(255,255,255,0.1000000015);}.Y4CpGd{font-family: Lato, sans-serif; font-size: 11pt;}.CMArNe{background-color: rgba(242,242,242,1);}.LBrwzc .TlfmSc{color: rgba(0,0,0,0.8000000119);}.LBrwzc .YTv4We{color: rgba(0,0,0,0.6399999857);}.LBrwzc .YTv4We.chg4Jd:focus:before{border-color: rgba(0,0,0,0.6399999857); display: block;}.LBrwzc .Mz8gvb{color: rgba(0,0,0,0.6399999857);}.LBrwzc .iWs3gf{color: rgba(0,0,0,0.6399999857);}.LBrwzc .wgxiMe{background-color: rgba(255,255,255,1);}.LBrwzc .qV4dIc{color: rgba(0,0,0,0.6399999857);}.LBrwzc .M9vuGd{color: rgba(0,0,0,0.8000000119); font-weight: bold;}.LBrwzc .Zjiec{color: rgba(0,0,0,0.8000000119);}.LBrwzc .IKA38e{color: rgba(0,0,0,0.6399999857);}.LBrwzc .lhZOrc.IKA38e{color: rgba(0,0,0,0.8000000119); font-weight: bold;}.LBrwzc .j10yRb:hover{color: rgba(0,0,0,0.8000000119);}.LBrwzc .eBSUbc{color: rgba(0,0,0,0.8000000119);}.LBrwzc .hDrhEe:hover{color: rgba(0,0,0,0.8000000119);}.LBrwzc .jgXgSe:hover{color: rgba(0,0,0,0.8000000119);}.LBrwzc .M9vuGd:hover{color: rgba(0,0,0,0.8000000119);}.LBrwzc .zDUgLc{border-bottom-color: rgba(204,204,204,1); border-bottom-width: 1px; border-bottom-style: solid;}.fOU46b .LBrwzc .M9vuGd{color: rgba(0,0,0,0.8000000119);}.fOU46b .LBrwzc .jgXgSe:hover{color: rgba(0,0,0,0.8000000119);}.fOU46b .LBrwzc .zDUgLc{opacity: 1; border-bottom-style: none;}.fOU46b .LBrwzc .iWs3gf{color: rgba(0,0,0,0.6399999857);}.fOU46b .GBy4H .M9vuGd{color: rgba(255,255,255,1);}.fOU46b .GBy4H .jgXgSe:hover{color: rgba(255,255,255,1);}.fOU46b .GBy4H .zDUgLc{opacity: 1;}.fOU46b .GBy4H .iWs3gf{color: rgba(255,255,255,0.8700000048);}.XeSM4.G9Qloe.fOU46b .LBrwzc .iWs3gf{color: rgba(0,0,0,0.6399999857);}.GBy4H .lhZOrc.IKA38e{color: rgba(255,255,255,1);}.GBy4H .eBSUbc{color: rgba(255,255,255,0.8700000048);}.GBy4H .hDrhEe:hover{color: rgba(255,255,255,1);}.GBy4H .j10yRb:hover{color: rgba(255,255,255,1);}.GBy4H .YTv4We{color: rgba(255,255,255,1);}.GBy4H .YTv4We.chg4Jd:focus:before{border-color: rgba(255,255,255,1); display: block;}.GBy4H .iWs3gf{color: rgba(255,255,255,0.8700000048);}.GBy4H .jgXgSe:hover{color: rgba(255,255,255,1);}.GBy4H .jgXgSe:hover{color: rgba(255,255,255,1);}.GBy4H .M9vuGd{color: rgba(255,255,255,1);}.GBy4H .M9vuGd:hover{color: rgba(255,255,255,1);}.QcmuFb{padding-left: 20px;}.vDPrib{padding-left: 40px;}.TBDXjd{padding-left: 60px;}.bYeK8e{padding-left: 80px;}.CuqSDe{padding-left: 100px;}.Havqpe{padding-left: 120px;}.JvDrRe{padding-left: 140px;}.o5lrIf{padding-left: 160px;}.yOJW7c{padding-left: 180px;}.rB8cye{padding-left: 200px;}.RuayVd{padding-right: 20px;}.YzcKX{padding-right: 40px;}.reTV0b{padding-right: 60px;}.vSYeUc{padding-right: 80px;}.PxtZIe{padding-right: 100px;}.ahQMed{padding-right: 120px;}.rzhcXb{padding-right: 140px;}.PBhj0b{padding-right: 160px;}.TlN46c{padding-right: 180px;}.GEdNnc{padding-right: 200px;}.TMjjoe{font-family: Lato, sans-serif; font-size: 9pt; line-height: 1.2; margin-top: 0px;}@media only screen and (min-width: 1280px){.yxgWrb{margin-left: 250px;}}@media only screen and (max-width: 479px){.Zjiec{font-size: 15pt;}}@media only screen and (min-width: 480px) and (max-width: 767px){.Zjiec{font-size: 17pt;}}@media only screen and (max-width: 479px){.TlfmSc{font-size: 13pt;}}@media only screen and (min-width: 480px) and (max-width: 767px){.TlfmSc{font-size: 14pt;}}@media only screen and (max-width: 479px){.PsKE7e{font-size: 12pt;}}@media only screen and (min-width: 480px) and (max-width: 767px){.PsKE7e{font-size: 12pt;}}@media only screen and (max-width: 479px){.duRjpb{font-size: 24pt;}}@media only screen and (min-width: 480px) and (max-width: 767px){.duRjpb{font-size: 29pt;}}@media only screen and (max-width: 479px){.JYVBee{font-size: 15pt;}}@media only screen and (min-width: 480px) and (max-width: 767px){.JYVBee{font-size: 17pt;}}@media only screen and (max-width: 479px){.OmQG5e{font-size: 13pt;}}@media only screen and (min-width: 480px) and (max-width: 767px){.OmQG5e{font-size: 14pt;}}@media only screen and (max-width: 479px){.Zjiec{font-size: 15pt;}}@media only screen and (min-width: 480px) and (max-width: 767px){.Zjiec{font-size: 17pt;}}@media only screen and (max-width: 479px){.TlfmSc{font-size: 13pt;}}@media only screen and (min-width: 480px) and (max-width: 767px){.TlfmSc{font-size: 14pt;}}@media only screen and (max-width: 479px){.PsKE7e{font-size: 12pt;}}@media only screen and (min-width: 480px) and (max-width: 767px){.PsKE7e{font-size: 12pt;}}@media only screen and (max-width: 479px){.TMjjoe{font-size: 9pt;}}@media only screen and (min-width: 480px) and (max-width: 767px){.TMjjoe{font-size: 9pt;}}</style><script nonce="sCsrsGAZI/O7bwONm79e1Q">_at_config = [null,"AIzaSyChg3MFqzdi1P5J-YvEyakkSA1yU7HRcDI","897606708560-a63d8ia0t9dhtpdt4i3djab2m42see7o.apps.googleusercontent.com",null,null,"v2",null,null,null,null,null,null,null,"https://content.googleapis.com","SITES_%s",null,null,null,null,null,null,null,null,null,["AHKXmL2pisrhu5-KySr-GUh5wybaa4mjWb0ZTU1XSgnTOvsOtUC43WcKe7MJTQr975qDjdyPANEd",1,"COjZ39bkkPICFQs8HwodED8LTw",1627853990391000,[5703022,5703839,5704621,5706832,5706836,5707711,5708870,5709892,5711808,5711850,5711977,5712211,5712373,5713049,5713207,5713211,5714550,5714628,5719651,5720060,5720927,5721004,5722370,5727319,5729074,5732944,5734573,5734693,5734956,5735808,5736245,5737339,5737443,5738531,5740249,5742464,5742780,14100834,14101462,14101502,14101510,14101530,14101534,14101550]],"AHL0AtJoB7TrFJTvVguYbyhjlfV5fkCBSw:1627853990338",null,null,null,0,null,null,null,null,null,null,null,null,null,"https://drive.google.com",null,null,null,null,null,null,1,1,null,0,1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,"v2internal","https://docs.google.com",null,null,null,null,null,null,"https://sites.google.com/new/?authuser\u003d0",null,null,null,null,null,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,1,"",null,null,null,null,null,null,null,null,null,null,null,null,5,null,null,"https://accounts.google.com/o/oauth2/auth","https://accounts.google.com/o/oauth2/postmessageRelay",null,null,null,null,78,"https://sites.google.com/new/?authuser\u003d0\u0026usp\u003dviewer_footer\u0026authuser\u003d0",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,[],null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"https://www.gstatic.com/atari/embeds/5de913a2354e93acf4d43c4db53928e5/intermediate-frame-minified.html",0,null,"v2beta",null,null,null,null,null,null,4,"https://accounts.google.com/o/oauth2/iframe",null,null,null,null,null,null,"https://1326265359-atari-embeds.googleusercontent.com/embeds/16cb204cf3a9d4d223a0a3fd8b0eec5d/inner-frame-minified.html",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"https://sites.google.com/unicah.edu/asf/inicio",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,null,null,null,null,null,null,0,null,"01xgrwt8",null,null,null,null,null,1,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0,null,null,null,null,null,null,null,null,null,null,null,null,null,0,null,0,null,null,[1627853990398,"atari_2021.29-Tue-0500_RC01","385858736","0",0],null,null,null,null,1,null,null,0,null,0,0,null,null,null,null,0,20,500,"https://domains.google.com",null,0,null,null,null,0,null,0,null,1,0,null,null,0,0]; window.globals = {"enableAnalytics":true,"webPropertyId":"","showDebug":false,"hashedSiteId":"4b62136b84233ae198b358c087c6bc7262df5c21a3320c3c8ee8cf7e11dad313","normalizedPath":"unicah.edu/asf/inicio","pageTitle":"Inicio"}; function gapiLoaded() {if (globals.gapiLoaded == undefined) {globals.gapiLoaded = true;} else {globals.gapiLoaded();}}window.messages = []; window.addEventListener && window.addEventListener('message', function(e) {if (window.messages && e.data && e.data.magic == 'SHIC') {window.messages.push(e);}});</script><script src="https://apis.google.com/js/client.js?onload=gapiLoaded" nonce="sCsrsGAZI/O7bwONm79e1Q"></script><script nonce="sCsrsGAZI/O7bwONm79e1Q">(function(){/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
/*

 Copyright 2011 Google LLC.
 SPDX-License-Identifier: Apache-2.0
*/
/*

 Copyright 2013 Google LLC.
 SPDX-License-Identifier: Apache-2.0
*/
/*

 Copyright 2020 Google LLC.
 SPDX-License-Identifier: Apache-2.0
*/
var a=(this||self)._jsa||{};a._cfc=void 0;a._aeh=void 0;/*

 Copyright 2005 Google LLC.
 SPDX-License-Identifier: Apache-2.0
*/
}).call(this);
</script><script nonce="sCsrsGAZI/O7bwONm79e1Q">const imageUrl =  null ;
      function bgImgLoaded() {
        if (!globals.headerBgImgLoaded) {
          globals.headerBgImgLoaded = new Date().getTime();
        } else {
          globals.headerBgImgLoaded();
        }
      }
      if (imageUrl) {
        const img = new Image();
        img.src = imageUrl;
        img.onload = bgImgLoaded;
        globals.headerBgImgExists = true;
      } else {
        globals.headerBgImgExists = false;
      }
      </script></head><body dir="ltr" itemscope itemtype="http://schema.org/WebPage" id="yDmH0d" css="yDmH0d"><div jscontroller="pc62j" jsmodel="iTeaXe" jsaction="rcuQ6b:WYd;GvneHb:og1FDd;vbaUQc:uAM5ec;YBArc:dj7Cne;"><div jscontroller="X4BaPc" jsaction="rcuQ6b:WYd;o6xM5b:Pg9eo;HuL2Hd:mHeCvf;VMhF5:FFYy5e;sk3Qmb:HI1Mdd;"><div jscontroller="o1L5Wb" data-sitename="asf" data-domain="unicah.edu" data-universe="1" jsmodel="fNFZH" jsaction="Pe9H6d:cZFEp;WMZaJ:VsGN3;hJluRd:UADL7b;zuqEgd:HI9w0;tr6QDd:Y8aXB;MxH79b:xDkBfb;JIbuQc:SPXMTb(uxAMZ);" jsname="G0jgYd"><div jsname="gYwusb" class="p9b27"></div><div jscontroller="RrXLpc" jsname="XeeWQc" role="banner" jsaction="keydown:uiKYid(OH0EC);rcuQ6b:WYd;zuqEgd:ufqpf;JIbuQc:XfTnxb(lfEfFf),AlTiYc(GeGHKb),AlTiYc(m1xNUe),zZlNMe(pZn8Oc);YqO5N:ELcyfe;"><div jsname="bF1uUb" class="BuY5Fd" jsaction="click:xVuwSc;"></div><div jsname="MVsrn" class="TbNlJb "><div role="button" class="U26fgb mUbCce fKz7Od h3nfre M9Bg4d" jscontroller="VXdfxd" jsaction="click:cOuCgd; mousedown:UX7yZ; mouseup:lbsD7e; mouseenter:tfO1Yc; mouseleave:JywGue; focus:AHmuwe; blur:O22p3e; contextmenu:mg9Pef;touchstart:p6p2H; touchmove:FwuNnf; touchend:yfqBxc(preventMouseEvents=true|preventDefault=true); touchcancel:JMtRjd;" jsshadow jsname="GeGHKb" aria-label="Volver al sitio web" aria-disabled="false" tabindex="0" data-tooltip="Volver al sitio web" data-tooltip-vertical-offset="-12" data-tooltip-horizontal-offset="0"><div class="VTBa7b MbhUzd" jsname="ksKsZd"></div><span jsslot class="xjKiLb"><span class="Ce1Y1c" style="top: -12px"><svg class="V4YR2c" viewBox="0 0 24 24" focusable="false"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg></span></span></div><div class="E2UJ5" jsname="M6JdT"><div class="rFrNMe b7AJhc zKHdkd" jscontroller="pxq3x" jsaction="clickonly:KjsqPd; focus:Jt1EX; blur:fpfTEe; input:Lg5SV" jsshadow jsname="OH0EC" aria-expanded="true"><div class="aCsJod oJeWuf"><div class="aXBtI I0VJ4d Wic03c"><span jsslot class="A37UZe qgcB3c iHd5yb"><div role="button" class="U26fgb mUbCce fKz7Od i3PoXe M9Bg4d" jscontroller="VXdfxd" jsaction="click:cOuCgd; mousedown:UX7yZ; mouseup:lbsD7e; mouseenter:tfO1Yc; mouseleave:JywGue; focus:AHmuwe; blur:O22p3e; contextmenu:mg9Pef;touchstart:p6p2H; touchmove:FwuNnf; touchend:yfqBxc(preventMouseEvents=true|preventDefault=true); touchcancel:JMtRjd;" jsshadow jsname="lfEfFf" aria-label="Buscar" aria-disabled="false" tabindex="0" data-tooltip="Buscar" data-tooltip-vertical-offset="-12" data-tooltip-horizontal-offset="0"><div class="VTBa7b MbhUzd" jsname="ksKsZd"></div><span jsslot class="xjKiLb"><span class="Ce1Y1c" style="top: -12px"><svg class="vu8Pwe" viewBox="0 0 24 24" focusable="false"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><path d="M0 0h24v24H0z" fill="none"/></svg></span></span></div><div class="EmVfjc SKShhf" data-loadingmessage="Cargando…" jscontroller="qAKInc" jsaction="animationend:kWijWc;dyRcpb:dyRcpb" jsname="aZ2wEe"><div class="Cg7hO" aria-live="assertive" jsname="vyyg5"></div><div jsname="Hxlbvc" class="xu46lf"><div class="ir3uv uWlRce co39ub"><div class="xq3j6 ERcjC"><div class="X6jHbb GOJTSe"></div></div><div class="HBnAAc"><div class="X6jHbb GOJTSe"></div></div><div class="xq3j6 dj3yTd"><div class="X6jHbb GOJTSe"></div></div></div><div class="ir3uv GFoASc Cn087"><div class="xq3j6 ERcjC"><div class="X6jHbb GOJTSe"></div></div><div class="HBnAAc"><div class="X6jHbb GOJTSe"></div></div><div class="xq3j6 dj3yTd"><div class="X6jHbb GOJTSe"></div></div></div><div class="ir3uv WpeOqd hfsr6b"><div class="xq3j6 ERcjC"><div class="X6jHbb GOJTSe"></div></div><div class="HBnAAc"><div class="X6jHbb GOJTSe"></div></div><div class="xq3j6 dj3yTd"><div class="X6jHbb GOJTSe"></div></div></div><div class="ir3uv rHV3jf EjXFBf"><div class="xq3j6 ERcjC"><div class="X6jHbb GOJTSe"></div></div><div class="HBnAAc"><div class="X6jHbb GOJTSe"></div></div><div class="xq3j6 dj3yTd"><div class="X6jHbb GOJTSe"></div></div></div></div></div><div role="button" class="U26fgb mUbCce fKz7Od JyJRXe M9Bg4d" jscontroller="VXdfxd" jsaction="click:cOuCgd; mousedown:UX7yZ; mouseup:lbsD7e; mouseenter:tfO1Yc; mouseleave:JywGue; focus:AHmuwe; blur:O22p3e; contextmenu:mg9Pef;touchstart:p6p2H; touchmove:FwuNnf; touchend:yfqBxc(preventMouseEvents=true|preventDefault=true); touchcancel:JMtRjd;" jsshadow jsname="m1xNUe" aria-label="Volver al sitio web" aria-disabled="false" tabindex="0" data-tooltip="Volver al sitio web" data-tooltip-vertical-offset="-12" data-tooltip-horizontal-offset="0"><div class="VTBa7b MbhUzd" jsname="ksKsZd"></div><span jsslot class="xjKiLb"><span class="Ce1Y1c" style="top: -12px"><svg class="V4YR2c" viewBox="0 0 24 24" focusable="false"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg></span></span></div></span><div class="Xb9hP"><input type="search" class="whsOnd zHQkBf" jsname="YPqjbf" autocomplete="off" tabindex="0" aria-label="Busca en este sitio web" value="" autofocus role="combobox" data-initial-value=""/><div jsname="LwH6nd" class="ndJi5d snByac" aria-hidden="true">Busca en este sitio web</div></div><span jsslot class="A37UZe sxyYjd MQL3Ob"><div role="button" class="U26fgb mUbCce fKz7Od Kk06A M9Bg4d" jscontroller="VXdfxd" jsaction="click:cOuCgd; mousedown:UX7yZ; mouseup:lbsD7e; mouseenter:tfO1Yc; mouseleave:JywGue; focus:AHmuwe; blur:O22p3e; contextmenu:mg9Pef;touchstart:p6p2H; touchmove:FwuNnf; touchend:yfqBxc(preventMouseEvents=true|preventDefault=true); touchcancel:JMtRjd;" jsshadow jsname="pZn8Oc" aria-label="Borrar la búsqueda" aria-disabled="false" tabindex="0" data-tooltip="Borrar la búsqueda" data-tooltip-vertical-offset="-12" data-tooltip-horizontal-offset="0"><div class="VTBa7b MbhUzd" jsname="ksKsZd"></div><span jsslot class="xjKiLb"><span class="Ce1Y1c" style="top: -12px"><svg class="fAUEUd" viewBox="0 0 24 24" focusable="false"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg></span></span></div></span><div class="i9lrp mIZh1c"></div><div jsname="XmnwAc" class="OabDMe cXrdqd"></div></div></div><div class="LXRPh"><div jsname="ty6ygf" class="ovnfwe Is7Fhb"></div></div></div></div></div></div></div><div jsname="tiN4bf"><div class="M63kCb"></div><div class="fktJzd AKpWA fOU46b XeSM4" jsname="UzWXSb" jscontroller="Md9ENb" jsaction="gsiSmd:Ffcznf;yj5fUd:cpPetb;HNXL3:q0Vyke;rcuQ6b:WYd;"><header id="atIdViewHeader"></header><div role="main" class="UtePc RCETm" dir="ltr"><section id="h.INITIAL_GRID.y162a92c978w" class="yaqOZd LB7kq nyKByd O13XJf" style=""><div class="Nu95r"><div class="IFuOkc" jsname="LQX2Vd"></div></div><div class="mYVXT"><div class="LS81yb VICjCf" tabindex="-1"><div class="hJDwNd-AhqUyc-ibL1re JNdkSc L6cTce-purZT L6cTce-pSzOP"><div class="JNdkSc-SmKAyb"><div class="" jscontroller="sGwD4d" jsaction="zXBUYb:zTPCnb;zQF9Uc:Qxe3nd;" jsname="F57UId"></div></div></div><div class="hJDwNd-AhqUyc-OiUrBf purZT-AhqUyc-II5mzb pSzOP-AhqUyc-qWD73c JNdkSc"><div class="JNdkSc-SmKAyb"><div class="" jscontroller="sGwD4d" jsaction="zXBUYb:zTPCnb;zQF9Uc:Qxe3nd;" jsname="F57UId"><div class="oKdM2c Kzv0Me"><div id="h.INITIAL_GRID.m25yp33pyhqx" class="hJDwNd-AhqUyc-OiUrBf jXK9ad D2fZ2 OjCsFc wHaque GNzUNc"><div class="jXK9ad-SmKAyb"><div class="tyJCtd mGzaTb baZpAe lkHyyc"><h1 id="h.uog38slqqor0" dir="ltr" class="CDt4Ke zfr3Q duRjpb" style="text-align: center;">Aisuru <span style="color: #000000; font-family: &#39;Arial&#39;;"><strong>💜</strong></span></h1></div></div></div></div></div></div></div><div class="hJDwNd-AhqUyc-ibL1re JNdkSc L6cTce-purZT L6cTce-pSzOP"><div class="JNdkSc-SmKAyb"><div class="" jscontroller="sGwD4d" jsaction="zXBUYb:zTPCnb;zQF9Uc:Qxe3nd;" jsname="F57UId"></div></div></div></div></div></section><section id="h.7a6669868a09e47c_3" class="yaqOZd" style=""><div class="IFuOkc"></div><div class="mYVXT"><div class="LS81yb VICjCf" tabindex="-1"><div class="hJDwNd-AhqUyc-uQSCkd purZT-AhqUyc-II5mzb pSzOP-AhqUyc-qWD73c JNdkSc"><div class="JNdkSc-SmKAyb"><div class="" jscontroller="sGwD4d" jsaction="zXBUYb:zTPCnb;zQF9Uc:Qxe3nd;" jsname="F57UId"><div class="oKdM2c Kzv0Me"><div id="h.7a6669868a09e47c_0" class="hJDwNd-AhqUyc-uQSCkd jXK9ad D2fZ2 OjCsFc wHaque GNzUNc"><div class="jXK9ad-SmKAyb"><div class="tyJCtd mGzaTb baZpAe"><p dir="ltr" class="CDt4Ke zfr3Q" style="text-align: center;"><span class=" puwcIf" style="font-family: &#39;Lato&#39;; vertical-align: baseline;"><strong>AISURU APP</strong></span></p></div></div></div></div></div></div></div></div></div></section><section id="h.68fd9d451ffb95a0_9" class="yaqOZd" style=""><div class="IFuOkc"></div><div class="mYVXT"><div class="LS81yb VICjCf" tabindex="-1"><div class="hJDwNd-AhqUyc-uQSCkd purZT-AhqUyc-II5mzb pSzOP-AhqUyc-qWD73c JNdkSc yYI8W "><div class="JNdkSc-SmKAyb"><div class="" jscontroller="sGwD4d" jsaction="zXBUYb:zTPCnb;zQF9Uc:Qxe3nd;" jsname="F57UId"><div class="oKdM2c Kzv0Me"><div id="h.68fd9d451ffb95a0_15" class="hJDwNd-AhqUyc-uQSCkd jXK9ad D2fZ2 OjCsFc GNzUNc"><div class="jXK9ad-SmKAyb"><div class="tyJCtd mGzaTb baZpAe"><div id="h.izcs3k1bhjax" class="Ap4VC aP9Z7e"></div><h1 id="h.izcs3k1bhjax" dir="ltr" class="CDt4Ke zfr3Q duRjpb" style="text-align: left;" tabindex="-1"><div jscontroller="Ae65rd" jsaction="touchstart:UrsOsc; click:KjsqPd; focusout:QZoaZ; mouseover:y0pDld; mouseout:dq0hvd;fv1Rjc:jbFSOd;CrfLRd:SzACGe;" class="CjVfdc"><div class="PPhIP rviiZ" jsname="haAclf"><div role="presentation" class="U26fgb mUbCce fKz7Od LRAOtb Znu9nd M9Bg4d" jscontroller="mxS5xe" jsaction="click:cOuCgd; mousedown:UX7yZ; mouseup:lbsD7e; mouseenter:tfO1Yc; mouseleave:JywGue; focus:AHmuwe; blur:O22p3e; contextmenu:mg9Pef;" jsshadow aria-describedby="h.izcs3k1bhjax" aria-label="Copiar el vínculo del título" aria-disabled="false" data-tooltip="Copiar el vínculo del título" aria-hidden="true" data-tooltip-position="top" data-tooltip-vertical-offset="12" data-tooltip-horizontal-offset="0"><a class="FKF6mc TpQm9d" href="#h.izcs3k1bhjax" aria-label="Copiar el vínculo del título" jsname="hiK3ld" role="button" aria-describedby="h.izcs3k1bhjax"><div class="VTBa7b MbhUzd" jsname="ksKsZd"></div><span jsslot class="xjKiLb"><span class="Ce1Y1c" style="top: -11px"><svg class="OUGEr QdAdhf" width="22px" height="22px" viewBox="0 0 24 24" fill="currentColor" focusable="false"><path d="M0 0h24v24H0z" fill="none"/><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg></span></span></a></div></div>`+aisuN+` aisus</div></h1></div></div></div></div><div class="oKdM2c"><div id="h.68fd9d451ffb95a0_17" class="hJDwNd-AhqUyc-uQSCkd jXK9ad D2fZ2 wHaque GNzUNc"><div class="jXK9ad-SmKAyb"><div class="tyJCtd mGzaTb baZpAe"><p dir="ltr" class="CDt4Ke zfr3Q" style="text-align: left;">Correo electrónico: `+firebase.auth().currentUser.email+`</p><p dir="ltr" class="CDt4Ke zfr3Q" style="text-align: left;">En pareja con `+coupleName+`</p></div></div></div></div></div></div></div></div></div></section></div><div class="Xpil1b"></div><div jscontroller="j1RDQb" jsaction="rcuQ6b:rcuQ6b;MxH79b:JdcaS;FaOgy:XuHpsb;" class="dZA9kd ynRLnc" data-last-updated-at-time="1627853540104"><div role="button" class="U26fgb JRtysb WzwrXb I12f0b K2mXPb zXBiaf ynRLnc" jscontroller="iSvg6e" jsaction="click:cOuCgd; mousedown:UX7yZ; mouseup:lbsD7e; mouseenter:tfO1Yc; mouseleave:JywGue; focus:AHmuwe; blur:O22p3e; contextmenu:mg9Pef;touchstart:p6p2H; touchmove:FwuNnf; touchend:yfqBxc(preventMouseEvents=true|preventDefault=true); touchcancel:JMtRjd;;keydown:I481le;" jsshadow jsname="Bg3gkf" aria-label="Acciones del sitio web" aria-disabled="false" tabindex="0" aria-haspopup="true" aria-expanded="false" data-menu-corner="bottom-start" data-anchor-corner="top-start"><div class="NWlf3e MbhUzd" jsname="ksKsZd"></div><span jsslot class="MhXXcc oJeWuf"><span class="Lw7GHd snByac"><svg width="24" height="24" viewBox="0 0 24 24" focusable="false" class=" NMm5M"><path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/></svg></span></span><div jsname="xl07Ob" style="display:none" aria-hidden="true"><div class="JPdR6b hVNH5c" jscontroller="uY3Nvd" jsaction="IpSVtb:TvD9Pc;fEN2Ze:xzS4ub;frq95c:LNeFm;cFpp9e:J9oOtd; click:H8nU8b; mouseup:H8nU8b; keydown:I481le; keypress:Kr2w4b; blur:O22p3e; focus:H8nU8b" role="menu" tabindex="0" style="position:fixed"><div class="XvhY1d" jsaction="mousedown:p8EH2c; touchstart:p8EH2c;"><div class="JAPqpe K0NPx"><span jsslot class="z80M1 FeRvI" jsaction="click:o6ZaF(preventDefault=true); mousedown:lAhnzb; mouseup:Osgxgf; mouseenter:SKyDAe; mouseleave:xq3APb;touchstart:jJiBRc; touchmove:kZeBdd; touchend:VfAz8(preventMouseEvents=true)" jsname="j7LFlb" data-disabled-tooltip="El contacto no se puede ver en el modo de vista previa" aria-label="Contactar" role="menuitem" tabindex="-1"><div class="aBBjbd MbhUzd" jsname="ksKsZd"></div><div class="uyYuVb oJeWuf" jscontroller="j3gDVb" jsaction="JIbuQc:sGCPHc;" jsmodel="Rta7Nb" data-normalized-path="unicah.edu/asf/inicio"><div class="jO7h3c">Contactar</div></div></span><span jsslot class="z80M1 FeRvI" jsaction="click:o6ZaF(preventDefault=true); mousedown:lAhnzb; mouseup:Osgxgf; mouseenter:SKyDAe; mouseleave:xq3APb;touchstart:jJiBRc; touchmove:kZeBdd; touchend:VfAz8(preventMouseEvents=true)" jsname="j7LFlb" data-disabled-tooltip="No se puede denunciar un uso inadecuado en el modo de vista previa" aria-label="Notificar uso inadecuado" role="menuitem" tabindex="-1"><div class="aBBjbd MbhUzd" jsname="ksKsZd"></div><div class="uyYuVb oJeWuf" jscontroller="HYv29e" jsaction="JIbuQc:dQ6O0c;" jsname="xx9PJb" data-abuse-proto="%.@.null,&quot;105555449575022803563&quot;,&quot;https://sites.google.com/unicah.edu/asf/inicio&quot;,null,null,[],[]]"><div class="jO7h3c">Notificar uso inadecuado</div></div></span><span jsslot class="z80M1 FeRvI" jsaction="click:o6ZaF(preventDefault=true); mousedown:lAhnzb; mouseup:Osgxgf; mouseenter:SKyDAe; mouseleave:xq3APb;touchstart:jJiBRc; touchmove:kZeBdd; touchend:VfAz8(preventMouseEvents=true)" jsname="j7LFlb" aria-label="Detalles de la página" role="menuitem" tabindex="-1"><div class="aBBjbd MbhUzd" jsname="ksKsZd"></div><div class="uyYuVb oJeWuf" jsaction="JIbuQc:hriXLd;" jsname="Rg8K2c"><div class="jO7h3c">Detalles de la página</div></div></span></div></div></div></div></div></div><div jscontroller="j1RDQb" jsaction="focusin:gBxDVb(srlkmf); focusout:zvXhGb(srlkmf); click:ro2KTd(psdQ5e),Toy3n(V2zOu);JIbuQc:DSypkd(Bg3gkf);MxH79b:JdcaS;rcuQ6b:rcuQ6b;" class="LqzjUe ynRLnc" data-last-updated-at-time="1627853540104"><div jsname="psdQ5e" class="Q0cSn"></div><div jsname="bN97Pc" class="hBW7Hb"><div role="button" class="U26fgb mUbCce fKz7Od kpPxtd QMuaBc M9Bg4d" jscontroller="VXdfxd" jsaction="click:cOuCgd; mousedown:UX7yZ; mouseup:lbsD7e; mouseenter:tfO1Yc; mouseleave:JywGue; focus:AHmuwe; blur:O22p3e; contextmenu:mg9Pef;touchstart:p6p2H; touchmove:FwuNnf; touchend:yfqBxc(preventMouseEvents=true|preventDefault=true); touchcancel:JMtRjd;" jsshadow jsname="Bg3gkf" aria-label="Acciones del sitio web" aria-disabled="false" tabindex="-1" aria-hidden="true"><div class="VTBa7b MbhUzd" jsname="ksKsZd"></div><span jsslot class="xjKiLb"><span class="Ce1Y1c" style="top: -12px"><svg width="24" height="24" viewBox="0 0 24 24" focusable="false" class=" NMm5M"><path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/></svg></span></span></div><div jsname="srlkmf" class="hUphyc"><div class="YkaBSd"><div class="iBkmkf"><span>Página actualizada</span> <span jsname="CFIm1b" class="dji00c" jsaction="AHmuwe:eGiyHb; mouseover:eGiyHb;" tabindex="0" role="contentinfo"></span></div></div><div class="YkaBSd" jscontroller="j3gDVb" jsmodel="Rta7Nb" jsaction="click:sGCPHc;" data-normalized-path="unicah.edu/asf/inicio"><div role="button" class="U26fgb kpPxtd J7BuEb" jsshadow aria-label="Contactar " aria-disabled="false" tabindex="0">Contactar</div></div><div class="YkaBSd" jscontroller="HYv29e" jsaction="click:dQ6O0c;" data-abuse-proto="%.@.null,&quot;105555449575022803563&quot;,&quot;https://sites.google.com/unicah.edu/asf/inicio&quot;,null,null,[],[]]"><div role="button" class="U26fgb kpPxtd J7BuEb" jsshadow aria-label="Notificar uso inadecuado" aria-disabled="false" tabindex="0">Notificar uso inadecuado</div></div></div></div></div><div jsname="kdb7zb"><div jscontroller="kklOXe" jsmodel="nbZU0e" jsaction="rcuQ6b:rcuQ6b;FaOgy:nkegzf;BU3dg:U3QbAf;HRy4zb:Z8zbSc;" class="Qg1aof HnW5Jb"><div class="t5XhQc" jsname="LgbsSe"><div jscontroller="TW9Rvc" jsaction="rcuQ6b:WYd;" tabindex="0"><div role="presentation" class="U26fgb XHsn7e MAXCNe M9Bg4d" jscontroller="VXdfxd" jsaction="click:cOuCgd; mousedown:UX7yZ; mouseup:lbsD7e; mouseenter:tfO1Yc; mouseleave:JywGue; focus:AHmuwe; blur:O22p3e; contextmenu:mg9Pef;" jsshadow jsname="LgbsSe" aria-label="Editar esta página" aria-disabled="false" data-tooltip="Editar esta página" data-tooltip-vertical-offset="-12" data-tooltip-horizontal-offset="0"><a class="FKF6mc TpQm9d" href="/u/0/d/17XsBaHZpE17GNCW0ETBJoF5w6dW4w1xb/p/1hNWuJ3vrwc65cHqDx-9Tj9jptjhwxH54/edit?authuser=0&amp;usp=edit_published_site" aria-label="Editar esta página"><div class="HaXdpb wb61gb"></div><div class="HRp7vf MbhUzd" jsname="ksKsZd"></div><span jsslot class="Ip8zfc"><svg class="EI709d" viewBox="0 0 24 24" fill="currentColor" focusable="false"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg></span></a></div></div></div></div></div></div></div><script nonce="sCsrsGAZI/O7bwONm79e1Q">DOCS_timing['cov']=new Date().getTime();</script><script src="https://www.gstatic.com/_/atari/_/js/k=atari.vw.es.hvxyftNtt_M.O/d=1/rs=AGEqA5lfquNNpyKjUABErPKRfGEAgz7Inw/m=view" id="base-js" nonce="sCsrsGAZI/O7bwONm79e1Q"></script></div></div><div jscontroller="YV8yqd" jsaction="rcuQ6b:npT2md"><div id="docs-aria-speakable" aria-live="assertive" aria-relevant="additions" aria-atomic="true" aria-hidden="false" role="region" class="IWfHH"></div></div></body></html>
    `,
    width : 612,
    height : 792,
    base64 : false
  });
  
  alert('PDF Generated', filePath.uri);
  
  }

  const getAisus = () =>{
    const id = firebase.auth().currentUser.uid;
    return firebase.firestore().collection('users').where('id','==',id).onSnapshot((querySnapShot) => {
        querySnapShot.forEach(doc => {
            setAisuN(doc.data().aisus);
        })
    })
}

/* ---------------- */


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

  blob.close();

  const link3 = await snapshot.ref.getDownloadURL();
  setLink(link3);

  firebase.auth().currentUser.updateProfile({
      photoURL : link3
    })
    .then(()=>{

      console.log("Foto actualizado")
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


/* Inicio de la función de cambio de nombre */

const changeDisplayName =  async() => {
  if(newDisplayName.length > 0){
  try{
    await firebase.auth().currentUser.updateProfile({displayName: newDisplayName});
    Alert.alert("Tu nombre se actualizó a "+newDisplayName);
  }catch(error){
    Alert.alert("Error al cambiar el nombre "+ error.message);
  }
}else{
  Alert.alert("Tu nombre no puede ir vacío");
}
  setVisible3(false);
}


/* Funcion de cambio de email */

const changeEmail = async() => { 
const ok =  EmailValidator.validate(newEmail);
if(ok){
  try{
    await firebase.auth().currentUser.updateEmail(newEmail);
    Alert.alert("Tu email se actualizó a "+newEmail);
  }catch(error){
    alert(error.message);
  }
}else{
  Alert.alert("El email no es válido");
}
setVisible2(false);
}

/* Función para cerrar sesión */
const signOut = () => {
  alert("¡Bye, bye! :)");
  firebase.auth().signOut().then(()=>{
      navigation.replace('Login');
  }).catch((error)=>{
    alert(error.message);
  });
}

/*  Función para cambiar contraseña */

const changePassword = async() =>{
  if(newPassword1 == newPassword2){
    try{
      await firebase.auth().currentUser.updatePassword(newPassword1);
      Alert.alert("Tu contraseña se actualizó exitosamente");
    }catch(error){
      alert(error.message);
    }
  }else{
    Alert.alert("Las contraseñas no coinciden");
  }
  setVisible1(false);
}


  return (
    <View style={styles.container}>

        <View>
          <Dialog.Container visible={visible1}>
          <Dialog.Title>Editar Contraseña</Dialog.Title>
          <Dialog.Input label="Contraseña nueva" placeholder="Nueva contraseña" secureTextEntry={true} value={newPassword1} onChangeText={(text)=>{setNewPassword1(text)}}/>
          <Dialog.Input label="Confirmar contraseña" placeholder="Nueva contraseña" secureTextEntry={true} value={newPassword2} onChangeText={(text)=>{setNewPassword2(text)}}/>
          <Dialog.Button label="Actualizar"  onPress={()=>changePassword()}/>
          <Dialog.Button label="Cancelar" onPress={()=>setVisible1(false)}/>
          </Dialog.Container>                                               
        </View>


        <View>
          <Dialog.Container visible={visible2}>
          <Dialog.Title>Editar Correo</Dialog.Title>
          <Dialog.Input label="Correo electrónico" placeholder="Nuevo email" value={newEmail} onChangeText={(text)=>{setNewEmail(text)}}/>
          <Dialog.Button label="Actualizar"  onPress={()=>changeEmail()}/>
          <Dialog.Button label="Cancelar" onPress={()=>setVisible2(false)}/>
          </Dialog.Container>                                               
        </View>


        <View>
          <Dialog.Container visible={visible3}>
          <Dialog.Title>Editar Nombre</Dialog.Title>
          <Dialog.Input label="Nombre" placeholder="Nuevo nombre" value={newDisplayName} onChangeText={(text)=>{setNewDisplayName(text)}}/>
          <Dialog.Button label="Actualizar"  onPress={()=>changeDisplayName()}/>
          <Dialog.Button label="Cancelar" onPress={()=>setVisible3(false)}/>
          </Dialog.Container>                                               
        </View>


      <View style={styles.superior}>
        <View style={{flex:1}}>
          <Text style={{fontWeight: 'bold', color: 'white', fontSize: 24, margin: 15}}>Mi Perfil</Text>
        </View>
        <View style={{flex:4, alignItems: 'center', justifyContent: 'flex-start'}}>
        <View style={styles.leftView}>
          <Avatar
               size="large"
               rounded
               source={{
               uri : firebase.auth().currentUser.photoURL
              }}
              onPress = {pickImage}
          >
                    <Avatar.Accessory
                        name="pencil-alt"
                        type="font-awesome-5"
                        size={20}
                    />
                </Avatar>
          </View>
        </View>
        <View style={{backgroundColor: colores.lightpurple, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 18, margin: 15}}>{firebase.auth().currentUser.displayName}</Text>
            <View style={styles.circle}>
          </View>
          </View>
      </View>
      <View style={styles.inferior}>

          <View style={{flex:1, backgroundColor: 'white', flexDirection: 'row'}}>
            <TouchableOpacity style={{flex: 1, backgroundColor: 'white'}} onPress={pickImage}>
              <View style={{flex: 1, margin: 10, backgroundColor: colores.middlepurple, borderRadius: 20}}>

                  <View style={{flex: 2, alignItems: 'center', justifyContent: 'center',}}>
                    <Fontisto
                      name="photograph"
                      size={40}
                      color = "white"
                    />
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{color: 'white'}}>Cambiar foto de perfil</Text>
                    </View>
              </View>
            </TouchableOpacity>

             
            <TouchableOpacity style={{flex: 1, backgroundColor: 'white'}} onPress={()=>setVisible1(true)}>
              <View style={{flex: 1, margin: 10, backgroundColor: colores.middlepurple, borderRadius: 20}}>

                  <View style={{flex: 2, alignItems: 'center', justifyContent: 'center',}}>
                    <FontAwesome5
                      name="user-lock"
                      size={40}
                      color = "white"
                    />
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{color: 'white'}}>Cambiar contraseña</Text>
                    </View>
              </View>
            </TouchableOpacity>
          </View>


          <View style={{flex:1, backgroundColor: 'white', flexDirection: 'row'}}>
            <TouchableOpacity style={{flex: 1, backgroundColor: 'white'}} onPress={()=>setVisible2(true)}>
              <View style={{flex: 1, margin: 10, backgroundColor: colores.middlepurple, borderRadius: 20}}>

                  <View style={{flex: 2, alignItems: 'center', justifyContent: 'center',}}>
                    <Entypo
                      name="email"
                      size={40}
                      color = "white"
                    />
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{color: 'white'}}>Cambiar email</Text>
                    </View>
              </View>
            </TouchableOpacity>

             
            <TouchableOpacity style={{flex: 1, backgroundColor: 'white'}} onPress={()=>setVisible3(true)}>
              <View style={{flex: 1, margin: 10, backgroundColor: colores.middlepurple, borderRadius: 20}}>

                  <View style={{flex: 2, alignItems: 'center', justifyContent: 'center',}}>
                    <AntDesign
                      name="idcard"
                      size={40}
                      color = "white"
                    />
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{color: 'white'}}>Cambiar mi nombre</Text>
                    </View>
              </View>
            </TouchableOpacity>
          </View>



          <View style={{flex:1, backgroundColor: 'white', flexDirection: 'row'}}>
            <TouchableOpacity style={{flex: 1, backgroundColor: 'white'}} onPress={()=>createPDF3()}>
              <View style={{flex: 1, margin: 10, backgroundColor: colores.middlepurple, borderRadius: 20}}>

                  <View style={{flex: 2, alignItems: 'center', justifyContent: 'center',}}>
                    <MaterialCommunityIcons
                      name="table-heart"
                      size={40}
                      color = "white"
                    />
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{color: 'white'}}>Generar tarjeta de pareja</Text>
                    </View>
              </View>
            </TouchableOpacity>

             
            <TouchableOpacity style={{flex: 1, backgroundColor: 'white'}} onPress={()=>signOut()}>
              <View style={{flex: 1, margin: 10, backgroundColor: colores.middlepurple, borderRadius: 20}}>

                  <View style={{flex: 2, alignItems: 'center', justifyContent: 'center',}}>
                    <MaterialCommunityIcons
                      name="logout-variant"
                      size={40}
                      color = "white"
                    />
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{color: 'white'}}>Cerrar sesión</Text>
                    </View>
              </View>
            </TouchableOpacity>
          </View>


        
      </View>
    </View>
  )
}
export default AboutScreen;

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
  },
  superior: {
    flex: 2,
    backgroundColor: colores.lightpurple
  },
  inferior: { 
    flex: 3,
  },
  leftView: {
    width: Dimensions.get('window').width*0.3,
    height: Dimensions.get('window').width*0.3,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
   borderRadius: Dimensions.get('window').width*0.3,
  },
  circle: {
    backgroundColor: colores.darkpurple,
    height: 100,
    width: 100,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
},
})


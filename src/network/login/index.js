import firebase from "../../firebase/config";
import AwesomeAlert from 'react-native-awesome-alerts';

const loginRequest = async (email, password) => {
  try {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    alert(error.message);
    return error;
  }
};

export default loginRequest;

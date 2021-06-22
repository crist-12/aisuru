import firebase from "../../firebase/config";

const SignUpRequest = (name, email, password) => {
  try {
  return firebase
     .auth()
     .createUserWithEmailAndPassword(email, password)
     .then((response)=>{
      const uid = response.user.uid;

      const data = {
        id: uid,
        email,
        name,
      };

      const usersRef = firebase.firestore().collection("users");
      usersRef
      .doc(uid)
      .set(data)
      .then(() => {
          console.log("Usuario creado :)");
      })
     })
  } catch (error) {
    return error;
  }
};

export default SignUpRequest;

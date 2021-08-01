import firebase from "../../firebase/config";

const SignUpRequest = (name, email, password) => {
  try {
  return firebase
     .auth()
     .createUserWithEmailAndPassword(email, password)
     .then((response)=>{
      const uid = response.user.uid;

      response.user.updateProfile({
        displayName: name
      })
      .then(()=>{
        console.log("Nombre actualizado")
        console.log(response.user)
      })
      .catch(()=>{
        alert("OCURRIO UN ERROR")
      })

      const data = {
        id: uid,
        email,
        name,
        aisus: 0,
        status: false,
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

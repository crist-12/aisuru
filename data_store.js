
let idP = null;
let cod = null;
let coupleObject = {
    _id :  null,
    date : null,
    iduser1 : null,
    iduser2 : null,
    state : null
}
let date =  null;

export const setIdPareja = (_idP) =>{
    console.log("Acabo de ser seteado con "+_idP);
    idP = _idP;
}

export const getIdPareja = () =>{
    return idP;
}


export const setUserCod = (_cod) =>{
    cod = _cod;
}

export const getUserCod = () =>{
    return cod;
}


export const setCoupleObject = (_coupleObject) =>{
    _coupleObject = null;
    console.log("Couple Object:  "+_coupleObject);
    coupleObject._id = _coupleObject._id
    coupleObject.date = _coupleObject.date
    coupleObject.iduser1 = _coupleObject.iduser1
    coupleObject.iduser2 = _coupleObject.iduser2
    coupleObject.state = _coupleObject.state
    }

export const getCoupleObject = () =>{
    return coupleObject;
}

export const setDateData = (_date) =>{
    date = _date;
    console.log("Fui seteado :)");
}

export const getDateData = () =>{
    return date;
}
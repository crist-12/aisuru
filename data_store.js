
let idP = null;

export const setIdPareja = (_idP) =>{
    console.log("Acabo de ser seteado con "+_idP);
    idP = _idP;
}

export const getIdPareja = () =>{
    return idP;
}


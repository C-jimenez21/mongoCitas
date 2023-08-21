import {Usuario} from "../entities/Usuario.js";

const postNewUser = async(req, res) => {
    try {
        const {PRIMER_NOMBRE_PACIENTE: name, PRIMER_APELLIDO_PACIENTE: lastnamme, TELEFONO_PACIENTE: phone,EMAIL_PACIENTE: email,NOMBRE_TIPO_DOCUMENTO: doc, ABREVIATURA_TIPO_DOCUMENTO: avdoc , GENERO_PACIENTE:genre, NOMBRE_ACUDIENTE: acuName, TELEFONO_ACUDIENTE: acuPhone, DIRECCION_ACUDIENTE:acuDic } = req.body;
        const inst = new Usuario() 
        const result = await inst.postNewUser(name, lastnamme, phone, email, doc, avdoc, genre, acuName, acuPhone, acuDic);
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}    


export{
    postNewUser
}
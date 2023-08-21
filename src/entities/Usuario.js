import { genCollection } from "../helpers/db.js";
import { getNewId } from "../helpers/db.js";
const Collection = await genCollection("Usuario")

export class Usuario {
    constructor(){}

    async getAllUsers(){
        try {
            //const result = await Collection.find().toArray();
            const pipeline = [
                    {
                        $sort:{ usu_nombre: 1 }
                    },
                {
                    $project:{
                        _id:0,
                        ID_PACIENTE: "$_id",
                        PRIMER_NOMBRE_PACIENTE: "$usu_nombre",
                        SEGUNDO_NOMBRE_PACIENTE: "$usu_segdo_nombre",
                        PRIMER_APELLIDO_PACIENTE: "$usu_primer_apellido_usuar",
                        SEGUNDO_APELLIDO_PACIENTE: "$usu_segdo_apellido_usuar",
                        TELEFONO_PACIENTE: "$usu_telefono",
                        DIRECCION_PACIENTE:"$usu_direccion",
                        EMAIL_PACIENTE:"$usu_email",
                        NOMBRE_TIPO_DOCUMENTO: "$usu_tipodoc.tipdoc_nombre",
                        ABREVIATURA_TIPO_DOCUMENTO: "$usu_tipodoc.tipdoc_abreviatura",
                        GENERO_PACIENTE: "$usu_genero",
                        NOMBRE_ACUDIENTE: "$usu_acudiente.acu_nombreCompleto",
                        TELEFONO_ACUDIENTE:"$usu_acudiente.acu_telefono",
                        DIRECCION_ACUDIENTE:"$usu_acudiente.acu_direccion"
                    }
                }
            ]
            const result = await Collection.aggregate(pipeline).toArray();
            return result
        } catch (error) {
            console.log(error);
        }
    }

    async postNewUser(name, lastnamme, phone, email, doc, avdoc, genre, acuName, acuPhone, acuDic) {
        try {
            const schema = {
                    "_id":await getNewId("Usuario"),
                    "usu_nombre": name,
                    "usu_primer_apellido_usuar": lastnamme,
                    "usu_telefono": phone,
                    "usu_email": email,
                    "usu_tipodoc": {
                        "tipdoc_nombre": doc,
                        "tipdoc_abreviatura": avdoc
                    },
                    "usu_genero": genre,
                    "usu_acudiente":  {
                        "acu_nombreCompleto": acuName,
                        "acu_telefono": acuPhone,
                        "acu_direccion": acuDic
                    }
                }
            let result = await Collection.insertOne(schema)
            return result
        } catch (error) {
            console.log(error.errInfo.details.schemaRulesNotSatisfied[0]);
        }
    }

    async updateUser(id, name, lastnamme, phone, email, doc, avdoc, genre, acuName, acuPhone, acuDic) {
        try {
            const schema = {
                "usu_nombre": name,
                "usu_primer_apellido_usuar": lastnamme,
                "usu_telefono": phone,
                "usu_email": email,
                "usu_tipodoc": {
                    "tipdoc_nombre": doc,
                    "tipdoc_abreviatura": avdoc
                },
                "usu_genero": genre,
                "usu_acudiente":  {
                    "acu_nombreCompleto": acuName,
                    "acu_telefono": acuPhone,
                    "acu_direccion": acuDic
                }
            }
                const result = await Collection.updateOne(
                    { "_id": id },
                    {$set: schema}
                );
            return result; 
        } catch (error) {
            console.log(error.errInfo.details.schemaRulesNotSatisfied[0]);
        }
    }

    async deleteUser(id) {
        try {
                let result = await Collection.deleteOne({ "_id": id });
            return result; 
        } catch (error) {
            console.log(error.errInfo.details.schemaRulesNotSatisfied[0]);
        }
    }
}

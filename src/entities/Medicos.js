import { genCollection } from "../helpers/db.js";
import { getNewId } from "../helpers/db.js";
const Collection = await genCollection("Medico")

export class Medico {
    constructor(){}

    async getMedicsBySpecially(especialidad) {
        try {
            //const result = await Collection.find().toArray();
            const pipeline =[
                {$match: {"med_especialidad":especialidad}},
                {
                  $project:{
                      _id:0,
                      ID_MEDICO: "$_id",
                      NUMERO_MATRICULA_PROFESIONAL: "$med_nroMatriculaProfesional",
                      NOMBRE_COMPLETO_MEDICO: "$med_nombreCompleto",
                      CONSULTORIO_MEDICO: "$med_consultorio",
                      ESPECIALIDAD_MEDICO: "$med_especialidad"
                    }
              }
              ]
            let result = await Collection.aggregate(pipeline).toArray();
            (result.length != 0) ? result  : result= {status: 406, message:"No se encuentran medicos de esta especialidad"}       
            return result
        } catch (error) {
            console.log(error);
        }
    }

    async getRoomByDoctor() {
        try {
            //const result = await Collection.find().toArray();
            const pipeline =[
                {
                  $project:{
                      _id:0,
                      CONSULTORIO_MEDICO: "$med_consultorio",
                      NUMERO_MATRICULA_PROFESIONAL: "$med_nroMatriculaProfesional",
                      NOMBRE_COMPLETO_MEDICO: "$med_nombreCompleto",
                    }
              }
              ]
            let result = await Collection.aggregate(pipeline).toArray();
            (result.length != 0) ? result  : result= {status: 406, message:"No se encuentran medicos de esta especialidad"}       
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

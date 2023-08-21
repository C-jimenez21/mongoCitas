import { genCollection } from "../helpers/db.js";
import { getNewId, FoundById } from "../helpers/db.js";
const Collection = await genCollection("Cita")

export class Cita {
    constructor(){}

    async getAllMedicalAppointment(){
        try {
            //const result = await Collection.find().toArray();
            const pipeline = [
                    {
                        $sort:{ cit_fecha: 1 }
                    },
                {
                    $project:{
                        _id:0,
                        ID_CITA: "$_id",
                        FECHA_CITA: "$cit_fecha",
                        ESTADO_CITA: "$cit_estadoCita",
                        DATOS_PACIENTE: "$cit_datosUsuario",
                        DATOS_MEDICO: "$cit_medico",
                    }
                }
            ]
            const result = await Collection.aggregate(pipeline).toArray();
            return result
        } catch (error) {
            console.log(error);
        }
    }

    async getFoundNextAppointment(id){
        try {
            //const result = await Collection.find().toArray();
            await FoundById("Usuario", id)
            const pipeline = [
                {$match: {"cit_datosUsuario": Number(id),"cit_fecha" : {$gt: new Date()}}},
                {$lookup: {
                  from: "Usuario",
                  localField: "cit_datosUsuario",
                  foreignField: "_id",
                  as: "result"
                }},{
                  $unwind: "$result"
                },
                {$lookup: {
                  from: "Medico",
                  localField: "cit_medico",
                  foreignField: "_id",
                  as: "Medico"
                }},{
                  $unwind: "$Medico"
                },
                {
                  $project:{
                      _id:0,
                      NOMBRE_PACIENTE: "$result.usu_nombre",
                      EMAIL_PACIENTE: "$result.usu_email",
                      NOMBRE_MEDICO: "$Medico.med_nombreCompleto",
                      ESPECIALIDAD_MEDICO: "$Medico.med_especialidad",
                      FECHA_CITA: "$cit_fecha",
                      ESTADO_CITA: "$cit_estadoCita"
                    }
              }]
              let result = await Collection.aggregate(pipeline).toArray();
              (result.length != 0) ? result  : result= {status: 406, message:"El usuario no tiene agendadas mas citas"}       
              return result
        } catch (error) {
            console.log(error);
        }

    }
    async getAppointmentsBySpecificUser(id){
        try {
            //const result = await Collection.find().toArray();
            await FoundById("Usuario", id)
            const pipeline = [
                {$match: {"cit_datosUsuario":Number(id)}},
                {$lookup: {
                  from: "Usuario",
                  localField: "cit_datosUsuario",
                  foreignField: "_id",
                  as: "result"
                }},{
                  $unwind: "$result"
                },
                {$lookup: {
                  from: "Medico",
                  localField: "cit_medico",
                  foreignField: "_id",
                  as: "Medico"
                }},{
                  $unwind: "$Medico"
                },
                {
                  $project:{
                      _id:0,
                      NOMBRE_PACIENTE: "$result.usu_nombre",
                      EMAIL_PACIENTE: "$result.usu_email",
                      NOMBRE_MEDICO: "$Medico.med_nombreCompleto",
                      ESPECIALIDAD_MEDICO: "$Medico.med_especialidad",
                      FECHA_CITA: "$cit_fecha",
                      ESTADO_CITA: "$cit_estadoCita"
                    }
              }]
              let result = await Collection.aggregate(pipeline).toArray();
              (result.length != 0) ? result  : result= {status: 406, message:"El usuario nunca ha tenido consultorias"}       
              return result
        } catch (error) {
            console.log(error);
        }

    }

    async getAppointmentByEspecificMedic(id){
        try {
            //const result = await Collection.find().toArray();
            await FoundById("Usuario", id)
            const pipeline = [
                {$match: {"cit_medico":Number(id)}},
                {$lookup: {
                  from: "Usuario",
                  localField: "cit_datosUsuario",
                  foreignField: "_id",
                  as: "result"
                }},{
                  $unwind: "$result"
                },
                {$lookup: {
                  from: "Medico",
                  localField: "cit_medico",
                  foreignField: "_id",
                  as: "Medico"
                }},{
                  $unwind: "$Medico"
                },
                {
                  $project:{
                      _id:0,
                      NOMBRE_PACIENTE: "$result.usu_nombre",
                      EMAIL_PACIENTE: "$result.usu_email",
                      NOMBRE_MEDICO: "$Medico.med_nombreCompleto",
                      ESPECIALIDAD_MEDICO: "$Medico.med_especialidad",
                      FECHA_CITA: "$cit_fecha",
                      ESTADO_CITA: "$cit_estadoCita"
                    }
              }]
              let result = await Collection.aggregate(pipeline).toArray();
              (result.length != 0) ? result  : result= {status: 406, message:"El usuario no tiene agendadas mas citas"}       
              return result
        } catch (error) {
            console.log(error);
        }

    }

    async getAppointmentBySpecificDay(fecha){
        try {
            //const result = await Collection.find().toArray();
            //await FoundById("Usuario", id)
            const pipeline = [
                {$match: {"cit_fecha":{$eq: (new Date(fecha))}}},
                {$lookup: {
                  from: "Usuario",
                  localField: "cit_datosUsuario",
                  foreignField: "_id",
                  as: "result"
                }},{
                  $unwind: "$result"
                },
                {$lookup: {
                  from: "Medico",
                  localField: "cit_medico",
                  foreignField: "_id",
                  as: "Medico"
                }},{
                  $unwind: "$Medico"
                },
                {
                  $project:{
                      _id:0,
                      NOMBRE_PACIENTE: "$result.usu_nombre",
                      EMAIL_PACIENTE: "$result.usu_email",
                      NOMBRE_MEDICO: "$Medico.med_nombreCompleto",
                      ESPECIALIDAD_MEDICO: "$Medico.med_especialidad",
                      FECHA_CITA: "$cit_fecha",
                      ESTADO_CITA: "$cit_estadoCita"
                    }
              }]
              let result = await Collection.aggregate(pipeline).toArray();
              (result.length != 0) ? result  : result= {status: 406, message:"El usuario no tiene agendadas mas citas"}       
              return result
        } catch (error) {
            console.log(error);
        }

    }

    async getAppointmentBySpecificDayAndDoctor(fecha, doctor){
        try {
            //const result = await Collection.find().toArray();
            //await FoundById("Usuario", id)
            const pipeline = [
                {$match: {"cit_fecha":{$eq: new Date(fecha)}, "cit_medico": {$eq: Number(doctor)}}},
                {$lookup: {
                  from: "Medico",
                  localField: "cit_medico",
                  foreignField: "_id",
                  as: "Medico"
                }},{
                  $unwind: "$Medico"
                }, { $group: { _id: "$Medico.med_nombreCompleto", Cantidad_de_citas: { $sum: 1 } } }]
              let result = await Collection.aggregate(pipeline).toArray();
              (result.length != 0) ? result  : result= {status: 406, message:"El usuario no tiene agendadas mas citas"}       
              return result
        } catch (error) {
            console.log(error);
        }

    }

    async getRoomsByUser(id){
        try {
            //const result = await Collection.find().toArray();
            //await FoundById("Usuario", id)
            const pipeline = [
                {$match: {"cit_datosUsuario":{$eq: Number(id)}}},
                {$lookup: {
                  from: "Usuario",
                  localField: "cit_datosUsuario",
                  foreignField: "_id",
                  as: "result"
                }},{
                  $unwind: "$result"
                },
                {$lookup: {
                  from: "Medico",
                  localField: "cit_medico",
                  foreignField: "_id",
                  as: "Medico"
                }},{
                  $unwind: "$Medico"
                },
                {
                  $project:{
                      _id:0,
                      NOMBRE_PACIENTE: "$result.usu_nombre",
                      CONSULTORIO_MEDICO: "$Medico.med_consultorio",
                      NOMBRE_MEDICO: "$Medico.med_nombreCompleto",
                     
                    }
              }]
              let result = await Collection.aggregate(pipeline).toArray();
              (result.length != 0) ? result  : result= {status: 406, message:"El usuario no tiene agendadas mas citas"}       
              return result
        } catch (error) {
            console.log(error);
        }

    }

    async getAppointmentByGenreAndState(genero){
        try {
            //const result = await Collection.find().toArray();
            //await FoundById("Usuario", id)
            const pipeline = [
                {
                  $lookup: {
                    from: "Usuario",
                    localField: "cit_datosUsuario",
                    foreignField: "_id",
                    as: "Paciente"
                  }
                },{
                  $unwind: "$Paciente"
                },
                {$lookup: {
                  from: "Medico",
                  localField: "cit_medico",
                  foreignField: "_id",
                  as: "Medico"
                }},{
                  $unwind: "$Medico"
                },
                {$match: {"Paciente.usu_genero":{$eq: genero}, "cit_estadoCita" :{$eq: 'Completada'} }},
                {
                $project: {
                  _id: 0,
                  ESTADO_CITA: "$cit_estadoCita",
                  NOMBRE_PACIENTE: "$Paciente.usu_nombre",
                  NOMBRE_MEDICO: "$Medico.med_nombreCompleto",
                  FECHA_CITA: "$cit_fecha"
                }
              }]
              let result = await Collection.aggregate(pipeline).toArray();
              (result.length != 0) ? result  : result= {status: 406, message:"El genero buscado no existe"}       
              return result
        } catch (error) {
            console.log(error);
        }

    }

    async getAppointmentRefuseByday(month) {
        try {
            //const result = await Collection.find().toArray();
            //await FoundById("Usuario", id)
            const pipeline = [
                {$match: {"cit_fecha" :{$gte: new Date(2023, month, 1),
                    $lt: new Date(2023,(month+1), 1) 
              },"cit_estadoCita" :{$eq: 'Cancelada'}}},
                {
                  $lookup: {
                    from: "Usuario",
                    localField: "cit_datosUsuario",
                    foreignField: "_id",
                    as: "Paciente"
                  }
                },{
                  $unwind: "$Paciente"
                },
                {$lookup: {
                  from: "Medico",
                  localField: "cit_medico",
                  foreignField: "_id",
                  as: "Medico"
                }},{
                  $unwind: "$Medico"
                },
                {
                $project: {
                  _id: 0,
                  ESTADO_CITA: "$cit_estadoCita",
                  NOMBRE_PACIENTE: "$Paciente.usu_nombre",
                  NOMBRE_MEDICO: "$Medico.med_nombreCompleto",
                  FECHA_CITA: "$cit_fecha"
                }
              }]
              let result = await Collection.aggregate(pipeline).toArray();
              (result.length != 0) ? result  : result= {status: 406, message:"El mes especificada no cuenta con citas canceladas"}       
              return result
        } catch (error) {
            console.log(error);
        }

    }

};
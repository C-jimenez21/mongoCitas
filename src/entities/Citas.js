import { genCollection } from "../helpers/db.js";
import { getNewId } from "../helpers/db.js";
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

    async getFoundAppointment(id){
        try {
            let result = await Collection.findOne({"cit_fecha" : {$gt: new Date()}}).toArray();
            //db.orders.deleteOne( { "expiryts" : { $lt: ISODate("2015-11-01T12:40:15Z") } } );
} catch (error) {
   console.log(error);
}

    }
};
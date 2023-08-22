import {Usuario} from "../entities/Usuario.js";
import { Medico } from "../entities/Medicos.js";
import { Cita } from "../entities/Citas.js";
import { FoundById, meses} from "../helpers/db.js";


const getAllUsers = async(req, res) => {
    try {
        const inst = new Usuario() 
        const result = await inst.getAllUsers();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}

const getAllMedicalAppointment = async(req, res) => {
    try {
        const inst = new Cita() 
        const result = await inst.getAllMedicalAppointment();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}

const getMedicByEspecially = async (req, res) => {
    try {
        const {Especialidad} = req.params
        const inst = new Medico() 
        const result = await inst.getMedicsBySpecially(Especialidad);
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}

const getNextApointmentByPacient = async (req, res) => {
    try {
        const {id_paciente} = req.params
        const inst = new Cita()
        const result = await inst.getFoundNextAppointment(id_paciente);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(404).send({"status":404, message: `El ${id} not found in the collection ${collection}`})
    }
}


const getAppointmentByEspecificMedic = async (req, res) => {
    try {
        const {id_doctor} = req.params
        const inst = new Cita()
        const result = await inst.getAppointmentByEspecificMedic(id_doctor);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(404).send({"status":404, message: `El ${id} not found in the collection ${collection}`})
    }
}
const getAppointmentsBySpecificUser = async (req, res) => {
    try {
        const {id_paciente} = req.params
        const inst = new Cita()
        const result = await inst.getAppointmentsBySpecificUser(id_paciente);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(404).send({"status":404, message: `El ${id} not found in the collection ${collection}`})
    }
} 

const getAppointmentBySpecificDay = async (req, res) => {
    try {
        const {fecha} = req.params
        const inst = new Cita()
        const result = await inst.getAppointmentBySpecificDay(fecha);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(404).send({"status":404, message: `El ${id} not found in the collection ${collection}`})
    }
} 


const getRoomByDoctor = async (req, res) => {
    try {
        const inst = new Medico()
        const result = await inst.getRoomByDoctor();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(404).send({"status":404, message: `El ${id} not found in the collection ${collection}`})
    }
} 

const getAppointmentBySpecificDayAndDoctor = async (req, res) => {
    try {
        const {FECHA_CITA, ID_MEDICO} = req.body
        const inst = new Cita()
        const result = await inst.getAppointmentBySpecificDayAndDoctor(FECHA_CITA, ID_MEDICO);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(404).send({"status":404, message: `El ${id} not found in the collection ${collection}`})
    }
} 

const getRoomsByUser = async (req, res) => {
    try {
        const {id_paciente} = req.params
        const inst = new Cita()
        const result = await inst.getRoomsByUser(id_paciente);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(404).send({"status":404, message: `El ${id} not found in the collection ${collection}`})
    }
} 

const getAppointmentByGenreAndState = async (req, res) => {
    try {
        const {genero} = req.params
        const inst = new Cita()
        const result = await inst.getAppointmentByGenreAndState(genero);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(404).send({"status":404, message: `El ${id} not found in the collection ${collection}`})
    }
} 


const getAppointmentRefuseByday = async (req, res) => {
    try {
        const {mes} = req.params
        let month = meses[mes.toLowerCase()]
        const inst = new Cita()
        const result = await inst.getAppointmentRefuseByday(Number(month));
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(404).send({"status":404, message: `El ${id} not found in the collection ${collection}`})
    }
} 


export {
    getAllUsers,
    getMedicByEspecially,
    getNextApointmentByPacient,
    getAppointmentByEspecificMedic,
    getAppointmentsBySpecificUser,
    getAppointmentBySpecificDay,
    getRoomByDoctor,
    getAppointmentBySpecificDayAndDoctor,
    getRoomsByUser,
    getAppointmentByGenreAndState,
    getAppointmentRefuseByday,
    getAllMedicalAppointment
}
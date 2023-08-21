import { Router } from "express";
import { generateToken } from '../controllers/token.js'
import { getAllUsers, getMedicByEspecially, getNextApointmentByPacient, getAppointmentByEspecificMedic , getAppointmentsBySpecificUser, getAppointmentBySpecificDay, getRoomByDoctor, getAppointmentBySpecificDayAndDoctor, getRoomsByUser, getAppointmentByGenreAndState, getAppointmentRefuseByday} from '../controllers/getData.js'
import { postNewUser } from "../controllers/postData.js";

const appLogin = Router();
const appMethods = Router();

appLogin.get('/', generateToken);
appMethods.get('/Usuario', getAllUsers);
appMethods.get('/Medico/:Especialidad', getMedicByEspecially);
appMethods.get('/NextCita/:id_paciente', getNextApointmentByPacient);
appMethods.get('/specificCitaByDoctor/:id_doctor', getAppointmentByEspecificMedic);
appMethods.get('/Consultoria/:id_paciente', getAppointmentsBySpecificUser);
appMethods.get('/specificCitaByDay/:fecha', getAppointmentBySpecificDay);
appMethods.get('/Consultorios', getRoomByDoctor);
appMethods.get('/Citas-por-dia-medico', getAppointmentBySpecificDayAndDoctor);
appMethods.get('/Consultorios-paciente/:id_paciente', getRoomsByUser);
appMethods.get('/CitasCompletadasPorGenero/:genero', getAppointmentByGenreAndState);
appMethods.get('/CitasCanceladasPorMes/:mes', getAppointmentRefuseByday);


appMethods.post('/Usuario', postNewUser);



export {
    appLogin,
    appMethods
}
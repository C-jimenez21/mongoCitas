import { Router } from "express";
import { generateToken } from '../middlewares/token.js'
import { getAllUsers, getMedicByEspecially, getNextApointmentByPacient, getAppointmentByEspecificMedic , getAppointmentsBySpecificUser, getAppointmentBySpecificDay, getRoomByDoctor, getAppointmentBySpecificDayAndDoctor, getRoomsByUser, getAppointmentByGenreAndState, getAppointmentRefuseByday} from '../controllers/getData.js'
import { postNewUser } from "../controllers/postData.js";
import { validarPermisos } from "../middlewares/permisos.js";
import { limitGet } from "../middlewares/limites.js";

const appLogin = Router();
const appMethods = Router();

appLogin.get('/', generateToken);

appMethods.get('/Usuario', validarPermisos,limitGet(), getAllUsers);
appMethods.get('/Medico/:Especialidad',validarPermisos, limitGet(), getMedicByEspecially);
appMethods.get('/Cita/NextCita/:id_paciente',validarPermisos, limitGet(), getNextApointmentByPacient);
appMethods.get('/Cita/specificCitaByDoctor/:id_doctor',validarPermisos, limitGet(), getAppointmentByEspecificMedic);
appMethods.get('/Cita/Consultoria/:id_paciente',validarPermisos, limitGet(), getAppointmentsBySpecificUser);
appMethods.get('/Cita/specificCitaByDay/:fecha',validarPermisos, limitGet(), getAppointmentBySpecificDay);
appMethods.get('/Medico/Consultorios',validarPermisos, limitGet(), getRoomByDoctor);
appMethods.get('/Cita/Citas-por-dia-medico',validarPermisos, limitGet(), getAppointmentBySpecificDayAndDoctor);
appMethods.get('/Cita/Consultorios-paciente/:id_paciente',validarPermisos, limitGet(), getRoomsByUser);
appMethods.get('/Cita/CitasCompletadasPorGenero/:genero',validarPermisos, limitGet(), getAppointmentByGenreAndState);
appMethods.get('/Cita/CitasCanceladasPorMes/:mes',validarPermisos, limitGet(), getAppointmentRefuseByday);


appMethods.post('/Usuario', postNewUser);



export {
    appLogin,
    appMethods
}
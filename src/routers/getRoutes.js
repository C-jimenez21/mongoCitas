import { Router } from "express";
import { generateToken } from '../controllers/token.js'
import { getAllUsers } from '../controllers/getData.js'
import { postNewUser } from "../controllers/postData.js";

const appLogin = Router();
const appMethods = Router();

appLogin.get('/', generateToken);
appMethods.get('/Usuario', getAllUsers);
appMethods.post('/Usuario', postNewUser);



export {
    appLogin,
    appMethods
}
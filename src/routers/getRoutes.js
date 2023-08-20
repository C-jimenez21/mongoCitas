import { Router } from "express";
import { generateToken } from '../controllers/token.js'
const appLogin = Router();


appLogin.get('/', generateToken);



export {
    appLogin
}
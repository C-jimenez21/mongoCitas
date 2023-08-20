import express from 'express';
import dotenv from 'dotenv';

import {appLogin} from './src/routers/getRoutes.js'

dotenv.config()

const appExpress = express();

appExpress.use(express.json());
appExpress.use('/login', appLogin);

let config = JSON.parse(process.env.MY_SERVER);
appExpress.listen(config, () =>{
    console.log(`listening on http://${config.hostname}:${config.port}`);
})
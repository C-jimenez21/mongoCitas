import express from 'express';
import dotenv from 'dotenv';
import passport from './src/helpers/passportHelpert.js';

import {appLogin, appMethods} from './src/routers/getRoutes.js'

dotenv.config()

const appExpress = express();

appExpress.use(passport.initialize());
appExpress.use(express.json());

appExpress.use('/login', appLogin);
appExpress.use('/apiv1', passport.authenticate('bearer', { session: false }), appMethods);

let config = JSON.parse(process.env.MY_SERVER);
appExpress.listen(config, () =>{
    console.log(`listening on http://${config.hostname}:${config.port}`);
})

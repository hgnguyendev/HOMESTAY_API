import express from 'express';
import cors from 'cors'
import './configs/mongodb';
import './configs/firebase';
import sysConfig from './configs/systemt-configs';
import router from './controllers';

export const app = express();

app.use(express.json({ limit: sysConfig.bodyParserJsonLimit }));
app.use(express.urlencoded({ extended: true, limit: sysConfig.bodyParserUrlencodedLimit }));

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Authorization-bo',
        'App-api-key',],
    credentials: true,
}

app.use(cors(corsOptions))
app.use('/api', router);
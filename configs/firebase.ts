import apn from '@parse/node-apn';
import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import systemConfigs from './systemt-configs';

const serviceAccountUser = require('./firebase-account-user.json');
// const apnKey = fs.readFileSync(path.join(__dirname, './AuthKey_4H4G77GJYL.p8'), 'utf8');

const serviceAccountUserBo = require('./firebase-account-admin.json')


export const firebaseAdminUser = admin.initializeApp(
    {
        credential: admin.credential.cert(serviceAccountUser),
    },
    'homestay'
)

export const firebaseAdminUserBo = admin.initializeApp(
    {
        credential: admin.credential.cert(serviceAccountUserBo),
    },
    'homestayadmin'
)

// export const firebaseAdminUser = admin.initializeApp(
//     {
//         credential: admin.credential.cert(serviceAccountUser),
//     },
//     'user'
// );


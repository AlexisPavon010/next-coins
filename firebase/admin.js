import * as admin from 'firebase-admin'
const serviceAccount = require('../firebase-admin-sdk.json')

const app = !admin.apps.length 
? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})
: admin.app();

const firestore = admin.firestore() 


export {firestore}
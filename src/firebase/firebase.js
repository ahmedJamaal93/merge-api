import * as admin from 'firebase-admin';
const firebase = require('firebase')

const serviceAccount = require('../../serviceAccountKey.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://merge-4db52-default-rtdb.firebaseio.com"
});
const db = admin.firestore();
module.exports = { admin, firebase, db };
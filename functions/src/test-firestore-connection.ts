
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK
const serviceAccount = require('../service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://visaflow-pro-j26o1.firebaseio.com',
});

const db = admin.firestore();

export const testFirestoreConnection = functions.https.onRequest(async (req, res) => {
  try {
    const leadsRef = db.collection('leads');
    const snapshot = await leadsRef.get();

    if (snapshot.empty) {
      res.status(200).send('Connection to Firestore was successful, but there are no leads in the collection.');
      return;
    }

    const leads: any[] = [];
    snapshot.forEach(doc => {
      leads.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).send({
      message: 'Successfully connected to Firestore and retrieved leads.',
      leads: leads
    });

  } catch (error) {
    console.error('Error connecting to Firestore:', error);
    if (error instanceof Error) {
        res.status(500).send({
          message: 'Failed to connect to Firestore.',
          error: error.message
        });
    } else {
        res.status(500).send({
          message: 'Failed to connect to Firestore.',
          error: 'An unknown error occurred.'
        });
    }
  }
});

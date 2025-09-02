
import * as admin from "firebase-admin";

// Check if the app is already initialized before trying to initialize it
if (admin.apps.length === 0) {
  admin.initializeApp();
}

const db = admin.firestore();

export { admin, db };

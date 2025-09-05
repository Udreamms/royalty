import * as admin from "firebase-admin";

/**
 * Asegura que el SDK de Firebase Admin se inicialice solo una vez.
 */
if (admin.apps.length === 0) {
  admin.initializeApp();
}

/**
 * Instancia de la base de datos Firestore.
 */
export const db = admin.firestore();

/**
 * Instancia de la aplicación Firebase Admin.
 */
export const app = admin.app();

export { admin };
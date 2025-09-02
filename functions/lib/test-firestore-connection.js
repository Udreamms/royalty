"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.testFirestoreConnection = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
// Initialize Firebase Admin SDK
const serviceAccount = require('../service-account-key.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://visaflow-pro-j26o1.firebaseio.com',
});
const db = admin.firestore();
exports.testFirestoreConnection = functions.https.onRequest(async (req, res) => {
    try {
        const leadsRef = db.collection('leads');
        const snapshot = await leadsRef.get();
        if (snapshot.empty) {
            res.status(200).send('Connection to Firestore was successful, but there are no leads in the collection.');
            return;
        }
        const leads = [];
        snapshot.forEach(doc => {
            leads.push({ id: doc.id, ...doc.data() });
        });
        res.status(200).send({
            message: 'Successfully connected to Firestore and retrieved leads.',
            leads: leads
        });
    }
    catch (error) {
        console.error('Error connecting to Firestore:', error);
        if (error instanceof Error) {
            res.status(500).send({
                message: 'Failed to connect to Firestore.',
                error: error.message
            });
        }
        else {
            res.status(500).send({
                message: 'Failed to connect to Firestore.',
                error: 'An unknown error occurred.'
            });
        }
    }
});
//# sourceMappingURL=test-firestore-connection.js.map
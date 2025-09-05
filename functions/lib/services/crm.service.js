"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrUpdateOpportunity = createOrUpdateOpportunity;
exports.saveIncomingMessage = saveIncomingMessage;
const firebase_functions_1 = require("firebase-functions");
const firebase_1 = require("../config/firebase");
/**
 * Crea o actualiza una oportunidad basada en un mensaje entrante.
 */
async function createOrUpdateOpportunity(message) {
    const from = message.from;
    const opportunityRef = firebase_1.db.collection('opportunities').doc(from);
    const textSnippet = message.text?.body || `[${message.type}]`;
    try {
        const docSnap = await opportunityRef.get();
        const now = firebase_1.admin.firestore.FieldValue.serverTimestamp();
        if (!docSnap.exists) {
            firebase_functions_1.logger.info(`Creando nueva oportunidad para ${from}`);
            const newOpportunity = {
                name: `Oportunidad ${from.slice(-4)}`,
                phoneNumber: from,
                source: "WhatsApp",
                currentPipeline: "default",
                // Aseguramos que la etapa coincida con el id del frontend
                currentStage: "new",
                lastMessageSnippet: textSnippet,
                hasUnreadMessages: true,
            };
            await opportunityRef.set({ ...newOpportunity, createdAt: now, lastContacted: now });
        }
        else {
            firebase_functions_1.logger.info(`Actualizando oportunidad para ${from}`);
            await opportunityRef.update({ lastContacted: now, lastMessageSnippet: textSnippet, hasUnreadMessages: true });
        }
    }
    catch (error) {
        firebase_functions_1.logger.error(`Error en createOrUpdateOpportunity para ${from}:`, error);
        throw error;
    }
}
/**
 * Guarda un mensaje entrante en la subcolección de conversaciones.
 */
async function saveIncomingMessage(message) {
    const text = message.text?.body || `[${message.type} - sin texto]`;
    const conversationRef = firebase_1.db.collection("conversations").doc(message.from).collection("messages");
    const newMessage = {
        from: "cliente",
        text: text,
        type: message.type,
        timestamp: new Date(parseInt(message.timestamp, 10) * 1000),
        whatsappMessageId: message.id,
        direction: "inbound",
        status: "received",
    };
    await conversationRef.add(newMessage);
}
//# sourceMappingURL=crm.service.js.map
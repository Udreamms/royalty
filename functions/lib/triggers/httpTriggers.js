"use strict";
// Pega este código en: functions/src/triggers/httpTriggers.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendManualWhatsAppMessage = exports.whatsappWebhook = void 0;
const https_1 = require("firebase-functions/v2/https");
const firebase_functions_1 = require("firebase-functions");
const crm_service_1 = require("../services/crm.service");
const whatsapp_service_1 = require("../services/whatsapp.service");
const firebase_1 = require("../config/firebase");
const VERIFY_TOKEN = (0, firebase_functions_1.config)().whatsapp?.verify_token;
/**
 * Lógica principal del webhook de WhatsApp.
 */
async function processWhatsAppWebhook(body) {
    const change = body.entry?.[0]?.changes?.[0];
    if (change?.field !== "messages")
        return;
    const value = change.value;
    if (value.messages?.[0]) {
        const message = value.messages[0];
        await Promise.all([
            (0, crm_service_1.saveIncomingMessage)(message),
            (0, crm_service_1.createOrUpdateOpportunity)(message),
        ]);
    }
}
/**
 * Endpoint HTTP para el webhook de WhatsApp.
 */
exports.whatsappWebhook = (0, https_1.onRequest)({ cors: true }, async (req, res) => {
    if (req.method === "GET") {
        const mode = req.query["hub.mode"];
        const token = req.query["hub.verify_token"];
        const challenge = req.query["hub.challenge"];
        if (mode === "subscribe" && token === VERIFY_TOKEN) {
            firebase_functions_1.logger.info("Webhook verificado exitosamente!");
            res.status(200).send(challenge);
        }
        else {
            firebase_functions_1.logger.warn("Falló la verificación del Webhook. Token recibido:", token);
            res.sendStatus(403);
        }
    }
    else if (req.method === "POST") {
        try {
            await processWhatsAppWebhook(req.body);
            res.status(200).send("EVENT_RECEIVED");
        }
        catch (error) {
            firebase_functions_1.logger.error("Error procesando webhook:", error);
            res.status(500).send("INTERNAL_SERVER_ERROR");
        }
    }
    else {
        res.sendStatus(405);
    }
});
/**
 * Función callable para que un agente autenticado envíe un mensaje manual.
 */
exports.sendManualWhatsAppMessage = (0, https_1.onCall)(async (request) => {
    // En un futuro, aquí puedes validar que el usuario que llama está autenticado
    // const uid = request.auth?.uid;
    // if (!uid) {
    //   throw new HttpsError("unauthenticated", "Debes estar autenticado.");
    // }
    const { to, message } = request.data;
    if (!to || !message) {
        throw new https_1.HttpsError("invalid-argument", "Faltan los parámetros 'to' o 'message'.");
    }
    try {
        await (0, whatsapp_service_1.sendWhatsAppMessage)(to, {
            type: "text",
            text: { body: message },
        });
        // Guardamos también el mensaje del agente en la base de datos
        await firebase_1.db.collection("conversations").doc(to).collection("messages").add({
            from: "agente",
            text: message,
            type: "text",
            timestamp: new Date(),
            direction: "outbound",
            status: "sent",
        });
        return { success: true, message: "Mensaje enviado." };
    }
    catch (error) {
        firebase_functions_1.logger.error("Error al enviar mensaje manual:", error);
        throw new https_1.HttpsError("internal", "No se pudo enviar el mensaje.");
    }
});
//# sourceMappingURL=httpTriggers.js.map
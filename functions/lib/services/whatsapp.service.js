"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWhatsAppMessage = sendWhatsAppMessage;
const axios_1 = __importDefault(require("axios"));
const firebase_functions_1 = require("firebase-functions");
const firebase_1 = require("../config/firebase");
const WHATSAPP_API_VERSION = "v19.0";
const WHATSAPP_API_TOKEN = process.env.WHATSAPP_API_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
/**
 * Envía un mensaje a través de la API de WhatsApp Business.
 */
async function sendWhatsAppMessage(to, messageData) {
    if (!WHATSAPP_API_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
        firebase_functions_1.logger.error("CRÍTICO: Variables de entorno de WhatsApp no configuradas.");
        throw new Error("Credenciales de API de WhatsApp no configuradas.");
    }
    const url = `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`;
    const payload = { messaging_product: "whatsapp", to: to.replace(/\D/g, ''), ...messageData };
    try {
        const response = await axios_1.default.post(url, payload, {
            headers: { 'Authorization': `Bearer ${WHATSAPP_API_TOKEN}`, 'Content-Type': 'application/json' },
        });
        const messageId = response.data.messages[0].id;
        await firebase_1.db.collection("conversations").doc(to).collection("messages").add({
            from: "bot",
            text: payload.text?.body || `[${payload.type}]`,
            type: payload.type,
            timestamp: new Date(),
            whatsappMessageId: messageId,
            direction: "outbound",
            status: "sent",
        });
        firebase_functions_1.logger.info(`Mensaje enviado a ${to}. Message ID: ${messageId}`);
        return response.data;
    }
    catch (error) {
        const axiosError = error;
        firebase_functions_1.logger.error("--- ERROR ENVIANDO MENSAJE WHATSAPP ---", { response: axiosError.response?.data, requestData: payload });
        throw new Error("Fallo al enviar mensaje vía API de WhatsApp.");
    }
}
//# sourceMappingURL=whatsapp.service.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSimpleWhatsAppMessage = sendSimpleWhatsAppMessage;
exports.sendWhatsAppMessage = sendWhatsAppMessage;
const axios_1 = __importDefault(require("axios"));
const firebase_functions_1 = require("firebase-functions");
const WHATSAPP_API_VERSION = "v19.0";
const WHATSAPP_API_TOKEN = process.env.WHATSAPP_API_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
async function sendSimpleWhatsAppMessage(to, text) {
    if (!WHATSAPP_API_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
        firebase_functions_1.logger.error("CRÍTICO: WHATSAPP_API_TOKEN o WHATSAPP_PHONE_NUMBER_ID no están configurados.");
        return;
    }
    const url = `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`;
    const payload = {
        messaging_product: "whatsapp",
        to: to.replace(/\D/g, ''),
        type: "text",
        text: { body: text },
    };
    try {
        firebase_functions_1.logger.info(`Enviando mensaje simple a ${to}`);
        await axios_1.default.post(url, payload, {
            headers: { Authorization: `Bearer ${WHATSAPP_API_TOKEN}` },
        });
        firebase_functions_1.logger.info(`Mensaje simple enviado con éxito a ${to}`);
    }
    catch (error) {
        firebase_functions_1.logger.error("--- ERROR ENVIANDO MENSAJE SIMPLE ---");
        if (error.response) {
            firebase_functions_1.logger.error("DATOS DEL ERROR:", JSON.stringify(error.response.data, null, 2));
        }
        else {
            firebase_functions_1.logger.error("ERROR GENERAL:", error.message);
        }
        firebase_functions_1.logger.error("--- FIN DEL REPORTE DE ERROR ---");
    }
}
async function sendWhatsAppMessage(recipientId, phoneNumberId, stepData) {
    if (!WHATSAPP_API_TOKEN) {
        firebase_functions_1.logger.error("WHATSAPP_API_TOKEN no está configurado.");
        return;
    }
    if (!phoneNumberId) {
        firebase_functions_1.logger.error(`phoneNumberId no fue proporcionado para el destinatario ${recipientId}. No se puede enviar mensaje.`);
        return;
    }
    const url = `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${phoneNumberId}/messages`;
    const payload = { messaging_product: "whatsapp", to: recipientId };
    const formattedText = stepData.text || '';
    switch (stepData.type) {
        case 'text':
            payload.type = "text";
            payload.text = { body: formattedText };
            break;
        case 'buttons':
            payload.type = "interactive";
            payload.interactive = {
                type: "button",
                body: { text: formattedText },
                action: {
                    buttons: stepData.responses.map((r) => ({
                        type: "reply",
                        reply: { id: r.id, title: r.title },
                    })),
                },
            };
            break;
        case 'list':
            payload.type = "interactive";
            payload.interactive = {
                type: "list",
                body: { text: formattedText },
                action: {
                    button: stepData.buttonText || "Opciones",
                    sections: stepData.sections.map((s) => ({
                        title: s.title,
                        rows: s.rows.map((r) => ({
                            id: r.id,
                            title: r.title,
                            description: r.description || "",
                        })),
                    })),
                },
            };
            break;
        case 'image':
            payload.type = "image";
            payload.image = { link: stepData.mediaUrl };
            break;
        case 'video':
            payload.type = "video";
            payload.video = { link: stepData.mediaUrl };
            break;
        case 'document':
            payload.type = "document";
            payload.document = {
                link: stepData.mediaUrl,
                filename: stepData.mediaFilename || "Documento.pdf",
            };
            break;
        case 'logic':
            firebase_functions_1.logger.info(`Nodo de tipo 'logic' ('${stepData.nodeId}') ejecutado. No se envía mensaje.`);
            return;
        default:
            firebase_functions_1.logger.error(`Tipo de nodo desconocido: ${stepData.type}`);
            return;
    }
    try {
        firebase_functions_1.logger.info(`Enviando payload a WhatsApp para ${recipientId}:`, JSON.stringify(payload, null, 2));
        await axios_1.default.post(url, payload, {
            headers: { Authorization: `Bearer ${WHATSAPP_API_TOKEN}` },
        });
        firebase_functions_1.logger.info(`Mensaje tipo '${stepData.type}' enviado a ${recipientId}`);
    }
    catch (error) {
        firebase_functions_1.logger.error("--- INVESTIGADOR DE ERRORES DE WHATSAPP ---");
        if (error.response) {
            firebase_functions_1.logger.error("DATOS DEL ERROR:", JSON.stringify(error.response.data, null, 2));
        }
        else {
            firebase_functions_1.logger.error("ERROR GENERAL:", error.message);
        }
        firebase_functions_1.logger.error("--- FIN DEL REPORTE DEL INVESTIGADOR ---");
        throw new Error("Error al enviar mensaje vía WhatsApp API.");
    }
}
//# sourceMappingURL=whatsapp.service.js.map
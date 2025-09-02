"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.whatsappWebhook = void 0;
const https_1 = require("firebase-functions/v2/https");
const firebase_functions_1 = require("firebase-functions");
const bot_service_1 = require("../services/bot.service");
exports.whatsappWebhook = (0, https_1.onRequest)(async (req, res) => {
    if (req.method === "GET") {
        const mode = req.query["hub.mode"];
        const token = req.query["hub.verify_token"];
        const challenge = req.query["hub.challenge"];
        const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;
        if (mode === "subscribe" && token === VERIFY_TOKEN) {
            firebase_functions_1.logger.info("Webhook verificado exitosamente!");
            res.status(200).send(challenge);
        }
        else {
            firebase_functions_1.logger.warn("Falló la verificación del Webhook.");
            res.sendStatus(403);
        }
        return;
    }
    if (req.method === "POST") {
        try {
            await (0, bot_service_1.handleWhatsAppWebhook)(req.body);
            res.status(200).send("EVENT_RECEIVED");
        }
        catch (error) {
            firebase_functions_1.logger.error("Error CRÍTICO en el webhook:", error);
            res.status(500).send("INTERNAL_SERVER_ERROR");
        }
        return;
    }
    res.sendStatus(405);
});
//# sourceMappingURL=whatsappWebhook.js.map
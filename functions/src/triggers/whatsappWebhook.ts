
import { onRequest } from "firebase-functions/v2/https";
import { logger } from "firebase-functions";
import { handleWhatsAppWebhook } from "../services/bot.service";

export const whatsappWebhook = onRequest(async (req, res) => {
    if (req.method === "GET") {
        const mode = req.query["hub.mode"];
        const token = req.query["hub.verify_token"];
        const challenge = req.query["hub.challenge"];
        const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

        if (mode === "subscribe" && token === VERIFY_TOKEN) {
            logger.info("Webhook verificado exitosamente!");
            res.status(200).send(challenge);
        } else {
            logger.warn("Falló la verificación del Webhook.");
            res.sendStatus(403);
        }
        return;
    }

    if (req.method === "POST") {
        try {
            await handleWhatsAppWebhook(req.body);
            res.status(200).send("EVENT_RECEIVED");
        } catch (error) {
            logger.error("Error CRÍTICO en el webhook:", error);
            res.status(500).send("INTERNAL_SERVER_ERROR");
        }
        return;
    }

    res.sendStatus(405);
});

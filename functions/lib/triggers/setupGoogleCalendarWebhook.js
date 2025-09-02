"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupGoogleCalendarWebhook = void 0;
const https_1 = require("firebase-functions/v2/https");
const firebase_functions_1 = require("firebase-functions");
const googleapis_1 = require("googleapis");
const uuid_1 = require("uuid");
const firebase_1 = require("../config/firebase");
const auth = new googleapis_1.google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/calendar.events"],
});
const calendar = googleapis_1.google.calendar({ version: "v3", auth });
const CALENDAR_ID = "udreamms@gmail.com";
exports.setupGoogleCalendarWebhook = (0, https_1.onRequest)(async (req, res) => {
    const webhookUrl = "https://us-central1-visaflow-pro-j26o1.cloudfunctions.net/handleGoogleCalendarWebhook";
    const channelId = (0, uuid_1.v4)();
    try {
        const response = await calendar.events.watch({
            calendarId: CALENDAR_ID,
            requestBody: {
                id: channelId,
                type: "web_hook",
                address: webhookUrl,
            },
        });
        const resourceId = response.data.resourceId;
        firebase_functions_1.logger.info(`Canal de Webhook creado. ID: ${channelId}, ResourceID: ${resourceId}`);
        await firebase_1.db.collection('internal_config').doc('google_calendar_webhook').set({
            channelId: channelId,
            resourceId: resourceId,
            createdAt: new Date(),
        });
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(`
            <h1>¡Webhook Creado!</h1>
            <p>Se ha configurado la notificación para el calendario: ${CALENDAR_ID}</p>
            <p>Las notificaciones se enviarán a: ${webhookUrl}</p>
        `);
    }
    catch (error) {
        firebase_functions_1.logger.error("Error al crear el Webhook de Google Calendar:", error);
        res.status(500).send("Error al configurar el webhook.");
    }
});
//# sourceMappingURL=setupGoogleCalendarWebhook.js.map
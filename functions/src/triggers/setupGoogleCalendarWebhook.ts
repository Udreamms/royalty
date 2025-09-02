
import { onRequest } from "firebase-functions/v2/https";
import { logger } from "firebase-functions";
import { google } from "googleapis";
import { v4 as uuidv4 } from "uuid";
import { db } from "../config/firebase";

const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/calendar.events"],
});

const calendar = google.calendar({ version: "v3", auth });
const CALENDAR_ID = "udreamms@gmail.com";

export const setupGoogleCalendarWebhook = onRequest(async (req, res) => {
    const webhookUrl = "https://us-central1-visaflow-pro-j26o1.cloudfunctions.net/handleGoogleCalendarWebhook";
    const channelId = uuidv4();

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
        logger.info(`Canal de Webhook creado. ID: ${channelId}, ResourceID: ${resourceId}`);

        await db.collection('internal_config').doc('google_calendar_webhook').set({
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
    } catch (error) {
        logger.error("Error al crear el Webhook de Google Calendar:", error);
        res.status(500).send("Error al configurar el webhook.");
    }
});

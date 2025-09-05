import { onRequest } from "firebase-functions/v2/https";
import { logger } from "firebase-functions";
import { google } from "googleapis";
// CORRECCIÓN: Se eliminó la línea 'import { db }...' que no se usaba.
import { sendWhatsAppMessage } from "../services/whatsapp.service";

const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/calendar.events.readonly"],
});
const calendar = google.calendar({ version: "v3", auth });

// Extrae el número de teléfono de la descripción del evento
function extractPhoneNumber(description: string): string | null {
    if (!description) return null;
    const match = description.match(/Teléfono:\s*([+\d\s()-]+)/);
    return match ? match[1].replace(/\D/g, '') : null;
}

/**
 * Webhook que se activa con cambios en Google Calendar.
 */
export const handleGoogleCalendarWebhook = onRequest(async (req, res) => {
    // Ignorar la notificación de sincronización inicial
    if (req.headers['x-goog-resource-state'] === 'sync') {
        res.status(200).send("Sync notification received.");
        return;
    }

    try {
        const response = await calendar.events.list({
            calendarId: process.env.GOOGLE_CALENDAR_ID, // Usa una variable de entorno
            orderBy: 'updated',
            maxResults: 1,
            singleEvents: true,
        });

        const latestEvent = response.data.items?.[0];
        if (!latestEvent?.description) {
            res.status(200).send("No actionable event found.");
            return;
        }

        const clientPhone = extractPhoneNumber(latestEvent.description);
        if (!clientPhone) {
            logger.warn("No se pudo extraer el número de teléfono del evento.", { event: latestEvent.summary });
            res.status(200).send("Phone number not found.");
            return;
        }

        const confirmationMessage = `¡Hola! Te confirmamos tu cita para "${latestEvent.summary}" el ${new Date(latestEvent.start?.dateTime || "").toLocaleString('es-ES')}.`;

        await sendWhatsAppMessage(clientPhone, {
            type: "text",
            text: { body: confirmationMessage }
        });

        res.status(200).send("Confirmation sent.");
    } catch (error) {
        logger.error("Error en webhook de Google Calendar:", error);
        res.status(500).send("Internal Server Error.");
    }
});
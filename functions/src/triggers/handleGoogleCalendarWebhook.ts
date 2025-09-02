
import { onRequest } from "firebase-functions/v2/https";
import { logger } from "firebase-functions";
import { db } from "../config/firebase";
import { google } from "googleapis";
import { sendSimpleWhatsAppMessage } from "../services/whatsapp.service";

const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/calendar.events.readonly"],
});

const calendar = google.calendar({ version: "v3", auth });
const CALENDAR_ID = "udreamms@gmail.com";

function extractPhoneNumber(description: string): string | null {
    if (!description) return null;
    const cleanDescription = description.replace(/<[^>]*>?/gm, '\n');
    const lines = cleanDescription.split('\n').filter(line => line.trim() !== '');
    const bookedByIndex = lines.findIndex(line => line.includes("Booked by"));
    if (bookedByIndex !== -1 && lines[bookedByIndex + 3]) {
        const rawPhone = lines[bookedByIndex + 3].trim();
        return rawPhone.replace(/\D/g, '');
    }
    return null;
}

function formatEventDateTime(isoString: string): string {
    const date = new Date(isoString);
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        hour: 'numeric', minute: '2-digit', timeZone: 'America/Denver', hour12: true
    };
    return new Intl.DateTimeFormat('es-MX', options).format(date);
}

export const handleGoogleCalendarWebhook = onRequest(async (req, res) => {
    if (req.headers['x-goog-resource-state'] === 'sync') {
        res.status(200).send("Sync notification received. OK.");
        return;
    }

    try {
        const response = await calendar.events.list({
            calendarId: CALENDAR_ID,
            orderBy: 'updated',
            maxResults: 1,
            singleEvents: true,
        });

        const latestEvent = response.data.items?.[0];
        if (!latestEvent || !latestEvent.hangoutLink || !latestEvent.description || !latestEvent.start?.dateTime) {
            logger.error("Evento reciente no es válido.");
            res.status(200).send("No actionable event found.");
            return;
        }

        const clientPhone = extractPhoneNumber(latestEvent.description);
        if (!clientPhone) {
            logger.error("No se pudo extraer un número de teléfono válido.");
            res.status(200).send("Phone number not found in event.");
            return;
        }

        const prospectRef = db.collection('prospects').doc(clientPhone);
        const prospectSnap = await prospectRef.get();
        if (!prospectSnap.exists) {
            logger.error(`Prospecto no encontrado en Firestore para el ID ${clientPhone}.`);
            res.status(200).send("Prospect not found in DB.");
            return;
        }

        const prospectData = prospectSnap.data()!;
        const botMessageRef = db.doc('bots/asesor_udreamms_inicial/flows/flow_calificacion_v2/steps/text_1753055350282');
        const botMessageSnap = await botMessageRef.get();
        if (!botMessageSnap.exists) {
            logger.error("No se encontró la plantilla de mensaje del bot.");
            res.status(500).send("Bot message template not found.");
            return;
        }

        const messageTemplate = botMessageSnap.data()!.text;
        const formattedMeetingTime = formatEventDateTime(latestEvent.start.dateTime);
        let finalMessage = messageTemplate.replace(/\[Nombre\]/gi, prospectData.name || 'Cliente');
        finalMessage = finalMessage.replace(/\[Fecha y hora seleccionada\]/g, formattedMeetingTime);
        finalMessage = finalMessage.replace(/\[Aquí irá el enlace automático generado por el calendario\]/g, latestEvent.hangoutLink);

        await sendSimpleWhatsAppMessage(clientPhone, finalMessage);
        await prospectRef.update({ hasScheduledMeeting: true });
        await db.collection('userStates').doc(clientPhone).update({ botStatus: 'finalizado' });

        logger.info(`¡ÉXITO! Mensaje de confirmación enviado a ${clientPhone}`);
        res.status(200).send("OK. Confirmation sent.");
    } catch (error) {
        logger.error("Error CRÍTICO en el webhook de Google Calendar:", error);
        res.status(500).send("Internal Server Error.");
    }
});

"use strict";
//import { calendar_v3 } from "googleapis";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractBookingDetails = extractBookingDetails;
exports.formatEventDateTime = formatEventDateTime;
// Extrae el nombre y el teléfono de la descripción del evento
function extractBookingDetails(description) {
    const details = { name: null, phone: null };
    if (!description)
        return details;
    // La descripción viene con HTML, lo limpiamos para facilitar la búsqueda.
    const cleanDescription = description.replace(/<[^>]*>?/gm, '\n');
    const lines = cleanDescription.split('\n').filter(line => line.trim() !== '');
    const bookedByIndex = lines.findIndex(line => line.includes("Booked by"));
    if (bookedByIndex !== -1) {
        // El nombre suele estar en la línea siguiente a "Booked by"
        if (lines[bookedByIndex + 1]) {
            details.name = lines[bookedByIndex + 1].trim();
        }
        // El teléfono suele estar dos líneas después del email
        if (lines[bookedByIndex + 3]) {
            details.phone = lines[bookedByIndex + 3].trim().replace(/\D/g, ''); // Limpia y deja solo números
        }
    }
    return details;
}
// Formatea la fecha y hora a un formato amigable en español
function formatEventDateTime(isoString) {
    const date = new Date(isoString);
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'America/Denver', // Asegúrate que esta sea tu zona horaria
        hour12: true,
    };
    return new Intl.DateTimeFormat('es-MX', options).format(date);
}
//# sourceMappingURL=calendarUtils.js.map
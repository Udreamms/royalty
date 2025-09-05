import { logger } from "firebase-functions";

// Triggers HTTP
export { whatsappWebhook } from "./triggers/httpTriggers";
export { handleGoogleCalendarWebhook } from "./triggers/calendarTriggers";

logger.info("🚀 Funciones del CRM desplegadas y listas.");
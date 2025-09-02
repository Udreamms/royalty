
import { logger } from "firebase-functions";
import * as admin from "firebase-admin";

// Initialize Firebase Admin SDK
if (admin.apps.length === 0) {
  admin.initializeApp();
}

// Triggers
export { handleGoogleCalendarWebhook } from "./triggers/handleGoogleCalendarWebhook";
export { setupGoogleCalendarWebhook } from "./triggers/setupGoogleCalendarWebhook";
export { whatsappWebhook } from "./triggers/whatsappWebhook";

logger.info("Core functions initialized");

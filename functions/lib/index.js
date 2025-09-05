"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGoogleCalendarWebhook = exports.whatsappWebhook = void 0;
const firebase_functions_1 = require("firebase-functions");
// Triggers HTTP
var httpTriggers_1 = require("./triggers/httpTriggers");
Object.defineProperty(exports, "whatsappWebhook", { enumerable: true, get: function () { return httpTriggers_1.whatsappWebhook; } });
var calendarTriggers_1 = require("./triggers/calendarTriggers");
Object.defineProperty(exports, "handleGoogleCalendarWebhook", { enumerable: true, get: function () { return calendarTriggers_1.handleGoogleCalendarWebhook; } });
firebase_functions_1.logger.info("🚀 Funciones del CRM desplegadas y listas.");
//# sourceMappingURL=index.js.map
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.whatsappWebhook = exports.setupGoogleCalendarWebhook = exports.handleGoogleCalendarWebhook = void 0;
const firebase_functions_1 = require("firebase-functions");
const admin = __importStar(require("firebase-admin"));
// Initialize Firebase Admin SDK
if (admin.apps.length === 0) {
    admin.initializeApp();
}
// Triggers
var handleGoogleCalendarWebhook_1 = require("./triggers/handleGoogleCalendarWebhook");
Object.defineProperty(exports, "handleGoogleCalendarWebhook", { enumerable: true, get: function () { return handleGoogleCalendarWebhook_1.handleGoogleCalendarWebhook; } });
var setupGoogleCalendarWebhook_1 = require("./triggers/setupGoogleCalendarWebhook");
Object.defineProperty(exports, "setupGoogleCalendarWebhook", { enumerable: true, get: function () { return setupGoogleCalendarWebhook_1.setupGoogleCalendarWebhook; } });
var whatsappWebhook_1 = require("./triggers/whatsappWebhook");
Object.defineProperty(exports, "whatsappWebhook", { enumerable: true, get: function () { return whatsappWebhook_1.whatsappWebhook; } });
firebase_functions_1.logger.info("Core functions initialized");
//# sourceMappingURL=index.js.map
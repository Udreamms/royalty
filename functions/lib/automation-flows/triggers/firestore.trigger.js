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
exports.onNewProspectCreated = void 0;
const firestore_1 = require("firebase-functions/v2/firestore");
const logger = __importStar(require("firebase-functions/logger"));
const execution_service_1 = require("../services/execution.service");
const params_1 = require("firebase-functions/params");
const welcomeFlowId = (0, params_1.defineString)("WELCOME_FLOW_ID");
exports.onNewProspectCreated = (0, firestore_1.onDocumentCreated)("prospects/{prospectId}", async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
        logger.info("No data associated with the event, skipping.");
        return;
    }
    const prospectData = snapshot.data();
    if (!prospectData || !prospectData.email) {
        logger.warn(`Prospect ${snapshot.id} was created without data or an email.`);
        return;
    }
    logger.info(`New prospect created: ${prospectData.email}. Starting welcome flow.`);
    try {
        await (0, execution_service_1.startFlow)(welcomeFlowId.value(), prospectData);
        logger.info(`Welcome flow started successfully for ${prospectData.email}`);
    }
    catch (error) {
        logger.error(`Failed to start welcome flow for prospect ${snapshot.id}`, error);
    }
});
//# sourceMappingURL=firestore.trigger.js.map
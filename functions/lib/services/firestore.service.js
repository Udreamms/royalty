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
exports.getConversationState = getConversationState;
exports.updateConversationState = updateConversationState;
exports.getFlow = getFlow;
const admin = __importStar(require("firebase-admin"));
/**
 * Retrieves the conversation state for a specific prospect and bot.
 * @returns The state data or null if it doesn't exist.
 * @throws Will throw an error if the Firestore operation fails.
 */
async function getConversationState(prospectId, botId, db) {
    try {
        const stateDoc = await db.collection('prospects').doc(prospectId).collection('botStates').doc(botId).get();
        if (!stateDoc.exists) {
            return null;
        }
        return stateDoc.data();
    }
    catch (error) {
        console.error(`Error getting conversation state for prospect ${prospectId} and bot ${botId}:`, error);
        throw new Error('Failed to retrieve conversation state from Firestore.');
    }
}
/**
 * Updates (or creates) the conversation state for a prospect.
 * @throws Will throw an error if the Firestore operation fails.
 */
async function updateConversationState(prospectId, botId, newState, db) {
    try {
        const stateWithTimestamp = { ...newState, lastInteraction: admin.firestore.FieldValue.serverTimestamp() };
        await db.collection('prospects').doc(prospectId).collection('botStates').doc(botId).set(stateWithTimestamp, { merge: true });
    }
    catch (error) {
        console.error(`Error updating conversation state for prospect ${prospectId} and bot ${botId}:`, error);
        throw new Error('Failed to update conversation state in Firestore.');
    }
}
/**
 * Retrieves a specific flow for a bot.
 * @returns The flow data or null if it doesn't exist.
 * @throws Will throw an error if the Firestore operation fails.
 */
async function getFlow(botId, flowId, db) {
    try {
        const flowDoc = await db.collection('bots').doc(botId).collection('flows').doc(flowId).get();
        if (!flowDoc.exists) {
            return null;
        }
        return flowDoc.data();
    }
    catch (error) {
        console.error(`Error getting flow ${flowId} for bot ${botId}:`, error);
        throw new Error('Failed to retrieve flow from Firestore.');
    }
}
//# sourceMappingURL=firestore.service.js.map
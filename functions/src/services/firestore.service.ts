
import * as admin from 'firebase-admin';
import { BotState, Flow } from '../bot-engine/bot.interface';

export type { BotState, Flow };

/**
 * Retrieves the conversation state for a specific prospect and bot.
 * @returns The state data or null if it doesn't exist.
 * @throws Will throw an error if the Firestore operation fails.
 */
export async function getConversationState(prospectId: string, botId: string, db: admin.firestore.Firestore): Promise<BotState | null> {
    try {
        const stateDoc = await db.collection('prospects').doc(prospectId).collection('botStates').doc(botId).get();
        if (!stateDoc.exists) {
            return null;
        }
        return stateDoc.data() as BotState;
    } catch (error) {
        console.error(`Error getting conversation state for prospect ${prospectId} and bot ${botId}:`, error);
        throw new Error('Failed to retrieve conversation state from Firestore.');
    }
}

/**
 * Updates (or creates) the conversation state for a prospect.
 * @throws Will throw an error if the Firestore operation fails.
 */
export async function updateConversationState(prospectId: string, botId: string, newState: Partial<BotState>, db: admin.firestore.Firestore): Promise<void> {
    try {
        const stateWithTimestamp = { ...newState, lastInteraction: admin.firestore.FieldValue.serverTimestamp() };
        await db.collection('prospects').doc(prospectId).collection('botStates').doc(botId).set(stateWithTimestamp, { merge: true });
    } catch (error) {
        console.error(`Error updating conversation state for prospect ${prospectId} and bot ${botId}:`, error);
        throw new Error('Failed to update conversation state in Firestore.');
    }
}

/**
 * Retrieves a specific flow for a bot.
 * @returns The flow data or null if it doesn't exist.
 * @throws Will throw an error if the Firestore operation fails.
 */
export async function getFlow(botId: string, flowId: string, db: admin.firestore.Firestore): Promise<Flow | null> {
    try {
        const flowDoc = await db.collection('bots').doc(botId).collection('flows').doc(flowId).get();
        if (!flowDoc.exists) {
            return null;
        }
        return flowDoc.data() as Flow;
    } catch (error) {
        console.error(`Error getting flow ${flowId} for bot ${botId}:`, error);
        throw new Error('Failed to retrieve flow from Firestore.');
    }
}

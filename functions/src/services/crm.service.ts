import { logger } from "firebase-functions";
import { db, admin } from "../config/firebase";
import { Opportunity, Message } from "../interfaces/crm.interfaces";

/**
 * Crea o actualiza una oportunidad basada en un mensaje entrante.
 */
export async function createOrUpdateOpportunity(message: any): Promise<void> {
    const from = message.from;
    const opportunityRef = db.collection('opportunities').doc(from);
    const textSnippet = message.text?.body || `[${message.type}]`;

    try {
        const docSnap = await opportunityRef.get();
        const now = admin.firestore.FieldValue.serverTimestamp();

        if (!docSnap.exists) {
            logger.info(`Creando nueva oportunidad para ${from}`);
            const newOpportunity: Omit<Opportunity, 'id' | 'createdAt' | 'lastContacted'> = {
                name: `Oportunidad ${from.slice(-4)}`,
                phoneNumber: from,
                source: "WhatsApp",
                currentPipeline: "default",
                // Aseguramos que la etapa coincida con el id del frontend
                currentStage: "new",
                lastMessageSnippet: textSnippet,
                hasUnreadMessages: true,
            };
            await opportunityRef.set({ ...newOpportunity, createdAt: now, lastContacted: now });
        } else {
            logger.info(`Actualizando oportunidad para ${from}`);
            await opportunityRef.update({ lastContacted: now, lastMessageSnippet: textSnippet, hasUnreadMessages: true });
        }
    } catch (error) {
        logger.error(`Error en createOrUpdateOpportunity para ${from}:`, error);
        throw error;
    }
}

/**
 * Guarda un mensaje entrante en la subcolección de conversaciones.
 */
export async function saveIncomingMessage(message: any): Promise<void> {
    const text = message.text?.body || `[${message.type} - sin texto]`;
    const conversationRef = db.collection("conversations").doc(message.from).collection("messages");
    
    const newMessage: Omit<Message, 'id'> = {
        from: "cliente",
        text: text,
        type: message.type,
        timestamp: new Date(parseInt(message.timestamp, 10) * 1000),
        whatsappMessageId: message.id,
        direction: "inbound",
        status: "received",
    };
    
    await conversationRef.add(newMessage);
}
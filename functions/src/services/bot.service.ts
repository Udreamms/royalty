
import { logger } from "firebase-functions";
import { db, admin } from "../config/firebase";

async function createOrUpdateProspect(message: any) {
    const from = message.from;
    const prospectRef = db.collection('prospects').doc(from);
    const textSnippet = message.text?.body || "[Mensaje interactivo]";

    try {
        const prospectSnap = await prospectRef.get();
        if (!prospectSnap.exists) {
            await prospectRef.set({
                name: `Prospecto ${from.slice(-4)}`,
                phoneNumber: from,
                source: "WhatsApp",
                currentPipeline: "inbox",
                currentStage: "inbox_new",
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                lastContacted: admin.firestore.FieldValue.serverTimestamp(),
                lastMessageSnippet: textSnippet,
                hasUnreadMessages: true,
            });
        } else {
            await prospectRef.update({
                lastContacted: admin.firestore.FieldValue.serverTimestamp(),
                lastMessageSnippet: textSnippet,
                hasUnreadMessages: true,
            });
        }
    } catch (error) {
        logger.error(`Error al crear o actualizar el prospecto ${from}:`, error);
    }
}

export async function handleWhatsAppWebhook(body: any) {
    const change = body.entry?.[0]?.changes?.[0];
    if (change?.field !== "messages") return;

    const value = change.value;

    if (value.messages && value.messages.length > 0) {
        const message = value.messages[0];
        await saveIncomingMessageToDb(message);
        await createOrUpdateProspect(message);
    }

    if (value.statuses && value.statuses.length > 0) {
        for (const statusUpdate of value.statuses) {
            await updateMessageStatusInDb(statusUpdate);
        }
    }
}

async function saveIncomingMessageToDb(message: any) {
    const text = message.text?.body || "[Mensaje interactivo]";
    await db.collection("conversations").doc(message.from).collection("messages").add({
        from: "cliente",
        text: text,
        type: message.type,
        timestamp: new Date(parseInt(message.timestamp, 10) * 1000),
        whatsappMessageId: message.id,
        direction: "inbound",
        status: "received",
    });
}

async function updateMessageStatusInDb(statusUpdate: any) {
    const messagesQuery = db.collection("conversations").doc(statusUpdate.recipient_id).collection("messages").where("whatsappMessageId", "==", statusUpdate.id);
    const querySnapshot = await messagesQuery.get();
    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
            doc.ref.update({ status: statusUpdate.status });
        });
    }
}

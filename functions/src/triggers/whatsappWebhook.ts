import * as functions from "firebase-functions";
import { firestore } from "firebase-admin";

export const whatsappWebhook = functions.https.onRequest(async (req, res) => {
  // NOTE: This is a simplified webhook for demonstration.
  // A production version should include signature validation from the provider.
  const { from, body } = req.body; // e.g., { from: '15551234567', body: 'Hello' }

  if (!from || !body) {
    res.status(400).send("Missing 'from' or 'body' in request.");
    return;
  }

  const db = firestore();
  const opportunityId = from; // The WhatsApp number is the document ID

  const opportunityRef = db.collection("opportunities").doc(opportunityId);
  const conversationRef = db.collection("conversations").doc(opportunityId);

  try {
    const opportunityDoc = await opportunityRef.get();

    // 1. Create or update the opportunity profile
    if (!opportunityDoc.exists) {
      await opportunityRef.set({
        whatsapp: from,
        name: `Oportunidad ${from.slice(-4)}`,
        currentStage: "new",
        lastContacted: firestore.FieldValue.serverTimestamp(),
        registrationDate: firestore.FieldValue.serverTimestamp(),
      });
    } else {
      await opportunityRef.update({
        lastContacted: firestore.FieldValue.serverTimestamp(),
      });
    }

    // 2. Add the new message to the conversations collection
    const messagesSubCollectionRef = conversationRef.collection("messages");
    await messagesSubCollectionRef.add({
      content: body,
      timestamp: firestore.FieldValue.serverTimestamp(),
      sender: "user", // Message from the customer
    });

    res.status(200).send("Data processed successfully.");
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).send("Internal Server Error.");
  }
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runWorkflowEngine = runWorkflowEngine;
// Este es un esqueleto del motor de automatización.
// Su lógica se volverá más compleja a medida que añadas más funcionalidades.
const firebase_functions_1 = require("firebase-functions");
const firebase_1 = require("../config/firebase");
const whatsapp_service_1 = require("../services/whatsapp.service");
/**
 * Ejecuta el motor de workflow para un mensaje entrante.
 */
async function runWorkflowEngine(message) {
    const userPhone = message.from;
    // 1. Obtener el estado actual del usuario/oportunidad
    const stateRef = firebase_1.db.collection('opportunityStates').doc(userPhone);
    const stateSnap = await stateRef.get();
    let currentState = "start"; // Estado por defecto para nuevos usuarios
    if (stateSnap.exists) {
        currentState = stateSnap.data()?.currentStepId || "start";
    }
    // 2. Encontrar el workflow activo (simplificado por ahora)
    const workflowId = "main_whatsapp_flow"; // Deberías tener una lógica para seleccionar el workflow
    // 3. Obtener el siguiente paso del workflow
    const nextStepRef = firebase_1.db.collection(`workflows/${workflowId}/steps`).doc(currentState);
    const nextStepSnap = await nextStepRef.get();
    if (!nextStepSnap.exists) {
        firebase_functions_1.logger.warn(`No se encontró el paso '${currentState}' en el workflow '${workflowId}'. Finalizando.`);
        return;
    }
    const stepData = nextStepSnap.data();
    // 4. Ejecutar la acción del paso (enviar mensaje)
    if (stepData?.type === "text") {
        await (0, whatsapp_service_1.sendWhatsAppMessage)(userPhone, {
            type: "text",
            text: { body: stepData.text }
        });
        // 5. Actualizar el estado del usuario al siguiente paso
        if (stepData.nextStepId) {
            await stateRef.set({ currentStepId: stepData.nextStepId, updatedAt: new Date() }, { merge: true });
        }
        else {
            await stateRef.update({ currentStepId: "end" }); // Finalizar flujo
        }
    }
}
//# sourceMappingURL=workflow.engine.js.map
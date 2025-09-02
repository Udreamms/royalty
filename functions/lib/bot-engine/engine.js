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
exports.runBotLogic = runBotLogic;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const firestore_service_1 = require("../services/firestore.service");
const whatsapp_service_1 = require("../services/whatsapp.service");
/**
 * Processes the user's response to determine the next node ID.
 */
function getNextNodeId(currentNode, userResponse) {
    if (!currentNode) {
        return null;
    }
    if (currentNode.type === 'mensaje' || currentNode.type === 'texto_libre') {
        return typeof currentNode.siguienteNodoId === 'string' ? currentNode.siguienteNodoId : null;
    }
    if (currentNode.type === 'opciones') {
        if (typeof currentNode.siguienteNodoId === 'object' && currentNode.siguienteNodoId !== null) {
            const mapping = currentNode.siguienteNodoId;
            return mapping[userResponse] || null;
        }
    }
    return null;
}
/**
 * Runs the dynamic bot logic.
 */
async function runBotLogic(bot, prospectData, userResponse, from, db) {
    functions.logger.info(`[Bot Engine] 1. Running DYNAMIC logic for bot ${bot.id} for user ${from}`);
    const conversationState = await (0, firestore_service_1.getConversationState)(from, bot.id, db);
    const activeFlowId = bot.logicaActiva || 'main_flow';
    const botPhoneNumberId = bot.whatsappConfig?.phoneNumberId;
    if (!botPhoneNumberId) {
        functions.logger.error(`[Bot Engine] CRITICAL: Bot ${bot.id} does not have a phoneNumberId configured.`);
        return;
    }
    const flow = await (0, firestore_service_1.getFlow)(bot.id, activeFlowId, db);
    if (!flow || !flow.nodes || flow.nodes.length === 0) {
        functions.logger.warn(`[Bot Engine] 2. No valid flow for bot ${bot.id}, flow ${activeFlowId}.`);
        return;
    }
    let nextNodeId = null;
    if (conversationState && conversationState.currentNodeId) {
        const lastNode = flow.nodes.find(n => n.nodeId === conversationState.currentNodeId);
        if (lastNode) {
            nextNodeId = getNextNodeId(lastNode, userResponse);
        }
        else {
            nextNodeId = 'start_node';
        }
    }
    else {
        nextNodeId = 'start_node';
    }
    if (!nextNodeId) {
        await (0, firestore_service_1.updateConversationState)(from, bot.id, { currentNodeId: null, estado: 'finalizado' }, db);
        return;
    }
    const currentNode = flow.nodes.find(n => n.nodeId === nextNodeId);
    if (!currentNode) {
        functions.logger.error(`[Bot Engine] Critical: Node '${nextNodeId}' not found.`);
        return;
    }
    let nodeToExecuteNext = null;
    let nodeToWaitForReply = null;
    switch (currentNode.type) {
        case 'mensaje':
            if (currentNode.contenido) {
                await (0, whatsapp_service_1.sendWhatsAppMessage)(from, botPhoneNumberId, { type: 'text', text: { body: currentNode.contenido } });
            }
            nodeToExecuteNext = getNextNodeId(currentNode, '_continue');
            nodeToWaitForReply = nodeToExecuteNext;
            break;
        case 'opciones':
            if (currentNode.contenidoOpciones) {
                await (0, whatsapp_service_1.sendWhatsAppMessage)(from, botPhoneNumberId, {
                    type: 'interactive',
                    interactive: {
                        type: 'button',
                        body: { text: currentNode.contenidoOpciones.texto },
                        action: {
                            buttons: currentNode.contenidoOpciones.botones.map(btn => ({
                                type: 'reply',
                                reply: { id: btn.id, title: btn.titulo }
                            }))
                        }
                    }
                });
            }
            nodeToWaitForReply = currentNode.nodeId;
            break;
        case 'texto_libre':
            if (currentNode.contenido) {
                await (0, whatsapp_service_1.sendWhatsAppMessage)(from, botPhoneNumberId, { type: 'text', text: { body: currentNode.contenido } });
            }
            nodeToWaitForReply = currentNode.nodeId;
            break;
        default:
            nodeToWaitForReply = null;
            break;
    }
    const updatePayload = {
        currentNodeId: nodeToWaitForReply,
        currentFlowId: activeFlowId,
        estado: nodeToWaitForReply ? 'activo' : 'finalizado',
        lastInteraction: admin.firestore.Timestamp.now()
    };
    await (0, firestore_service_1.updateConversationState)(from, bot.id, updatePayload, db);
    if (nodeToExecuteNext) {
        const nextNode = flow.nodes.find(n => n.nodeId === nodeToExecuteNext);
        if (nextNode) {
            await runBotLogic(bot, prospectData, '_continue', from, db);
        }
    }
}
//# sourceMappingURL=engine.js.map
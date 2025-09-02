
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { getConversationState, updateConversationState, getFlow } from '../services/firestore.service';
import { sendWhatsAppMessage } from '../services/whatsapp.service';
import { Flow, Node, BotState } from './bot.interface';

/**
 * Processes the user's response to determine the next node ID.
 */
function getNextNodeId(currentNode: Node | undefined, userResponse: string): string | null {
    if (!currentNode) {
        return null;
    }
    
    if (currentNode.type === 'mensaje' || currentNode.type === 'texto_libre') {
        return typeof currentNode.siguienteNodoId === 'string' ? currentNode.siguienteNodoId : null;
    }

    if (currentNode.type === 'opciones') {
        if (typeof currentNode.siguienteNodoId === 'object' && currentNode.siguienteNodoId !== null) {
            const mapping = currentNode.siguienteNodoId as Record<string, string>;
            return mapping[userResponse] || null;
        }
    }

    return null;
}

/**
 * Runs the dynamic bot logic.
 */
export async function runBotLogic(bot: any, prospectData: any, userResponse: string, from: string, db: admin.firestore.Firestore): Promise<void> {
    functions.logger.info(`[Bot Engine] 1. Running DYNAMIC logic for bot ${bot.id} for user ${from}`);
    
    const conversationState: BotState | null = await getConversationState(from, bot.id, db);
    const activeFlowId = bot.logicaActiva || 'main_flow';
    
    const botPhoneNumberId = bot.whatsappConfig?.phoneNumberId;
    if (!botPhoneNumberId) {
        functions.logger.error(`[Bot Engine] CRITICAL: Bot ${bot.id} does not have a phoneNumberId configured.`);
        return;
    }
    
    const flow: Flow | null = await getFlow(bot.id, activeFlowId, db);
    if (!flow || !flow.nodes || flow.nodes.length === 0) {
        functions.logger.warn(`[Bot Engine] 2. No valid flow for bot ${bot.id}, flow ${activeFlowId}.`);
        return;
    }

    let nextNodeId: string | null = null;
    
    if (conversationState && conversationState.currentNodeId) {
        const lastNode = flow.nodes.find(n => n.nodeId === conversationState.currentNodeId);
        if (lastNode) {
            nextNodeId = getNextNodeId(lastNode, userResponse);
        } else {
             nextNodeId = 'start_node';
        }
    } else {
        nextNodeId = 'start_node';
    }

    if (!nextNodeId) {
        await updateConversationState(from, bot.id, { currentNodeId: null, estado: 'finalizado' } as Partial<BotState>, db);
        return;
    }

    const currentNode = flow.nodes.find(n => n.nodeId === nextNodeId);
    if (!currentNode) {
        functions.logger.error(`[Bot Engine] Critical: Node '${nextNodeId}' not found.`);
        return;
    }
    
    let nodeToExecuteNext: string | null = null;
    let nodeToWaitForReply: string | null = null;

    switch (currentNode.type) {
        case 'mensaje':
            if (currentNode.contenido) {
                await sendWhatsAppMessage(from, botPhoneNumberId, { type: 'text', text: { body: currentNode.contenido } });
            }
            nodeToExecuteNext = getNextNodeId(currentNode, '_continue');
            nodeToWaitForReply = nodeToExecuteNext; 
            break;
        
        case 'opciones':
            if (currentNode.contenidoOpciones) {
                await sendWhatsAppMessage(from, botPhoneNumberId, {
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
                await sendWhatsAppMessage(from, botPhoneNumberId, { type: 'text', text: { body: currentNode.contenido } });
            }
            nodeToWaitForReply = currentNode.nodeId;
            break;

        default:
            nodeToWaitForReply = null;
            break;
    }
    
    const updatePayload: Partial<BotState> = {
        currentNodeId: nodeToWaitForReply,
        currentFlowId: activeFlowId,
        estado: nodeToWaitForReply ? 'activo' : 'finalizado',
        lastInteraction: admin.firestore.Timestamp.now() as any
    };
    
    await updateConversationState(from, bot.id, updatePayload, db);

    if (nodeToExecuteNext) {
        const nextNode = flow.nodes.find(n => n.nodeId === nodeToExecuteNext);
        if(nextNode) {
             await runBotLogic(bot, prospectData, '_continue', from, db);
        }
    }
}


import { Timestamp } from 'firebase-admin/firestore';

/**
 * Representa la estructura de un flujo de conversación en Firestore.
 */
export interface Flow {
  id: string;
  name: string;
  nodes: Node[];
  // Cualquier otro campo que tus flujos puedan tener.
}

/**
 * Representa el estado de una conversación con un prospecto para un bot específico.
 * Se almacena en una subcolección dentro del prospecto.
 */
export interface BotState {
  botId: string;
  currentFlowId: string;
  currentNodeId: string | null;
  estado: 'activo' | 'pausado' | 'finalizado';
  lastInteraction: Timestamp;
  // Puedes añadir más campos si necesitas almacenar datos específicos de la conversación.
  conversationData?: Record<string, any>;
}


/**
 * Define la estructura de un nodo dentro de un flujo de conversación.
 * El tipo de nodo determina su comportamiento y los datos que contiene.
 */
export interface Node {
  nodeId: string;
  type: 'mensaje' | 'opciones' | 'texto_libre' | 'start'; // Añade otros tipos si los tienes
  
  // Para nodos de tipo 'mensaje' o 'texto_libre'
  contenido?: string; 
  
  // Para nodos de tipo 'opciones'
  contenidoOpciones?: {
    texto: string;
    botones: { id: string; titulo: string; }[];
  };

  // El siguiente nodo a ejecutar (si la lógica es lineal)
  siguienteNodoId?: string | Record<string, string>; 
  
  // Cualquier otro dato específico del nodo
  [key: string]: any;
}

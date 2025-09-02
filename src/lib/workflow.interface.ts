
// src/lib/workflow.interface.ts

import { Timestamp } from 'firebase/firestore';

// Tipos de nodos disponibles en el flujo
export enum NodeType {
  TRIGGER_NEW_PROSPECT = "TRIGGER_NEW_PROSPECT",
  ACTION_SEND_EMAIL = "ACTION_SEND_EMAIL",
  LOGIC_DELAY = "LOGIC_DELAY",
}

// Datos para un nodo de enviar email
export interface SendEmailData {
  templateId: string;
}

// Datos de un nodo de retraso
export interface DelayData {
  duration: number;
  unit: "seconds" | "minutes" | "hours" | "days";
}

// Definición de un nodo dentro del flujo
export interface WorkflowNode {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: SendEmailData | DelayData | null;
}

// Definición de un edge (conexión entre nodos)
export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
}

// Definición del flujo completo
export interface Workflow {
  id: string;
  name: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

// Interfaz para un prospecto, usada en el Dashboard y otras partes
export interface Prospect {
  id: string;
  createdAt: Timestamp;
  currentPipeline: 'inbox' | 'procesoCitas' | 'clasesOnline' | 'converted' | 'lost';
}

// Interfaz para un Cliente, movida desde clients/page.tsx
export interface Client {
  id: string;
  name: string;
  email?: string;
  phoneNumber?: string;
  stage: string;
  visaType?: string;
  assignedAdvisor?: string;
  conversionDate?: string;
  [key: string]: any;
}

// Constante para las etapas del pipeline de clientes, movida desde clients/page.tsx
export const clientPipelineStages = [
  { id: 'cliente_actual_adjunta_docs', title: 'Cliente Actual (Adjunta Documentos)' },
  { id: 'aplicar', title: 'Aplicación Enviada' },
  { id: 'sevis', title: 'Pago SEVIS' },
  { id: 'ds160', title: 'Formulario DS-160' },
  { id: 'entrevista', title: 'Entrevista Agendada' },
  { id: 'aprobado', title: 'Aprobado' },
  { id: 'rechazado', title: 'Rechazado' },
];

export interface Lead {
  id: string; 
  name: string;
  email?: string;
  phoneNumber?: string;
  currentPipeline: "inbox" | "procesoCitas" | "converted";
  currentStage: string;
  source: string;
  sourceDetails?: string;
  visaType?: string;
  assignedTo?: string;
  lastContacted: string | Timestamp;
  createdAt: string | Timestamp;
  internalNotes?: string;
  whatsAppMessages?: Array<{ type: "inbound" | "outbound"; text: string; timestamp: string, status?: "sent" | "delivered" | "read" | "received" }>;
  discardReason?: string;
  lastMessageSnippet?: string;
  hasUnreadMessages?: boolean;
  aiReasoning?: string;
  updatedAt?: Timestamp;
}

export const inboxPipeline = {
  id: 'inbox' as const,
  title: 'Bandeja de Entrada',
  stages: [
    { id: 'inbox_new', title: 'New Lead' }
  ]
};

export const procesoCitasPipeline = {
  id: 'procesoCitas' as const,
  title: 'Proceso Citas',
  stages: [
    { id: 'pc_agendado', title: 'Agendado' },
    { id: 'pc_reagendar', title: 'Reagendar' },
    { id: 'pc_seguimiento', title: 'Seguimiento' },
    { id: 'pc_lead_caliente', title: 'Lead Caliente' },
    { id: 'pc_nunca_agendo', title: 'Nunca Agendó' },
  ]
};

export const allPipelines = [
  inboxPipeline,
  procesoCitasPipeline,
];

// Combina todas las etapas de los pipelines de prospectos en un solo array
export const allLeadStages = allPipelines.flatMap(pipeline => pipeline.stages);

export const allPipelineStages = allPipelines.reduce((acc, pipeline) => {
  pipeline.stages.forEach(stage => {
    acc[stage.id] = stage.title;
  });
  return acc;
}, {} as Record<string, string>);

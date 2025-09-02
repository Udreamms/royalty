
"use client";

import { useState, useEffect, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Trash2, PlusCircle } from "lucide-react";
import { Node } from 'reactflow';

// --- INTERFACES Y COMPONENTES REUTILIZABLES ---
interface NodeEditorPanelProps {
    node: Node | null;
    allNodeIds: string[];
    onClose: () => void;
    onNodeUpdate: (updatedNodeData: any) => void;
    onRemoveNode: (nodeId: string) => void;
}

const NodeIdSelector = ({ label, value, onChange, availableNodes }: { label: string, value: string, onChange: (value: string) => void, availableNodes: string[] }) => (
    <div>
        <Label>{label}</Label>
        <Select value={value || ''} onValueChange={(v) => onChange(v || '')}>
            <SelectTrigger className="mt-1">
                <SelectValue placeholder="Seleccionar nodo destino..." />
            </SelectTrigger>
            <SelectContent>
                {availableNodes.map(id => (
                    <SelectItem key={id} value={id}>{id}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
);


// --- COMPONENTE PRINCIPAL DEL PANEL ---
export default function NodeEditorPanel({ node, allNodeIds, onClose, onNodeUpdate, onRemoveNode }: NodeEditorPanelProps) {
    const [nodeData, setNodeData] = useState<any>(null);

    useEffect(() => {
        setNodeData(node ? JSON.parse(JSON.stringify(node.data)) : null);
    }, [node]);
    
    const availableNodesForConnection = useMemo(() => {
        if (!node || !allNodeIds) return [];
        return allNodeIds.filter(id => id !== node.id);
    }, [allNodeIds, node]);

    if (!node || !nodeData) {
        return <aside className="w-96 border-l border-border bg-card shadow-lg flex-shrink-0 transition-transform transform translate-x-full"></aside>;
    }

    const handleDataChange = (field: string, value: any) => {
        let newNodeData = { ...nodeData, [field]: value };
        if (field === 'type') {
            // Limpiamos campos de otros tipos para evitar datos basura
            const commonData = { nodeId: newNodeData.nodeId, type: value };
            if (value === 'text') newNodeData = { ...commonData, text: '', nextStepId: '' };
            else if (value === 'buttons') newNodeData = { ...commonData, text: '', responses: [] };
            else if (value === 'logic') newNodeData = { ...commonData, text: 'Condición', paths: { yes: '', no: '' } };
            else if (value === 'image' || value === 'video' || value === 'document') {
                newNodeData = { ...commonData, mediaUrl: '', nextStepId: '' };
                if (value === 'document') newNodeData.mediaFilename = 'documento.pdf';
            }
        }
        setNodeData(newNodeData);
    };

    const renderNodeEditor = () => {
        switch (nodeData.type) {
            case 'buttons':
                return <ButtonsNodeEditor nodeData={nodeData} setNodeData={setNodeData} availableNodes={availableNodesForConnection} />;
            case 'logic':
                return <LogicNodeEditor nodeData={nodeData} setNodeData={setNodeData} availableNodes={availableNodesForConnection} />;
            case 'image':
            case 'video':
            case 'document':
                return <MediaNodeEditor nodeData={nodeData} setNodeData={setNodeData} availableNodes={availableNodesForConnection} />;
            case 'text':
            default:
                return <TextNodeEditor nodeData={nodeData} setNodeData={setNodeData} availableNodes={availableNodesForConnection} />;
        }
    };

    return (
        <aside className="w-96 border-l border-border rounded-none shadow-lg flex flex-col h-full bg-card flex-shrink-0">
            <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-border">
                <div className="space-y-1">
                    <CardTitle className="text-base text-foreground">Editando: <span className="text-primary font-mono">{nodeData.nodeId}</span></CardTitle>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8"><X className="h-4 w-4" /></Button>
            </CardHeader>
            <CardContent className="p-4 space-y-6 overflow-y-auto flex-grow">
                <div>
                    <Label>Tipo de Nodo</Label>
                    <Select value={nodeData.type} onValueChange={(v) => handleDataChange('type', v)}>
                        <SelectTrigger className="bg-input border-border"><SelectValue placeholder="Selecciona un tipo" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="text">Texto Simple</SelectItem>
                            <SelectItem value="buttons">Mensaje con Botones</SelectItem>
                            <SelectItem value="image">Imagen</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="document">Documento</SelectItem>
                            <SelectItem value="logic">Lógica (Condición)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {renderNodeEditor()}
            </CardContent>
            <CardFooter className="p-4 border-t border-border flex gap-2">
                <Button className="flex-1" onClick={() => onNodeUpdate(nodeData)}>Aplicar Cambios</Button>
                <Button variant="destructive" size="icon" onClick={() => onRemoveNode(nodeData.nodeId)}><Trash2 className="h-4 w-4" /></Button>
            </CardFooter>
        </aside>
    );
}

// --- SUB-EDITORES PARA CADA TIPO DE NODO ---

const TextNodeEditor = ({ nodeData, setNodeData, availableNodes }: { nodeData: any, setNodeData: Function, availableNodes: string[] }) => (
    <div className="space-y-4">
        <div>
            <Label htmlFor="text-content">Contenido del Mensaje</Label>
            <Textarea id="text-content" value={nodeData.text || ''} onChange={(e) => setNodeData({ ...nodeData, text: e.target.value })} rows={6} className="mt-1" />
            <p className="text-xs text-muted-foreground mt-1">Usa [variable] para insertar datos del usuario.</p>
        </div>
        <NodeIdSelector label="Siguiente Nodo ID" value={nodeData.nextStepId} onChange={(v) => setNodeData({ ...nodeData, nextStepId: v })} availableNodes={availableNodes} />
    </div>
);

const ButtonsNodeEditor = ({ nodeData, setNodeData, availableNodes }: { nodeData: any, setNodeData: Function, availableNodes: string[] }) => {
    // ... (El código de este componente no cambia, lo dejamos como estaba)
    const handleResponseChange = (index: number, field: 'title' | 'nextStepId', value: string) => {
        const newResponses = [...(nodeData.responses || [])];
        newResponses[index] = { ...newResponses[index], [field]: value };
        setNodeData({ ...nodeData, responses: newResponses });
    };
    const addResponse = () => setNodeData({ ...nodeData, responses: [...(nodeData.responses || []), { id: `btn_${Date.now()}`, title: 'Nuevo Botón', nextStepId: '' }] });
    const removeResponse = (indexToRemove: number) => setNodeData({ ...nodeData, responses: (nodeData.responses || []).filter((_: any, i: number) => i !== indexToRemove) });

    return (
        <div className="space-y-4">
            <div>
                <Label>Texto Principal del Mensaje</Label>
                <Textarea value={nodeData.text || ''} onChange={(e) => setNodeData({ ...nodeData, text: e.target.value })} rows={4} className="mt-1" />
                 <p className="text-xs text-muted-foreground mt-1">Usa [variable] para insertar datos del usuario.</p>
            </div>
            <div className="space-y-3">
                <Label>Botones de Respuesta</Label>
                {(nodeData.responses || []).map((resp: any, index: number) => (
                    <div key={resp.id || index} className="p-3 border rounded-md bg-muted/50 space-y-2">
                        <div className="flex items-center gap-2">
                            <Input placeholder="Título del botón" value={resp.title} onChange={(e) => handleResponseChange(index, 'title', e.target.value)} />
                            <Button variant="destructive" size="icon" className="h-9 w-9 flex-shrink-0" onClick={() => removeResponse(index)}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                        <NodeIdSelector label="Nodo Destino del Botón" value={resp.nextStepId} onChange={(v) => handleResponseChange(index, 'nextStepId', v)} availableNodes={availableNodes} />
                    </div>
                ))}
                <Button variant="outline" size="sm" className="w-full" onClick={addResponse}><PlusCircle className="mr-2 h-4 w-4" /> Añadir Botón</Button>
            </div>
        </div>
    );
};

// --- NUEVO SUB-EDITOR PARA MEDIOS ---
const MediaNodeEditor = ({ nodeData, setNodeData, availableNodes }: { nodeData: any, setNodeData: Function, availableNodes: string[] }) => (
    <div className="space-y-4">
        <div>
            <Label htmlFor="media-url">URL del Archivo</Label>
            <Input id="media-url" value={nodeData.mediaUrl || ''} onChange={(e) => setNodeData({ ...nodeData, mediaUrl: e.target.value })} className="mt-1" placeholder="https://.../archivo.png" />
            <p className="text-xs text-muted-foreground mt-1">Debe ser un enlace público directo al archivo.</p>
        </div>
        {nodeData.type === 'document' && (
            <div>
                <Label htmlFor="media-filename">Nombre del Documento (Opcional)</Label>
                <Input id="media-filename" value={nodeData.mediaFilename || ''} onChange={(e) => setNodeData({ ...nodeData, mediaFilename: e.target.value })} className="mt-1" placeholder="factura.pdf" />
            </div>
        )}
        <NodeIdSelector label="Siguiente Nodo ID (Opcional)" value={nodeData.nextStepId} onChange={(v) => setNodeData({ ...nodeData, nextStepId: v })} availableNodes={availableNodes} />
        <p className="text-xs text-muted-foreground mt-1">Si se define, el bot continuará al siguiente paso inmediatamente después de enviar el archivo.</p>
    </div>
);

const LogicNodeEditor = ({ nodeData, setNodeData, availableNodes }: { nodeData: any, setNodeData: Function, availableNodes: string[] }) => {
    // ... (El código de este componente no cambia)
    const handlePathChange = (pathName: 'yes' | 'no', targetId: string) => setNodeData({ ...nodeData, paths: { ...(nodeData.paths || {}), [pathName]: targetId } });
    
    return (
        <div className="space-y-4">
            <div>
                <Label>Nota / Condición a Evaluar</Label>
                <Textarea value={nodeData.text || ''} onChange={(e) => setNodeData({ ...nodeData, text: e.target.value })} rows={3} className="mt-1" placeholder="Ej: ¿El usuario pagó la cita?" />
                <p className="text-xs text-muted-foreground mt-1">Este texto es solo una referencia para ti.</p>
            </div>
            <div className="p-3 border rounded-md bg-green-900/20 border-green-500">
                <NodeIdSelector label='Camino "Sí"' value={nodeData.paths?.yes || ''} onChange={(v) => handlePathChange('yes', v)} availableNodes={availableNodes} />
            </div>
            <div className="p-3 border rounded-md bg-red-900/20 border-red-500">
                <NodeIdSelector label='Camino "No"' value={nodeData.paths?.no || ''} onChange={(v) => handlePathChange('no', v)} availableNodes={availableNodes} />
            </div>
        </div>
    );
};

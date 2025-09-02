"use client";

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback, memo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Save, Loader2, ServerCrash, MessageSquare, List, GitBranch, PlusCircle, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { db } from '@/lib/firebase';
import { doc, onSnapshot, collection, getDocs, writeBatch, deleteDoc, setDoc, getDoc, Timestamp } from 'firebase/firestore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NodeEditorPanel from './NodeEditorPanel';

// --- INICIO: IMPORTACIONES Y CONFIGURACIÓN DE REACT FLOW ---
import ReactFlow, {
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    Node,
    Edge,
    NodeChange,
    EdgeChange,
    Handle,
    Position,
    NodeProps
} from 'reactflow';
import 'reactflow/dist/style.css';
import dagre from 'dagre';
// --- FIN: IMPORTACIONES Y CONFIGURACIÓN DE REACT FLOW ---


// --- INICIO: NODO PERSONALIZADO VISUAL ---
const CustomMessageNode = memo(({ data, selected }: NodeProps<any>) => {
    const getNodeIcon = (type: string) => {
        switch (type) {
            case 'text':
                return <MessageSquare className="h-5 w-5 text-green-500" />;
            case 'buttons':
                return <List className="h-5 w-5 text-purple-500" />;
            case 'logic':
                return <GitBranch className="h-5 w-5 text-yellow-500" />;
            default:
                return <MessageSquare className="h-5 w-5 text-gray-500" />;
        }
    };

    const textToShow = data.text || '';

    return (
        <div className={`bg-card border-2 rounded-lg shadow-md w-[280px] hover:shadow-lg transition-all duration-300 ${selected ? 'border-primary shadow-primary/20' : 'border-border/50'}`}>
            <div className="p-2 border-b border-border/50 bg-muted/50 rounded-t-lg">
                <div className="flex items-center gap-3">
                    {getNodeIcon(data.type)}
                    <div className="flex flex-col overflow-hidden">
                        <div className="font-mono text-xs font-bold text-foreground truncate" title={data.nodeId}>{data.nodeId}</div>
                        <div className="text-xs text-muted-foreground capitalize">{data.type}</div>
                    </div>
                </div>
            </div>
            <div className="p-3 text-sm text-muted-foreground space-y-2">
                {textToShow ? (
                    <p className="whitespace-pre-wrap break-words">{textToShow}</p>
                ) : (
                    <p className="italic text-muted-foreground/50">Nodo sin texto principal.</p>
                )}
                {data.responses && (
                    <div className="mt-2 pt-2 border-t border-border/20 space-y-1">
                        {data.responses.map((resp: any, index: number) => (
                           <p key={index} className="text-xs truncate text-muted-foreground/80">🔘 {resp.title}</p>
                        ))}
                    </div>
                )}
            </div>
            <Handle type="target" position={Position.Left} className="!bg-primary !border-primary" />
            <Handle type="source" position={Position.Right} className="!bg-primary !border-primary" />
        </div>
    );
});
CustomMessageNode.displayName = 'CustomMessageNode';

const nodeTypes = { customMessageNode: CustomMessageNode };
// --- FIN: NODO PERSONALIZADO VISUAL ---


// --- INICIO: LÓGICA DE LAYOUT Y CONEXIONES ---
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
const nodeWidth = 300;

const getLayoutedElements = (flowNodes: any[], direction = 'LR') => {
    const initialNodes: Node[] = [];
    const initialEdges: Edge[] = [];

    if (!Array.isArray(flowNodes)) return { nodes: initialNodes, edges: initialEdges };

    dagreGraph.setGraph({ rankdir: direction, nodesep: 60, ranksep: 80 });

    flowNodes.forEach((node) => {
        initialNodes.push({
            id: node.nodeId,
            type: 'customMessageNode',
            position: { x: 0, y: 0 },
            data: node,
        });

        const nodeType = node.type;
        switch (nodeType) {
            case 'text':
                if (node.nextStepId && typeof node.nextStepId === 'string') {
                    initialEdges.push({
                        id: `e-${node.nodeId}-${node.nextStepId}`,
                        source: node.nodeId,
                        target: node.nextStepId,
                        type: 'smoothstep', animated: true,
                    });
                }
                break;
            case 'buttons':
                if (Array.isArray(node.responses)) {
                    node.responses.forEach((response: any) => {
                        if (response.nextStepId) {
                            initialEdges.push({
                                id: `e-${node.nodeId}-${response.id}-${response.nextStepId}`,
                                source: node.nodeId,
                                target: response.nextStepId,
                                type: 'smoothstep',
                                label: response.title,
                            });
                        }
                    });
                }
                break;
            case 'logic':
                if (node.paths && typeof node.paths === 'object') {
                    if (node.paths.yes) {
                        initialEdges.push({
                            id: `e-${node.nodeId}-yes-${node.paths.yes}`, source: node.nodeId, target: node.paths.yes,
                            type: 'smoothstep', label: 'Sí', style: { stroke: '#22c55e', strokeWidth: 2 },
                        });
                    }
                    if (node.paths.no) {
                        initialEdges.push({
                            id: `e-${node.nodeId}-no-${node.paths.no}`, source: node.nodeId, target: node.paths.no,
                            type: 'smoothstep', label: 'No', style: { stroke: '#ef4444', strokeWidth: 2 },
                        });
                    }
                }
                break;
        }
    });

    initialNodes.forEach((node) => dagreGraph.setNode(node.id, { width: nodeWidth, height: 150 }));
    initialEdges.forEach((edge) => {
        if (initialNodes.find(n => n.id === edge.target)) {
            dagreGraph.setEdge(edge.source, edge.target);
        }
    });

    dagre.layout(dagreGraph);

    initialNodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        if (nodeWithPosition) {
            node.position = { x: nodeWithPosition.x - nodeWidth / 2, y: nodeWithPosition.y - 150 / 2 };
        }
    });

    return { nodes: initialNodes, edges: initialEdges };
};
// --- FIN: LÓGICA DE LAYOUT Y CONEXIONES ---


// --- COMPONENTE PRINCIPAL DE LA PÁGINA ---
export default function BotEditorPage() {
    const params = useParams();
    const router = useRouter();
    const botId = params.id as string;
    const { toast } = useToast();
    
    const [bot, setBot] = useState<any | null>(null);
    const [availableFlows, setAvailableFlows] = useState<string[]>([]);
    const [activeFlowId, setActiveFlowId] = useState<string | null>(null);
    const [flowNodes, setFlowNodes] = useState<any[]>([]);
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [firebaseError, setFirebaseError] = useState<string | null>(null);
    const [isCreateFlowOpen, setIsCreateFlowOpen] = useState(false);
    const [newFlowName, setNewFlowName] = useState("");

    const onNodesChange = useCallback((changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
    const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);
    
    // --- LÓGICA DE CARGA DE DATOS ---
    useEffect(() => {
        if (!botId) return;
        const unsubBot = onSnapshot(doc(db, "bots", botId), (botSnap) => {
            if (botSnap.exists()) setBot({ id: botSnap.id, ...botSnap.data() });
            else {
                setFirebaseError("No se encontró el bot con este ID.");
                setIsLoading(false);
            }
        });
        return () => unsubBot();
    }, [botId]);

    useEffect(() => {
        if (!bot) return;
        const unsubFlows = onSnapshot(collection(db, "bots", bot.id, "flows"), (snapshot) => {
            const flowIds = snapshot.docs.map(d => d.id);
            setAvailableFlows(flowIds);
            if (flowIds.length > 0 && !activeFlowId) {
                // Aquí usamos 'startingFlowId' del bot para establecer el flujo activo inicial
                const initialFlow = bot.startingFlowId && flowIds.includes(bot.startingFlowId) ? bot.startingFlowId : flowIds[0];
                setActiveFlowId(initialFlow);
            } else if (flowIds.length === 0) {
                setFirebaseError("Este bot no tiene flujos. Crea uno para empezar.");
            }
        });
        return () => unsubFlows();
    }, [bot, activeFlowId]);


    useEffect(() => {
        if (!activeFlowId || !botId) return;
        setIsLoading(true);
        const unsubSteps = onSnapshot(collection(db, "bots", botId, "flows", activeFlowId, "steps"), (snapshot) => {
            const loadedNodes = snapshot.docs.map(d => ({ nodeId: d.id, ...d.data() }));
            setFlowNodes(loadedNodes);
            setFirebaseError(null); // Limpiamos errores previos si la carga es exitosa
            setIsLoading(false);
        }, () => {
            setFirebaseError(`Error al cargar los pasos del flujo.`);
            setIsLoading(false);
        });
        return () => unsubSteps();
    }, [activeFlowId, botId]);
    
    useEffect(() => {
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(flowNodes);
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
    }, [flowNodes]);

    // --- FUNCIONES DE MANIPULACIÓN ---
    const handleNodeUpdate = (updatedNodeData: any) => {
        setFlowNodes(current => current.map(n => n.nodeId === updatedNodeData.nodeId ? updatedNodeData : n));
        toast({ title: "Nodo Actualizado", description: "Cambios aplicados localmente. No olvides guardar." });
    };

    const handleRemoveNode = (nodeIdToRemove: string) => {
        setFlowNodes(current => current.filter(n => n.nodeId !== nodeIdToRemove));
        setSelectedNode(null);
        toast({ title: "Nodo Eliminado Localmente", variant: "destructive" });
    };

    const addNode = (type: 'text' | 'buttons' | 'logic') => {
        if (!activeFlowId) return;
        const newNodeId = `${type.substring(0, 4)}_${Date.now()}`;
        let newNodeData: any = { nodeId: newNodeId, type };

        switch (type) {
            case 'text':
                newNodeData.text = 'Nuevo mensaje de texto';
                newNodeData.nextStepId = '';
                break;
            case 'buttons':
                newNodeData.text = 'Nuevo mensaje con opciones';
                newNodeData.responses = [];
                break;
            case 'logic':
                newNodeData.text = '¿Condición?';
                newNodeData.paths = { yes: '', no: '' };
                break;
        }
        setFlowNodes(current => [...current, newNodeData]);
        toast({ title: "Nodo Añadido", description: `Se añadió un nodo de tipo '${type}'.` });
    };

    const handleSave = async () => {
        if (!botId || !activeFlowId) return;
        setIsSaving(true);
        try {
            const batch = writeBatch(db);
            const flowStepsRef = collection(db, "bots", botId, "flows", activeFlowId, "steps");
            const existingNodesSnapshot = await getDocs(flowStepsRef);
            const firestoreNodeIds = new Set(existingNodesSnapshot.docs.map(d => d.id));
            const localNodeIds = new Set(flowNodes.map(n => n.nodeId));

            firestoreNodeIds.forEach(id => {
                if (!localNodeIds.has(id)) batch.delete(doc(flowStepsRef, id));
            });

            flowNodes.forEach((node) => {
                const { nodeId, ...dataToSave } = node;
                // Nos aseguramos que 'type' siempre exista en el documento guardado
                if(!dataToSave.type) {
                    dataToSave.type = 'text'; // O un valor por defecto seguro
                }
                batch.set(doc(flowStepsRef, nodeId), dataToSave);
            });

            await batch.commit();
            toast({ title: "¡Flujo Guardado!", description: `El flujo "${activeFlowId}" se actualizó en Firestore.` });
        } catch (error: any) {
            toast({ title: "Error al Guardar", description: error.message, variant: "destructive" });
        } finally {
            setIsSaving(false);
        }
    };
    
    const handleCreateFlow = async () => {
        if (!newFlowName.trim() || !botId) return;
        const newFlowId = newFlowName.trim().replace(/\s+/g, '_').toLowerCase();
        try {
            await setDoc(doc(db, "bots", botId, "flows", newFlowId), {
                name: newFlowName,
                createdAt: Timestamp.now(),
            });
            // Al crear un nuevo flujo, también creamos un nodo inicial 'start'
            await setDoc(doc(db, "bots", botId, "flows", newFlowId, "steps", "start"), {
                type: "text",
                text: "Bienvenido a tu nuevo flujo!",
                nextStepId: ""
            });
            toast({ title: "¡Éxito!", description: `Flujo "${newFlowId}" creado.` });
            setNewFlowName("");
            setIsCreateFlowOpen(false);
            setActiveFlowId(newFlowId); // Cambiamos al nuevo flujo automáticamente
        } catch (error) {
            toast({ title: "Error", description: "No se pudo crear el flujo.", variant: "destructive" });
        }
    };
    
    const handleDeleteFlow = async () => {
        if (!activeFlowId || !botId || !window.confirm(`¿Seguro que quieres eliminar el flujo "${activeFlowId}"? Esta acción no se puede deshacer.`)) return;
        try {
            const stepsRef = collection(db, "bots", botId, "flows", activeFlowId, "steps");
            const stepsSnapshot = await getDocs(stepsRef);
            const batch = writeBatch(db);
            stepsSnapshot.forEach(doc => batch.delete(doc.ref));
            await batch.commit();

            await deleteDoc(doc(db, "bots", botId, "flows", activeFlowId));
            toast({ title: "Flujo Eliminado" });

            const newFlows = availableFlows.filter(f => f !== activeFlowId);
            setActiveFlowId(newFlows.length > 0 ? newFlows[0] : null);
        } catch (error) {
            toast({ title: "Error", description: "No se pudo eliminar el flujo.", variant: "destructive" });
        }
    };

    // --- RENDERIZADO DEL COMPONENTE ---
    return (
        <>
            <Dialog open={isCreateFlowOpen} onOpenChange={setIsCreateFlowOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Crear Nuevo Flujo</DialogTitle>
                        <DialogDescription>Dale un nombre único a tu nuevo flujo. Se usará como ID.</DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Label htmlFor="new-flow-name">Nombre del Flujo (ID)</Label>
                        <Input id="new-flow-name" value={newFlowName} onChange={(e) => setNewFlowName(e.target.value)} placeholder="ejemplo_flujo_v1" />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button type="button" variant="secondary">Cancelar</Button></DialogClose>
                        <Button type="button" onClick={handleCreateFlow}>Crear</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="flex h-screen w-full">
                <div className="flex flex-col flex-grow h-full gap-4 p-4 md:p-6 bg-background">
                    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className='flex items-center gap-4'>
                            <Button variant="outline" size="icon" onClick={() => router.push('/bot-manager')}><ArrowLeft className="h-4 w-4" /></Button>
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight text-foreground">Editor: {bot?.name || botId}</h1>
                                <div className="flex flex-wrap items-center gap-2 mt-1">
                                    {availableFlows.length > 0 ? (
                                        <>
                                            <Select value={activeFlowId ?? ''} onValueChange={setActiveFlowId}>
                                                <SelectTrigger className="w-[220px] bg-card"><SelectValue placeholder="Seleccionar flujo" /></SelectTrigger>
                                                <SelectContent>{availableFlows.map(id => <SelectItem key={id} value={id}>{id}</SelectItem>)}</SelectContent>
                                            </Select>
                                            <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => setIsCreateFlowOpen(true)}><PlusCircle className="h-4 w-4" /></Button>
                                            <Button variant="destructive" size="icon" className="h-9 w-9" onClick={handleDeleteFlow}><Trash2 className="h-4 w-4" /></Button>
                                        </>
                                    ) : !isLoading && <Button onClick={() => setIsCreateFlowOpen(true)}>Crear Primer Flujo</Button>}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 self-start md:self-center">
                            <Button onClick={() => addNode('text')} variant="outline" size="sm" className="bg-card"><MessageSquare className="h-4 w-4 mr-1" /> Texto</Button>
                            <Button onClick={() => addNode('buttons')} variant="outline" size="sm" className="bg-card"><List className="h-4 w-4 mr-1" /> Botones</Button>
                            <Button onClick={() => addNode('logic')} variant="outline" size="sm" className="bg-card"><GitBranch className="h-4 w-4 mr-1" /> Lógica</Button>
                            <Button onClick={handleSave} disabled={isSaving || isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}Guardar
                            </Button>
                        </div>
                    </header>

                    <main className="flex-grow min-h-0">
                        <Card className="h-full w-full shadow-lg">
                            <CardContent className="p-0 h-full">
                                {isLoading ? (
                                    <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
                                ) : firebaseError ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center text-destructive p-4">
                                        <ServerCrash className="h-10 w-10 mb-2" /><p className='font-semibold'>{firebaseError}</p>
                                    </div>
                                ) : (
                                    <ReactFlow
                                        nodes={nodes} edges={edges}
                                        onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
                                        nodeTypes={nodeTypes}
                                        onNodeClick={(_, node) => setSelectedNode(node)}
                                        onPaneClick={() => setSelectedNode(null)}
                                        fitView
                                    >
                                        <Controls />
                                        <Background />
                                    </ReactFlow>
                                )}
                            </CardContent>
                        </Card>
                    </main>
                </div>
                
                <NodeEditorPanel 
                    node={selectedNode}
                    onNodeUpdate={handleNodeUpdate}
                    onRemoveNode={handleRemoveNode}
                    onClose={() => setSelectedNode(null)}
                    // AQUÍ ESTÁ LA MODIFICACIÓN CLAVE:
                    allNodeIds={flowNodes.map(n => n.nodeId)}
                />
            </div>
        </>
    );
}
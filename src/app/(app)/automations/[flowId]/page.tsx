"use client";
import { useState, useCallback, useEffect, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ReactFlow, {
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    Node,
    Edge,
    NodeProps,
    Handle,
    Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { nanoid } from 'nanoid';
import { Mail, Clock, Zap, GitBranch, Tags, Globe2, MessageSquare, MoreVertical, Trash2, Copy, PauseCircle, Pencil } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://us-central1-TU_PROJECT_ID.cloudfunctions.net/flowsApi';

// Definición de los datos que contendrá cada nodo.
interface EditableNodeData {
    label: string;
    isPaused?: boolean;
    [key: string]: any;
    updateNodeData: (nodeId: string, newData: object) => void;
    onDelete: (nodeId: string) => void;
    onCopy: (node: Node<EditableNodeData>) => void;
    onPause: (nodeId: string) => void;
}

// --- Componentes de Nodos ---

const NodeActionsMenu = ({ node, data }: { node: Node<EditableNodeData>, data: EditableNodeData }) => (
    <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-7 w-7 p-0 bg-zinc-700 hover:bg-zinc-600">
                    <MoreVertical size={14} className="text-zinc-400" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-zinc-800 text-white border-zinc-700">
                <DropdownMenuItem onClick={() => alert('Editar: Próximamente!')} className="focus:bg-zinc-700 focus:text-white">
                    <Pencil className="mr-2 h-4 w-4" /> Editar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => data.onPause(node.id)} className="focus:bg-zinc-700 focus:text-white">
                    <PauseCircle className="mr-2 h-4 w-4" /> {data.isPaused ? 'Reanudar' : 'Pausar'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => data.onCopy(node)} className="focus:bg-zinc-700 focus:text-white">
                    <Copy className="mr-2 h-4 w-4" /> Copiar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => data.onDelete(node.id)} className="text-red-500 focus:bg-red-900/50 focus:text-red-400">
                    <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
);

const BaseNode = ({ node, data, icon: Icon, colorClass, children }: { node: Node<EditableNodeData>, data: EditableNodeData, icon: any, colorClass: string, children: React.ReactNode }) => (
    <div className={`group p-3 border rounded-xl shadow-lg bg-zinc-800 w-72 relative transition-all duration-200
        ${data.isPaused ? 'border-dashed border-zinc-500 opacity-60' : 'border-zinc-700 hover:border-orange-500'}`}
    >
        {node.deletable !== false && <NodeActionsMenu node={node} data={data} />}
        <Handle type="target" position={Position.Top} className="!bg-zinc-600 !w-3 !h-3" />
        <Handle type="source" position={Position.Bottom} className="!bg-orange-500 !w-3 !h-3" />
        <div className="font-bold flex items-center text-lg text-white mb-2">
            <Icon size={20} className={`mr-2 ${colorClass}`} />
            {data.label || 'Nodo'}
        </div>
        {children}
    </div>
);

const IfElseNode = ({ node, data }: { node: Node<EditableNodeData>, data: EditableNodeData }) => (
    <div className={`group p-3 border rounded-xl shadow-lg bg-zinc-800 w-72 relative transition-all duration-200
        ${data.isPaused ? 'border-dashed border-zinc-500 opacity-60' : 'border-zinc-700 hover:border-orange-500'}`}
    >
        {node.deletable !== false && <NodeActionsMenu node={node} data={data} />}
        <Handle type="target" position={Position.Top} className="!bg-zinc-600 !w-3 !h-3" />
        <Handle type="source" position={Position.Bottom} id="true" style={{ left: '25%' }} className="!bg-green-500 !w-3 !h-3" />
        <Handle type="source" position={Position.Bottom} id="false" style={{ left: '75%' }} className="!bg-red-500 !w-3 !h-3" />
        <div className="font-bold flex items-center text-lg text-white mb-2">
            <GitBranch size={20} className="mr-2 text-purple-500" />
            {data.label || 'Si/No (If/Else)'}
        </div>
        <p className="text-sm text-zinc-400">Divide el camino basado en una condición.</p>
    </div>
);

export default function FlowEditorPage() {
    const { toast } = useToast();
    const router = useRouter();
    const { flowId } = useParams<{ flowId: string }>();
    const [nodes, setNodes] = useState<Node<EditableNodeData>[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [flowName, setFlowName] = useState('Flujo de Prueba 1');

    const updateNodeData = useCallback((nodeId: string, newData: object) => {
        setNodes((nds) =>
            nds.map((node) =>
                node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node
            )
        );
    }, []);

    const handleDeleteNode = useCallback((nodeId: string) => {
        setNodes((nds) => nds.filter((node) => node.id !== nodeId));
        setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    }, []);

    const handleCopyNode = useCallback((nodeToCopy: Node<EditableNodeData>) => {
        const newNode: Node<EditableNodeData> = {
            ...nodeToCopy,
            id: nanoid(),
            position: {
                x: nodeToCopy.position.x + 40,
                y: nodeToCopy.position.y + 40,
            },
        };
        setNodes((nds) => [...nds, newNode]);
    }, []);

    const handlePauseNode = useCallback((nodeId: string) => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === nodeId) {
                    return { ...node, data: { ...node.data, isPaused: !node.data.isPaused } };
                }
                return node;
            })
        );
        toast({ title: "Nodo actualizado" });
    }, [toast]);

    const addNode = useCallback((type: string, data: Partial<EditableNodeData> = {}) => {
        const newNodeData: EditableNodeData = {
            label: data.label || 'Nuevo Nodo',
            ...data,
            updateNodeData,
            onDelete: handleDeleteNode,
            onCopy: handleCopyNode,
            onPause: handlePauseNode,
        };
        const newNode: Node<EditableNodeData> = {
            id: nanoid(),
            type,
            position: { x: Math.random() * 400 + 150, y: 150 + Math.random() * 200 },
            data: newNodeData,
        };
        setNodes((nds) => [...nds, newNode]);
    }, [updateNodeData, handleDeleteNode, handleCopyNode, handlePauseNode]);

    useEffect(() => {
        const initialTriggerData: EditableNodeData = {
            label: 'El Contacto se Suscribe',
            audience: 'all',
            updateNodeData,
            onDelete: handleDeleteNode,
            onCopy: handleCopyNode,
            onPause: handlePauseNode,
        };
        const initialTriggerNode: Node<EditableNodeData> = {
            id: 'trigger-start',
            type: 'subscriptionTrigger',
            position: { x: 450, y: 50 },
            deletable: false,
            data: initialTriggerData
        };
        setNodes([initialTriggerNode]);
    }, [updateNodeData, handleDeleteNode, handleCopyNode, handlePauseNode]);

    const nodeTypes = useMemo(() => ({
        subscriptionTrigger: (props: NodeProps<EditableNodeData>) => {
            const { data } = props;
            return (
                <div className="p-4 rounded-xl shadow-lg bg-zinc-800 border border-orange-500 w-96">
                    <div className="font-bold flex items-center text-lg text-white mb-3">
                        <Zap size={20} className="mr-2 text-orange-500" /> {data.label}
                    </div>
                    <RadioGroup defaultValue={data.audience} onValueChange={(value) => data.updateNodeData('trigger-start', { ...data, audience: value })}>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="all" id="r1" className="border-zinc-600 text-orange-500" />
                            <Label htmlFor="r1" className="text-zinc-300">A todos los prospectos</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="segment" id="r2" className="border-zinc-600 text-orange-500" />
                            <Label htmlFor="r2" className="text-zinc-300">Solo a un segmento específico</Label>
                        </div>
                    </RadioGroup>
                    <Handle type="source" position={Position.Bottom} className="!bg-orange-500 !w-3 !h-3" />
                </div>
            );
        },
        ifElse: (props: NodeProps<EditableNodeData>) => {
            const { xPos, yPos, ...rest } = props;
            const nodeObject: Node<EditableNodeData> = { ...rest, position: { x: xPos, y: yPos } };
            return <IfElseNode node={nodeObject} data={props.data} />;
        },
        sendEmail: (props: NodeProps<EditableNodeData>) => {
            const { xPos, yPos, ...rest } = props;
            const nodeObject: Node<EditableNodeData> = { ...rest, position: { x: xPos, y: yPos } };
            return <BaseNode node={nodeObject} data={props.data} icon={Mail} colorClass="text-blue-500"><p className="text-sm text-zinc-400">Configurar el envío de correo electrónico.</p></BaseNode>;
        },
        delay: (props: NodeProps<EditableNodeData>) => {
            const { xPos, yPos, ...rest } = props;
            const nodeObject: Node<EditableNodeData> = { ...rest, position: { x: xPos, y: yPos } };
            return <BaseNode node={nodeObject} data={props.data} icon={Clock} colorClass="text-teal-500"><p className="text-sm text-zinc-400">Configurar un retraso de tiempo.</p></BaseNode>;
        },
        waitTrigger: (props: NodeProps<EditableNodeData>) => {
            const { xPos, yPos, ...rest } = props;
            const nodeObject: Node<EditableNodeData> = { ...rest, position: { x: xPos, y: yPos } };
            return <BaseNode node={nodeObject} data={props.data} icon={Zap} colorClass="text-yellow-500"><p className="text-sm text-zinc-400">Espera a que ocurra un evento específico.</p></BaseNode>;
        },
        sendSMS: (props: NodeProps<EditableNodeData>) => {
            const { xPos, yPos, ...rest } = props;
            const nodeObject: Node<EditableNodeData> = { ...rest, position: { x: xPos, y: yPos } };
            return <BaseNode node={nodeObject} data={props.data} icon={MessageSquare} colorClass="text-green-500"><p className="text-sm text-zinc-400">Configurar el marketing por SMS.</p></BaseNode>;
        },
        webhook: (props: NodeProps<EditableNodeData>) => {
            const { xPos, yPos, ...rest } = props;
            const nodeObject: Node<EditableNodeData> = { ...rest, position: { x: xPos, y: yPos } };
            return <BaseNode node={nodeObject} data={props.data} icon={Globe2} colorClass="text-cyan-500"><p className="text-sm text-zinc-400">Envía información a otra aplicación.</p></BaseNode>;
        },
        tag: (props: NodeProps<EditableNodeData>) => {
            const { xPos, yPos, ...rest } = props;
            const nodeObject: Node<EditableNodeData> = { ...rest, position: { x: xPos, y: yPos } };
            return <BaseNode node={nodeObject} data={props.data} icon={Tags} colorClass="text-rose-500"><p className="text-sm text-zinc-400">Añade o quita etiquetas.</p></BaseNode>;
        },
    }), [handleDeleteNode, handleCopyNode, handlePauseNode, updateNodeData]);

    const onNodesChange: OnNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
    const onEdgesChange: OnEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);
    const onConnect: OnConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, animated: true, type: 'smoothstep', style: { strokeWidth: 2, stroke: '#f97316' } }, eds)), []);

    return (
        <div className="flex flex-col h-screen w-full bg-zinc-900 text-white">
            <header className="flex items-center justify-between p-4 border-b border-zinc-700 z-10">
                <Input value={flowName} onChange={(e) => setFlowName(e.target.value)} className="text-lg font-bold w-1/3 border-zinc-700 bg-zinc-800 focus:ring-orange-500" placeholder="Nombre del Flujo..." />
                <div className="flex items-center gap-2">
                    <Button variant="ghost" className="text-zinc-400 hover:bg-zinc-800 hover:text-white" onClick={() => router.push('/automations')}>Cancelar</Button>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">Guardar Flujo</Button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                <aside className="w-72 bg-zinc-900 p-4 border-r border-zinc-700 overflow-y-auto flex flex-col">
                    <h2 className="text-xl font-bold mb-4">Añadir Nodos</h2>
                    <div className="mb-6">
                        <h3 className="font-semibold text-orange-500 mb-2">REGLAS</h3>
                        <div className="space-y-2">
                            <Button variant="outline" className="w-full justify-start bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700" onClick={() => addNode('ifElse', { label: 'Si/No' })}><GitBranch className="mr-2 h-4 w-4 text-purple-500" /> Si / No</Button>
                            <Button variant="outline" className="w-full justify-start bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700" onClick={() => addNode('waitTrigger', { label: 'Esperar Activador' })}><Zap className="mr-2 h-4 w-4 text-yellow-500" /> Esperar Activador</Button>
                            <Button variant="outline" className="w-full justify-start bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700" onClick={() => addNode('delay', { label: 'Retraso de Tiempo' })}><Clock className="mr-2 h-4 w-4 text-teal-500" /> Retraso de Tiempo</Button>
                        </div>
                    </div>
                    <div className="mb-6">
                        <h3 className="font-semibold text-orange-500 mb-2">ACCIONES</h3>
                        <div className="space-y-2">
                            <Button variant="outline" className="w-full justify-start bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700" onClick={() => addNode('sendEmail', { label: 'Enviar Correo' })}><Mail className="mr-2 h-4 w-4 text-blue-500" /> Enviar Correo</Button>
                            <Button variant="outline" className="w-full justify-start bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700" onClick={() => addNode('sendSMS', { label: 'Enviar SMS' })}><MessageSquare className="mr-2 h-4 w-4 text-green-500" /> Enviar SMS</Button>
                            <Button variant="outline" className="w-full justify-start bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700" onClick={() => addNode('webhook', { label: 'Webhook' })}><Globe2 className="mr-2 h-4 w-4 text-cyan-500" /> Webhook</Button>
                            <Button variant="outline" className="w-full justify-start bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700" onClick={() => addNode('tag', { label: 'Etiquetar' })}><Tags className="mr-2 h-4 w-4 text-rose-500" /> Etiquetar / Desetiquetar</Button>
                        </div>
                    </div>
                    <div className="text-xs text-zinc-500 mt-auto">
                        <p><strong>Para conectar:</strong> Arrastra desde un círculo a otro.</p>
                        <p><strong>Para eliminar:</strong> Usa el menú de 3 puntos.</p>
                    </div>
                </aside>

                <main className="flex-1 h-full w-full bg-zinc-900">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        nodeTypes={nodeTypes}
                        fitView
                    >
                        <Background color="#3f3f46" gap={16} />
                        <Controls className="!bg-zinc-800 !border-zinc-700 [&>button]:!bg-zinc-700" />
                    </ReactFlow>
                </main>
            </div>
        </div>
    );
}

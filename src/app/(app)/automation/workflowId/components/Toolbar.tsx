"use client";
import { Button } from "@/components/ui/button";
import { MessageSquare, List, GitBranch, Image, Video, FileText, Clock } from "lucide-react";

export type NodeType = 'text' | 'buttons' | 'image' | 'video' | 'document' | 'delay' | 'logic';

interface ToolbarProps { onAddNode: (type: NodeType) => void }

const nodeTypes: { type: NodeType; icon: React.ElementType; label: string }[] = [
    { type: 'text', icon: MessageSquare, label: 'Texto' },
    { type: 'buttons', icon: List, label: 'Botones' },
    { type: 'image', icon: Image, label: 'Imagen' },
    { type: 'video', icon: Video, label: 'Video' },
    { type: 'document', icon: FileText, label: 'Doc' },
    { type: 'delay', icon: Clock, label: 'Espera' },
    { type: 'logic', icon: GitBranch, label: 'Lógica' },
];

export default function Toolbar({ onAddNode }: ToolbarProps) {
    return (
        <div className="absolute top-4 left-4 z-10 bg-card p-2 rounded-lg border shadow-md flex flex-wrap gap-1">
            {nodeTypes.map(node => (
                <Button key={node.type} variant="ghost" size="sm" onClick={() => onAddNode(node.type)} title={`Añadir nodo ${node.label}`}>
                    <node.icon className="h-4 w-4 mr-2" />
                    {node.label}
                </Button>
            ))}
        </div>
    );
}
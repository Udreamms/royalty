"use client";
import { memo } from 'react';
import { Handle, Position, NodeProps } from 'react-flow-renderer';
import { MessageSquare, List, GitBranch, Image, Video, FileText, Clock, Zap } from "lucide-react";

const getNodeIcon = (type: string) => { /* ... Lógica para obtener icono ... */ return <Zap/> };

const CustomNode = memo(({ data, selected }: NodeProps<any>) => {
    const textToShow = data.text || data.caption || '...';
    return (
        <div className={`bg-card border-2 rounded-lg shadow-md w-[250px] ${selected ? 'border-primary' : 'border-border/50'}`}>
            <div className="p-2.5 border-b flex items-center gap-3">
                {getNodeIcon(data.type)}
                <div>
                    <div className="font-mono text-xs font-bold truncate">{data.nodeId}</div>
                    <div className="text-xs text-muted-foreground capitalize">{data.type}</div>
                </div>
            </div>
            <div className="p-3 text-sm text-muted-foreground">
                <p className="line-clamp-2">{textToShow}</p>
            </div>
            <Handle type="target" position={Position.Left} className="!bg-primary" />
            <Handle type="source" position={Position.Right} className="!bg-primary" />
        </div>
    );
});
CustomNode.displayName = 'CustomNode';
export default CustomNode;
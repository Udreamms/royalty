"use client";
// Este es el panel lateral para editar el nodo seleccionado.
// El código completo y funcional fue proporcionado en la respuesta anterior.
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Node } from 'react-flow-renderer';

export default function NodeEditorPanel({ node, allNodeIds, onClose, onUpdate, onRemove }: any) {
    if (!node) return null;
    return (
        <aside className="w-96 border-l bg-card h-full">
            <CardHeader>
                <CardTitle>Editando: {node.data.nodeId}</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Aquí va el formulario de edición específico del nodo */}
                <p>Opciones para el nodo <span className="font-bold">{node.data.type}</span></p>
            </CardContent>
        </aside>
    );
}
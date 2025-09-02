// src/app/(app)/automations/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusCircle, Workflow as WorkflowIcon, LayoutTemplate, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useToast } from '@/hooks/use-toast';
import { nanoid } from 'nanoid';
import { Workflow } from '@/lib/workflow.interface'; // Asegúrate que esta interfaz exista

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function AutomationsDashboardPage() {
    const [flows, setFlows] = useState<Workflow[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter(); // Para la navegación de 'Editar'
    const { toast } = useToast();

    useEffect(() => {
        const fetchFlows = async () => {
            if (!API_BASE_URL) {
                console.error("API URL no está configurada.");
                toast({ title: "Error", description: "La URL de la API no está definida.", variant: "destructive" });
                setIsLoading(false);
                return;
            }
            try {
                const response = await fetch(API_BASE_URL);
                if (!response.ok) throw new Error('No se pudieron cargar los flujos.');
                const data: Workflow[] = await response.json();
                setFlows(data);
            } catch (error) {
                console.error("Error al obtener flujos:", error);
                toast({ title: "Error de Carga", description: "No se pudieron obtener los flujos.", variant: "destructive" });
            } finally {
                setIsLoading(false);
            }
        };

        fetchFlows();
    }, [toast]);

    /**
     * CORRECCIÓN: Esta función ahora abre una nueva pestaña del navegador.
     * Al hacer clic en "Crear Nuevo", se genera una URL única para un nuevo flujo
     * y se abre en una pestaña separada.
     */
    const handleCreateNewFlow = () => {
        const newFlowId = `new_${nanoid(10)}`;
        const editorUrl = `/automations/${newFlowId}`;
        window.open(editorUrl, '_blank'); // Abre la URL en una nueva pestaña
    };
    
    const handleDeleteFlow = async (flowId: string) => {
        // Tu lógica para eliminar un flujo aquí...
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500">
                        All Automation Flows
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Crea, gestiona y analiza tus flujos de trabajo automatizados.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button asChild variant="outline">
                        <Link href="/automations/templates" legacyBehavior>
                            <LayoutTemplate className="mr-2 h-4 w-4" /> Elegir Plantilla
                        </Link>
                    </Button>
                    {/* Este botón ahora llama a la función corregida */}
                    <Button onClick={handleCreateNewFlow}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Crear Nuevo
                    </Button>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Tus Flujos</CardTitle>
                    <CardDescription>Una lista de todos los flujos de automatización creados.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    {isLoading ? (
                        <div className="h-[200px] flex items-center justify-center">Cargando flujos...</div>
                    ) : flows.length > 0 ? (
                        <Table>
                            <TableBody>
                                {flows.map((flow) => (
                                    <TableRow key={flow.id}>
                                        <TableCell className="font-medium">
                                            <Link
                                                href={`/automations/${flow.id}`}
                                                className="hover:underline"
                                                legacyBehavior>
                                                {flow.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => router.push(`/automations/${flow.id}`)}>
                                                        Editar
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => alert('Duplicar: Próximamente')}>
                                                        Duplicar
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="text-red-500"
                                                        onClick={() => handleDeleteFlow(flow.id)}
                                                    >
                                                        Borrar
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="h-[200px] flex flex-col items-center justify-center text-center">
                            <WorkflowIcon className="h-16 w-16 text-muted-foreground mb-4" />
                            <h3 className="text-xl font-semibold">Aún no has creado flujos</h3>
                            <p className="text-muted-foreground">Haz clic en "Crear Nuevo" para empezar.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

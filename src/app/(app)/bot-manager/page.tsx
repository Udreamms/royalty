
"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreHorizontal, Loader2, ServerCrash } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch"; 
import { useToast } from "@/hooks/use-toast";
import { Timestamp, collection, query, onSnapshot, orderBy, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase-client';

interface Bot {
  id: string;
  name?: string;
  platform?: string;
  isActive?: boolean;
  ultimaModificacion?: Timestamp;
}

const WhatsAppIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 fill-current">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.46 3.48 1.32 4.95L2.05 22l5.25-1.38c1.41.79 3.02 1.22 4.74 1.22h.01c5.46 0 9.9-4.45 9.9-9.91s-4.45-9.9-9.9-9.9zM17.5 14.3c-.28-.14-1.65-.81-1.9-.91-.25-.09-.44-.14-.62.14-.18.28-.72.91-.88 1.1-.16.18-.32.21-.59.07-.28-.14-1.17-.43-2.23-1.38-.83-.73-1.38-1.63-1.54-1.9-.16-.28 0-.43.13-.57.12-.12.28-.32.41-.48.14-.16.18-.28.28-.46.09-.18.05-.35-.02-.48-.07-.14-.62-1.49-.85-2.04-.22-.55-.45-.48-.62-.48-.16 0-.35 0-.53 0-.18 0-.46.07-.7.35-.25.28-1 1-1 2.44s1.03 2.84 1.17 3.03c.14.18 2 3.19 4.84 4.25.68.27 1.21.43 1.62.55.73.21 1.39.18 1.9.11.59-.07 1.65-.68 1.88-1.33.24-.65.24-1.21.16-1.33-.07-.12-.25-.21-.53-.35z"/>
    </svg>
);

function formatFirebaseTimestamp(timestamp: Timestamp | undefined): string {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate();
    return date.toLocaleString('es-ES', { 
        day: '2-digit', month: '2-digit', year: 'numeric', 
        hour: '2-digit', minute: '2-digit' 
    });
}

export default function BotManagerPage() {
    const [bots, setBots] = useState<Bot[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (!db) {
            setError("Error: La base de datos Firestore no está inicializada.");
            setIsLoading(false);
            return;
        }

        const botsCollectionRef = collection(db, "bots");
        const q = query(botsCollectionRef, orderBy("name"));

        const unsubscribe = onSnapshot(q, 
            (querySnapshot) => {
                const botsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as Bot));
                setBots(botsData);
                setIsLoading(false);
            }, 
            (err) => {
                console.error("Error al obtener bots de Firestore:", err);
                setError("No se pudieron cargar los bots. Revisa las reglas de seguridad de Firestore.");
                setIsLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    const handleBotStatusChange = async (botId: string, newStatus: boolean) => {
        if (!db) return;
        
        const botRef = doc(db, "bots", botId);
        try {
            await updateDoc(botRef, {
                isActive: newStatus,
                ultimaModificacion: Timestamp.now()
            });
            toast({
                title: "¡Éxito!",
                description: `El bot ha sido ${newStatus ? 'activado' : 'desactivado'}.`,
            });
        } catch (error) {
            console.error("Error al actualizar el estado del bot:", error);
            toast({
                title: "Error",
                description: "No se pudo actualizar el estado del bot en la base de datos.",
                variant: "destructive"
            });
        }
    };

    const renderBotTableContent = () => {
        if (isLoading) {
            return (
                <TableRow>
                    <TableCell colSpan={5} className="h-48 text-center">
                        <div className="flex items-center justify-center text-muted-foreground">
                            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                            <p>Cargando bots desde Firestore...</p>
                        </div>
                    </TableCell>
                </TableRow>
            );
        }

        if (error) {
            return (
                <TableRow>
                    <TableCell colSpan={5} className="h-48 text-center">
                        <div className="flex flex-col items-center justify-center gap-2 text-destructive">
                            <ServerCrash className="h-10 w-10" />
                            <p className="font-semibold text-lg mt-2">Error de Conexión</p>
                            <p className="text-sm text-muted-foreground">{error}</p>
                        </div>
                    </TableCell>
                </TableRow>
            );
        }

        if (bots.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan={5} className="h-48 text-center text-muted-foreground">
                        No se encontraron bots en la base de datos. Haz clic en "Crear Nuevo Agente" para empezar.
                    </TableCell>
                </TableRow>
            );
        }

        return bots.map((bot) => (
            <TableRow key={bot.id}>
                <TableCell>
                    <div className="font-medium text-foreground">{bot.name || "Sin Nombre"}</div>
                    <div className="text-xs text-muted-foreground">ID: {bot.id}</div>
                </TableCell>
                <TableCell>
                    <div className="flex items-center gap-2">
                        <WhatsAppIcon />
                        <span>{bot.platform || "WhatsApp"}</span>
                    </div>
                </TableCell>
                <TableCell>
                    <div className="flex items-center gap-2">
                        <Switch
                            checked={bot.isActive === true}
                            onCheckedChange={(newStatus) => handleBotStatusChange(bot.id, newStatus)}
                            aria-label={`Activar o desactivar el bot ${bot.name}`}
                        />
                        <span className={`text-sm font-medium capitalize ${bot.isActive ? 'text-green-400' : 'text-muted-foreground'}`}>
                            {bot.isActive ? "Activo" : "Inactivo"}
                        </span>
                    </div>
                </TableCell>
                <TableCell>{formatFirebaseTimestamp(bot.ultimaModificacion)}</TableCell>
                <TableCell className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link href={`/bot-manager/${bot.id}`}>Editar</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem disabled>Ver Analíticas</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        ));
    };

    return (
        <div className="flex flex-col h-full gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">WhatsApp Bots</h1>
                    <p className="text-muted-foreground mt-1">
                        Crea, configura y administra tus agentes de WhatsApp desde Firestore.
                    </p>
                </div>
                 <Button asChild>
                    <Link href="/bot-manager/new" legacyBehavior>
                        <PlusCircle className="mr-2 h-4 w-4" /> Crear Nuevo Agente
                    </Link>
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Agentes Creados</CardTitle>
                    <CardDescription>
                        Aquí se listarán todos los bots que configures en tu base de datos de Firestore.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre del Agente</TableHead>
                                <TableHead>Plataforma</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>Última Modificación</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {renderBotTableContent()}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

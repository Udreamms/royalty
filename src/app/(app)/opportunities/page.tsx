"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot, orderBy, Timestamp } from 'firebase/firestore';
import { PlusCircle, Loader2, ServerCrash } from "lucide-react";
import { Button } from "@/components/ui/button";

// Interfaz para una oportunidad individual
interface Opportunity {
  id: string;
  name: string;
  value?: number;
  currentStage: string;
  lastContacted: Timestamp;
  lastMessageSnippet?: string;
  hasUnreadMessages?: boolean;
}

// Define las etapas del pipeline
const pipelineStages = [
    { id: 'new', title: 'Nuevos', color: 'border-blue-500' },
    { id: 'contacted', title: 'Contactados', color: 'border-cyan-500' },
    { id: 'meeting_scheduled', title: 'Reunión Agendada', color: 'border-purple-500' },
    { id: 'proposal_sent', title: 'Propuesta Enviada', color: 'border-yellow-500' },
    { id: 'negotiation', title: 'En Negociación', color: 'border-orange-500' }
];

// Componente para la tarjeta de una oportunidad
const OpportunityCard = ({ opp }: { opp: Opportunity }) => (
    <Link href={`/opportunities/${opp.id}`} passHref>
      <Card className="mb-3 cursor-pointer transition-shadow duration-200 hover:shadow-lg hover:border-primary/50">
        <CardContent className="p-3">
            <div className="flex justify-between items-start">
                <p className="font-semibold text-sm text-foreground pr-2">{opp.name}</p>
                {opp.hasUnreadMessages && (
                    <div title="Mensajes no leídos" className="w-2.5 h-2.5 bg-green-400 rounded-full flex-shrink-0 animate-pulse"></div>
                )}
            </div>
            {opp.lastMessageSnippet && (
                <p className="text-xs text-muted-foreground mt-1 truncate italic">"{opp.lastMessageSnippet}"</p>
            )}
            <p className="text-xs text-muted-foreground mt-2 text-right">
                {opp.lastContacted?.toDate().toLocaleString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
            </p>
        </CardContent>
      </Card>
    </Link>
);

// Componente para una columna del pipeline
const PipelineColumn = ({ stage, opportunities }: { stage: any, opportunities: Opportunity[] }) => (
    <div className="w-full md:w-80 flex-shrink-0">
        <div className="bg-muted/50 rounded-lg h-full flex flex-col">
            <div className={`p-3 rounded-t-lg flex justify-between items-center border-b-4 ${stage.color}`}>
                <h3 className="font-semibold text-sm text-foreground">{stage.title}</h3>
                <Badge variant="secondary">{opportunities.length}</Badge>
            </div>
            <div className="p-2 flex-grow h-[calc(100vh-250px)] overflow-y-auto">
                {opportunities.map(opp => <OpportunityCard key={opp.id} opp={opp} />)}
            </div>
        </div>
    </div>
);

// Componente principal de la página
export default function OpportunitiesPipelinePage() {
    const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const q = query(collection(db, "opportunities"), orderBy("lastContacted", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const oppsFromFS = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Opportunity));
            setOpportunities(oppsFromFS);
            setIsLoading(false);
        }, (err) => {
            console.error("Error al cargar oportunidades:", err);
            setError("No se pudieron cargar las oportunidades. Revisa las reglas de Firestore.");
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (isLoading) return <div className="flex items-center justify-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    if (error) return <div className="flex flex-col items-center justify-center h-full text-destructive"><ServerCrash className="h-8 w-8 mr-2"/><span>{error}</span></div>;

    return (
        <div className="flex flex-col h-full p-4 md:p-6 gap-6">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Oportunidades</h1>
                    <p className="text-muted-foreground mt-1">Gestiona tu embudo de ventas en tiempo real.</p>
                </div>
                <Button disabled><PlusCircle className="mr-2 h-4 w-4" /> Nueva Oportunidad</Button>
            </header>
            <main className="flex-grow min-h-0">
                <div className="flex gap-4 overflow-x-auto pb-4">
                    {pipelineStages.map(stage => (
                        <PipelineColumn 
                            key={stage.id} 
                            stage={stage} 
                            opportunities={opportunities.filter(o => o.currentStage === stage.id)} 
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}
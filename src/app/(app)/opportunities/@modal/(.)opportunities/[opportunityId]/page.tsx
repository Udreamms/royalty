"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Loader2, ServerCrash, Mail, Phone, Building } from "lucide-react";

// Usamos la misma interfaz para mantener consistencia
interface Opportunity {
  id: string;
  name: string;
  value?: number;
  currentStage: string;
  lastContacted: Timestamp;
  email?: string;
  phone?: string;
  company?: string;
}

const formatCurrency = (value?: number) => {
    if (value === undefined) return "No especificado";
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value);
};

export default function OpportunityModal({ params }: { params: { opportunityId: string } }) {
    const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        if (params.opportunityId) {
            const getOpportunity = async () => {
                try {
                    const docRef = doc(db, "opportunities", params.opportunityId);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setOpportunity({ id: docSnap.id, ...docSnap.data() } as Opportunity);
                    } else {
                        setError("No se encontró la oportunidad.");
                    }
                } catch (err) {
                    setError("Error al cargar los datos.");
                } finally {
                    setIsLoading(false);
                }
            };
            getOpportunity();
        }
    }, [params.opportunityId]);

    const handleOnOpenChange = (open: boolean) => {
        if (!open) {
            setIsOpen(false);
            setTimeout(() => {
                router.back();
            }, 200);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOnOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    {isLoading ? (
                        <DialogTitle>Cargando Oportunidad...</DialogTitle>
                    ) : opportunity ? (
                        <>
                            <DialogTitle className="text-xl">{opportunity.name}</DialogTitle>
                            <DialogDescription>
                                {formatCurrency(opportunity.value)}
                            </DialogDescription>
                        </>
                    ) : (
                         <DialogTitle className="text-destructive">Error</DialogTitle>
                    )}
                </DialogHeader>

                {isLoading && <div className="flex items-center justify-center h-48"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
                
                {error && (
                    <div className="flex flex-col items-center justify-center h-48 text-destructive text-center">
                        <ServerCrash className="h-8 w-8 mb-2"/>
                        <p>{error}</p>
                    </div>
                )}

                {opportunity && (
                     <div className="py-4 space-y-4">
                        <div className="flex justify-between items-center bg-muted/50 p-3 rounded-md">
                            <span className="text-sm font-medium">Etapa Actual</span>
                            <Badge variant="secondary" className="capitalize">{opportunity.currentStage.replace('_', ' ')}</Badge>
                        </div>
                        <div>
                             <h3 className="mb-2 font-semibold text-sm">Información de Contacto</h3>
                             <div className="space-y-1 text-sm text-muted-foreground">
                                <p className="flex items-center"><Mail className="h-4 w-4 mr-3"/> {opportunity.email || 'No añadido'}</p>
                                <p className="flex items-center"><Phone className="h-4 w-4 mr-3"/> {opportunity.phone || 'No añadido'}</p>
                                <p className="flex items-center"><Building className="h-4 w-4 mr-3"/> {opportunity.company || 'No añadida'}</p>
                             </div>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
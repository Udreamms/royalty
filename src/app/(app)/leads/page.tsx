
"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Filter, Eye, Search, Loader2, ServerCrash, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { db, getFirebaseConfigError } from '@/lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { type Lead, allLeadStages } from '@/lib/workflow.interface';

const getStageBadgeClass = (stageId: string | undefined) => {
    if (!stageId) return "bg-slate-500/20 text-slate-300 border-slate-500/30";
    if (stageId.startsWith('inbox')) return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    if (stageId.startsWith('pc')) return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
    return "bg-slate-500/20 text-slate-300 border-slate-500/30";
};


export default function LeadsListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);

  useEffect(() => {
    const initError = getFirebaseConfigError();
    if (initError) {
      setFirebaseError(initError);
      setIsLoading(false);
      return;
    }
    if (!db) {
      setFirebaseError("La instancia de Firestore (db) no está disponible.");
      setIsLoading(false);
      return;
    }

    const q = query(
      collection(db, "prospects"), 
      where("currentPipeline", "!=", "converted")
    );

    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const leadsFromFS = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        } as Lead));
        
        leadsFromFS.forEach(lead => {
          if (!lead.currentStage && allLeadStages.length > 0) {
              lead.currentStage = allLeadStages[0].id;
          }
        });

        setLeads(leadsFromFS);
        setFirebaseError(null);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching leads from Firestore:", error);
        setFirebaseError(`Error al leer de Firestore: ${error.message}. Revisa tus reglas de seguridad y la existencia de la colección 'prospects'.`);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);
  
  const filteredLeads = leads.filter(lead =>
    (lead.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (lead.visaType && lead.visaType.toLowerCase().includes(searchTerm.toLowerCase())) ||
    ((allLeadStages.find(s => s.id === lead.currentStage)?.title || '').toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={6} className="h-60 text-center">
            <div className="flex items-center justify-center text-muted-foreground">
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              <p className="text-lg">Cargando prospectos...</p>
            </div>
          </TableCell>
        </TableRow>
      );
    }

    if (firebaseError) {
      return (
        <TableRow>
          <TableCell colSpan={6} className="h-60 text-center">
            <div className="flex flex-col items-center justify-center gap-2 text-destructive">
              <ServerCrash className="h-10 w-10" />
              <p className="font-semibold text-lg mt-2">Error de Conexión</p>
              <code className="mt-2 text-xs bg-destructive/20 p-2 rounded-md max-w-2xl text-left">{firebaseError}</code>
            </div>
          </TableCell>
        </TableRow>
      );
    }

    if (filteredLeads.length > 0) {
      return filteredLeads.map((lead) => (
        <TableRow key={lead.id} className="hover:bg-muted/50">
          <TableCell className="font-medium text-foreground">{lead.name}</TableCell>
          <TableCell className="text-muted-foreground">{lead.visaType || "N/A"}</TableCell>
          <TableCell>
            <Badge variant="secondary" className={getStageBadgeClass(lead.currentStage)}>
              {allLeadStages.find(s => s.id === lead.currentStage)?.title || lead.currentStage}
            </Badge>
          </TableCell>
          <TableCell className="text-muted-foreground">{lead.assignedTo || "N/A"}</TableCell>
          <TableCell className="text-muted-foreground">
            {lead.createdAt && (lead.createdAt as Timestamp).toDate().toLocaleDateString()}
          </TableCell>
          <TableCell className="text-right">
            <Button asChild variant="outline" size="sm" className="hover:bg-accent hover:text-accent-foreground">
              <Link href={`/leads/${lead.id}`} legacyBehavior>
                <Eye className="mr-2 h-4 w-4" /> Ver Prospecto
              </Link>
            </Button>
          </TableCell>
        </TableRow>
      ));
    }

    return (
      <TableRow>
        <TableCell colSpan={6} className="h-60 text-center">
          <div className="flex flex-col items-center justify-center gap-2 text-foreground">
              <UserPlus className="h-10 w-10 text-muted-foreground" />
              <p className="font-semibold text-lg mt-2">No hay prospectos todavía</p>
              <p className="text-sm text-muted-foreground max-w-md">
                Los nuevos prospectos que lleguen aparecerán aquí automáticamente.
              </p>
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">Gestión de Prospectos</h1>
          <p className="text-muted-foreground mt-1">Visualiza y gestiona tus prospectos desde Firestore.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" disabled>
            <Filter className="mr-2 h-4 w-4" /> Filtros
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled>
            <PlusCircle className="mr-2 h-4 w-4" /> Añadir Prospecto
          </Button>
        </div>
      </div>
      
      <div className="flex gap-2 items-center mb-2">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
                type="search"
                placeholder="Buscar prospectos..." 
                className="pl-8 bg-input border-border focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
      </div>

      <Card className="shadow-lg flex-grow border-border/50">
        <CardContent className="p-0">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Tipo de Visa</TableHead>
                        <TableHead>Etapa Actual</TableHead>
                        <TableHead>Asesor Asignado</TableHead>
                        <TableHead>Fecha de Creación</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                      {renderContent()}
                    </TableBody>
                </Table>
            </div>
        </CardContent>
      </Card>
      <p className="text-xs text-muted-foreground mt-2">
        Los datos de los prospectos se obtienen en tiempo real de Firestore.
      </p>
    </div>
  );
}

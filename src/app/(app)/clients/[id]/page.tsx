"use client";

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription_shadcn as ShadAlertDescription, AlertTitle as ShadAlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, MessageSquare, UserCircle, Briefcase, CalendarDays, FileText, DollarSign, Send, Paperclip, Edit, School, Landmark, Users, ShieldCheck, Plane, Home, CheckCircle, XCircle, Info, ListChecks, UploadCloud, Mail, PlusCircle, Check, CheckCheck, Loader2, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { clientPipelineStages, type Client } from '@/lib/workflow.interface'; 
import { db, functions } from '@/lib/firebase';
import { httpsCallable } from 'firebase/functions';
import { doc, onSnapshot, updateDoc, collection, query, orderBy, Timestamp, deleteField } from 'firebase/firestore';


export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [client, setClient] = useState<Client | null | undefined>(undefined); 
  const [messages, setMessages] = useState<any[]>([]);
  const [isMessagesLoading, setIsMessagesLoading] = useState(true);
  const [whatsAppReply, setWhatsAppReply] = useState("");
  const [isSending, setIsSending] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const clientId = params.id as string;

  useEffect(() => {
    if (!clientId || !db) return;

    const docRef = doc(db, "prospects", clientId);
    const unsubscribeClient = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as any;
        if (!data.stage) {
            data.stage = data.currentStage || clientPipelineStages[0].id;
        }
        setClient({ ...data, id: docSnap.id });
      } else {
        setClient(null);
        toast({ title: "Error", description: "No se encontró el cliente.", variant: "destructive" });
      }
    }, (error) => {
      console.error("Error fetching client details:", error);
      setClient(null);
      toast({ title: "Error de Firestore", description: "No se pudieron cargar los detalles del cliente.", variant: "destructive" });
    });

    return () => unsubscribeClient();
  }, [clientId, toast]);

  useEffect(() => {
    if (!client || !client.phoneNumber || !db) {
        setMessages([]);
        setIsMessagesLoading(false);
        return;
    };
    
    setIsMessagesLoading(true);
    const messagesQuery = query(collection(db, "conversations", client.phoneNumber, "messages"), orderBy("timestamp"));
    const unsubscribeMessages = onSnapshot(messagesQuery, (querySnapshot) => {
        const msgs: any[] = [];
        querySnapshot.forEach(doc => {
            const data = doc.data();
            const timestamp = data.timestamp?.toDate ? data.timestamp.toDate().toLocaleString('es-ES') : new Date().toLocaleString('es-ES');
            msgs.push({ ...data, id: doc.id, timestamp });
        });
        setMessages(msgs);
        setIsMessagesLoading(false);
    }, (error) => {
        console.error("Error fetching messages:", error);
        toast({ title: "Error de Chat", description: "No se pudieron cargar los mensajes de WhatsApp.", variant: "destructive" });
        setIsMessagesLoading(false);
    });
    
    return () => unsubscribeMessages();

  }, [client, toast]);


  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleStageChange = async (newStage: string) => {
    if (!client || !db) return;
    
    try {
        const docRef = doc(db, "prospects", client.id);
        await updateDoc(docRef, { 
            stage: newStage, 
            currentStage: newStage,
            updatedAt: Timestamp.now(),
        });
        toast({
          title: "Etapa del Cliente Actualizada",
          description: `Cliente ${client.name} movido a: ${clientPipelineStages.find(s => s.id === newStage)?.title || newStage}`,
        });
    } catch (error) {
        console.error("Error updating client stage:", error);
        toast({ title: "Error", description: "No se pudo actualizar la etapa del cliente en Firestore.", variant: "destructive" });
    }
  };
  
  const handleSendWhatsAppReply = async () => {
    if (!whatsAppReply.trim() || !client?.phoneNumber) return;

    if (!functions) {
      toast({ title: "Error de Configuración", description: "El servicio de funciones de Firebase no está disponible.", variant: "destructive" });
      return;
    }

    setIsSending(true);
    try {
        const sendWhatsAppMessage = httpsCallable(functions, 'sendWhatsAppMessage');
        await sendWhatsAppMessage({ 
            to: client.phoneNumber, 
            messageBody: whatsAppReply.trim() 
        });

        toast({
            title: "Mensaje Enviado",
            description: "Tu mensaje ha sido enviado exitosamente.",
        });
        setWhatsAppReply("");
    } catch (error: any) {
        console.error("Error sending message via callable function:", error);
        toast({
            title: "Error al Enviar Mensaje",
            description: error.message || "Ocurrió un error inesperado. Revisa la consola para más detalles.",
            variant: "destructive",
        });
    } finally {
        setIsSending(false);
    }
  };

  const handleRevertToProspect = async () => {
    if (!client || !db) return;

    if (!window.confirm(`¿Estás seguro que quieres revertir a "${client.name}" a un prospecto? Será movido a la bandeja de entrada.`)) {
        return;
    }

    try {
        const docRef = doc(db, "prospects", client.id);
        await updateDoc(docRef, {
            currentPipeline: 'inbox',
            currentStage: 'inbox_new',
            stage: 'inbox_new',
            conversionDate: deleteField(),
            updatedAt: Timestamp.now(),
        });
        toast({
            title: "Cliente Revertido",
            description: `${client.name} ha sido movido de vuelta a la bandeja de entrada de prospectos.`,
        });
        router.push('/leads');
    } catch (error) {
        console.error("Error reverting client to prospect:", error);
        toast({ title: "Error", description: "No se pudo revertir el cliente a prospecto.", variant: "destructive" });
    }
  };

  if (client === undefined) {
    return (
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
            <Loader2 className="h-10 w-10 animate-spin text-primary"/>
            <p className="ml-4 text-lg text-muted-foreground">Cargando detalles del cliente...</p>
        </div>
    );
  }

  if (client === null) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Alert variant="destructive" className="max-w-md">
          <ShadAlertTitle>Cliente No Encontrado</ShadAlertTitle>
          <ShadAlertDescription>El cliente con ID "{clientId}" no pudo ser encontrado en la base de datos.</ShadAlertDescription>
        </Alert>
        <Button onClick={() => router.push('/clients')} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Clientes
        </Button>
      </div>
    );
  }
  
  const getStageBadgeClass = (stageId: string | undefined) => {
    if (!stageId) return "bg-slate-500/20 text-slate-300 border-slate-500/30";
    if (stageId === "cliente_actual_adjunta_docs") return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    if (stageId === "aplicar") return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
    if (stageId === "sevis") return "bg-purple-500/20 text-purple-300 border-purple-500/30";
    if (stageId === "ds160") return "bg-indigo-500/20 text-indigo-300 border-indigo-500/30";
    if (stageId === "entrevista") return "bg-orange-500/20 text-orange-300 border-orange-500/30";
    if (stageId === "aprobado") return "bg-green-500/20 text-green-300 border-green-500/30";
    if (stageId === "rechazado") return "bg-red-500/20 text-red-300 border-red-500/30";
    return "bg-slate-500/20 text-slate-300 border-slate-500/30";
  };

  const currentStage = client.stage || client.currentStage;
  const currentStageTitle = clientPipelineStages.find(s => s.id === currentStage)?.title || currentStage || "Etapa Desconocida";

  const getMessageStatusIcon = (status?: 'sent' | 'delivered' | 'read' | 'received') => {
    if (status === 'read') return <CheckCheck className="h-4 w-4 text-blue-500" />;
    if (status === 'delivered') return <CheckCheck className="h-4 w-4 text-muted-foreground" />;
    if (status === 'sent') return <Check className="h-4 w-4 text-muted-foreground" />;
    return null;
  };

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => router.push('/clients')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Lista de Clientes
        </Button>
         <div className="flex gap-2">
            <Button variant="destructive" size="sm" onClick={handleRevertToProspect}>
              <RefreshCw className="mr-2 h-4 w-4" /> Revertir a Prospecto
            </Button>
            <Button variant="outline" disabled>
              <Edit className="mr-2 h-4 w-4" /> Editar Perfil (Próximamente)
            </Button>
        </div>
      </div>

      <Card className="shadow-lg bg-card text-card-foreground border-border">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="flex items-center gap-3">
                <UserCircle className="h-16 w-16 text-primary" />
                <div>
                    <CardTitle className="text-3xl text-foreground">{client.name}</CardTitle>
                    <CardDescription className="text-base text-muted-foreground">Cliente ID: {client.id} &bull; Asesor: {client.assignedAdvisor || 'N/A'}</CardDescription>
                    <p className="text-sm text-muted-foreground">Email: {client.email || 'N/A'} &bull; Tel: {client.phoneNumber || 'N/A'}</p>
                </div>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-2 w-full sm:w-auto">
                 <Select value={currentStage} onValueChange={handleStageChange}>
                    <SelectTrigger className="w-full sm:w-[300px] text-sm py-1 px-3 bg-card border-border focus:ring-primary">
                        <SelectValue placeholder="Seleccionar Etapa" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border text-popover-foreground">
                        {clientPipelineStages.map(stage => (
                        <SelectItem key={stage.id} value={stage.id} className="focus:bg-accent focus:text-accent-foreground">
                            {stage.title}
                        </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                 <Badge variant="secondary" className={`text-xs py-1 px-3 self-start sm:self-auto ${getStageBadgeClass(currentStage)}`}>
                    {currentStageTitle}
                </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
            <Tabs defaultValue="comunicaciones" className="w-full">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 mb-4 bg-muted/90 border-border">
                    <TabsTrigger value="comunicaciones" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Comms</TabsTrigger>
                    <TabsTrigger value="resumen" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Resumen</TabsTrigger>
                    <TabsTrigger value="admision" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" disabled>Admisión/I-20</TabsTrigger>
                    <TabsTrigger value="visa" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" disabled>Trámites Visa</TabsTrigger>
                    <TabsTrigger value="resultado_viaje" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" disabled>Resultado/Viaje</TabsTrigger>
                    <TabsTrigger value="pagos" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" disabled>Pagos</TabsTrigger>
                    <TabsTrigger value="documentos" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" disabled>Docs</TabsTrigger>
                </TabsList>

                <TabsContent value="resumen">
                    <Card className="bg-muted/30 border-border">
                        <CardHeader><CardTitle className="text-xl flex items-center"><Info className="mr-2 h-5 w-5 text-primary"/>Datos Personales y Formulario</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Nombre Completo</Label><Input id="fullName" defaultValue={client.name} className="bg-input" disabled/>
                                <Label htmlFor="dob">Fecha de Nacimiento</Label><Input id="dob" type="date" defaultValue={client.dob || ''} className="bg-input"/>
                                <Label htmlFor="nationality">Nacionalidad</Label><Input id="nationality" defaultValue={client.nationality || ''} className="bg-input"/>
                                <Label htmlFor="address">Dirección</Label><Textarea id="address" defaultValue={client.address || ''} className="bg-input" rows={3}/>
                                <Label htmlFor="academicHistory">Historial Académico</Label><Textarea id="academicHistory" defaultValue={client.academicHistory || ''} className="bg-input" rows={3}/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="travelHistory">Historial de Viajes</Label><Textarea id="travelHistory" defaultValue={client.travelHistory || ''} className="bg-input" rows={3}/>
                                <Label htmlFor="familyInfo">Info Familiar (Visa)</Label><Textarea id="familyInfo" defaultValue={client.familyInfoVisa || ''} className="bg-input" rows={3}/>
                                <h4 className="font-medium pt-2">Pasaporte</h4>
                                <Label htmlFor="passportNumber">Número</Label><Input id="passportNumber" defaultValue={client.passport?.number || ''} className="bg-input"/>
                                <Label htmlFor="passportCountry">País Emisor</Label><Input id="passportCountry" defaultValue={client.passport?.country || ''} className="bg-input"/>
                                <div className="grid grid-cols-2 gap-2">
                                    <div><Label htmlFor="passportIssue">Fecha Emisión</Label><Input id="passportIssue" type="date" defaultValue={client.passport?.issueDate || ''} className="bg-input"/></div>
                                    <div><Label htmlFor="passportExpiry">Fecha Vencimiento</Label><Input id="passportExpiry" type="date" defaultValue={client.passport?.expiryDate || ''} className="bg-input"/></div>
                                </div>
                                <Button variant="outline" size="sm" className="mt-1" disabled><UploadCloud className="mr-2 h-4 w-4"/>Adjuntar Pasaporte</Button>
                                <h4 className="font-medium pt-2">Formulario Detallado</h4>
                                <Button variant="outline" size="sm" className="mt-1" disabled><UploadCloud className="mr-2 h-4 w-4"/>Adjuntar Formulario</Button>
                            </div>
                        </CardContent>
                        <CardFooter><Button disabled>Guardar Cambios (Resumen)</Button></CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="comunicaciones">
                    <Card className="bg-muted/30 border-border">
                         <CardHeader>
                            <CardTitle className="text-xl flex items-center"><MessageSquare className="mr-2 h-5 w-5 text-primary"/>Historial de Comunicaciones</CardTitle>
                             <CardDescription className="text-xs text-muted-foreground mt-1">
                                Mensajes de WhatsApp leídos en tiempo real desde la subcolección `conversations/{'{phoneNumber}'}/messages` en Firestore.
                            </CardDescription>
                        </CardHeader>
                        <CardContent ref={chatContainerRef} className="p-4 space-y-3 max-h-96 overflow-y-auto scroll-smooth">
                            {isMessagesLoading ? (
                                <div className="flex justify-center items-center h-40">
                                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                                    <p className="ml-3 text-muted-foreground">Cargando mensajes...</p>
                                </div>
                            ) : messages.length > 0 ? messages.map((msg, index) => (
                                <div key={msg.id || index} className={`flex flex-col ${msg.from === 'agente' || msg.from === 'bot' ? 'items-end' : 'items-start'}`}>
                                    <div className={`max-w-[70%] p-3 rounded-lg shadow-md ${msg.from === 'agente' || msg.from === 'bot' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-secondary text-secondary-foreground rounded-bl-none'}`}>
                                        <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                    </div>
                                    <div className={`flex items-center gap-1 mt-1 ${msg.from === 'agente' || msg.from === 'bot' ? 'justify-end' : 'justify-start'}`}>
                                        <p className={`text-xs text-muted-foreground/80`}>{msg.timestamp}</p>
                                        {(msg.from === 'agente' || msg.from === 'bot') && getMessageStatusIcon(msg.status)}
                                    </div>
                                </div>
                            )) : <p className="text-xs text-muted-foreground text-center py-2">No hay mensajes de WhatsApp para este cliente.</p>}
                        </CardContent>
                        <CardFooter className="border-t border-border p-3">
                            <div className="flex w-full items-center gap-2">
                                <Textarea 
                                    placeholder="Escribe tu respuesta aquí..." 
                                    value={whatsAppReply} 
                                    onChange={(e) => setWhatsAppReply(e.target.value)} 
                                    rows={1} 
                                    className="bg-input flex-grow resize-none"
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendWhatsAppReply();
                                        }
                                    }}
                                    disabled={isSending}
                                />
                                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" disabled>
                                    <Paperclip className="h-5 w-5" />
                                    <span className="sr-only">Adjuntar archivo</span>
                                </Button>
                                <Button onClick={handleSendWhatsAppReply} className="bg-green-600 hover:bg-green-700 text-white" disabled={isSending || !whatsAppReply.trim()}>
                                    {isSending ? <Loader2 className="h-4 w-4 animate-spin"/> : <Send className="h-4 w-4" />}
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                    <Separator className="my-6 bg-border"/>
                    <div className="space-y-2">
                        <h4 className="font-medium">Notas Internas (Transferidas y Nuevas)</h4>
                        <Textarea 
                        defaultValue={client.internalNotes || "Aún no se han añadido notas internas."}
                        placeholder="Añadir notas internas aquí..."
                        rows={4}
                        className="bg-input border-border focus:ring-primary whitespace-pre-wrap"
                        />
                    </div>
                </TabsContent>
                {/* Other TabsContent remain the same for now, as they depend on fields not yet in the prospect doc */}
                 <TabsContent value="admision">
                    <Card className="bg-muted/30 border-border min-h-[300px] flex items-center justify-center">
                        <p className="text-muted-foreground">Funcionalidad de Admisión próximamente.</p>
                    </Card>
                </TabsContent>
                 <TabsContent value="visa">
                    <Card className="bg-muted/30 border-border min-h-[300px] flex items-center justify-center">
                       <p className="text-muted-foreground">Funcionalidad de Trámites de Visa próximamente.</p>
                    </Card>
                </TabsContent>
                 <TabsContent value="resultado_viaje">
                    <Card className="bg-muted/30 border-border min-h-[300px] flex items-center justify-center">
                       <p className="text-muted-foreground">Funcionalidad de Logística de Viaje próximamente.</p>
                    </Card>
                </TabsContent>
                 <TabsContent value="pagos">
                    <Card className="bg-muted/30 border-border min-h-[300px] flex items-center justify-center">
                       <p className="text-muted-foreground">Funcionalidad de Pagos próximamente.</p>
                    </Card>
                </TabsContent>
                 <TabsContent value="documentos">
                    <Card className="bg-muted/30 border-border min-h-[300px] flex items-center justify-center">
                       <p className="text-muted-foreground">Funcionalidad de Documentos próximamente.</p>
                    </Card>
                </TabsContent>
            </Tabs>

        </CardContent>
        <CardFooter className="border-t border-border pt-4 flex justify-between items-center">
            <p className="text-xs text-muted-foreground">
              Cliente desde: {typeof client.conversionDate === 'string' ? new Date(client.conversionDate).toLocaleDateString('es-ES') : 'N/A'}.
            </p>
            <Button disabled>Guardar Todos los Cambios</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

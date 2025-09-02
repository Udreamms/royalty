"use client";

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, MessageSquare, UserCheck, ExternalLink, Loader2, Save, UserCircle, Edit, BadgeDollarSign, Send, Check, CheckCheck, Mail as MailIcon, Phone as PhoneIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';
import { type Lead } from '@/lib/workflow.interface';
import { db, functions } from '@/lib/firebase';
import { httpsCallable } from 'firebase/functions';
import { doc, onSnapshot, updateDoc, collection, query, orderBy, Timestamp } from 'firebase/firestore';

export default function LeadDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    
    const [lead, setLead] = useState<Lead | null | undefined>(undefined);
    const [editableLead, setEditableLead] = useState<Partial<Lead> | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [userState, setUserState] = useState<any>(null);
    const [whatsAppReply, setWhatsAppReply] = useState("");

    const [isSending, setIsSending] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const leadId = params.id as string;

    useEffect(() => {
        if (!leadId) { setLead(null); return; }
        const unsubscribe = onSnapshot(doc(db, "prospects", leadId), (docSnap) => {
            if (docSnap.exists()) {
                const data = { id: docSnap.id, ...docSnap.data() } as Lead;
                setLead(data);
                setEditableLead(data);
            } else {
                setLead(null);
            }
        });
        return () => unsubscribe();
    }, [leadId]);

    useEffect(() => {
        if (!lead?.phoneNumber) return;
        const unsubscribe = onSnapshot(doc(db, "userStates", lead.phoneNumber), (docSnap) => {
            setUserState(docSnap.exists() ? docSnap.data() : null);
        });
        return () => unsubscribe();
    }, [lead]);

    useEffect(() => {
        if (!lead?.phoneNumber) { setMessages([]); return; }
        const q = query(collection(db, "conversations", lead.phoneNumber, "messages"), orderBy("timestamp"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
                timestamp: (doc.data().timestamp as Timestamp)?.toDate().toLocaleString('es-ES') || 'enviando...'
            }));
            setMessages(msgs);
        });
        return () => unsubscribe();
    }, [lead]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSaveChanges = async () => {
        if (!editableLead || !lead) return;
        setIsSaving(true);
        try {
            const leadRef = doc(db, "prospects", lead.id);
            const changes: Partial<Lead> = {};
            if (editableLead.name !== lead.name) changes.name = editableLead.name;
            if (editableLead.email !== lead.email) changes.email = editableLead.email;
            if (editableLead.internalNotes !== lead.internalNotes) changes.internalNotes = editableLead.internalNotes;
            
            if (Object.keys(changes).length > 0) {
                await updateDoc(leadRef, { ...changes, updatedAt: Timestamp.now() });
            }
            
            toast({ title: "Guardado", description: "Cambios guardados correctamente." });
            setIsEditing(false);
        } catch (error) {
            toast({ title: "Error", description: "No se pudieron guardar los cambios.", variant: "destructive" });
        } finally {
            setIsSaving(false);
        }
    };
    
    const handleConfirmPayment = async () => {
        if (!lead?.phoneNumber || !functions) return;
        setIsSaving(true);
        try {
            const triggerNextStep = httpsCallable(functions, 'triggerNextStepForProspect');
            await triggerNextStep({ phoneNumber: lead.phoneNumber });
            toast({ title: "Acción Ejecutada", description: "El bot ha sido notificado para continuar el flujo.", className: "bg-teal-600 text-white" });
        } catch (error) {
            toast({ title: "Error", description: "No se pudo notificar al bot.", variant: "destructive" });
        } finally {
            setIsSaving(false);
        }
    };
    
    const handleSendWhatsAppReply = async () => {
        if (!whatsAppReply.trim() || !lead?.phoneNumber || !functions) return;
        setIsSending(true);
        try {
            const sendManualMessage = httpsCallable(functions, 'sendManualWhatsAppMessage'); 
            await sendManualMessage({ to: lead.phoneNumber, message: whatsAppReply.trim() });
            setWhatsAppReply("");
        } catch (error) {
            toast({ title: "Error de envío", description: "No se pudo enviar el mensaje.", variant: "destructive" });
        } finally {
            setIsSending(false);
        }
    };

    const handleConvertToClient = async () => {
        if (!lead) return;
        await updateDoc(doc(db, "prospects", lead.id), { currentPipeline: "converted", updatedAt: Timestamp.now() });
        toast({ title: "¡Convertido!", description: `${lead.name} ahora es un cliente.` });
        router.push(`/clients/${lead.id}`);
    };

    if (lead === undefined) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    if (lead === null) {
        return <div className="text-center mt-10">Prospecto no encontrado o ID incorrecto.</div>;
    }
    
    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-6">
            <div className="flex justify-between items-center">
                <Button variant="outline" onClick={() => router.back()}><ArrowLeft className="mr-2 h-4 w-4" /> Volver</Button>
                <div className="flex gap-2">
                    {isEditing ? (
                        <>
                            <Button variant="ghost" onClick={() => { setIsEditing(false); setEditableLead(lead); }}>Cancelar</Button>
                            <Button onClick={handleSaveChanges} disabled={isSaving}>
                                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                Guardar
                            </Button>
                        </>
                    ) : (
                        <Button onClick={() => setIsEditing(true)}><Edit className="mr-2 h-4 w-4" /> Editar</Button>
                    )}
                </div>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <UserCircle className="h-12 w-12 text-gray-400"/>
                        <div>
                            <CardTitle className="text-2xl">{editableLead?.name || "Prospecto sin nombre"}</CardTitle>
                            {/* === ADICIÓN: Mostramos el teléfono y email claramente en la cabecera === */}
                            <CardDescription className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                                <span className="flex items-center gap-1.5"><PhoneIcon className="h-4 w-4" /> {lead.phoneNumber}</span>
                                <span className="flex items-center gap-1.5"><MailIcon className="h-4 w-4" /> {editableLead?.email || 'Sin email'}</span>
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    {userState?.botStatus === 'esperando_pago' && (
                        <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-lg">
                            <h4 className="font-bold text-yellow-800 dark:text-yellow-200">Acción Requerida</h4>
                            <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">Este prospecto está esperando la confirmación de pago para continuar.</p>
                            <Button onClick={handleConfirmPayment} className="bg-teal-600 hover:bg-teal-700 text-white" disabled={isSaving}>
                                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BadgeDollarSign className="mr-2 h-4 w-4" />}
                                Confirmar Pago y Continuar Bot
                            </Button>
                        </div>
                    )}

                    <Separator />

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="name">Nombre</Label>
                                <Input id="name" value={editableLead?.name || ''} onChange={(e) => setEditableLead(p => p ? {...p, name: e.target.value} : null)} disabled={!isEditing} />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" value={editableLead?.email || ''} onChange={(e) => setEditableLead(p => p ? {...p, email: e.target.value} : null)} disabled={!isEditing} />
                            </div>
                        </div>
                        <div className="space-y-4">
                             <div>
                                <Label htmlFor="internalNotes">Notas Internas</Label>
                                <Textarea id="internalNotes" value={editableLead?.internalNotes || ''} onChange={(e) => setEditableLead(p => p ? {...p, internalNotes: e.target.value} : null)} disabled={!isEditing} rows={5} />
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div>
                        <h3 className="text-lg font-semibold flex items-center mb-3">
                            <MessageSquare className="mr-2 h-5 w-5 text-green-500"/> Conversación
                        </h3>
                        <Card className="bg-muted/50 dark:bg-background">
                            <CardContent ref={chatContainerRef} className="p-4 space-y-4 max-h-96 overflow-y-auto">
                                {messages.length > 0 ? messages.map((msg) => (
                                    <div key={msg.id} className={`flex flex-col ${msg.from === 'bot' ? 'items-end' : 'items-start'}`}>
                                        <div className={`max-w-[75%] p-3 rounded-lg ${msg.from === 'bot' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-secondary text-secondary-foreground rounded-bl-none'}`}>
                                            <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <p className="text-xs text-muted-foreground">{msg.timestamp}</p>
                                            {msg.from === 'bot' && (
                                                msg.status === 'read' ? <CheckCheck className="h-4 w-4 text-blue-500" /> : <Check className="h-4 w-4 text-muted-foreground" />
                                            )}
                                        </div>
                                    </div>
                                )) : (
                                    <p className="text-sm text-muted-foreground text-center py-8">No hay mensajes en esta conversación.</p>
                                )}
                            </CardContent>
                             <CardFooter className="border-t p-2">
                                <div className="flex w-full items-center gap-2">
                                    <Textarea
                                        placeholder="Escribe una respuesta manual..."
                                        value={whatsAppReply}
                                        onChange={(e) => setWhatsAppReply(e.target.value)}
                                        rows={1}
                                        className="flex-grow resize-none"
                                        onKeyPress={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendWhatsAppReply(); }}}
                                        disabled={isSending}
                                    />
                                    <Button onClick={handleSendWhatsAppReply} disabled={isSending || !whatsAppReply.trim()}>
                                        {isSending ? <Loader2 className="h-4 w-4 animate-spin"/> : <Send className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </CardContent>

                <CardFooter className="border-t p-4 flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">
                        Última actualización: {lead.updatedAt ? new Date((lead.updatedAt as Timestamp).seconds * 1000).toLocaleString('es-ES') : 'N/A'}
                    </p>
                    
                    {lead.currentPipeline === "converted" ? (
                        <Button variant="outline" asChild>
                            <Link href={`/clients/${lead.id}`} legacyBehavior>
                                <span className="flex items-center">
                                    <ExternalLink className="mr-2 h-4 w-4"/> Ver Perfil de Cliente
                                </span>
                            </Link>
                        </Button>
                    ) : (
                        <Button onClick={handleConvertToClient}>
                            <UserCheck className="mr-2 h-4 w-4" /> Convertir a Cliente
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}

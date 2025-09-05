"use client";
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { UserCircle, Send, Loader2, Check, CheckCheck } from 'lucide-react';
import { db, functions } from '@/lib/firebase';
import { collection, query, onSnapshot, orderBy, Timestamp } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { useToast } from "@/hooks/use-toast";

export function OpportunityDetailView({ opportunity }: { opportunity: any }) {
    const { toast } = useToast();
    const [messages, setMessages] = useState<any[]>([]);
    const [replyMessage, setReplyMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!opportunity?.id) return;
        const q = query(collection(db, "conversations", opportunity.id, "messages"), orderBy("timestamp"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        });
        return () => unsubscribe();
    }, [opportunity?.id]);

    useEffect(() => {
        // Auto-scroll al final del chat
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!replyMessage.trim() || !opportunity?.id) return;
        setIsSending(true);
        try {
            const sendManualMessage = httpsCallable(functions, 'sendManualWhatsAppMessage');
            await sendManualMessage({ to: opportunity.id, message: replyMessage.trim() });
            setReplyMessage("");
            toast({ title: "Éxito", description: "Mensaje enviado." });
        } catch (error) {
            console.error("Error sending message:", error);
            toast({ title: "Error", description: "No se pudo enviar el mensaje.", variant: "destructive" });
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
            {/* Columna de Detalles */}
            <div className="md:col-span-1 flex flex-col gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><UserCircle className="h-6 w-6" /> Detalles del Contacto</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label>Nombre</Label>
                            <Input value={opportunity.name || ''} readOnly />
                        </div>
                        <div>
                            <Label>Teléfono</Label>
                            <Input value={opportunity.phoneNumber || ''} readOnly />
                        </div>
                         <div>
                            <Label>Etapa</Label>
                            <Input value={opportunity.currentStage || ''} readOnly />
                        </div>
                    </CardContent>
                </Card>
            </div>
            {/* Columna de Conversación */}
            <div className="md:col-span-2 flex flex-col h-full">
                <Card className="flex-grow flex flex-col">
                    <CardHeader>
                        <CardTitle>Conversación</CardTitle>
                    </CardHeader>
                    <Separator />
                    <CardContent ref={chatContainerRef} className="flex-grow p-4 space-y-4 overflow-y-auto">
                        {messages.map(msg => (
                            <div key={msg.id} className={`flex flex-col ${msg.direction === 'outbound' ? 'items-end' : 'items-start'}`}>
                                <div className={`max-w-[75%] p-3 rounded-lg ${msg.direction === 'outbound' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-secondary text-secondary-foreground rounded-bl-none'}`}>
                                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <p className="text-xs text-muted-foreground">{(msg.timestamp as Timestamp)?.toDate().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</p>
                                    {msg.direction === 'outbound' && (
                                        msg.status === 'read' ? <CheckCheck className="h-4 w-4 text-blue-500" /> : <Check className="h-4 w-4 text-muted-foreground" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                    <CardFooter className="border-t p-2">
                        <div className="flex w-full items-center gap-2">
                            <Textarea
                                placeholder="Escribe una respuesta..."
                                value={replyMessage}
                                onChange={(e) => setReplyMessage(e.target.value)}
                                rows={1}
                                className="flex-grow resize-none"
                                onKeyPress={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); }}}
                                disabled={isSending}
                            />
                            <Button onClick={handleSendMessage} disabled={isSending || !replyMessage.trim()}>
                                {isSending ? <Loader2 className="h-4 w-4 animate-spin"/> : <Send className="h-4 w-4" />}
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
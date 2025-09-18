"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2 } from "lucide-react";
import { db } from '@/lib/firebase-client';
import { collection, onSnapshot } from 'firebase/firestore';

export default function AutomationPage() {
    const [workflows, setWorkflows] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Renombra tu colección 'bots' a 'workflows' en Firestore
        const unsub = onSnapshot(collection(db, "workflows"), (snapshot) => {
            setWorkflows(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setIsLoading(false);
        });
        return () => unsub();
    }, []);

    if (isLoading) return <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>;

    return (
        <div className="flex flex-col h-full p-4 md:p-6 gap-6">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Automatización</h1>
                    <p className="text-muted-foreground mt-1">Crea flujos que trabajan por ti.</p>
                </div>
                <Button asChild>
                    {/* CORRECCIÓN: Se eliminó legacyBehavior */}
                    <Link href="/automation/new"><PlusCircle className="mr-2 h-4 w-4" />Crear Workflow</Link>
                </Button>
            </header>
            <Card>
                <CardHeader>
                    <CardTitle>Workflows</CardTitle>
                    <CardDescription>Administra tus automatizaciones.</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Aquí iría la tabla o lista de workflows */}
                    <ul>
                        {workflows.map(wf => (
                            <li key={wf.id} className="border-b p-2 hover:bg-muted">
                                 {/* CORRECCIÓN: Se eliminó legacyBehavior */}
                                <Link href={`/automation/${wf.id}`}>{wf.name || wf.id}</Link>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
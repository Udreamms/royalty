"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";

// --- Componente para el ícono de información (?) ---
const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground ml-1">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
);

// --- Componente para la ilustración del fantasma ---
const GhostIllustration = () => (
    <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
        <g opacity="0.8">
            {/* Sparkles */}
            <circle cx="120" cy="45" r="2" fill="#A5B4FC"/>
            <circle cx="130" cy="65" r="1.5" fill="#C7D2FE"/>
            <circle cx="115" cy="85" r="1" fill="#A5B4FC"/>
            <circle cx="40" cy="55" r="1.5" fill="#C7D2FE"/>
            <path d="M30 75 L35 70" stroke="#A5B4FC" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M125 100 L120 105" stroke="#C7D2FE" strokeWidth="1.5" strokeLinecap="round"/>

            {/* Ghost Body */}
            <path d="M45 120 C45 90, 50 60, 75 60 C100 60, 105 90, 105 120 L95 115 L85 120 L75 115 L65 120 L55 115 Z" fill="#F9FAFB" stroke="#E0E7FF" strokeWidth="2"/>
            
            {/* Ghost Hand */}
            <path d="M105 90 C115 90, 120 80, 120 70 C120 60, 110 65, 105 75 Z" fill="#F9FAFB" stroke="#E0E7FF" strokeWidth="2"/>
            
            {/* Eyes and Mouth */}
            <circle cx="70" cy="78" r="3" fill="#4F46E5"/>
            <circle cx="85" cy="78" r="3" fill="#4F46E5"/>
            
            {/* Boots */}
            <rect x="68" y="118" width="15" height="10" rx="3" fill="#4F46E5"/>
            <rect x="65" y="116" width="15" height="5" rx="2" fill="#F9FAFB" stroke="#4F46E5" strokeWidth="1.5"/>

            {/* "Boo!" Text */}
            <text x="95" y="55" fontFamily="monospace" fontSize="14" fill="#6366F1" transform="rotate(-15 100 50)">boo!</text>
        </g>
    </svg>
);

// --- Componente para la ilustración del gato (para el nuevo dashboard) ---
const CatIllustration = () => (
    <svg width="180" height="120" viewBox="0 0 180 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground/30 mb-4">
        <path d="M54.5 90.5C54.5 86.9101 51.5899 84 48 84C44.4101 84 41.5 86.9101 41.5 90.5C41.5 94.0899 44.4101 97 48 97C51.5899 97 54.5 94.0899 54.5 90.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M129.5 90.5C129.5 86.9101 126.59 84 123 84C119.41 84 116.5 86.9101 116.5 90.5C116.5 94.0899 119.41 97 123 97C126.59 97 129.5 94.0899 129.5 90.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M117.5 93.5H135.5V4.5H3.5V107.5H47.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="20" y="20" width="120" height="70" rx="4" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="2"/>
        <path d="M20 35h120M50 20v70M80 20v70M110 20v70" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4"/>
        <rect x="145" y="40" width="25" height="40" rx="4" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="2"/>
        <circle cx="157.5" cy="50" r="3" fill="currentColor"/>
        <rect x="152" y="60" width="10" height="10" rx="2" fill="hsl(var(--primary))"/>
    </svg>
);

// --- Vista para la lista de agentes ---
const AgentListView = () => (
    <Card>
        {/* Encabezado de la Tabla */}
        <CardHeader className="p-0">
            <div className="grid grid-cols-[auto,1fr,1fr,1fr,1fr] items-center gap-4 p-4 border-b">
                <Checkbox id="select-all-agents" />
                <div className="flex items-center text-sm font-medium text-muted-foreground">Agent Name</div>
                <div className="flex items-center text-sm font-medium text-muted-foreground">Direction <InfoIcon /></div>
                <div className="flex items-center text-sm font-medium text-muted-foreground">Phone Numbers/Number Pools <InfoIcon /></div>
                <div className="flex items-center text-sm font-medium text-muted-foreground">Last Updated <InfoIcon /></div>
            </div>
        </CardHeader>
        
        {/* Estado Vacío */}
        <CardContent>
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6">
                <GhostIllustration />
                <h3 className="text-xl font-semibold text-foreground mt-4">Its so lonely in here!</h3>
                <p className="text-muted-foreground text-sm mt-2 mb-6">
                    No agents in sight! Ready to create a fresh one?
                </p>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Create Agent
                </Button>
            </div>
        </CardContent>
    </Card>
);

// --- Vista para el Dashboard ---
const DashboardView = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <CatIllustration />
        <h3 className="text-xl font-semibold text-foreground mt-4">No Agent is Created</h3>
        <p className="text-muted-foreground text-sm mt-2 mb-6">
            No Agents have been created yet. Create an Agent to view Stats and Logs.
        </p>
        <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Agent
        </Button>
    </div>
);


export default function VoiceAiAgentsPage() {
    return (
        <div className="p-6 bg-background text-foreground min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">AI Agents</h1>
                    <p className="text-sm text-muted-foreground">Create and manage Voice Agents for your Business</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Create Agent
                </Button>
            </div>
            
            <Tabs defaultValue="agentList" className="w-full">
                <TabsList>
                    <TabsTrigger value="dashboard">Dashboard & Logs</TabsTrigger>
                    <TabsTrigger value="agentList">Agent List</TabsTrigger>
                </TabsList>
                <TabsContent value="dashboard" className="mt-6">
                   <DashboardView />
                </TabsContent>
                <TabsContent value="agentList" className="mt-6">
                    <AgentListView />
                </TabsContent>
            </Tabs>
        </div>
    );
}

//listo
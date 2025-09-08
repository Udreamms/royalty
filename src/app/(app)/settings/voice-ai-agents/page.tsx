"use client";

import React, { useState, useEffect } from "react";

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


export default function VoiceAiAgentsPage() {
    // Estado para manejar la pestaña activa
    const [activeTab, setActiveTab] = useState("agentList");

    return (
        <div className="p-6 bg-background text-foreground min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">AI Agents</h1>
                    <p className="text-sm text-muted-foreground">Create and manage Voice Agents for your Business</p>
                </div>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Create Agent
                </button>
            </div>
            
            {/* Navegación de Pestañas */}
            <div className="flex space-x-6 border-b border-border mb-6">
                <button 
                    onClick={() => setActiveTab("dashboard")}
                    className={`pb-2 text-sm font-medium ${activeTab === 'dashboard' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    Dashboard & Logs
                </button>
                <button 
                    onClick={() => setActiveTab("agentList")}
                    className={`pb-2 text-sm font-medium ${activeTab === 'agentList' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    Agent List
                </button>
            </div>

            {/* Contenido Condicional de las Pestañas */}
            {activeTab === 'dashboard' && (
                <div className="text-center p-10">
                    <h2 className="text-xl font-semibold">Dashboard & Logs</h2>
                    <p className="text-muted-foreground">El contenido del dashboard irá aquí.</p>
                </div>
            )}

            {activeTab === 'agentList' && (
                <div className="bg-card rounded-lg shadow-sm border border-border">
                    {/* Encabezado de la Tabla */}
                    <div className="grid grid-cols-[auto,1fr,1fr,1fr,1fr] items-center gap-4 p-4 border-b border-border">
                        <input type="checkbox" className="form-checkbox h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                        <div className="flex items-center text-sm font-medium text-muted-foreground">Agent Name</div>
                        <div className="flex items-center text-sm font-medium text-muted-foreground">Direction <InfoIcon /></div>
                        <div className="flex items-center text-sm font-medium text-muted-foreground">Phone Numbers/Number Pools <InfoIcon /></div>
                        <div className="flex items-center text-sm font-medium text-muted-foreground">Last Updated <InfoIcon /></div>
                    </div>
                    
                    {/* Estado Vacío */}
                    <div className="flex flex-col items-center justify-center h-[60vh] text-center p-6">
                        <GhostIllustration />
                        <h3 className="text-xl font-semibold text-foreground mt-4">Its so lonely in here!</h3>
                        <p className="text-muted-foreground text-sm mt-2 mb-6">
                            No agents in sight! Ready to create a fresh one?
                        </p>
                        <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center gap-2 font-semibold">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            Create Agent
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
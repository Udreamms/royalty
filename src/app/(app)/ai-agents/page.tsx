"use client";

import React, { useState } from 'react';

// Importaciones de Componentes de shadcn/ui
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription_shadcn, AlertTitle } from "@/components/ui/alert";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from '@/components/ui/input';
import Link from 'next/link';

// Importaciones de Íconos de lucide-react (lista completa y ordenada)
import { 
    Activity,
    AudioLines, 
    Calendar,
    ChevronDown,
    Database,
    DollarSign,
    FileX,
    Ghost, 
    GraduationCap,
    Info, 
    Link as LinkIcon, 
    MessageCircle,
    MessageSquare, 
    Mic, 
    MoreHorizontal,
    Plus, 
    PlusCircle, 
    RadioTower,
    Search,
    Type,
    Zap
} from 'lucide-react';

// --- VISTA PARA "GETTING STARTED" (Sub-componente) ---
const GettingStartedView = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => {
    const sideNavItems = [
        { name: 'Voice AI', icon: Mic },
        { name: 'Conversation AI', icon: MessageSquare },
    ];

    // Pasos para Voice AI
    const voiceAiSteps = [
        { icon: PlusCircle, title: 'Create Your First Voice AI Agent', description: 'Spin up a new Voice AI agent in just a few clicks. Configure its name, greeting, and basic conversation flow to begin harnessing voice-based interactions ', shortcutTo: 'Voice AI' },
        { icon: AudioLines, title: 'Test & Talk to Your Voice AI Agent', description: "Engage in a quick test call..." },
        { icon: LinkIcon, title: 'Assign a Phone Number & Go Live', description: 'Link a dedicated phone number...' },
    ];

    // Pasos para Conversation AI (NUEVO)
    const conversationAiSteps = [
        { icon: PlusCircle, title: 'Create Your First Conversation AI Agent', description: 'Set up a new Chatbot agent to handle text conversations. Give it a personality and basic instructions to ensure consistent, on-brand responses.' },
        { icon: MessageCircle, title: 'Talk to Your Conversation AI Agent', description: 'Initiate a test chat session to see how your Conversation AI agent handles typical queries. Adjust its responses or flows as you see fit.' },
        { icon: GraduationCap, title: 'Train Your Conversation AI Agent', description: 'Refine your agent’s knowledge base and conversation parameters. Provide FAQs, brand guidelines, or instructions so it can handle customer requests more accurately.' },
        { icon: Calendar, title: 'Book an Appointment with your Conversation AI Agent', description: 'Add a calendar to the bot and give it the ability to directly book appointments for your contacts while talking to them.' },
        { icon: Zap, title: 'Enable Auto-Pilot for All Chats', description: 'Turn on your Conversation AI agent for real-time, hands-free support. Let it respond to customer chats automatically—freeing you and your team to focus on other tasks.' },
    ];
    
    const [activeSubTab, setActiveSubTab] = useState('Voice AI');

    return (
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Getting Started</h3>
                <nav className="flex flex-col gap-1">
                    {sideNavItems.map((item) => {
                        const Icon = item.icon;
                        return (
                        <Button
                            key={item.name}
                            variant="ghost"
                            onClick={() => setActiveSubTab(item.name)}
                            className={`w-full justify-start text-left h-auto py-2 px-3 ${
                                activeSubTab === item.name ? 'bg-muted font-semibold' : ''
                            }`}
                        >
                            <Icon className="w-5 h-5 mr-3" />
                            <span>{item.name}</span>
                        </Button>
                        );
                     })}
                </nav>
            </aside>
        <section className="lg:col-span-3">
            <Card>
                <CardContent className="p-6">
                    <p className="mb-6 text-muted-foreground">Hey Udreamms, here are few things you can get started with</p>
                    
                    {activeSubTab === 'Voice AI' && (
                        <Accordion type="single" collapsible className="w-full">
                            {voiceAiSteps.map((step) => {
                                const Icon = step.icon;
                                // --- LÓGICA DE CAMBIO EMPIEZA AQUÍ ---
                                const isFirstStep = step.title.includes('Create Your First Voice AI Agent');

                                return (
                                    <AccordionItem value={step.title} key={step.title}>
                                        <AccordionTrigger className="font-semibold hover:no-underline text-left">
                                            <div className="flex items-center gap-3">
                                                <Icon className="h-5 w-5 text-muted-foreground" />
                                                {isFirstStep ? (
                                                    // Envolvemos el título en un botón para hacerlo clickeable
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation(); // ¡Esto evita que el acordeón se abra/cierre!
                                                            setActiveTab('Voice AI');
                                                        }}
                                                        className="text-primary hover:underline text-left"
                                                    >
                                                        {step.title}
                                                    </button>
                                                ) : (
                                                    // Los demás títulos se quedan como estaban
                                                    <span>{step.title}</span>
                                                )}
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="pl-10">{step.description}</AccordionContent>
                                    </AccordionItem>
                                    );
                                })}
                            </Accordion>
                        )}
                        
                        {activeSubTab === 'Conversation AI' && (
    <Accordion type="single" collapsible className="w-full">
        {conversationAiSteps.map((step) => {
            const Icon = step.icon;
            // Condición para identificar el primer paso
            const isFirstStep = step.title.includes('Create Your First Conversation AI Agent');

            return (
                <AccordionItem value={step.title} key={step.title}>
                    <AccordionTrigger className="font-semibold hover:no-underline text-left">
                        <div className="flex items-center gap-3">
                            <Icon className="h-5 w-5 text-muted-foreground" />
                            {isFirstStep ? (
                                // El título se convierte en un botón con acceso directo
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Evita que el acordeón se active
                                        setActiveTab('Conversation AI');
                                    }}
                                    className="text-primary hover:underline text-left"
                                >
                                    {step.title}
                                </button>
                            ) : (
                                // Los demás títulos no cambian
                                <span>{step.title}</span>
                            )}
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-10">{step.description}</AccordionContent>
                </AccordionItem>
            );
        })}
    </Accordion>
)}

                    </CardContent>
                </Card>
            </section>
        </main>
    );
};

// --- VISTA PARA "AGENT LIST" (Sub-componente) ---
const AgentListView = () => {
    const tableHeaders = ["Agent Name", "Direction", "Phone Numbers/Number Pools", "Last Updated"];
    
    return (
        <div className="border rounded-lg mt-4 bg-background">
            {/* Encabezado de la tabla */}
            <div className="flex items-center p-4 border-b text-sm font-semibold text-muted-foreground">
                <Checkbox id="select-all-agents" className="mr-4" />
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                    {tableHeaders.map((header, index) => (
                        <div key={header} className={`flex items-center gap-1 ${index === 0 ? 'col-span-1' : ''}`}>
                            <span>{header}</span>
                            {index > 0 && <Info className="h-4 w-4" />}
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Estado Vacío */}
            <div className="flex flex-col items-center justify-center text-center py-24 px-6">
                <div className="mb-6">
                    <Ghost className="h-20 w-20 text-blue-400 animate-pulse" />
                </div>
                <h3 className="text-xl font-semibold">Its so lonely in here!</h3>
                <p className="text-muted-foreground mt-2 max-w-xs">
                    No agents in sight! Ready to create a fresh one?
                </p>
                <Button className="mt-6">
                    <Plus className="mr-2 h-4 w-4" /> Create Agent
                </Button>
            </div>
        </div>
    );
};

// --- VISTA PARA "VOICE AI" (Sub-componente) ---
const VoiceAiView = () => {
    const [activeView, setActiveView] = useState('Dashboard & Logs');

    return (
        <main className="mt-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold">AI Agents</h2>
                    <p className="text-muted-foreground">Create and manage Voice Agents for your Business</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Create Agent
                </Button>
            </div>

            <div className="border-b">
                <Button 
                    variant="ghost" 
                    onClick={() => setActiveView('Dashboard & Logs')}
                    className={`rounded-none border-b-2 font-semibold ${activeView === 'Dashboard & Logs' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}
                >
                    Dashboard & Logs
                </Button>
                <Button 
                    variant="ghost" 
                    onClick={() => setActiveView('Agent List')}
                    className={`rounded-none border-b-2 font-semibold ${activeView === 'Agent List' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}
                >
                    Agent List
                </Button>
            </div>

            {/* --- Contenido Condicional --- */}
            {activeView === 'Dashboard & Logs' && (
                <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-muted/30 rounded-lg">
                    <div className="w-48 h-36 bg-gray-200 dark:bg-gray-800 rounded-md flex items-center justify-center mb-6">
                        <p className="text-sm text-muted-foreground">Illustration Placeholder</p>
                    </div>
                    <h3 className="text-xl font-semibold">No Agent is Created</h3>
                    <p className="text-muted-foreground mt-2 max-w-sm">
                        No Agents have been created yet. Create an Agent to view Stats and Logs.
                    </p>
                    <Button className="mt-6">
                        <Plus className="mr-2 h-4 w-4" /> Create Agent
                    </Button>
                </div>
            )}

            {activeView === 'Agent List' && (
                <AgentListView />
            )}
        </main>
    );
};

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType; 
}

// 2. Aplicamos la interfaz a las props del componente
const MetricCard = ({ title, value, icon: Icon }: MetricCardProps) => (
    <Card>
        <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-muted p-3 rounded-full">
                <Icon className="h-6 w-6 text-primary" />
            </div>
            <div>
                <p className="text-sm text-muted-foreground">{title}</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </CardContent>
    </Card>
);

// --- VISTA PARA "CONTENT AI" ---
const ContentAiView = () => {
    const [activeContentTab, setActiveContentTab] = useState('Text');
    const [activeFilterTab, setActiveFilterTab] = useState('All');

    const metrics = [
        { title: "Total words generated", value: "0", icon: Type },
        { title: "Cost", value: "0", icon: DollarSign },
        { title: "Words/day", value: "0", icon: Activity },
    ];

    const filterTabs = ["All", "Social Planner", "Blog", "Funnel", "Website", "Email", "Conversation"];
    const tableHeaders = ["Content", "Date", "Variation Count", "Transaction ID", "Total Words Count", "Type", "Action"];

    return (
        <main className="mt-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold">Content AI</h2>
                    <p className="text-muted-foreground">Manage your AI generated content</p>
                </div>
                <Button variant="outline" className="text-primary border-primary hover:bg-primary/10 hover:text-primary">
                    <Zap className="mr-2 h-4 w-4 text-purple-500" /> Upgrade to unlimited AI Employee plan →
                </Button>
            </div>

            <div className="border-b">
                <Button 
                    variant="ghost"
                    onClick={() => setActiveContentTab('Text')}
                    className={`rounded-none border-b-2 font-semibold ${activeContentTab === 'Text' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}
                >
                    Text
                </Button>
                <Button 
                    variant="ghost"
                    onClick={() => setActiveContentTab('Image')}
                    className={`rounded-none border-b-2 font-semibold ${activeContentTab === 'Image' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}
                >
                    Image
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {metrics.map(metric => <MetricCard key={metric.title} {...metric} />)}
            </div>

            <Card>
                <CardContent className="p-6 space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                        {filterTabs.map(tab => (
                            <Button 
                                key={tab} 
                                variant={activeFilterTab === tab ? 'default' : 'outline'}
                                onClick={() => setActiveFilterTab(tab)}
                            >
                                {tab}
                            </Button>
                        ))}
                    </div>
                    <div className="border rounded-lg">
                        <div className="hidden md:flex items-center p-4 bg-muted/50 text-sm font-semibold text-muted-foreground border-b">
                            <div className="grid grid-cols-7 gap-4 w-full">
                                {tableHeaders.map(header => <div key={header}>{header}</div>)}
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center py-20">
                            <FileX className="h-12 w-12 text-muted-foreground mb-4" />
                            <p className="text-muted-foreground font-semibold">No Data</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
};

// --- VISTA PARA "KNOWLEDGE BASE" ---
const KnowledgeBaseView = () => {
    return (
        <main className="mt-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold">Knowledge Base</h2>
                    <p className="text-muted-foreground">Create And Manage Multiple Knowledge Bases For Your Business</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Create Knowledge Base
                </Button>
            </div>

            <Alert>
    <Info className="h-4 w-4" />
    <AlertTitle className="font-semibold">Important</AlertTitle>
    <AlertDescription_shadcn> {/* <-- CAMBIO AQUÍ */}
        Welcome to our new AI Knowledge Base experience! Need help getting started? <a href="#" className="text-primary underline font-medium">Check out this quick guide</a>.
    </AlertDescription_shadcn> {/* <-- Y AQUÍ */}
</Alert>

            <div className="flex justify-end">
                <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search Knowledge Base" className="pl-10" />
                </div>
            </div>

            <div className="border rounded-lg bg-background">
                {/* Encabezado de la lista */}
                <div className="flex items-center p-4 text-sm font-medium text-muted-foreground border-b">
                    <div className="flex-1">Name</div>
                    <div className="flex-1 flex items-center gap-1">Created at <Info className="h-4 w-4" /></div>
                    <div className="w-10"></div> {/* Espacio para el botón de acciones */}
                </div>

                {/* Cuerpo de la lista (con datos de ejemplo) */}
                <div className="divide-y">
                    <div className="flex items-center p-4 hover:bg-muted/50">
                        <div className="flex-1 flex items-center gap-1 text-sm font-medium text-foreground">
                            Existing knowledge base <Info className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 text-sm text-muted-foreground">
                            <p className="font-semibold text-foreground">28 Aug 2025</p>
                            <p>7:46 PM</p>
                        </div>
                        <div className="w-10">
                           <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                        </div>
                    </div>
                </div>
                
                {/* Pie de la lista / Paginación */}
                <div className="flex items-center justify-between p-4 border-t text-sm text-muted-foreground">
                    <div>
                        <p className="font-semibold"> Showing 1 to 1 of 1 results</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" disabled>Previous</Button>
                        <Button variant="default" size="sm">1</Button>
                        <Button variant="outline" size="sm" disabled>Next</Button>
                    </div>
                </div>
            </div>
        </main>
    );
};

// --- VISTA PARA LA LISTA DE AGENTES DE CONVERSACIÓN ---
const ConversationAiAgentsList = () => {
    const tableHeaders = ["Agent Name", "Status", "Supported Channels", "Last Updated"];

    return (
        <div className="space-y-4 mt-6">
            <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle className="font-semibold">Important</AlertTitle>
                <AlertDescription_shadcn>
    Only the primary agent will reply to inbound messages. Make sure your preferred channels are assigned to the primary agent to handle inbound messages.
</AlertDescription_shadcn>
            </Alert>
            <div className="flex justify-end">
                <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search Agent" className="pl-10" />
                </div>
            </div>
            <div className="border rounded-lg bg-background">
                <div className="flex items-center p-4 border-b text-sm font-semibold text-muted-foreground">
                    <Checkbox id="select-all-conv-agents" className="mr-4" />
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                        {tableHeaders.map((header, index) => (
                            <div key={header} className="flex items-center gap-1">
                                <span>{header}</span>
                                <Info className="h-4 w-4" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center text-center py-24 px-6">
                    <div className="w-48 h-36 bg-gray-200 dark:bg-gray-800 rounded-md flex items-center justify-center mb-6">
                        <p className="text-sm text-muted-foreground">Illustration Placeholder</p>
                    </div>
                    <h3 className="text-xl font-semibold">Welcome to Conversation AI!</h3>
                    <p className="text-muted-foreground mt-2 max-w-md">
                        Let your Bot take care of the mundane tasks, while you focus on building your Business!
                    </p>
                    <Button className="mt-6">
                        Create Agent <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

// --- VISTA PARA EL DASHBOARD DE CONVERSACIÓN ---
const ConversationAiDashboard = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center py-24 px-6 bg-muted/30 rounded-lg mt-6">
            <div className="w-48 h-36 bg-gray-200 dark:bg-gray-800 rounded-md flex items-center justify-center mb-6">
                <p className="text-sm text-muted-foreground">Illustration Placeholder</p>
            </div>
            <h3 className="text-xl font-semibold">No Agent is Live</h3>
            <p className="text-muted-foreground mt-2 max-w-sm">
                Make sure your Conversation AI Agents are live so they can start interacting with users
            </p>
            <Button className="mt-6">Go to Agent List</Button>
        </div>
    );
};

// --- VISTA PRINCIPAL PARA "CONVERSATION AI" ---
const ConversationAiView = () => {
    const [activeConvAiTab, setActiveConvAiTab] = useState('Agents List');

    return (
        <main className="mt-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                <div>
                    <h2 className="text-2xl font-bold">Conversation AI Agents</h2>
                    <p className="text-muted-foreground">Create And Manage Multiple Agents For Your Business</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <Database className="mr-2 h-4 w-4" /> Manage Knowledge Base
                    </Button>
                    <Button>
                        Create Agent <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="border-b">
                <Button 
                    variant="ghost" 
                    onClick={() => setActiveConvAiTab('Agents List')}
                    className={`rounded-none border-b-2 font-semibold ${activeConvAiTab === 'Agents List' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}
                >
                    Agents List
                </Button>
                <Button 
                    variant="ghost" 
                    onClick={() => setActiveConvAiTab('Dashboard')}
                    className={`rounded-none border-b-2 font-semibold ${activeConvAiTab === 'Dashboard' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}
                >
                    Dashboard
                </Button>
            </div>

            {activeConvAiTab === 'Agents List' && <ConversationAiAgentsList />}
            {activeConvAiTab === 'Dashboard' && <ConversationAiDashboard />}
        </main>
    );
};

// --- COMPONENTE PRINCIPAL DE LA PÁGINA (CON EXPORT DEFAULT) ---
export default function AiAgentsPage() {
    const [activeTab, setActiveTab] = useState('Getting Started');
    const mainNavItems = [
    { name: 'Getting Started', href: null },
    { name: 'Voice AI', href: null },
    { name: 'Conversation AI', href: null },
    { name: 'Knowledge Base', href: null },
    { name: 'Agent Templates', href: '/app-marketplace' }, // <-- CAMBIO AQUÍ
    { name: 'Content AI', href: null },
];
    const renderContent = () => {
        switch(activeTab) {
            case 'Getting Started':
            return <GettingStartedView setActiveTab={setActiveTab} />;
            case 'Voice AI':
                return <VoiceAiView />;
            case 'Conversation AI': // <-- AÑADE ESTE CASE
                return <ConversationAiView />;
            case 'Content AI':
                return <ContentAiView />;
            case 'Knowledge Base':
                return <KnowledgeBaseView />;
            default:
                return (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-semibold">{activeTab}</h2>
                        <p className="text-muted-foreground">Content for this section is under construction.</p>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="p-6 sm:p-8">
                <header className="border-b">
                    <h1 className="text-2xl font-bold">AI Agents</h1>
                    <nav className="mt-4 -mb-px">
                        <ul className="flex items-center gap-1 sm:gap-2 overflow-x-auto">
    {mainNavItems.map((item) => (
        <li key={item.name}>
            {item.href ? (
                // Si el ítem tiene un 'href', se crea un Link
                <Link href={item.href}>
                    <Button
                        variant="ghost"
                        className="rounded-none border-b-2 border-transparent text-muted-foreground hover:text-foreground h-auto py-2 px-3 text-sm font-medium whitespace-nowrap"
                    >
                        {item.name}
                    </Button>
                </Link>
            ) : (
                // Si no, se crea el botón que cambia de pestaña
                <Button
                    variant="ghost"
                    onClick={() => setActiveTab(item.name)}
                    className={`rounded-none border-b-2 h-auto py-2 px-3 text-sm font-medium whitespace-nowrap ${
                        activeTab === item.name
                            ? 'border-primary text-primary'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                >
                    {item.name}
                </Button>
            )}
        </li>
    ))}
</ul>
                    </nav>
                </header>

                <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-800 text-white rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-4xl flex-shrink-0">
                           <span role="img" aria-label="Agent Icon">😎</span>
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold">Build Your AI Agents and Compete for $50k</h2>
                            <p className="text-blue-200 text-sm">Start building your Agents <span className="font-bold text-white">Now</span></p>
                            <p className="text-xs text-blue-300 mt-1">(Only visible to Agency Admins)</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4 w-full sm:w-auto flex-shrink-0">
                        <div className="text-center">
                            <span className="text-xs font-semibold tracking-wider text-blue-200">CONTEST ENDS IN</span>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="bg-white/20 p-2 rounded-md text-center w-14"><span className="text-xl font-bold">13</span><span className="text-xs block -mt-1">d</span></div>
                                <div className="bg-white/20 p-2 rounded-md text-center w-14"><span className="text-xl font-bold">03</span><span className="text-xs block -mt-1">h</span></div>
                                <div className="bg-white/20 p-2 rounded-md text-center w-14"><span className="text-xl font-bold">16</span><span className="text-xs block -mt-1">m</span></div>
                                <div className="bg-white/20 p-2 rounded-md text-center w-14"><span className="text-xl font-bold">44</span><span className="text-xs block -mt-1">s</span></div>
                            </div>
                        </div>
                         <div className="flex items-center gap-2 w-full">
                            <Button variant="outline" className="w-1/2 text-white border-white/50 hover:bg-white/10 hover:text-white">
                                <RadioTower className="w-4 h-4 mr-2" /> Live Help
                            </Button>
                            <Button className="w-1/2 bg-white text-blue-700 font-semibold hover:bg-blue-50">
                                View Leaderboard
                            </Button>
                        </div>
                    </div>
                </div>
                
                {renderContent()}

            </div>
        </div>
    );
}


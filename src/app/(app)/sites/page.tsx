"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Settings,
    ChevronDown,
    Plus,
    FolderPlus,
    History,
    List,
    Search,
    Phone,
    Presentation,
    FileText,
    LayoutList,
    Users,
    Info,
    RefreshCw, 
    Database, 
    Shield,
    Copy,     
    Link as LinkIcon, 
    UserPlus,  
    Send,
    Palette,   
    Globe,      
    Link2,       
    Languages,    
    Mail,        
    Apple,       
    Smartphone,
    MessageSquare,
    CheckCircle, 
    Flame 
} from 'lucide-react';
import Image from 'next/image';



// --- Icono simple para WordPress ---
const WordPressIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.332 9.475l-1.112-3.447-2.732 8.394 1.142-3.511 2.702-2.436zm-5.114 2.85l-1.32-4.04h-.03l-1.32 4.04h-1.62l2.12-6.52h2.01l2.16 6.52h-1.99v.03zm-5.16-5.265l3.54 8.71-1.14-3.48-2.4-5.23zM12 3.5c4.687 0 8.5 3.813 8.5 8.5s-3.813 8.5-8.5 8.5-8.5-3.813-8.5-8.5S7.313 3.5 12 3.5z"/>
    </svg>
);


// --- Componente REUTILIZABLE para las vistas de Funnels, Websites, etc. ---
const SiteSectionView = ({ 
    title, 
    subtitle, 
    mainActionText, 
    searchPlaceholder, 
    emptyStateTitle, 
    emptyStateSubtitle,
    emptyStateIcon
}: { 
    title: string; 
    subtitle: string; 
    mainActionText: string; 
    searchPlaceholder: string; 
    emptyStateTitle: string; 
    emptyStateSubtitle: string;
    emptyStateIcon?: React.ReactNode;
}) => {
    return (
        <div className="flex flex-col h-full gap-6">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">{title}</h1>
                    <p className="text-muted-foreground mt-1">{subtitle}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <FolderPlus className="mr-2 h-4 w-4" /> Create Folder
                    </Button>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> {mainActionText}
                    </Button>
                </div>
            </header>

            <div className="flex justify-end items-center gap-2">
                <Button variant="outline" size="icon"><History className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon"><List className="h-4 w-4" /></Button>
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder={searchPlaceholder} className="pl-10" />
                </div>
            </div>

            <div className="border rounded-lg flex-grow flex flex-col">
                <div className="p-4 border-b">
                    <p className="text-xs text-muted-foreground">Home</p>
                    <div className="flex justify-between font-semibold text-sm mt-2">
                        <span>Name</span>
                        <span>Last Updated</span>
                    </div>
                </div>
                <div className="flex-grow flex flex-col items-center justify-center text-center p-8">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        {emptyStateIcon || <Search className="h-8 w-8 text-primary"/>}
                    </div>
                    <h3 className="text-xl font-semibold">{emptyStateTitle}</h3>
                    <p className="text-muted-foreground max-w-md mt-2">
                        {emptyStateSubtitle}
                    </p>
                    <Button className="mt-6">
                        <Plus className="mr-2 h-4 w-4" /> {mainActionText}
                    </Button>
                </div>
            </div>
        </div>
    );
};

// --- Vista para "Stores" ---
const StoresView = () => {
    return (
        <div className="flex flex-col h-full gap-6">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Stores</h1>
                    <p className="text-muted-foreground mt-1">
                        Build an online store to showcase your products and sell across the globe. 
                        <a href="#" className="text-primary font-semibold ml-1">Learn more</a>
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">Complete Store Setup</Button>
                    <Button variant="outline"><FolderPlus className="mr-2 h-4 w-4" /> Create Folder</Button>
                    <Button><Plus className="mr-2 h-4 w-4" /> New Store</Button>
                </div>
            </header>
            <div className="flex justify-end items-center gap-2">
                 <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white"><Phone className="mr-2 h-4 w-4" /> Book a call</Button>
                <Button variant="outline" size="icon"><History className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon"><List className="h-4 w-4" /></Button>
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search for Stores" className="pl-10" />
                </div>
            </div>
            <div className="border rounded-lg flex-grow flex flex-col">
                <div className="p-4 border-b">
                    <p className="text-xs text-muted-foreground">Home</p>
                    <div className="flex justify-between font-semibold text-sm mt-2"><span>Name</span><span>Last Updated</span></div>
                </div>
                <div className="flex-grow flex flex-col items-center justify-center text-center p-8">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4"><Search className="h-8 w-8 text-primary"/></div>
                    <h3 className="text-xl font-semibold">Start by creating a store</h3>
                    <p className="text-muted-foreground max-w-xs mt-2">All your stores and folders will live here. Start by creating your first store.</p>
                    <Button className="mt-6"><Plus className="mr-2 h-4 w-4" /> New Store</Button>
                </div>
            </div>
        </div>
    );
};

// --- Vista para "Analytics" ---
const AnalyticsView = () => {
    const KpiCard = ({ title, value }: { title: string, value: string }) => (
        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">{title}</p><p className="text-3xl font-bold">{value}</p></CardContent></Card>
    );
    return (
        <div className="space-y-6">
            <header className="space-y-4">
                <div><h1 className="text-3xl font-bold">Analytics</h1><p className="text-muted-foreground mt-1">Effortlessly track and analyze key metrics with our sites analytics tool</p></div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2"><Select defaultValue="funnels"><SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="funnels">Funnels</SelectItem></SelectContent></Select><Select defaultValue="all"><SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem></SelectContent></Select></div>
                    <div className="flex items-center gap-2"><Button variant="outline" size="icon"><History className="h-4 w-4" /></Button><div className="flex items-center gap-2 border rounded-md px-3 py-1.5 text-sm"><span>2025-09-04</span><span>→</span><span>2025-09-18</span></div></div>
                </div>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"><KpiCard title="Page views" value="0" /><KpiCard title="Opt-ins" value="0" /><KpiCard title="Sales" value="$ 0" /><KpiCard title="Opt-in conversion rate" value="0 %" /></div>
            <Card><CardContent className="p-6"><h3 className="font-semibold">Page views</h3><p className="text-sm text-muted-foreground">Sep 4, 2025 - Sep 18, 2025</p><div className="h-80 mt-4 bg-muted/50 rounded-md flex items-center justify-center"><p className="text-muted-foreground">Line Chart Placeholder</p></div></CardContent></Card>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2"><CardContent className="p-6"><div className="flex justify-between items-start"><div><h3 className="font-semibold flex items-center gap-1">Top visits by country <Info className="h-4 w-4"/></h3></div><div><h3 className="font-semibold">Countries</h3><p className="text-sm text-muted-foreground">Total number of visitors: 0</p></div></div><div className="h-80 mt-4 bg-muted/50 rounded-md flex items-center justify-center"><p className="text-muted-foreground">World Map Placeholder</p></div></CardContent></Card>
                <Card><CardContent className="p-6"><h3 className="font-semibold flex items-center gap-1">Traffic by device type <Info className="h-4 w-4"/></h3><div className="h-80 mt-4 flex items-center justify-center"><div className="w-48 h-48 bg-muted/50 rounded-full flex items-center justify-center"><div className="w-24 h-24 bg-background rounded-full"></div></div></div></CardContent></Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card><CardContent className="p-6"><h3 className="font-semibold">Page views</h3><div className="h-48 mt-4 flex items-center justify-center"><div className="w-32 h-32 bg-muted/50 rounded-full flex items-center justify-center"><div className="w-16 h-16 bg-background rounded-full"></div></div></div></CardContent></Card>
                <Card><CardContent className="p-6"><h3 className="font-semibold flex items-center gap-1">Top browsers <Info className="h-4 w-4"/></h3><div className="mt-4 text-sm"><div className="flex justify-between text-muted-foreground border-b pb-2"><span>Browsers</span><span>Users</span></div></div></CardContent></Card>
                <Card><CardContent className="p-6"><h3 className="font-semibold flex items-center gap-1">Top client IP's <Info className="h-4 w-4"/></h3><div className="mt-4 text-sm"><div className="flex justify-between text-muted-foreground border-b pb-2"><span>Client IP's</span><span>Requests</span></div></div></CardContent></Card>
            </div>
        </div>
    );
};

// --- Vista para "Blogs" ---
const BlogsView = () => {
    const MetricCard = ({ title, value, icon: Icon }: { title: string; value: string; icon: React.ElementType }) => (
        <Card><CardContent className="p-6 flex items-center gap-4"><div className="p-3 bg-muted rounded-md"><Icon className="h-6 w-6 text-muted-foreground" /></div><div><p className="text-sm text-muted-foreground">{title}</p><p className="text-2xl font-bold">{value}</p></div></CardContent></Card>
    );
    const metrics = [{ title: "Total Blog Posts", value: "0", icon: FileText },{ title: "Published Blog Sites", value: "0", icon: LayoutList },{ title: "Visitors/Week", value: "0", icon: Users },];
    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <div><h1 className="text-3xl font-bold">Blogs</h1><p className="text-muted-foreground mt-1">Manage and oversee all blogs created by you for your business.</p></div>
                <div className="flex items-center gap-2"><Button variant="outline" size="icon"><Settings className="h-4 w-4" /></Button><Button>Create Blog <ChevronDown className="ml-2 h-4 w-4" /></Button></div>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{metrics.map(metric => <MetricCard key={metric.title} {...metric} />)}</div>
            <Card>
                <CardContent className="p-6">
                    <div className="flex justify-end mb-4"><div className="relative w-72"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search Blogs" className="pl-10" /></div></div>
                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader><TableRow className="hover:bg-transparent"><TableHead>Blog Site</TableHead><TableHead>Status</TableHead><TableHead>Description</TableHead><TableHead>Last Updated</TableHead><TableHead>Action</TableHead></TableRow></TableHeader>
                            <TableBody><TableRow><TableCell colSpan={5}><div className="h-64 flex flex-col items-center justify-center text-center gap-4"><div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center"><FileText className="h-8 w-8 text-muted-foreground"/></div><h3 className="text-xl font-semibold">No Blog Site</h3><p className="text-muted-foreground">Get started by creating a new blog site</p><Button><Plus className="mr-2 h-4 w-4" /> Create Blog Site</Button></div></TableCell></TableRow></TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// --- Vista para "Chat Widget" ---
const ChatWidgetView = () => {
    return (
        <div className="space-y-6">
            {/* Cabecera */}
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Webchat for your website</h1>
                    <p className="text-muted-foreground mt-1">Configure a chat widget to convert your website visitors to leads</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> New
                </Button>
            </header>

            {/* Contenido Principal (Tabla Vacía) */}
            <div className="border rounded-lg flex-grow flex flex-col">
                <div className="p-4 border-b">
                    <div className="grid grid-cols-3 font-semibold text-sm">
                        <span>Name</span>
                        <span>Updated on</span>
                        <span>Chat type</span>
                    </div>
                </div>
                <div className="flex-grow flex flex-col items-center justify-center text-center p-8 min-h-[50vh]">
                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                        <MessageSquare className="h-10 w-10 text-muted-foreground"/>
                    </div>
                    <h3 className="text-xl font-semibold">Create your first chat widget</h3>
                    <p className="text-muted-foreground max-w-sm mt-2">
                        Give your chat widget a bold new look to enhance engagement!
                    </p>
                    <Button className="mt-6">
                        <Plus className="mr-2 h-4 w-4" /> New
                    </Button>
                </div>
            </div>
        </div>
    );
};

// --- Vista para "WordPress" ---
const WordPressView = () => {
    // Componente para un ícono de característica
    const FeatureIcon = ({ icon: Icon, label }: { icon: React.ElementType, label: string }) => (
        <div className="flex flex-col items-center text-center gap-2">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <Icon className="h-8 w-8 text-muted-foreground" />
            </div>
            <span className="text-sm font-medium max-w-[100px]">{label}</span>
        </div>
    );

    return (
        <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Columna Izquierda: Información */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                        <WordPressIcon className="w-10 h-10 text-gray-700" />
                        <span className="text-xl font-semibold">WordPress</span>
                    </div>
                    <h1 className="text-5xl font-bold tracking-tighter">Seamless WP Hosting</h1>
                    <p className="text-lg text-muted-foreground">Secure Your WordPress Excellence with WP Hosting and Empower Your Digital Presence !</p>
                    
                    <div>
                        <h2 className="text-xl font-semibold mb-2">What We Offer?</h2>
                        <p className="text-muted-foreground">
                            Experience WordPress Hosting at its best with our fast and secure infrastructure and enterprise-level features. Enjoy effortless site migration, one-click management, and rock-solid backups—all in one powerful package.
                        </p>
                    </div>
                    <Button size="lg" className="px-8 py-6 text-base">Activate WordPress →</Button>
                </div>

                {/* Columna Derecha: Gráficos */}
                <div className="flex flex-col items-center gap-8">
                    <div className="w-full h-80 bg-muted/50 rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Illustration Placeholder</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <div className="w-3 h-3 bg-muted rounded-full"></div>
                        <div className="w-3 h-3 bg-muted rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 w-full">
                        <FeatureIcon icon={RefreshCw} label="Effortless Site Import" />
                        <FeatureIcon icon={Settings} label="User-Friendly Management" />
                        <FeatureIcon icon={Database} label="Reliable Backups" />
                        <FeatureIcon icon={Shield} label="Secure Infrastructure" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Vista para "Client Portal Dashboard" ---
const ClientPortalDashboardView = () => {
    // Componente para una fila de acción
    const ActionRow = ({ icon: Icon, text, buttonText }: { icon: React.ElementType, text: string, buttonText: string }) => (
        <div className="flex items-center justify-between border-b p-4 last:border-b-0">
            <div className="flex items-center gap-4">
                <div className="bg-muted p-3 rounded-full">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <span className="font-semibold">{text}</span>
            </div>
            <Button variant="outline">{buttonText}</Button>
        </div>
    );

    // Icono simple para el Client Portal App
    const ClientPortalAppIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
            <path d="M12 2L4 6V18L12 22L20 18V6L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M4 6L12 10L20 6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M12 22V10" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M10 12H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
    );

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground mt-1">Manage your client portal activities</p>
            </header>

            <Card>
                <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Creating a protected online gateway for client interactions</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-4">
                            <div>
                                <h4 className="font-semibold">What is a client portal?</h4>
                                <p className="text-muted-foreground text-sm">Your clients have the ability to log in at any time to the client portal for accessing courses, communities, and overseeing their affiliate payout.</p>
                            </div>
                            <div>
                                <h4 className="font-semibold">Client Portal URL</h4>
                                <div className="flex items-center gap-2">
                                    <a href="#" className="text-primary text-sm font-medium hover:underline">https://3wlQAk8NzqE3iNzo1KB4i.app.clientclub.net/</a>
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><Copy className="h-4 w-4" /></Button>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <Card className="text-center p-4"><p className="text-sm font-semibold">Invited</p><p className="text-3xl font-bold">0</p></Card>
                            <Card className="text-center p-4"><p className="text-sm font-semibold">Users</p><p className="text-3xl font-bold">0</p></Card>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-2">Actions</h3>
                        <div className="border rounded-lg">
                            <ActionRow icon={LinkIcon} text="Generate Magic Link" buttonText="Generate" />
                            <ActionRow icon={UserPlus} text="Invite To Client Portal" buttonText="Invite" />
                            <ActionRow icon={Send} text="Send Login Email" buttonText="Send" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                         <div className="flex items-center gap-2 self-start">
                            <ClientPortalAppIcon />
                            <h3 className="font-semibold">Client Portal App</h3>
                         </div>
                         <div className="flex-grow flex flex-col items-center justify-center">
                            <div className="w-64 h-48 bg-muted/50 rounded-md my-4 flex items-center justify-center">
                                <p className="text-muted-foreground text-sm">Illustration Placeholder</p>
                            </div>
                         </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

// --- Vista para "Client Portal Settings" ---
const ClientPortalSettingsView = () => {
    // Componente para una opción de ajuste
    const SettingsOption = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
        <Button variant="outline" className="h-auto text-left justify-start p-4">
            <div className="flex items-start gap-4">
                <div className="bg-muted p-3 rounded-full">
                    <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <h4 className="font-semibold">{title}</h4>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
            </div>
        </Button>
    );

    const settingsOptions = [
        { icon: Globe, title: "Domain Setup", description: "Configure your domain for client portal" },
        { icon: Palette, title: "Branding", description: "Add your personal touch to the client portal" },
        { icon: Link2, title: "App Permissions", description: "Enable/disable an app for your client portal" },
        { icon: Languages, title: "Language Settings", description: "Customize language for your client portal and child apps" },
        { icon: MessageSquare, title: "Chat Widget", description: "Configure your chat widget for your client portal" },
        { icon: Mail, title: "Email Settings", description: "Customize email notifications for everyone" },
    ];

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold">Client Portal Settings</h1>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {settingsOptions.map(opt => <SettingsOption key={opt.title} {...opt} />)}
            </div>
        </div>
    );
};


// --- Vista para "Branded Mobile App" ---
const BrandedMobileAppView = () => {
    return (
        <div className="space-y-6">
             <header>
                <h1 className="text-3xl font-bold">Branded Mobile App Builder</h1>
                <p className="text-muted-foreground mt-1">
                    Customize your mobile app's icon, colors, and onboarding experience for a fully branded user journey.
                    <a href="#" className="text-primary font-semibold ml-1">Learn More</a>
                </p>
            </header>
            <Card className="bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                    <div className="p-12 space-y-6">
                        <h2 className="text-5xl font-extrabold">Your Brand.<br/>Your App.</h2>
                        <p className="text-lg">Get your Branded Mobile App today. No code needed.</p>
                        <Button size="lg" className="px-8 py-6 text-base bg-white text-primary hover:bg-gray-100 shadow-lg">Get Started</Button>
                        <div className="flex items-center gap-4 text-sm font-semibold">
                            <div className="flex items-center gap-2"><Apple className="h-5 w-5" /> iOS</div>
                            <div className="flex items-center gap-2"><Smartphone className="h-5 w-5" /> Android</div>
                        </div>
                    </div>
                    <div className="h-96 bg-muted/50 flex items-center justify-center">
                        <p className="text-muted-foreground">App collage placeholder</p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

// --- Vista para "Forms Builder" ---
const FormsBuilderView = () => {
    const features = [
        "Transform website visitors into valuable leads",
        "Easily build forms with our drag-and-drop interface",
        "Set up workflows to instantly engage users once they submit their forms",
        "Access real-time analytics to measure and improve your forms' performance",
    ];
    const awesomeFeatures = [
        { title: "Sell Products", description: "Allow customers to make purchases directly through forms" },
        { title: "Extensive Elements", description: "Include dropdowns, checkboxes, radio buttons, image selectors, and more" },
        { title: "Math & Scoring", description: "Utilize dynamic scoring to perform calculations based on user inputs" },
        { title: "Conditional Logic", description: "Automate actions such as field visibility, URL redirections, and more" },
    ];
    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                    <h1 className="text-5xl font-bold tracking-tighter">Powerful Forms Made Easy</h1>
                    <ul className="space-y-3">
                        {features.map(feature => (
                            <li key={feature} className="flex items-start gap-3">
                                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center gap-4">
                        <Button size="lg"><Plus className="mr-2 h-4 w-4"/> Create New</Button>
                        <Button size="lg" variant="outline">Try Form Preview</Button>
                    </div>
                </div>
                <Card className="p-4">
                    <h3 className="font-semibold">Analytics</h3>
                    <p className="text-sm text-muted-foreground">Effortlessly track and analyze key metrics with our sites analytics tool</p>
                    <div className="h-64 mt-4 bg-muted/50 rounded-md flex items-center justify-center">
                        <p className="text-muted-foreground">Analytics Chart Placeholder</p>
                    </div>
                </Card>
            </div>
            
            <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">Awesome Form Features <Flame className="h-6 w-6 text-orange-500" /></h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                    {awesomeFeatures.map(f => (
                        <Card key={f.title} className="p-6">
                            <div className="h-40 bg-muted rounded-lg mb-4"></div>
                            <h3 className="font-semibold">{f.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{f.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};


// --- Vista para "Forms Submissions" ---
const FormsSubmissionsView = () => {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold">Submissions</h1>
                <p className="text-muted-foreground mt-1">Effortlessly Review, Manage, and Export Form Submissions</p>
            </header>
            <div className="flex justify-between items-center">
                <Select defaultValue="all"><SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Forms</SelectItem></SelectContent></Select>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 border rounded-md px-3 py-1.5 text-sm">
                        <span>2025-08-18</span>
                        <span>→</span>
                        <span>2025-09-18</span>
                    </div>
                    <Button size="icon"><RefreshCw className="h-4 w-4"/></Button>
                </div>
            </div>
            <div className="text-center py-20 text-muted-foreground">
                You do not have any forms yet. <a href="#" className="text-primary font-semibold underline">Click here</a> to create your first form.
            </div>
        </div>
    );
};

// --- Vista para "QR Codes" ---
const QrCodesView = () => {
    // Componente para una fila de característica en la sección principal
    const FeatureListItem = ({ text }: { text: string }) => (
        <li className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
            <span className="text-lg">{text}</span>
        </li>
    );

    // Componente para una tarjeta de característica en la sección inferior
    const FeatureCard = ({ title, description }: { title: string; description: string; }) => (
        <Card>
            <CardContent className="p-6">
                <div className="h-48 bg-muted rounded-lg mb-4 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">Image Placeholder</p>
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </CardContent>
        </Card>
    );

    const awesomeFeatures = [
        { title: "QR Types", description: "Create QR codes for websites, forms, SMS, calls, email, payments, and more — all in one place" },
        { title: "Bulk QR Codes", description: "Create hundreds of QR codes in seconds with a single CSV upload. Perfect for handling large campaigns, teams, or projects at scale" },
        { title: "Analytics", description: "Track total and unique QR scans over time, view performance by QR type, and filter data by date - all in real-time" },
    ];

    return (
        <div className="space-y-12">
            {/* Sección Principal */}
            <Card className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <h1 className="text-5xl font-bold tracking-tighter">Create Effortless QRs</h1>
                        <ul className="space-y-3">
                            <FeatureListItem text="Create custom and dynamic QR codes easily" />
                            <FeatureListItem text="Get detailed scan analytics and insights" />
                            <FeatureListItem text="Customize your QR code design and appearance" />
                            <FeatureListItem text="Track who scans your QR codes in real-time" />
                        </ul>
                        <Button size="lg" className="px-8 py-6 text-base">
                            <Plus className="mr-2 h-4 w-4" /> Create QR Code
                        </Button>
                    </div>
                    <div className="w-full h-80 bg-muted/50 rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">UI Mockup Placeholder</p>
                    </div>
                </div>
            </Card>

            {/* Sección de Características Adicionales */}
            <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">Our Awesome Features <Flame className="h-6 w-6 text-orange-500" /></h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    {awesomeFeatures.map(f => <FeatureCard key={f.title} {...f} />)}
                </div>
            </div>
        </div>
    );
};

// --- Componente de Placeholder para otras vistas ---
const PlaceholderView = ({ title }: { title: string }) => (
    <div className="flex flex-col items-center justify-center text-center py-20">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-muted-foreground mt-2">Content for this section is under construction.</p>
    </div>
);

// --- Componente Principal de la Página ---
export default function SitesPage() {
    const [activeTab, setActiveTab] = useState('Funnels');
    const navItems = [
        { name: 'Funnels' }, { name: 'Websites' }, { name: 'Stores' }, { name: 'Webinars' }, 
        { name: 'Analytics' }, { name: 'Blogs' }, { name: 'WordPress' }, 
        { name: 'Client Portal', subItems: ['Dashboard', 'Settings', 'Branded Mobile App'] },
        { name: 'Forms', subItems: ['Builder', 'Analyze', 'Submissions'] },
        { name: 'Surveys', subItems: ['Builder', 'Analyze', 'Submissions'] },
        { name: 'Quizzes', subItems: ['Builder', 'Submissions'] },
        { name: 'Chat Widget' }, { name: 'QR Codes' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'Funnels': return <SiteSectionView title="Funnels" subtitle="Build funnels to generate leads, appointments and receive payment" mainActionText="New Funnel" searchPlaceholder="Search for Funnels" emptyStateTitle="Start by creating a funnel" emptyStateSubtitle="All your funnels and folders will live here. Start by creating your first Funnel." />;
            case 'Websites': return <SiteSectionView title="Websites" subtitle="Build Websites to showcase your products and build trusted brand" mainActionText="New Website" searchPlaceholder="Search for Websites" emptyStateTitle="Start by creating a website" emptyStateSubtitle="All your websites and folders will live here. Start by creating your first Website." />;
            case 'Stores': return <StoresView />;
            case 'Webinars': return <SiteSectionView title="Webinar Funnels" subtitle="Create and manage Webinar Funnels" mainActionText="New Webinar Funnel" searchPlaceholder="Search for webinars" emptyStateTitle="Start by creating a webinar" emptyStateSubtitle="Create and manage Webinar Funnels to register prospects and customers for your webinars!" emptyStateIcon={<Presentation className="h-8 w-8 text-primary" />} />;
            case 'Analytics': return <AnalyticsView />;
            case 'Blogs': return <BlogsView />;
            case 'WordPress': return <WordPressView />;
            case 'Chat Widget': return <ChatWidgetView />;
            case 'Dashboard': return <ClientPortalDashboardView />;
            case 'Settings': return <ClientPortalSettingsView />;
            case 'Branded Mobile App': return <BrandedMobileAppView />;
            case 'Builder': return <FormsBuilderView />;
            case 'Submissions': return <FormsSubmissionsView />;
            case 'QR Codes': return <QrCodesView />;
            default: return <PlaceholderView title={activeTab} />;
        }
    };

    return (
        <div className="p-6 bg-background text-foreground min-h-screen">
            <header className="flex items-center justify-between border-b pb-2 mb-6">
                <nav className="flex items-center gap-1">
                    <h1 className="text-xl font-bold pr-4">Sites</h1>
                    {navItems.map(item => (
                        item.subItems ? (
                            <DropdownMenu key={item.name}>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className={`font-semibold transition-none text-sm ${ activeTab === item.name || item.subItems.includes(activeTab) ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                                        {item.name}
                                        <ChevronDown className="h-4 w-4 ml-1" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {item.subItems.map(subItem => (
                                        <DropdownMenuItem key={subItem} onClick={() => { if (item.name === 'Forms' && subItem === 'Analyze') { setActiveTab('Analytics'); } else { setActiveTab(subItem); }}}>
                                            {subItem}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button key={item.name} variant="ghost" onClick={() => setActiveTab(item.name)} className={`font-semibold transition-none text-sm ${ activeTab === item.name ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                                {item.name}
                            </Button>
                        )
                    ))}
                </nav>
                {/* INICIO: CÓDIGO CORREGIDO */}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href="/settings/domains-url-redirects">
                                <Button variant="ghost" size="icon">
                                    <Settings className="h-5 w-5" />
                                </Button>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Go to Domain & URL Redirects</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                {/* FIN: CÓDIGO CORREGIDO */}
            </header>
            <main>
                {renderContent()}
            </main>
        </div>
    );
}


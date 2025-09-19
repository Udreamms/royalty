"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    ChevronDown,
    ClipboardCopy,
    Wand2,
    UserPlus,
    Send,
    AppWindow,
    X,
    Award,
    Badge,
    Plus,
    Search,
    FileX,
  GraduationCap,
    Users,
    Pencil,
    LayoutGrid,
    DollarSign,
    BarChart
} from 'lucide-react';

// --- VISTA PARA "CLIENT PORTAL" ---
const ClientPortalView = () => {
    const KpiCard = ({ title, value }) => (
        <Card>
            <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">{title}</p>
                <p className="text-3xl font-bold">{value}</p>
            </CardContent>
        </Card>
    );

    const ActionItem = ({ icon: Icon, label, buttonText }) => (
        <div className="flex items-center justify-between border-b py-3 last:border-none">
            <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <p className="font-medium">{label}</p>
            </div>
            <Button variant="outline">{buttonText}</Button>
        </div>
    );

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Manage your client portal activities</p>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Creating a protected online gateway for client interactions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h3 className="font-semibold mb-1">What is a client portal?</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Your clients have the ability to log in at any time to the client portal for accessing courses, communities, and overseeing their affiliate payout.
                            </p>
                            <Label className="font-semibold">Client Portal URL</Label>
                            <div className="flex items-center gap-2 mt-1">
                                <Input 
                                    readOnly 
                                    defaultValue="https://9wyqakdh2qesirizo1kb4l.app.clientclub.net/" 
                                    className="bg-muted/50"
                                />
                                <Button variant="outline" size="icon">
                                    <ClipboardCopy className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>Actions</CardTitle></CardHeader>
                        <CardContent>
                            <ActionItem icon={Wand2} label="Generate Magic Link" buttonText="Generate" />
                            <ActionItem icon={UserPlus} label="Invite To Client Portal" buttonText="Invite" />
                            <ActionItem icon={Send} label="Send Login Email" buttonText="Send" />
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <KpiCard title="Invited" value="0" />
                        <KpiCard title="Users" value="0" />
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AppWindow className="h-5 w-5" />
                                Client Portal App
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center text-center">
                            <div className="h-48 w-full flex items-center justify-center">
                                 <p className="text-muted-foreground">[Ilustración aquí]</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

// --- VISTA PARA "CREDENTIALS" ---
const CredentialsView = () => {
    const [activeSubTab, setActiveSubTab] = useState('Templates');

    const IssuedItemsView = () => {
        const headers = ["Issued To", "Issued Date", "Expiry Date", "Type", "Source Name"];
        return (
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50 hover:bg-muted/50">
                                {headers.map(h => <TableHead key={h}>{h}</TableHead>)}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={headers.length} className="h-64 text-center">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <FileX className="h-10 w-10 text-muted-foreground" />
                                        <p className="text-muted-foreground">No Data</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        );
    };

    const EmptyTemplatesView = () => (
        <div className="text-center py-16">
            <div className="h-48 w-full flex items-center justify-center mb-4">
                <p className="text-muted-foreground">[Ilustración de dos personas en un escritorio]</p>
            </div>
            <h3 className="text-xl font-semibold">Time to award your member!</h3>
            <p className="text-muted-foreground">No templates in here! Ready to create a fresh certificate?</p>
        </div>
    );
    
    const renderSubTabContent = () => {
        switch (activeSubTab) {
            case 'Issued Certificates':
            case 'Issued Badges':
                return <IssuedItemsView />;
            case 'Templates':
            default:
                return <EmptyTemplatesView />;
        }
    };
    
    const subNavItems = ['Templates', 'Issued Certificates', 'Issued Badges'];

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg p-6 text-white relative">
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-white hover:bg-white/20 hover:text-white">
                    <X className="h-5 w-5" />
                </Button>
                <h2 className="text-lg font-semibold mb-4">Understanding Certificates & Badges</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex gap-4 items-start">
                        <div className="p-3 bg-white/20 rounded-lg h-fit"><Award className="h-6 w-6"/></div>
                        <div>
                            <h3 className="font-semibold">Certificates</h3>
                            <p className="text-sm opacity-90">Give people something to show for completing big milestones, like a course, challenge, event, or training. Great for celebrating progress and building trust.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                         <div className="p-3 bg-white/20 rounded-lg h-fit"><Badge className="h-6 w-6"/></div>
                        <div>
                            <h3 className="font-semibold">Badges</h3>
                            <p className="text-sm opacity-90">Quick, visual rewards for smaller wins, like finishing a lesson, submitting a form, or passing a quiz. Badges keep people engaged and motivated.</p>
                        </div>
                    </div>
                </div>
            </div>

            <header className="flex flex-wrap justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Credentials</h1>
                    <p className="text-muted-foreground">Create and issue credentials for your members</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search by title" className="pl-10" />
                    </div>
                    <Button><Plus className="mr-2 h-4 w-4" /> Create</Button>
                </div>
            </header>

            <div>
                <div className="border-b">
                    {subNavItems.map(item => (
                         <Button
                            key={item}
                            variant="ghost"
                            onClick={() => setActiveSubTab(item)}
                            className={`rounded-none border-b-2 font-semibold
                                ${activeSubTab === item 
                                    ? 'border-primary text-primary' 
                                    : 'border-transparent text-muted-foreground hover:text-primary'}`
                            }
                        >
                            {item}
                        </Button>
                    ))}
                </div>
                <main className="mt-6">
                    {renderSubTabContent()}
                </main>
            </div>
        </div>
    );
};

// --- VISTA PARA "GOKOLLAB MARKETPLACE" ---
const GokollabMarketplaceView = () => {
    const [selection, setSelection] = useState('courses');

    // Sub-componente para las características en la parte inferior
    const FeatureItem = ({ icon: Icon, title, description }) => (
        <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/10 rounded-md flex-shrink-0">
                <Icon className="h-6 w-6 text-primary" />
            </div>
            <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
    );

    const features = [
        { icon: Pencil, title: "Create Courses Faster", description: "Launch professional courses quickly with easy-to-use tools and templates." },
        { icon: LayoutGrid, title: "Customize Your Course Experience", description: "Add quizzes, certificates, and drip content—tailored to your teaching style." },
        { icon: DollarSign, title: "Earn on Your Terms", description: "Set your own pricing and control your revenue streams." },
        { icon: BarChart, title: "Track Performance Easily", description: "Get insights with simple analytics to monitor sales, engagement, and student progress." }
    ];

    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className="space-y-8">
                {/* Banner Superior */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-10 rounded-lg text-center">
                    <h1 className="text-4xl font-bold mb-4">What Do You Want to Build?</h1>
                    <p className="max-w-2xl mx-auto text-white/90">
                        Create, Kollab and Inspire with every step you take. Build a Course to share your experience or a Community to spark connections
                    </p>
                </div>

                {/* Área de Selección */}
                <Card className="p-6">
                    <RadioGroup value={selection} onValueChange={setSelection} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Label htmlFor="courses" className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-colors ${selection === 'courses' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                                <div className="p-3 bg-primary/10 rounded-lg"><GraduationCap className="h-6 w-6 text-primary" /></div>
                                <span className="font-semibold flex-grow">Courses</span>
                                <RadioGroupItem value="courses" id="courses" className="h-5 w-5" />
                            </Label>
                            <Label htmlFor="community" className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-colors ${selection === 'community' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                                 <div className="p-3 bg-primary/10 rounded-lg"><Users className="h-6 w-6 text-primary" /></div>
                                <span className="font-semibold flex-grow">Community</span>
                                <RadioGroupItem value="community" id="community" className="h-5 w-5" />
                            </Label>
                        </div>
                        <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-semibold">
                            Create
                        </Button>
                    </RadioGroup>
                </Card>

                {/* Sección "Why Gokollab Courses?" */}
                <div className="pt-8">
                    <h2 className="text-2xl font-bold mb-6">Why Gokollab Courses?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                        {features.map(feature => <FeatureItem key={feature.title} {...feature} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- COMPONENTE PRINCIPAL DE LA PÁGINA ---
export default function MembershipsPage() {
    const [activeTab, setActiveTab] = useState('Client Portal');

    const navItems = [
        { name: 'Memberships' },
        { name: 'Client Portal', subItems: ['Dashboard', 'Settings', 'Branded Mobile App'] },
        { name: 'Courses', subItems: ['Dashboard', 'Products', 'Offers', 'Analytics', 'Settings'] },
        { name: 'Communities', subItems: ['Groups', 'Settings', 'Branded Mobile App'] },
        { name: 'Credentials' },
        { name: 'Gokollab Marketplace', new: true }
    ];
// LÓGICA DE RENDERIZADO ACTUALIZADA para manejar sub-vistas
    const renderContent = () => {
        // Mantenemos las vistas que ya creamos
        if (activeTab.startsWith('Client Portal/Dashboard')) {
             return <ClientPortalView />;
        }
        if (activeTab.startsWith('Credentials')) {
             return <CredentialsView />;
        }
        if (activeTab.startsWith('Gokollab Marketplace')) {
             return <GokollabMarketplaceView />;
        }

        // Para las nuevas opciones, mostramos un placeholder
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-semibold">Contenido para {activeTab}</h2>
                <p className="text-muted-foreground">Esta sección está en construcción.</p>
            </div>
        );
    };

    return (
        <div className="p-6 bg-background text-foreground min-h-screen">
            {/* NAVEGACIÓN CON MENÚS DESPLEGABLES */}
            <nav className="flex items-center gap-2 border-b pb-2 mb-6">
                {navItems.map(item => (
                    item.subItems ? (
                        <DropdownMenu key={item.name}>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className={`font-semibold transition-colors
                                        ${activeTab.startsWith(item.name) ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`
                                    }
                                >
                                    {item.name}
                                    <ChevronDown className="h-4 w-4 ml-1" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {item.subItems.map(subItem => (
                                    <DropdownMenuItem key={subItem} onClick={() => setActiveTab(`${item.name}/${subItem}`)}>
                                        {subItem}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button
                            key={item.name}
                            variant="ghost"
                            onClick={() => setActiveTab(item.name)}
                            className={`font-semibold transition-colors
                                ${activeTab.startsWith(item.name) ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`
                            }
                        >
                            {item.name}
                            {item.new && <span className="ml-2 text-xs font-bold text-yellow-800 bg-yellow-200 px-2 py-0.5 rounded-full">New</span>}
                        </Button>
                    )
                ))}
            </nav>
            
            <main>
                {renderContent()}
            </main>
        </div>
    );
}

// Componentes auxiliares (versión JavaScript)
const Label = ({ children, ...props }) => (
    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" {...props}>
        {children}
    </label>
);

const Input = (props) => (
    <input
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        {...props}
    />
);
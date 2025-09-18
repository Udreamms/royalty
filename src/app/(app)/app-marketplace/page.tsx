"use client";

import React, { useState } from 'react';

// Importaciones de Componentes de shadcn/ui
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

// Importaciones de Íconos de lucide-react
import { 
    Bookmark,
    ChevronDown,
    Download, 
    ExternalLink,
    FileX,
    Search,
    Settings,
    Star,
    BadgeCheck,
    ArrowLeft,
    LayoutGrid,
    ShieldCheck,
    TrendingUp,
} from 'lucide-react';

// --- Sub-componente para una tarjeta de Agente Individual ---
interface AgentCardProps {
    avatar: string;
    title: string;
    name: string;
    author: string;
    rating: number;
    reviews: number;
    price: 'Free' | 'Paid';
    likes: number;
    icon: string;
    downloads: string;
    description: string;
}



const FeatureCard = ({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) => (
    <Card className="text-center p-6 flex flex-col items-center">
        <CardContent className="p-0">
            <div className="bg-muted w-16 h-16 mb-4 rounded-full flex items-center justify-center">
                {/* Placeholder para los iconos coloridos. Puedes reemplazarlos con tus propias imágenes o SVGs. */}
                {icon}
            </div>
            <h3 className="font-semibold text-base mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
    </Card>
);
// --- Sub-componente para una fila de la tabla de configuración ---
const SettingsRow = ({ label, defaultChecked = true }: { label: string, defaultChecked?: boolean }) => (
    <div className="grid grid-cols-2 sm:grid-cols-[2fr_1fr_2fr] items-center p-4 gap-4">
        <Label className="font-medium">{label}</Label>
        <div className="flex justify-center">
             <Switch defaultChecked={defaultChecked} />
        </div>
        <div>
            <RadioGroup defaultValue="all-approved" className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all-approved" id={`${label}-all`} />
                    <Label htmlFor={`${label}-all`} className="font-normal text-sm">All Approved Apps</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="installed" id={`${label}-installed`} />
                    <Label htmlFor={`${label}-installed`} className="font-normal text-sm">Only Installed Apps</Label>
                </div>
            </RadioGroup>
        </div>
    </div>
);


// --- Componente para la nueva vista de "Marketplace Settings" ---
const MarketplaceSettingsView = ({ onBackClick }: { onBackClick: () => void }) => {
    const [activeTab, setActiveTab] = useState('Marketplace Visibility');
    const settingsNavItems = ['Marketplace Visibility', 'Manage App Access', 'App Usage Limits'];

    return (
        <div className="space-y-6">
            <Button variant="ghost" onClick={onBackClick} className="text-sm">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            
            <header>
                <h1 className="text-2xl font-bold">Marketplace Settings</h1>
            </header>

            <nav className="border-b">
                <div className="flex items-center gap-4">
                    {settingsNavItems.map(item => (
                        <button
                            key={item}
                            onClick={() => setActiveTab(item)}
                            className={`pb-2 px-1 text-sm font-semibold border-b-2 transition-colors ${
                                activeTab === item ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Contenido de la pestaña activa */}
            {activeTab === 'Marketplace Visibility' && (
                <div className="space-y-8">
                    <p className="text-muted-foreground">
                        Enable your sub-account to seamlessly view & install marketplace apps and solve their business pain points.
                    </p>
                    
                    {/* Tarjetas de características */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <Card>
                            <CardContent className="p-6">
                                <div className="mx-auto bg-blue-100 rounded-full h-12 w-12 flex items-center justify-center mb-4">
                                   <LayoutGrid className="h-6 w-6 text-blue-600" />
                                </div>
                                <h3 className="font-semibold mb-1">Wide Variety of Apps</h3>
                                <p className="text-sm text-muted-foreground">Choose from a wide range of apps falling under different categories</p>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardContent className="p-6">
                                <div className="mx-auto bg-green-100 rounded-full h-12 w-12 flex items-center justify-center mb-4">
                                   <ShieldCheck className="h-6 w-6 text-green-600" />
                                </div>
                                <h3 className="font-semibold mb-1">Verified & Approved</h3>
                                <p className="text-sm text-muted-foreground">Each app goes through a review process before it gets listed on our marketplace</p>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardContent className="p-6">
                                <div className="mx-auto bg-yellow-100 rounded-full h-12 w-12 flex items-center justify-center mb-4">
                                   <TrendingUp className="h-6 w-6 text-yellow-600" />
                                </div>
                                <h3 className="font-semibold mb-1">Increase Agency Revenue</h3>
                                <p className="text-sm text-muted-foreground">Boost your agency revenue by reselling premium apps</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Tabla de gestión de visibilidad */}
                    <div className="space-y-4">
                        <div>
                            <h2 className="text-lg font-semibold">Manage Marketplace's visibility to sub-accounts across HighLevel</h2>
                            <p className="text-muted-foreground">These settings apply to sub-account admins only. Agency admins can access the Marketplace everywhere.</p>
                        </div>
                        <Card>
                            <div className="border-b">
                                <div className="grid grid-cols-2 sm:grid-cols-[2fr_1fr_2fr] p-4 gap-4">
                                    <h4 className="font-semibold text-muted-foreground text-sm">App Marketplace in</h4>
                                    <h4 className="font-semibold text-muted-foreground text-sm text-center">Visible to Sub-accounts</h4>
                                    <h4 className="font-semibold text-muted-foreground text-sm">Apps sub-accounts can view</h4>
                                </div>
                            </div>
                            <div className="divide-y">
                                <SettingsRow label="Sub-account left navigation menu" />
                                <SettingsRow label="Conversation AI" />
                                <SettingsRow label="Voice AI" />
                            </div>
                        </Card>
                    </div>
                </div>
            )}
             {activeTab !== 'Marketplace Visibility' && (
                 <div className="text-center py-20 text-muted-foreground">Content for {activeTab} is not available.</div>
            )}
        </div>
    );
};

const AgentCard = ({ avatar, title, name, author, rating, reviews, price, likes }: AgentCardProps) => (
    <div className="border rounded-lg bg-background overflow-hidden relative transition-shadow hover:shadow-md">
        <div className="h-24 bg-purple-100 dark:bg-purple-900/20 relative">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute opacity-50">
                <defs><pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse"><circle id="pattern-circle" cx="20" cy="20" r="2" className="fill-purple-300 dark:fill-purple-700"></circle></pattern></defs>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
            </svg>
            <img src={avatar} alt={name} className="absolute bottom-[-2.5rem] left-6 w-20 h-20 rounded-full border-4 border-white bg-white shadow-md object-cover" />
        </div>
        <div className="pt-12 p-4">
            <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg">{title}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground"><Bookmark className="w-4 h-4" /><span>{likes}</span></div>
            </div>
            <p className="text-sm font-semibold mt-1 truncate">{name}</p>
            <p className="text-xs text-muted-foreground mt-1">By {author}</p>
            <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center">{Array.from({ length: 5 }).map((_, i) => (<Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />))}</div>
                {reviews > 0 ? (<p className="text-xs text-muted-foreground">{reviews} review(s)</p>) : (<p className="text-xs text-muted-foreground">No reviews yet</p>)}
            </div>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full mt-3 inline-block ${price === 'Free' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{price}</span>
        </div>
    </div>
);

// --- Sub-componente para la barra lateral de filtros (REUTILIZABLE) ---
interface FilterSidebarProps {
    sections: { value: string; title: string; content: React.ReactNode; }[];
    defaultOpen?: string[];
}
const FilterSidebar = ({ sections, defaultOpen = [] }: FilterSidebarProps) => (
    <aside>
        <Accordion type="multiple" defaultValue={defaultOpen} className="w-full">
            {sections.map(section => (
                <AccordionItem value={section.value} key={section.value}>
                    <AccordionTrigger className="font-semibold">{section.title}</AccordionTrigger>
                    <AccordionContent>{section.content}</AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    </aside>
);

// --- Sub-componente para la vista de "AI Agents" ---
const AiAgentsView = () => {
    // Componente genérico para una opción de filtro con Checkbox
    const FilterCheckboxOption = ({ label }: { label: string }) => (
        <div className="flex items-center space-x-2">
            <Checkbox id={label.toLowerCase().replace(/ /g, '-')} />
            <Label htmlFor={label.toLowerCase().replace(/ /g, '-')} className="font-normal">{label}</Label>
        </div>
    );
    
    // Datos para cada sección de filtros
    const categoriesOptions = [
        'Accounting & Payments', 'Advertising', 'Analytics & Data', 'Calendar & Scheduling',
        'Calling', 'Content Management System', 'Crm', 'Data Management', 'E-Commerce',
        'Email', 'Employee Engagement', 'Erp', 'Events', 'Field Service Management',
        'Help Desk & Ticketing', 'Lead Generation', 'Learning Management System', 'Live Chat',
        'Marketing Automation', 'Other Services', 'Project Management', 'Sales Enablement',
        'Seo', 'Sms', 'Social Media', 'Survey', 'Video', 'Virtual Assistants', 'Webinar',
        'Website Builder', 'Wordpress', 'Workflow Automation', 'Payment Provider', 'Other'
    ];
    const businessNicheOptions = [
        'Advertising Agency', 'Car Dealership', 'Chiropractor', 'Construction', 'Consultant',
        'Dental', 'Education', 'Energy', 'Financial Services', 'Fitness', 'Health',
        'Home Services', 'Hospitality', 'Insurance', 'Legal', 'Life Coach', 'Loan & Mortgage',
        'Marketing Agency', 'Medical', 'Real Estate', 'Recruitment', 'Retail', 'Solar', 'Spa & Wellness'
    ];
    const pricingOptions = ['Free', 'Freemium', 'One Time', 'Monthly', 'Yearly', 'Usage Based'];
    const useCasesOptions = ['Appointment Booking', 'General Q&A and Support', 'Lead Qualification'];
    const actionsOptions = ['Trigger Workflow', 'Appointment Booking', 'Update Contact Field', 'Call Transfer'];
    const agentContainsOptions = ['Calendars', 'Custom Fields', 'Custom Values', 'Tags', 'Workflows'];
    const installOptions = ['All', 'Everyone', 'Agency'];

    const aiAgentsFilterSections = [
        { value: "ai-agents", title: "AI Agents", content: (<RadioGroup defaultValue="voice-ai" className="space-y-2 p-1"><div className="flex items-center space-x-2"><RadioGroupItem value="voice-ai" id="voice-ai" /><Label htmlFor="voice-ai">Voice AI</Label></div><div className="flex items-center space-x-2"><RadioGroupItem value="conversation-ai" id="conversation-ai" /><Label htmlFor="conversation-ai">Conversation AI</Label></div></RadioGroup>) },
        { value: "categories", title: "Categories", content: <div className="space-y-2 max-h-60 overflow-y-auto pr-2">{categoriesOptions.map(opt => <FilterCheckboxOption key={opt} label={opt} />)}</div> },
        { value: "use-cases", title: "Use Cases", content: <div className="space-y-2">{useCasesOptions.map(opt => <FilterCheckboxOption key={opt} label={opt} />)}</div> },
        { value: "business-niche", title: "Business Niche", content: <div className="space-y-2 max-h-60 overflow-y-auto pr-2">{businessNicheOptions.map(opt => <FilterCheckboxOption key={opt} label={opt} />)}</div> },
        { value: "pricing", title: "Pricing", content: <div className="space-y-2">{pricingOptions.map(opt => <FilterCheckboxOption key={opt} label={opt} />)}</div> },
        { value: "actions", title: "Actions", content: <div className="space-y-2">{actionsOptions.map(opt => <FilterCheckboxOption key={opt} label={opt} />)}</div> },
        { value: "agent-contains", title: "Agent Contains", content: <div className="space-y-2">{agentContainsOptions.map(opt => <FilterCheckboxOption key={opt} label={opt} />)}</div> },
        { value: "who-can-install", title: "Who can install the app?", content: (<RadioGroup defaultValue="all" className="space-y-2">{installOptions.map(opt => <div key={opt} className="flex items-center space-x-2"><RadioGroupItem value={opt.toLowerCase()} id={opt.toLowerCase()} /><Label htmlFor={opt.toLowerCase()} className="font-normal">{opt}</Label></div>)}</RadioGroup>) },
    ];
    
    const agentsData = [
        { avatar: "https://i.pravatar.cc/150?img=1", title: "Justin", name: "Justin - Your Unbreakable Voice Assis...", author: "BeVisible Online Solutions Ltd.", rating: 5, reviews: 1, price: 'Free', likes: 976 }, { avatar: "https://i.pravatar.cc/150?img=2", title: "01. Self Selling Sam +1 More", name: "Self Selling Voice AI Agents", author: "DaMarTech", rating: 5, reviews: 2, price: 'Free', likes: 549 }, { avatar: "https://i.pravatar.cc/150?img=3", title: "Auto Repair & Services", name: "Auto Repair & Services Voice AI Agen...", author: "CRM Pros LLC", rating: 0, reviews: 0, price: 'Paid', likes: 208 }, { avatar: "https://i.pravatar.cc/150?img=4", title: "Matteo - Servizi", name: "Matteo - Assistente Vocale AI per Servizi", author: "BeVisible Online Solutions Ltd.", rating: 5, reviews: 1, price: 'Free', likes: 64 }, { avatar: "https://i.pravatar.cc/150?img=5", title: "Barbershop Services", name: "Barbershop Services Voice AI Agent Te...", author: "CRM Pros LLC", rating: 0, reviews: 0, price: 'Paid', likes: 37 }, { avatar: "https://i.pravatar.cc/150?img=6", title: "Marketing Agency Services", name: "Marketing Agency Services Voice AI A...", author: "CRM Pros LLC", rating: 0, reviews: 0, price: 'Paid', likes: 33 }, { avatar: "https://i.pravatar.cc/150?img=7", title: "Chiropractic Center Services", name: "Chiropractic Center Voice AI Age...", author: "CRM Pros LLC", rating: 0, reviews: 0, price: 'Paid', likes: 30 }, { avatar: "https://i.pravatar.cc/150?img=8", title: "Travel Agency Services", name: "Travel Agency Services Voice A...", author: "CRM Pros LLC", rating: 0, reviews: 0, price: 'Paid', likes: 29 },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6">
            <FilterSidebar sections={aiAgentsFilterSections} defaultOpen={['ai-agents', 'categories', 'use-cases', 'business-niche', 'pricing', 'actions', 'agent-contains', 'who-can-install']} />
            <main className="lg:col-span-3">
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search for agents..." className="pl-10" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {agentsData.map(agent => <AgentCard key={agent.name} {...agent} />)}
                </div>
            </main>
        </div>
    );
};

// --- Sub-componente para un ítem de la lista de reventa ---
interface ResellerAppItemProps {
    logo: string;
    name: string;
    description: string;
}
const ResellerAppItem = ({ logo, name, description }: ResellerAppItemProps) => (
    <div className="border rounded-lg p-4 space-y-4">
        <div className="flex items-start gap-4">
            <Checkbox className="mt-1" /><img src={logo} alt={name} className="w-10 h-10 rounded-md border" />
            <div className="flex-1">
                <div className="flex items-center gap-2"><h4 className="font-semibold">{name}</h4><ExternalLink className="h-4 w-4 text-muted-foreground" /></div>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div><Label>Developer's Price</Label><Input type="number" placeholder="$" /></div>
            <div><Label>Your Reselling Price</Label><Input type="number" placeholder="$" /></div>
            <div><Label>Your Profit</Label><Input type="number" placeholder="$" readOnly className="bg-muted/50" /></div>
        </div>
        <div className="flex justify-between items-center"><Button variant="outline">Set Usage Based Pricing</Button><Button variant="ghost" className="text-primary hover:text-primary">Save Changes</Button></div>
    </div>
);

// --- VISTA PRINCIPAL PARA "APP RESELLING" ---
const AppResellingView = () => {
    const FilterCheckboxOption = ({ label }: { label: string }) => (
        <div className="flex items-center space-x-2">
            {/* Usamos un prefijo 'resell-' para evitar IDs duplicados en la página */}
            <Checkbox id={`resell-${label.toLowerCase().replace(/ /g, '-')}`} />
            <Label htmlFor={`resell-${label.toLowerCase().replace(/ /g, '-')}`} className="font-normal">{label}</Label>
        </div>
    );

    // Datos para las nuevas secciones de filtros
    const appContainsOptions = ['Calendars', 'Custom Fields', 'Custom Values', 'Tags', 'Workflows'];
    const businessNicheOptions = [
        'Advertising Agency', 'Car Dealership', 'Chiropractor', 'Construction', 'Consultant',
        'Dental', 'Education', 'Energy', 'Financial Services', 'Fitness', 'Health',
        'Home Services', 'Hospitality', 'Insurance', 'Legal', 'Life Coach', 'Loan & Mortgage',
        'Marketing Agency', 'Medical', 'Real Estate', 'Recruitment', 'Retail', 'Solar', 'Spa & Wellness'
    ];
    const pricingOptions = ['Free', 'Freemium', 'One Time', 'Monthly', 'Yearly', 'Usage Based'];
    const installOptions = ['All', 'Everyone', 'Agency'];
    const appResellingFilterSections = [
    { value: "status", title: "App Status", content: <p className="p-1 text-sm text-muted-foreground">Status filters placeholder</p> },
    { value: "collections", title: "Collections", content: <p className="p-1 text-sm text-muted-foreground">Collections filters placeholder</p> },
    { value: "categories", title: "Categories", content: <div className="space-y-2 max-h-60 overflow-y-auto pr-2">{['Accounting & Payments', 'Advertising', 'Analytics & Data', 'Calendar & Scheduling', 'Crm', 'E-Commerce', 'Email', 'Marketing Automation'].map(cat => <FilterCheckboxOption key={cat} label={cat} />)}</div> },
    { value: "app-contains", title: "App Contains", content: <div className="space-y-2">{appContainsOptions.map(opt => <FilterCheckboxOption key={opt} label={opt} />)}</div> },
    { value: "business-niche", title: "Business Niche", content: <div className="space-y-2 max-h-60 overflow-y-auto pr-2">{businessNicheOptions.map(opt => <FilterCheckboxOption key={opt} label={opt} />)}</div> },
    { value: "pricing", title: "Pricing", content: <div className="space-y-2">{pricingOptions.map(opt => <FilterCheckboxOption key={opt} label={opt} />)}</div> },
    { value: "who-can-install", title: "Who can install the app?", content: (
        <RadioGroup defaultValue="all" className="space-y-2 p-1">
            {installOptions.map(opt => (
                <div key={opt} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt.toLowerCase()} id={`resell-install-${opt.toLowerCase()}`} />
                    <Label htmlFor={`resell-install-${opt.toLowerCase()}`} className="font-normal">{opt}</Label>
                </div>
            ))}
        </RadioGroup>
    )},
];
    const resellerAppsData = [
        { logo: "https://via.placeholder.com/40", name: "Sendblue iMessage", description: "Send iMessage to your leads without A2P" }, { logo: "https://via.placeholder.com/40", name: "Account Booster", description: "1 click-install every app, just like installing Zapier, Pabbly, N8..." },
    ];

    return (
        <div className="mt-6 space-y-6">
            <header>
                <h2 className="text-xl font-bold">Agency App Reselling For All Sub-accounts</h2>
                <p className="text-muted-foreground">Sub-Accounts will pay the marked-up price set here when installing third-party Apps.</p>
            </header>
            <div className="flex justify-end"><div className="relative w-full sm:max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search Apps" className="pl-10" /></div></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <FilterSidebar sections={appResellingFilterSections} defaultOpen={['categories']} />
                <main className="lg:col-span-3 space-y-4">
                    <Card className="p-4"><div className="flex flex-wrap items-center justify-between gap-4"><div><h3 className="font-semibold">Bulk update Reselling Price</h3><p className="text-sm text-muted-foreground">Set common reselling markup across selected apps</p></div><div className="flex items-center gap-2"><Input type="number" defaultValue={0} className="w-20" /><span>%</span><Button>Apply</Button></div></div></Card>
                    <div className="flex items-center gap-4"><Checkbox id="select-all" /><Label htmlFor="select-all" className="text-sm font-semibold">Select all</Label><p className="text-sm text-muted-foreground">Showing 842 app(s)</p></div>
                    <div className="space-y-4">{resellerAppsData.map(app => <ResellerAppItem key={app.name} {...app} />)}</div>
                </main>
            </div>
        </div>
    );
};

// --- VISTA PARA "INSTALLED APPS" ---
const InstalledAppsView = () => {
    const tableHeaders = ["App Name", "Tagline", "Who is the target user?", "Who can install the app?", "Current Plan"];

    return (
        <div className="mt-6 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">Apps <span className="bg-muted text-muted-foreground text-sm font-semibold px-2.5 py-0.5 rounded-full">0</span></h2>
                <div className="relative w-full sm:max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search by App Name" className="pl-10" /></div>
            </div>
            <div className="border rounded-lg">
                <Table><TableHeader><TableRow>{tableHeaders.map(header => <TableHead key={header}>{header}</TableHead>)}</TableRow></TableHeader><TableBody><TableRow><TableCell colSpan={tableHeaders.length}><div className="h-80 flex flex-col items-center justify-center text-center"><FileX className="h-12 w-12 text-muted-foreground mb-4" /><p className="text-muted-foreground font-semibold">No Data</p></div></TableCell></TableRow></TableBody></Table>
            </div>
        </div>
    );
};

// --- COMIENZA A AGREGAR CÓDIGO AQUÍ ---

// --- VISTA PARA "ALL APPS" ---
const AllAppsView = () => {
    // --- Sub-componente para una tarjeta de Aplicación Individual ---
    const AppCard = ({ icon, name, author, downloads, description, rating, reviews, price }) => (
        <Card className="flex flex-col h-full transition-shadow hover:shadow-md">
            <CardContent className="p-4 flex-grow">
                <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                        <img src={icon} alt={`${name} logo`} className="w-12 h-12 rounded-lg border" />
                        <div>
                            <h3 className="font-semibold text-base">{name}</h3>
                            <p className="text-xs text-muted-foreground">by {author}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                        <Download className="w-3 h-3" />
                        <span>{downloads}</span>
                    </div>
                </div>
                <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{description}</p>
            </CardContent>
            <div className="border-t p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                        ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{reviews > 0 ? `(${reviews})` : 'No reviews'}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-1 rounded-md bg-secondary text-secondary-foreground">{price}</span>
                    <BadgeCheck className="w-5 h-5 text-blue-500" title="White-label available" />
                </div>
            </div>
        </Card>
    );

    // --- Sub-componente para la Paginación ---
    const Pagination = () => (
        <div className="flex justify-center items-center gap-2 mt-8">
            <Button variant="outline">Previous</Button>
            <Button variant="outline" size="icon" className="bg-primary text-primary-foreground">1</Button>
            <Button variant="ghost" size="icon">2</Button>
            <Button variant="ghost" size="icon">3</Button>
            <Button variant="ghost" size="icon">...</Button>
            <Button variant="ghost" size="icon">61</Button>
            <Button variant="outline">Next</Button>
        </div>
    );
    
    // --- Datos para los filtros ---
    const FilterCheckboxOption = ({ label }) => (
        <div className="flex items-center space-x-2"><Checkbox id={label.toLowerCase().replace(/ /g, '-')} /><Label htmlFor={label.toLowerCase().replace(/ /g, '-')} className="font-normal">{label}</Label></div>
    );
    const categoriesOptions = ['Advertising', 'Analytics & Data', 'Calling', 'Crm', 'E-Commerce', 'Email', 'Lead Generation', 'Marketing Automation', 'Other'];
    const businessNicheOptions = ['Marketing Agency', 'Real Estate', 'Consultant', 'Home Services', 'Financial Services', 'Health'];
    const pricingOptions = ['Free', 'Paid', 'Usage Based'];
    const installOptions = ['All', 'Everyone', 'Agency'];

    const allAppsFilterSections = [
        { value: "collections", title: "Collections", content: <p className="text-sm p-1 text-muted-foreground">Placeholder for collections...</p> },
        { value: "categories", title: "Categories", content: <div className="space-y-2 max-h-60 overflow-y-auto pr-2">{categoriesOptions.map(opt => <FilterCheckboxOption key={opt} label={opt} />)}</div> },
        { value: "app-contains", title: "App Contains", content: <div className="space-y-2">{['Workflows', 'Tags', 'Custom Fields'].map(opt => <FilterCheckboxOption key={opt} label={opt} />)}</div> },
        { value: "business-niche", title: "Business Niche", content: <div className="space-y-2 max-h-60 overflow-y-auto pr-2">{businessNicheOptions.map(opt => <FilterCheckboxOption key={opt} label={opt} />)}</div> },
        { value: "built-by", title: "Built By", content: <p className="text-sm p-1 text-muted-foreground">Placeholder for builders...</p> },
        { value: "pricing", title: "Pricing", content: <div className="space-y-2">{pricingOptions.map(opt => <FilterCheckboxOption key={opt} label={opt} />)}</div> },
        { value: "who-can-install", title: "Who can install the app?", content: (<RadioGroup defaultValue="all" className="space-y-2">{installOptions.map(opt => <div key={opt} className="flex items-center space-x-2"><RadioGroupItem value={opt.toLowerCase()} id={opt.toLowerCase()} /><Label htmlFor={opt.toLowerCase()} className="font-normal">{opt}</Label></div>)}</RadioGroup>) },
    ];
    
    // --- Datos de ejemplo para las aplicaciones ---
    const appsData = [
        { icon: "https://via.placeholder.com/48/ddddff/333399?text=CS", name: "My CRM Support", author: "MyCRMSupport", downloads: "428.5K", description: "Your One Stop Shop for CRM Support", rating: 4, reviews: 6, price: "Free" },
        { icon: "https://via.placeholder.com/48/ffe5dd/aa6611?text=M", name: "Make", author: "by Make", downloads: "243.1K", description: "Make lets you design, build, and automate by connecting HighLevel with thousands of apps in ju...", rating: 5, reviews: 5, price: "Free" },
        { icon: "https://via.placeholder.com/48/ddf9ff/2266aa?text=PC", name: "Pabbly Connect", author: "by Magnet Brains Software...", downloads: "200.4K", description: "Easily Connect Multiple Applications & Automate your Tasks!", rating: 0, reviews: 0, price: "Free" },
        { icon: "https://via.placeholder.com/48/ffdddd/aa2222?text=CA", name: "Create Assistants Hybrid-Agents", author: "by Create Assistants Labs, Inc.", downloads: "116.1K", description: "Actionable hybrid AI agents (voice + chat) that can do anything with no code, webhooks or workflows.", rating: 5, reviews: 8, price: "Free" },
        { icon: "https://via.placeholder.com/48/d9f5d3/2b801a?text=S", name: "Synthflow.ai - AI Phone Assistant", author: "by Synthflow.ai", downloads: "77.4K", description: "Synthflow.ai - AI Phone Assistant", rating: 3, reviews: 5, price: "Free" },
        { icon: "https://via.placeholder.com/48/fff2cc/b38600?text=C", name: "Consolidata", author: "by Consolidata", downloads: "69.4K", description: "Build marketing dashboards for your agency clients in minutes.", rating: 0, reviews: 0, price: "Free" },
        { icon: "https://via.placeholder.com/48/e8dff5/5e2a84?text=SH", name: "Signal House SMS", author: "by Signal House", downloads: "52.5K", description: "Buy, Manage, Message, All in One House 🏠", rating: 5, reviews: 2, price: "Free" },
        { icon: "https://via.placeholder.com/48/d1e9f0/1a5b78?text=CS", name: "myCRMsim - SMS, iMessage & ...", author: "by JAG Digital", downloads: "52.3K", description: "Unlimited SMS, iMessage & WhatsApp", rating: 4, reviews: 12, price: "Free" },
        { icon: "https://via.placeholder.com/48/f0e6e6/783b3b?text=WD", name: "WAVV Dialer", author: "by WAVV Communications", downloads: "40.5K", description: "A Truly Embedded Multi-Line Dialer", rating: 5, reviews: 2, price: "Free" },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6">
            <FilterSidebar sections={allAppsFilterSections} defaultOpen={['collections', 'categories', 'app-contains', 'business-niche', 'built-by', 'pricing', 'who-can-install']} />
            <main className="lg:col-span-3">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-semibold">1270 Apps</h2>
                    <div className="relative w-full sm:max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search Apps" className="pl-10" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {appsData.map(app => <AppCard key={app.name} {...app} />)}
                </div>
                <Pagination />
            </main>
        </div>
    );
};

// --- REEMPLAZA TU COMPONENTE AppMarketplacePage CON ESTE ---
export default function AppMarketplacePage() {
    const [activeTab, setActiveTab] = useState('All Apps'); // <-- 1. CAMBIA ESTA LÍNEA
    const [showSettings, setShowSettings] = useState(false);
    const mainNavItems = ['All Apps', 'Installed Apps', 'App Reselling', 'AI Agents'];
    
    const renderContent = () => {
        switch(activeTab) {
            case 'All Apps': return <AllAppsView />; // <-- 2. AGREGA ESTA LÍNEA
            case 'Installed Apps': return <InstalledAppsView />;
            case 'App Reselling': return <AppResellingView />;
            case 'AI Agents': return <AiAgentsView />;
            default: return <div className="text-center py-20 text-muted-foreground">Content for {activeTab} is not available.</div>;
        }
    };

    return (
        <div className="p-6 sm:p-8 bg-background text-foreground">
            {/* 3. RENDERIZACIÓN CONDICIONAL */}
            {showSettings ? (
                <MarketplaceSettingsView onBackClick={() => setShowSettings(false)} />
            ) : (
                <>
                    <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold">Marketplace Apps</h1>
                            <p className="text-muted-foreground">Get more out of your CRM. Explore apps & integrate them with your account seamlessly.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button variant="outline">Agency View <ChevronDown className="ml-2 h-4 w-4" /></Button>
                            {/* 2. ONCLICK AÑADIDO AL BOTÓN */}
                            <Button variant="ghost" size="icon" onClick={() => setShowSettings(true)}>
                                <Settings className="h-5 w-5" />
                            </Button>
                        </div>
                    </header>
                    <nav className="mt-6 border-b">
                        <div className="flex items-center gap-4">
                            {mainNavItems.map(item => (
                                <button
                                    key={item}
                                    onClick={() => setActiveTab(item)}
                                    className={`pb-2 px-1 text-sm font-semibold border-b-2 transition-colors ${
                                        activeTab === item ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
                                    }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </nav>
                    {renderContent()}
                </>
            )}
        </div>
    );
}
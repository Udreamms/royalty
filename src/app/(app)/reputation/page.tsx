"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,} from "@/components/ui/dialog";
import {Accordion,AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Table,TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Plus,
    ChevronDown,
    ThumbsUp,
    ThumbsDown,
    Star,
    MessageSquare,
    Link as LinkIcon,
    Wand2,
    Monitor,
    Smartphone,
    AppWindow,
    Lock,
    RefreshCw,
    Cloud,
    Shield,
    Rocket,
    Bot,
    Users,
    MoreHorizontal,
    Search,
    Hash,
    Pencil,
    Trash2,
    QrCode,
    Globe,
    Info,
    Palette,
    Link2,
    Languages,
    Mail,
    Apple,
    Check,
    Radio,
    Send,
    UserPlus,
    List,
    Settings,
    FileText,
    Bold, 
    Italic, 
    Underline,
    ListOrdered,
    X,
    UploadCloud,
} from 'lucide-react';

// --- Icono de mano saludando ---
const WavingHandIcon = () => (
    <div className="text-4xl">👋</div>
);

// --- Componente para la vista "Overview" ---
const OverviewView = () => {
    // Sub-componente para un item de la lista "Get Started"
    const GetStartedItem = ({ text, isDone, hasLink }: { text: string; isDone?: boolean; hasLink?: boolean; }) => (
        <div className="flex items-center gap-3 text-sm">
            <div className={`w-5 h-5 rounded-full border-2 ${isDone ? 'bg-blue-500 border-blue-500' : 'border-muted-foreground'}`}></div>
            <span className="flex-grow">{text}</span>
            {hasLink && <Button variant="link" className="p-0 h-auto text-primary">Go →</Button>}
        </div>
    );
    
    // Sub-componente para una tarjeta de métrica
    const KpiCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
        <Card>
            <CardHeader><CardTitle className="text-base font-semibold">{title}</CardTitle></CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );

    // Sub-componente para una barra de rating
    const RatingBar = ({ stars, percentage }: { stars: number; percentage: number }) => (
        <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">{stars} Stars</span>
            <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Overview</h1>
                <Button>Send Review Request</Button>
            </header>

            <Card>
                <CardContent className="p-6 flex items-start gap-6">
                    <div className="flex-shrink-0">
                        <WavingHandIcon />
                        <h2 className="text-lg font-semibold mt-2">Hi Udreamms</h2>
                        <p className="text-sm text-muted-foreground">Finish all these steps to Set up Your Reputation Dashboard</p>
                        <Button variant="link" className="p-0 h-auto text-sm mt-2">Skip Onboarding</Button>
                    </div>
                    <div className="flex-grow space-y-4">
                        <div className="flex justify-between items-center">
                            <p className="text-sm font-semibold">Get Started</p>
                            <p className="text-sm text-muted-foreground">0/6</p>
                        </div>
                        <Progress value={0} className="h-2" />
                        <div className="grid grid-cols-2 gap-x-8 gap-y-3 pt-2">
                            <GetStartedItem text="Connect Google Business Profile" hasLink />
                            <GetStartedItem text="Setup Review Link" />
                            <GetStartedItem text="Configure Reviews AI" />
                            <GetStartedItem text="Create a Review Widget" />
                            <GetStartedItem text="Send your 1st Review Request" />
                            <GetStartedItem text="Connect more platforms" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue="my-stats">
                <TabsList>
                    <TabsTrigger value="my-stats">My Stats</TabsTrigger>
                    <TabsTrigger value="competitor-analysis">Competitor Analysis</TabsTrigger>
                </TabsList>
                <TabsContent value="my-stats" className="space-y-6">
                    <div className="pt-4"><Select defaultValue="6-months"><SelectTrigger className="w-[180px]"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="6-months">Last 6 Months</SelectItem></SelectContent></Select></div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <KpiCard title="Invites Goal">
                            <div className="flex items-center justify-center relative h-32">
                                <p className="absolute text-4xl font-bold">0</p>
                                <svg className="w-40 h-40 transform -rotate-90"><circle className="text-muted" strokeWidth="12" stroke="currentColor" fill="transparent" r="52" cx="80" cy="80"/><circle className="text-primary" strokeWidth="12" strokeDasharray="326.7" strokeDashoffset="326.7" strokeLinecap="round" stroke="currentColor" fill="transparent" r="52" cx="80" cy="80"/></svg>
                            </div>
                            <p className="text-center text-muted-foreground text-sm">→ 0% out of 20</p>
                        </KpiCard>
                        <KpiCard title="Reviews Received">
                            <p className="text-5xl font-bold">0</p>
                            <p className="text-sm text-muted-foreground mt-2">→ 0% vs Previous 6 Months</p>
                            <div className="h-4 w-full bg-muted rounded-full mt-4"></div>
                        </KpiCard>
                        <KpiCard title="Sentiment">
                            <div className="flex justify-around items-center">
                                <div className="text-center"><ThumbsUp className="h-8 w-8 text-green-500 mx-auto"/><p className="text-2xl font-bold mt-2">0</p><p className="text-sm text-muted-foreground">→ 0%</p></div>
                                <div className="text-center"><ThumbsDown className="h-8 w-8 text-red-500 mx-auto"/><p className="text-2xl font-bold mt-2">0</p><p className="text-sm text-muted-foreground">→ 0%</p></div>
                            </div>
                        </KpiCard>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card><CardContent className="p-6">
                            <h3 className="text-lg font-semibold">Average Rating</h3>
                            <div className="flex items-center gap-8 mt-4">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center"><Star className="h-8 w-8 text-yellow-500"/></div>
                                    <p className="text-lg font-bold mt-2">0 → 0</p>
                                </div>
                                <div className="w-full space-y-3">
                                    <RatingBar stars={5} percentage={0} />
                                    <RatingBar stars={4} percentage={0} />
                                    <RatingBar stars={3} percentage={0} />
                                    <RatingBar stars={2} percentage={0} />
                                    <RatingBar stars={1} percentage={0} />
                                </div>
                            </div>
                        </CardContent></Card>
                        <Card><CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 mb-4"></div>
                            <p className="font-semibold">Start Growing your Online Visibility Today!</p>
                            <p className="text-sm text-muted-foreground">Get listed across 95+ Digital services Globally</p>
                            <Button variant="secondary" className="mt-4">Activate Listings</Button>
                        </CardContent></Card>
                    </div>

                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card><CardHeader><CardTitle className="text-base font-semibold">Invite Trends</CardTitle></CardHeader><CardContent><div className="h-64 bg-muted/50 rounded-md"></div></CardContent></Card>
                        <Card><CardHeader><CardTitle className="text-base font-semibold">Review Trends</CardTitle></CardHeader><CardContent><div className="h-64 bg-muted/50 rounded-md"></div></CardContent></Card>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card><CardHeader><CardTitle className="text-base font-semibold">Latest Review Requests</CardTitle></CardHeader><CardContent className="text-center py-10"><div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4"><MessageSquare className="h-8 w-8 text-muted-foreground"/></div><h4 className="font-semibold">Start Sending Review Requests</h4><p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">Send your first review request to start building credibility and attracting more customers.</p><Button className="mt-4">Send Review Request</Button></CardContent></Card>
                        <Card><CardHeader><CardTitle className="text-base font-semibold">Latest Reviews</CardTitle></CardHeader><CardContent className="text-center py-10"><div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4"><MessageSquare className="h-8 w-8 text-muted-foreground"/></div><h4 className="font-semibold">No Reviews Yet</h4><p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">Once reviews start coming in, you can manage and respond here to build trust.</p><Button className="mt-4">Start Collecting Reviews</Button></CardContent></Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

// --- Vista para "Requests" ---
const RequestsView = () => (
    <div className="space-y-6">
        <header className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Requests</h1>
            <Button>Send Review Request</Button>
        </header>
        <div className="flex flex-col items-center justify-center text-center p-8 min-h-[60vh]">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-muted-foreground"/>
            </div>
            <h3 className="text-xl font-semibold">Start Sending Review Requests</h3>
            <p className="text-muted-foreground max-w-sm mt-2">
                Send your first review request to start building credibility and attracting more customers.
            </p>
            <Button className="mt-6">Send Review Request</Button>
        </div>
    </div>
);

// --- Vista para "Reviews" ---
const ReviewsView = () => (
    <div className="space-y-6">
        <header className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Reviews</h1>
            <div className="flex items-center gap-2">
                <Button variant="outline" className="border-purple-500 text-purple-500 hover:bg-purple-50 hover:text-purple-600">
                    <Wand2 className="mr-2 h-4 w-4" /> AI Summary
                </Button>
                <Button>Send Review Request</Button>
            </div>
        </header>
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Select><SelectTrigger className="w-[180px]"><SelectValue placeholder="Ratings" /></SelectTrigger></Select>
                <Select><SelectTrigger className="w-[180px]"><SelectValue placeholder="Sources" /></SelectTrigger></Select>
                <div className="flex items-center gap-2 border rounded-md px-3 py-1.5 text-sm h-10">
                    <span>Start Date</span><span>→</span><span>End Date</span>
                </div>
            </div>
            <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search" className="pl-10" />
            </div>
        </div>
        <div className="flex flex-col items-center justify-center text-center p-8 min-h-[50vh]">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-muted-foreground"/>
            </div>
            <h3 className="text-xl font-semibold">No Reviews Yet</h3>
            <p className="text-muted-foreground max-w-sm mt-2">
                Once reviews start coming in, you can manage and respond here to build trust.
            </p>
            <Button className="mt-6">Start Collecting Reviews</Button>
        </div>
    </div>
);

// --- Vista para "Widgets" ---
const WidgetsView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[80vh]">
        <div className="lg:col-span-2 bg-muted/50 rounded-lg p-6 flex flex-col">
            <div className="flex justify-end gap-2 mb-4">
                <Button variant="outline" size="icon"><Monitor className="h-4 w-4"/></Button>
                <Button variant="outline" size="icon"><Smartphone className="h-4 w-4"/></Button>
            </div>
            <div className="flex-grow border bg-background rounded-md p-6 flex items-end">
                <div className="w-full bg-card p-4 rounded-lg shadow-lg flex justify-between items-center">
                    <div>
                        <p className="font-semibold">What our clients say about us</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                           <p className="font-bold text-lg">0.00</p>
                           <div className="flex items-center"><Star className="h-4 w-4"/><Star className="h-4 w-4"/><Star className="h-4 w-4"/><Star className="h-4 w-4"/><Star className="h-4 w-4"/></div>
                           <p className="text-xs text-muted-foreground">0 reviews</p>
                        </div>
                        <Button>Write a review</Button>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex flex-col">
            <Tabs defaultValue="templates" className="flex-grow flex flex-col">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="saved">Saved Widgets</TabsTrigger>
                    <TabsTrigger value="templates">Templates</TabsTrigger>
                </TabsList>
                <TabsContent value="templates" className="flex-grow mt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 gap-2 text-muted-foreground hover:border-primary hover:text-primary cursor-pointer">
                            <Plus className="h-8 w-8"/>
                            <p className="font-semibold text-sm">Create new</p>
                        </div>
                        <div className="border-2 border-primary rounded-lg p-4 flex flex-col items-center justify-center text-center gap-2">
                            <div className="p-2 bg-blue-100 rounded-md"><AppWindow className="h-8 w-8 text-primary"/></div>
                            <p className="font-semibold text-sm">Untitled</p>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
            <div className="mt-auto pt-4">
                <Button className="w-full">Edit Widget</Button>
            </div>
        </div>
    </div>
);

// --- Vista para "Listings" ---
const ListingsView = () => {
    const features = [
        { icon: List, label: "Listing Management" },
        { icon: LinkIcon, label: "Premium Backlinks" },
        { icon: Cloud, label: "Sync Functionality" },
        { icon: Shield, label: "Duplicate Suppression" },
    ];
    return (
        <div className="text-center py-12">
            <h1 className="text-5xl font-extrabold">One Tool to <span className="text-primary">Rank</span></h1>
            <div className="w-full max-w-lg h-64 bg-muted/50 rounded-lg mx-auto my-8 flex items-center justify-center"><p>Illustration Placeholder</p></div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Don't leave your online reputation to chance harness the potential of Listings today !!</p>
            <Card className="max-w-2xl mx-auto my-8 p-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-muted rounded-full"><Lock className="h-6 w-6"/></div>
                        <div>
                            <h3 className="font-semibold">Unlock Your Business's Potential</h3>
                            <p className="text-sm text-muted-foreground">Scan Now to Discover if a Listings Subscription is Your Missing Link</p>
                        </div>
                    </div>
                    <Button variant="outline">Scan my business for FREE!</Button>
                </div>
            </Card>
            <h3 className="text-xl font-bold">What we offer</h3>
            <div className="grid grid-cols-4 gap-8 max-w-3xl mx-auto mt-6">
                {features.map(f => (
                    <div key={f.label} className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center"><f.icon className="h-8 w-8 text-muted-foreground"/></div>
                        <p className="font-semibold text-sm">{f.label}</p>
                    </div>
                ))}
            </div>
            <Button size="lg" className="mt-12">Activate Listings</Button>
        </div>
    );
};

// --- Vista para "Settings" de Reputation ---
const ReputationSettingsView = () => {
    const settingsNav = ["Reviews AI", "Review Link", "SMS Requests", "Email Requests", "WhatsApp Requests", "Reviews QR", "Spam Reviews", "Integrations"];
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
                <nav className="flex flex-col gap-1">
                    {settingsNav.map(item => <Button key={item} variant="ghost" className={`justify-start ${item === 'Reviews AI' ? 'bg-muted font-semibold' : ''}`}>{item}</Button>)}
                </nav>
            </aside>
            <main className="lg:col-span-3 space-y-6">
                <Card><CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Reviews AI</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <Card className="p-4"><RadioGroup><div className="flex items-start gap-3"><div className="flex-grow"><Label>Off</Label><p className="text-xs text-muted-foreground">Turn off Reviews AI to stop receiving suggestions.</p></div><RadioGroupItem value="off"/></div></RadioGroup></Card>
                        <Card className="p-4"><RadioGroup><div className="flex items-start gap-3"><div className="flex-grow"><Label>Suggestive</Label><p className="text-xs text-muted-foreground">Helps you articulate review responses</p></div><RadioGroupItem value="suggestive"/></div></RadioGroup></Card>
                        <Card className="p-4 border-primary"><RadioGroup defaultValue="auto"><div className="flex items-start gap-3"><div className="flex-grow"><Label>Auto Responses</Label><p className="text-xs text-muted-foreground">Automatically sends review responses</p></div><RadioGroupItem value="auto"/></div></RadioGroup></Card>
                    </div>
                    <div className="flex justify-between items-end mt-4">
                        <div><Label>Wait time before responding</Label><div className="flex items-center border rounded-md w-fit mt-1"><Button variant="ghost" size="icon">-</Button><Input className="w-16 border-none text-center" defaultValue="0" /><Button variant="ghost" size="icon">+</Button><Select defaultValue="days"><SelectTrigger className="w-24 border-none"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="days">days</SelectItem></SelectContent></Select></div></div>
                        <Button variant="link" className="text-primary"><Rocket className="mr-2 h-4 w-4"/> Upgrade to unlimited AI Employee plan →</Button>
                    </div>
                </CardContent></Card>
                <Card><CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Reviews AI Agents</h2>
                        <div className="flex gap-2"><Button variant="outline">Create Starter Agents</Button><Button>Create Agent</Button></div>
                    </div>
                    {/* ... Aquí iría la tabla de Agentes ... */}
                </CardContent></Card>
            </main>
        </div>
    );
};

// --- Vista para "Review Link" ---
const ReviewLinkSettingsView = () => (
    <div className="space-y-6">
        <header>
            <h2 className="text-xl font-bold">Review Link</h2>
            <p className="text-muted-foreground">Configure your Review Link to collect feedback from customers</p>
        </header>
        <Card>
            <CardContent className="p-4 flex items-center justify-between">
                <div>
                    <Label htmlFor="review-balancing" className="font-semibold">Review Balancing</Label>
                    <p className="text-sm text-muted-foreground">Automatically balance reviews for multiple socials</p>
                </div>
                <div className="flex items-center gap-4">
                    <Switch id="review-balancing" />
                    <Button variant="outline">Configure Balance</Button>
                </div>
            </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <RadioGroup defaultValue="custom-link">
                <Label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5">
                    <RadioGroupItem value="custom-link" id="custom-link-radio" />
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded-md"><Hash className="h-5 w-5"/></div>
                        <div><p className="font-semibold">Custom Link</p><p className="text-sm text-muted-foreground">No Link Found</p></div>
                    </div>
                </Label>
            </RadioGroup>
            <Card>
                <CardContent className="p-6 space-y-2">
                    <h3 className="font-semibold">Setup your custom link</h3>
                    <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-10" defaultValue="www.custom-link.business.com/review" />
                    </div>
                    <p className="text-xs text-muted-foreground">Your customers will provide reviews through the given link</p>
                </CardContent>
            </Card>
        </div>
    </div>
);

// --- Vista para "SMS Review Requests" ---
const SmsRequestsSettingsView = () => (
     <div className="space-y-6">
        <header className="flex justify-between items-center">
            <div>
                <h2 className="text-xl font-bold">SMS Review Requests</h2>
                <p className="text-muted-foreground">Customize the message sent automatically to request reviews from your customers on a recurring basis</p>
            </div>
            <Switch />
        </header>
        <div className="grid grid-cols-3 gap-4">
            <div><Label>When to send SMS after check-in?</Label><Select defaultValue="immediately"><SelectTrigger><SelectValue/></SelectTrigger></Select></div>
            <div><Label>Until clicked, repeat this every</Label><Select defaultValue="dont-repeat"><SelectTrigger><SelectValue/></SelectTrigger></Select></div>
            <div><Label>Maximum retries</Label><Select defaultValue="1"><SelectTrigger><SelectValue/></SelectTrigger></Select></div>
        </div>
        <Card>
            <CardHeader><div className="flex justify-between items-center"><CardTitle>Manage Your SMS Templates</CardTitle><div className="flex gap-2"><Button variant="outline"><Settings className="h-4 w-4 mr-2"/>Set SMS Templates</Button><Button><Plus className="h-4 w-4 mr-2"/>Create New</Button></div></div><CardDescription>View and manage all your SMS templates</CardDescription></CardHeader>
            <CardContent><div className="border rounded-lg"><p className="p-4 text-center text-sm text-muted-foreground">No templates configured for this Sub-Account. Set one to get started.</p></div></CardContent>
        </Card>
    </div>
);

// --- Vista para "Email Review Requests" ---
const EmailRequestsSettingsView = () => (
    <div className="space-y-6">
        <header className="flex justify-between items-center">
            <div><h2 className="text-xl font-bold">Email Review Requests</h2><p className="text-muted-foreground">Engage your audience with a personalized touch.</p></div>
            <Switch />
        </header>
        <div className="grid grid-cols-3 gap-4">
            <div><Label>When to send Email after check-in?</Label><Select defaultValue="immediately"><SelectTrigger><SelectValue/></SelectTrigger></Select></div>
            <div><Label>Until clicked, repeat this every</Label><Select defaultValue="dont-repeat"><SelectTrigger><SelectValue/></SelectTrigger></Select></div>
            <div><Label>Maximum retries</Label><Select defaultValue="1"><SelectTrigger><SelectValue/></SelectTrigger></Select></div>
        </div>
        <div>
            <div className="flex justify-between items-center mb-2">
                <Label className="font-semibold">Choose email templates for your email requests</Label>
                <div className="flex gap-2"><Button variant="outline"><Settings className="h-4 w-4 mr-2"/>Set Email Templates</Button><Button><Plus className="h-4 w-4 mr-2"/>Create New</Button></div>
            </div>
            <Tabs defaultValue="recurring"><TabsList><TabsTrigger value="recurring">Recurring Emails</TabsTrigger><TabsTrigger value="draft">Draft Emails</TabsTrigger></TabsList></Tabs>
            <div className="text-center py-12 text-sm text-muted-foreground flex items-center justify-center gap-2"><Info className="h-4 w-4"/>No email templates configured for this Sub-Account. Set one to get started.</div>
        </div>
    </div>
);

// --- Vista para "WhatsApp Review Requests" ---
const WhatsappRequestsSettingsView = () => (
    <div>
        <h2 className="text-xl font-bold mb-4">WhatsApp Review Requests</h2>
        {/* CORRECCIÓN: Se eliminó el background-image con la URL de placeholder */}
        // LÍNEA CORRECTA:
<div className="border-2 border-green-300 bg-green-50 rounded-lg p-12 text-center">
            <h3 className="font-semibold text-lg">Reach out to your customer on their favourite messaging app</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto my-2">Stay closer to your customers by providing instant support, sending timely updates, and creating engaging interactions.</p>
            <Button className="bg-white text-green-600 border border-green-200 hover:bg-gray-50 shadow-sm">
                {/* Placeholder para el ícono de WhatsApp */}
                <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.46 3.48 1.32 4.94l-1.35 4.95 5.07-1.33c1.4.8 3.01 1.25 4.71 1.25h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM9.53 8.5c.28 0 .53.01.73.02.26.01.48.33.4.64l-.33 1.15c-.05.17-.12.33-.23.47-.2.27-.45.43-.72.4-.12 0-.25-.04-.38-.09-.43-.16-.84-.38-1.22-.64-.53-.37-.96-.86-1.3-1.42-.32-.53-.49-1.1-.49-1.71 0-.19.01-.38.03-.56.09-.54.49-.97 1.05-1.05h.33c.18 0 .34.06.49.18.15.12.23.29.26.47l.15.78c.03.15.01.31-.06.45-.07.14-.18.25-.32.31-.22.1-.46.06-.66-.09-.32-.22-.55-.54-.68-.88-.03-.08-.03-.17-.01-.25.02-.08.06-.15.12-.2.06-.05.14-.07.21-.07zM15.3 12.9c-.21.43-.52.79-.89 1.07-.37.28-.79.48-1.24.58h-.05c-.6.08-1.21-.08-1.71-.43-.49-.35-.89-.8-1.17-1.32-.28-.52-.43-1.1-.43-1.72s.15-1.2.44-1.72c.28-.52.68-1 1.17-1.32.5-.35 1.11-.51 1.71-.43h.05c.45.1.86.3 1.24.58.37.28.68.64.89 1.07.21.43.32.9.32 1.4s-.11.97-.32 1.4z"></path></svg>
                Connect WhatsApp
            </Button>
        </div>
    </div>
);

// --- Vista para "Reviews QR" ---
const ReviewsQrSettingsView = () => (
    <div className="space-y-6">
        <header className="flex justify-between items-center">
            <div>
                <h2 className="text-xl font-bold">Reviews QR</h2>
                <p className="text-muted-foreground">Create and customize your QR Codes</p>
            </div>
            <Button><Plus className="mr-2 h-4 w-4"/>Create QR Code</Button>
        </header>
        <Card className="flex flex-col items-center justify-center text-center p-8 min-h-[50vh]">
            <QrCode className="h-24 w-24 text-primary mb-4"/>
            <h3 className="text-xl font-semibold">Create your QR Code now</h3>
            <p className="text-muted-foreground">Time's ticking! Let's craft your first QR code to boost review collection.</p>
            <Button className="mt-6"><Plus className="mr-2 h-4 w-4"/>New</Button>
        </Card>
    </div>
);

// --- Vista para "Spam Reviews" ---
const SpamReviewsSettingsView = () => (
    <div className="space-y-6">
        <h2 className="text-xl font-bold">Spam Reviews</h2>
        <RadioGroup defaultValue="on" className="grid grid-cols-2 gap-4">
            <Label className="flex items-start gap-4 border rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5">
                <RadioGroupItem value="off" id="spam-off" />
                <div className="flex-grow">
                    <p className="font-semibold">Off</p>
                    <p className="text-sm text-muted-foreground">Turn Off Reviews Spam Detection</p>
                </div>
            </Label>
            <Label className="flex items-start gap-4 border rounded-lg p-4 cursor-pointer [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5">
                <RadioGroupItem value="on" id="spam-on" />
                <div className="flex-grow">
                    <p className="font-semibold">On</p>
                    <p className="text-sm text-muted-foreground">Automatically Detects whether incoming review is spam or not</p>
                </div>
            </Label>
        </RadioGroup>
        <div>
            <h3 className="font-semibold">Spam Detection of Reviews</h3>
            <p className="text-sm text-muted-foreground">Enabling Spam Detection of Reviews will have the following impacts in the system.</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                <li>All new incoming reviews will be automatically detected if they are spam or not.</li>
                <li>Users will have control to override the decision taken by the system.</li>
                <li>Automatic Reviews Reply will not be sent for spam detected reviews.</li>
                <li>Scheduled Review Replies can be stopped by manually marking reviews as spam.</li>
                <li>Spam detected reviews will not show up in Review Widget.</li>
                <li>Spam detected reviews will not be added in Overview Dashboard.</li>
            </ul>
        </div>
    </div>
);

// --- Vista para "Integrations" de Reputation ---
const IntegrationsSettingsView = () => {
    const platforms = ["Airbnb", "Aliexpress", "Angi", "Angies List", "Amazon", "Agoda", "Apple App Store", "Avvo", "Booking Com", "Capterra", "Car Gurus", "Cars Com", "Citysearch", "Consumer Affairs", "Dealerrater", "Ebay"];
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">Integrations</h2>
            <p className="text-muted-foreground">Add review platforms by entering the page link to import reviews.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="flex flex-col items-center justify-center text-center p-4 gap-2 border-dashed">
                    <Plus className="h-8 w-8 text-muted-foreground"/>
                    <p className="font-semibold">Custom Links</p>
                    <Button variant="outline" size="sm">Add Platform</Button>
                </Card>
                {platforms.map(p => (
                    <Card key={p} className="flex flex-col items-center justify-center text-center p-4 gap-2">
                        <div className="w-12 h-12 bg-muted rounded-md mb-2 flex items-center justify-center font-bold text-xs">{p.split(' ')[0]}</div>
                        <p className="font-semibold text-sm">{p}</p>
                        <Button variant="outline" size="sm">Integrate</Button>
                    </Card>
                ))}
            </div>
        </div>
    );
};

// --- Componente Simulado de Editor de Texto Rico ---
const MockRichTextEditor = () => (
    <div className="border rounded-md">
        <div className="flex items-center gap-1 border-b p-2 bg-muted/50">
            <Button variant="ghost" size="icon" className="h-8 w-8" disabled><Bold className="h-4 w-4"/></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" disabled><Italic className="h-4 w-4"/></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" disabled><Underline className="h-4 w-4"/></Button>
            <Select defaultValue="16px" disabled><SelectTrigger className="w-24 h-8"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="16px">16px</SelectItem></SelectContent></Select>
            <Select defaultValue="paragraph" disabled><SelectTrigger className="w-32 h-8"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="paragraph">Paragraph</SelectItem></SelectContent></Select>
            <Button variant="ghost" size="icon" className="h-8 w-8" disabled><List className="h-4 w-4"/></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" disabled><ListOrdered className="h-4 w-4"/></Button>
        </div>
        <Textarea placeholder="Write something ..." className="border-none focus-visible:ring-0 rounded-t-none" rows={5}/>
    </div>
);

// --- Componente para un bloque de recordatorio individual ---
const ReminderBlock = ({ reminder, onRemove }: { reminder: any, onRemove: () => void }) => (
    <div className="space-y-4 border p-4 rounded-lg">
        <div className="flex justify-between items-center"><div className="w-full mr-2"><Label htmlFor={`reminderName-${reminder.id}`}>Reminder Name *</Label><div className="flex items-center gap-2"><Input id={`reminderName-${reminder.id}`} defaultValue={reminder.name} /><Button variant="outline" size="icon" onClick={onRemove}><Trash2 className="h-4 w-4"/></Button></div></div><Switch defaultChecked={reminder.enabled} /></div>
        <div className="grid grid-cols-2 gap-4"><div><Label>Email Template</Label><div className="flex items-center"><Select defaultValue="default"><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="default">Default</SelectItem></SelectContent></Select><Button variant="link">Preview</Button></div></div><div><Label>SMS Template</Label><div className="flex items-center"><Select defaultValue="default"><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="default">Default</SelectItem></SelectContent></Select><Button variant="link">Manage</Button></div></div></div>
        <div><Label htmlFor={`subject-${reminder.id}`}>Subject *</Label><Input id={`subject-${reminder.id}`} defaultValue={reminder.subject} /></div>
        <div><Label>Reminder Frequency</Label><div className="flex items-center gap-2 flex-wrap"><span>Every</span><Input className="w-16" defaultValue={reminder.freq.every} /><Select defaultValue={reminder.freq.unit}><SelectTrigger className="w-28"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="Days">Days</SelectItem><SelectItem value="Hours">Hours</SelectItem></SelectContent></Select><Select defaultValue={reminder.freq.timing}><SelectTrigger className="w-28"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="Before">Before</SelectItem><SelectItem value="After">After</SelectItem></SelectContent></Select><Select defaultValue={reminder.freq.event}><SelectTrigger className="w-48"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="Invoice is overdue">Invoice is overdue</SelectItem></SelectContent></Select><span>Max Reminders</span><Input className="w-16" defaultValue={reminder.freq.max} /></div></div>
        <div><Label>Business Hours</Label><div className="flex items-center gap-2"><Select defaultValue="8:00"><SelectTrigger className="w-28"><SelectValue/></SelectTrigger></Select><Select defaultValue="AM"><SelectTrigger className="w-20"><SelectValue/></SelectTrigger></Select><span>to</span><Select defaultValue="6:00"><SelectTrigger className="w-28"><SelectValue/></SelectTrigger></Select><Select defaultValue="PM"><SelectTrigger className="w-20"><SelectValue/></SelectTrigger></Select></div></div>
        <div><Label>Preferred Timezone</Label><RadioGroup defaultValue="contact" className="flex items-center gap-4 mt-2"><div className="flex items-center space-x-2"><RadioGroupItem value="business" id={`r1-${reminder.id}`} /><Label htmlFor={`r1-${reminder.id}`}>Business Timezone</Label></div><div className="flex items-center space-x-2"><RadioGroupItem value="contact" id={`r2-${reminder.id}`} /><Label htmlFor={`r2-${reminder.id}`}>Contact Timezone</Label></div></RadioGroup></div>
    </div>
);

// --- Vista para "Reminder Settings" ---
const ReminderSettingsView = () => {
    const initialReminders = [{ id: 1, name: "Reminder 1", subject: "{{ invoice.company.name }}} Friendly Reminder:", freq: { every: 3, unit: "Days", timing: "Before", event: "Invoice is overdue", max: 1 }, enabled: true }, { id: 2, name: "Reminder 2", subject: "{{ invoice.company.name }}} Action Required:", freq: { every: 1, unit: "Hours", timing: "Before", event: "Invoice is overdue", max: 1 }, enabled: true }, { id: 3, name: "Reminder 3", subject: "{{ invoice.company.name }}} Urgent: Invoice #{{", freq: { every: 7, unit: "Days", timing: "After", event: "Invoice is overdue", max: 1 }, enabled: true },];
    const [reminders, setReminders] = useState(initialReminders);
    const addReminder = () => { const newId = reminders.length > 0 ? Math.max(...reminders.map(r => r.id)) + 1 : 1; setReminders([...reminders, { id: newId, name: `Reminder ${newId}`, subject: "", freq: { every: 1, unit: "Days", timing: "Before", event: "Invoice is overdue", max: 1}, enabled: true }]); };
    const removeReminder = (id: number) => { setReminders(reminders.filter(r => r.id !== id)); };
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold">Invoice Reminders</h3>
            <p className="text-sm text-muted-foreground">Invoice reminders are applied to all one-time and recurring invoices where Automatic Payment is disabled and a payment schedule doesn't exist.</p>
            <div className="space-y-4">{reminders.map(reminder => (<ReminderBlock key={reminder.id} reminder={reminder} onRemove={() => removeReminder(reminder.id)} />))}</div>
            <Button variant="outline" onClick={addReminder}><Plus className="mr-2 h-4 w-4"/>Add another reminder</Button>
        </div>
    );
};

// --- Componente Reutilizable para un Bloque de Notificación ---
const NotificationBlock = ({ title, description, defaultSubject, showSms = true }: { title: string, description: string, defaultSubject: string, showSms?: boolean }) => (
    <div className="space-y-4">
        <div className="flex items-center justify-between"><div><Label className="font-semibold text-base">{title}</Label><p className="text-sm text-muted-foreground">{description}</p></div><Switch defaultChecked /></div>
        <div className={showSms ? "grid grid-cols-2 gap-4" : ""}>
            <div><Label>Email Template</Label><div className="flex items-center"><Select defaultValue="default"><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="default">Default</SelectItem></SelectContent></Select><Button variant="link">Preview</Button></div></div>
            {showSms && (<div><Label>SMS Template</Label><div className="flex items-center"><Select defaultValue="default"><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="default">Default</SelectItem></SelectContent></Select><Button variant="link">Manage</Button></div></div>)}
        </div>
        <div><Label>Subject</Label><Input defaultValue={defaultSubject} /></div>
    </div>
);

// --- Vista para "Customer Notifications" ---
const CustomerNotificationsView = () => {
    const notifications = [{ title: "Invoice received", description: "Template used to send the invoice", subject: "{{ invoice.company.name }}} Invoice received" }, { title: "Estimate Received", description: "Template used to send the estimate", subject: "{{ invoice.company.name }}} Estimate received" }, { title: "Invoice payment successful", description: "Template used when an attempt to pay the invoice is successful", subject: "{{ invoice.company.name }}} Invoice payment su..." }, { title: "Invoice payment failed", description: "Template used when an attempt to pay the invoice fails", subject: "{{ invoice.company.name }}} Invoice payment fa..." }, { title: "Auto payment information", description: "Template used to notify customers regarding upcoming auto debit on the card", subject: "{{ invoice.company.name }}} Invoice auto payme..." }, { title: "Auto payment amount changed", description: "Template used to notify customers regarding the change in auto debit amount", subject: "{{ invoice.company.name }}} Invoice auto payme..." }, { title: "Auto payment failed", description: "Template used to notify customers regarding an error in auto debit from the card", subject: "{{ invoice.company.name }}} Invoice auto payme..." },];
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold">Customer Notifications</h3>
            <div className="space-y-8">{notifications.map((notification, index) => (<div key={notification.title}><NotificationBlock title={notification.title} description={notification.description} defaultSubject={notification.subject} showSms={true} />{index < notifications.length - 1 && <Separator className="mt-8" />}</div>))}</div>
        </div>
    );
};

// --- Vista para "Team Notifications" ---
const TeamNotificationsView = () => {
    const notifications = [{ title: "Invoice payment successful", description: "Template used when the invoice has been successfully paid", subject: "{{ invoice.customer.name }}} Invoice payment su..." }, { title: "Invoice payment failed", description: "Template used when an attempt to pay the invoice fails", subject: "{{ invoice.customer.name }}} Invoice payment fa..." }, { title: "The invoice could not be sent", description: "Template used when an invoice could not be sent successfully", subject: "{{ invoice.customer.name }}} Invoice not sent" }, { title: "Estimate accepted successfully", description: "Template used when the estimate has been accepted", subject: "{{ invoice.company.name }}} Estimate accepted" }, { title: "Estimate declined successfully", description: "Template used when the estimate has been declined", subject: "{{ invoice.company.name }}} Estimate declined" }, { title: "Auto payment failed", description: "Template used when an error occurs in auto debit from the card", subject: "{{ invoice.customer.name }}} Invoice auto payme..." }, { title: "Auto payment skipped", description: "Template used when auto payment is skipped because amount was updated manually", subject: "{{ invoice.customer.name }}} Invoice auto payme..." },];
     return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold">Team Notifications</h3>
            <div className="space-y-8">{notifications.map((notification, index) => (<div key={notification.title}><NotificationBlock title={notification.title} description={notification.description} defaultSubject={notification.subject} showSms={false} />{index < notifications.length - 1 && <Separator className="mt-8" />}</div>))}</div>
        </div>
    );
};


// --- Componente de Placeholder ---
const PlaceholderView = ({ title }: { title: string }) => (
    <div className="p-6 text-center">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-muted-foreground">This section is under construction.</p>
    </div>
);

// --- Componente para el Panel de Ajustes ---
const SettingsDialog = ({ open, onOpenChange }: { open: boolean, onOpenChange: (isOpen: boolean) => void }) => {
    const [activeSection, setActiveSection] = useState("Business Information");
    const [customFields, setCustomFields] = useState([{ id: 1 }]);
    const addCustomField = () => setCustomFields([...customFields, { id: Date.now() }]);
    const removeCustomField = (id: number) => setCustomFields(customFields.filter(field => field.id !== id));

    const settingsNav = [
        { name: "Business Information" }, { name: "Email Configurations" }, { name: "Title and Terms" },
        { name: "Payment Settings" }, { name: "Product Settings" }, { name: "Reminder Settings" },
        { name: "Custom fields" }, { name: "Notifications", subItems: ["Customer Notifications", "Team Notifications"] }
    ];

    const renderSectionContent = () => {
        switch(activeSection) {
            case "Business Information": return (<div className="space-y-6"><h3 className="text-xl font-semibold">Business Information</h3><div className="space-y-2"><Label>Business Logo</Label><div className="flex flex-col items-center justify-center w-48 h-48 border-2 border-dashed rounded-lg"><UploadCloud className="h-8 w-8 text-muted-foreground" /><Button variant="link" className="text-sm">Upload a file</Button><p className="text-xs text-muted-foreground">Recommended size: 350 x 180 pixels</p></div></div><div className="grid grid-cols-2 gap-4"><div><Label htmlFor="businessName">Business Name *</Label><Input id="businessName" defaultValue="Udreamms LLC" /></div><div><Label htmlFor="phone">Phone No</Label><Input id="phone" defaultValue="+16507840581" /></div></div><div><Label htmlFor="address">Address</Label><Input id="address" defaultValue="470 W 200 NUnit 115" /></div><div className="grid grid-cols-2 gap-4"><div><Label htmlFor="country">Country *</Label><Select defaultValue="us"><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="us">United States</SelectItem></SelectContent></Select></div><div><Label htmlFor="state">State</Label><Select defaultValue="utah"><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="utah">Utah</SelectItem></SelectContent></Select></div></div><div className="grid grid-cols-2 gap-4"><div><Label htmlFor="city">City</Label><Input id="city" defaultValue="Salt Lake City" /></div><div><Label htmlFor="zip">Zip Code</Label><Input id="zip" defaultValue="84103" /></div></div><div><Label htmlFor="website">Website</Label><Input id="website" defaultValue="medio" /></div><Button variant="outline" className="w-full border-dashed"><Plus className="mr-2 h-4 w-4"/>Add custom value</Button></div>);
            case "Email Configurations": return (<div className="space-y-6"><h3 className="text-xl font-semibold">Email Configurations</h3><div className="space-y-4"><div><Label htmlFor="fromName">From Name</Label><Input id="fromName" placeholder="From Name" /></div><div><Label htmlFor="fromEmail">From Email</Label><Input id="fromEmail" placeholder="From Email" type="email" /></div></div></div>);
            case "Title and Terms": return (<div className="space-y-8"><div className="space-y-4"><h3 className="text-xl font-semibold">Estimate Title & Terms</h3><div><Label htmlFor="estimateTitle">Title</Label><Input id="estimateTitle" defaultValue="ESTIMATE"/></div><div><Label>Terms/Notes</Label><MockRichTextEditor /></div></div><div className="space-y-4"><h3 className="text-xl font-semibold">Invoice Title and Terms</h3><div><Label htmlFor="invoiceTitle">Title *</Label><Input id="invoiceTitle" defaultValue="INVOICE"/></div><div><Label>Terms/Notes</Label><MockRichTextEditor /></div><p className="text-xs text-muted-foreground">Pro tip: It pays to be polite. Invoices that include "please" and "thanks" get paid up to 2 days faster.</p></div></div>);
            case "Payment Settings": return (<div className="space-y-6"><h3 className="text-xl font-semibold">Payment Settings</h3><div className="grid grid-cols-1 gap-4"><div><Label htmlFor="estimateExpire">Estimate expire after X days *</Label><Input id="estimateExpire" defaultValue="14" /></div><div><Label htmlFor="estimatePrefix">Estimate Prefix *</Label><Input id="estimatePrefix" defaultValue="EST-" /><p className="text-xs text-muted-foreground mt-1">Prefix to be used while generating all estimates</p></div><div><Label htmlFor="invoiceDue">Invoice due after X days *</Label><Input id="invoiceDue" defaultValue="14" /></div><div><Label htmlFor="invoicePrefix">Invoice Prefix *</Label><Input id="invoicePrefix" defaultValue="INV-" /><p className="text-xs text-muted-foreground mt-1">Prefix to be used while generating all invoices</p></div></div><Separator /><div><div className="flex items-center justify-between"><h4 className="font-medium">Manage default stripe payment methods for your invoices</h4><Button variant="link" className="p-0 h-auto">Manage</Button></div><p className="text-sm text-muted-foreground">Note - Any invoice created from Workflows, Document & Contracts, Estimates will have these default settings</p></div><Separator /><div className="flex items-center justify-between"><div className="w-2/3"><Label className="font-semibold">Allow Partial Payments</Label><p className="text-sm text-muted-foreground">Allows customer to pay your invoices partially with any amount less than the total amount. Set the minimum percentage of total amount you want to collect in each payment</p></div><Switch /></div><Separator /><div className="flex items-center justify-between"><div className="w-2/3"><Label className="font-semibold">Charge Late Fees</Label><p className="text-sm text-muted-foreground">It will be applied to overdue invoices created past the enablement by default, which can be changed at an invoice level</p></div><Switch /></div><Separator /><div className="flex items-center justify-between"><div className="w-2/3"><Label className="font-semibold">Allow Tip Payments</Label><p className="text-sm text-muted-foreground">Allow customers to add a tip to their invoice payment</p></div><Switch /></div></div>);
            case "Product Settings": return (<div className="space-y-6"><h3 className="text-xl font-semibold">Product Settings</h3><div className="flex items-start justify-between"><div className="w-2/3"><Label className="font-semibold">Import Product Description</Label><p className="text-sm text-muted-foreground">When enabled the product description will be imported from the product to the invoice automatically and you will be able to edit it in the invoice</p></div><Switch defaultChecked/></div><Separator /><div className="flex items-start justify-between"><div className="w-2/3"><Label className="font-semibold">Make Product Description Optional</Label><p className="text-sm text-muted-foreground">Choose whether product descriptions are shown by default or hidden behind an "Add/show description" button in the editor</p></div><Switch defaultChecked/></div></div>);
            case "Reminder Settings": return <ReminderSettingsView />;
            case "Custom fields": return (<div className="space-y-6"><h3 className="text-xl font-semibold">Custom fields</h3><div className="space-y-4">{customFields.map((field, index) => (<div key={field.id} className="flex items-center gap-2"><div className="flex-grow"><Label htmlFor={`cf-${field.id}`}>Custom Field {index + 1} *</Label><Select><SelectTrigger><SelectValue placeholder="Choose an item"/></SelectTrigger><SelectContent><SelectItem value="item1">Item 1</SelectItem></SelectContent></Select></div><Button variant="ghost" size="icon" onClick={() => removeCustomField(field.id)}><X className="h-4 w-4"/></Button></div>))}</div><Button variant="outline" className="w-full border-dashed" onClick={addCustomField}><Plus className="mr-2 h-4 w-4"/>Add more custom field</Button></div>);
            case "Customer Notifications": return <CustomerNotificationsView />;
            case "Team Notifications": return <TeamNotificationsView />;
            default: return <PlaceholderContent title={activeSection} />;
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-6xl h-[90vh] flex flex-col p-0">
                <DialogHeader className="p-6 pb-4 border-b"><DialogTitle>Settings</DialogTitle><DialogDescription>Change your document settings</DialogDescription></DialogHeader>
                <div className="flex flex-grow overflow-hidden">
                    <aside className="w-1/4 border-r p-6 overflow-y-auto">
                        <nav className="flex flex-col gap-1">
                           {settingsNav.map(item => (
                               item.subItems ? (
                                   <Accordion key={item.name} type="single" collapsible>
                                       <AccordionItem value={item.name} className="border-none">
                                           <AccordionTrigger className="py-2 px-3 hover:bg-muted rounded-md">{item.name}</AccordionTrigger>
                                           <AccordionContent className="pl-4">
                                               {item.subItems.map(subItem => (
                                                    <Button key={subItem} variant="ghost" className={`w-full justify-start ${activeSection === subItem ? 'bg-muted font-semibold' : ''}`} onClick={() => setActiveSection(subItem)}>{subItem}</Button>
                                               ))}
                                           </AccordionContent>
                                       </AccordionItem>
                                   </Accordion>
                               ) : (
                                <Button key={item.name} variant="ghost" className={`justify-start ${activeSection === item.name ? 'bg-muted font-semibold' : ''}`} onClick={() => setActiveSection(item.name)}>{item.name}</Button>
                               )
                           ))}
                        </nav>
                    </aside>
                    <main className="w-3/4 overflow-y-auto p-6">{renderSectionContent()}</main>
                </div>
                 <DialogFooter className="p-6 border-t"><Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button><Button>Save</Button></DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// --- Componente de Placeholder para vistas no implementadas ---
const PlaceholderContent = ({ title }: { title: string }) => (
    <div className="p-6 text-center">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-muted-foreground">This section is under construction.</p>
    </div>
);

// --- Componente Principal ---
export default function ReputationPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const navItems = ['Overview', 'Requests', 'Reviews', 'Widgets', 'Listings', 'Settings'];

  const renderContent = () => {
      switch(activeTab) {
          case 'Overview':
              return <OverviewView />;
          // INICIO: CÓDIGO AGREGADO
          case 'Requests':
              return <RequestsView />;
          case 'Reviews':
              return <ReviewsView />;
          case 'Widgets':
              return <WidgetsView />;
          case 'Listings':
              return <ListingsView />;
          case 'Settings':
              return <ReputationSettingsView />;
          // FIN: CÓDIGO AGREGADO
          default:
              return <PlaceholderView title={activeTab} />;
      }
  };

  return (
    <div className="p-6 bg-background text-foreground">
        <header className="flex items-center justify-between border-b pb-2 mb-6">
            <nav className="flex items-center gap-2">
                <h1 className="text-xl font-bold pr-4">Reputation</h1>
                {navItems.map(item => (
                    <Button
                        key={item}
                        variant="ghost"
                        onClick={() => setActiveTab(item)}
                        className={`font-semibold transition-none
                            ${activeTab === item 
                                ? 'text-primary' 
                                : 'text-muted-foreground'
                            }`
                        }
                    >
                        {item}
                    </Button>
                ))}
            </nav>
        </header>
        <main>
            {renderContent()}
        </main>
    </div>
  );
}
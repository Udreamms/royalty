"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from '@/components/ui/separator';
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Badge } from '@/components/ui/badge';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
    Search,
    ListFilter,
    Edit,
    ChevronDown,
    Mail,
    Phone,
    User,
    Users,
    Tag,
    PlusCircle,
    Paperclip,
    Smile,
    Inbox,
    Star,
    Trash2,
    AlignLeft,
    ChevronRight,
    MoreHorizontal,
    BellOff,
    MessageSquareText,
    Webhook,
    Calendar,
    ExternalLink,
    MessageCircle,
    CheckCircle,
    Folders,
    Folder, // Ícono añadido
    Plus,
    Table,
    Filter,
    ClipboardList,
    Briefcase,
    Notebook
} from 'lucide-react';

const QuickFilters = () => (
    <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
            <h4 className="font-semibold">Quick Filters</h4>
            <Button variant="link" size="sm" className="text-xs">Clear Filters</Button>
        </div>
        <div className="space-y-3">
            <p className="text-sm font-medium">Assigned (Contact Owner)</p>
            <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">My Chat</Button>
                <Button variant="outline" size="sm">Assigned To</Button>
                <Button variant="outline" size="sm">Unassigned</Button>
            </div>
        </div>
        <div className="space-y-3">
            <p className="text-sm font-medium">Follower Assignment (Contact)</p>
            <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">Followed by Me</Button>
                <Button variant="outline" size="sm">Followed by Specific User</Button>
            </div>
        </div>
        <div className="space-y-3">
            <p className="text-sm font-medium">Mentions</p>
            <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">Mentions of Me</Button>
                <Button variant="outline" size="sm">Mentions of Specific User</Button>
            </div>
        </div>
        <div className="space-y-3">
            <p className="text-sm font-medium">Last Message Direction</p>
            <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">Inbound</Button>
                <Button variant="outline" size="sm">Outbound</Button>
            </div>
        </div>
        <div className="space-y-3">
            <p className="text-sm font-medium">Last Outbound Message Type</p>
            <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">Manual</Button>
                <Button variant="outline" size="sm">Automated</Button>
            </div>
        </div>
        <div className="space-y-3">
            <p className="text-sm font-medium">Last Message Channel</p>
            <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">Email</Button>
                <Button variant="outline" size="sm">SMS</Button>
                <Button variant="outline" size="sm">GBP</Button>
                <Button variant="outline" size="sm">Live Chat</Button>
                <Button variant="outline" size="sm">Whatsapp</Button>
                <Button variant="outline" size="sm">Facebook</Button>
                <Button variant="outline" size="sm">Calls</Button>
                <Button variant="outline" size="sm">Voicemail</Button>
                <Button variant="outline" size="sm">Instagram</Button>
            </div>
        </div>
        <Separator />
        <div className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Apply</Button>
        </div>
    </div>
);

const ConversationListHeader = () => (
    <div className="p-4 border-b border-border flex-shrink-0">
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-10" />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                            <ListFilter className="h-4 w-4" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80" align="start">
                        <QuickFilters />
                    </PopoverContent>
                </Popover>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><Edit className="h-4 w-4" /></Button>
            </div>
        </div>
    </div>
);

const EmptyState = ({ message, icon }: { message: string, icon: React.ReactNode }) => (
    <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-4 p-4 text-center">
        <div className="text-muted-foreground/50">{icon}</div>
        <p className="font-medium text-base">{message}</p>
    </div>
);

const EmptyConversationPanel = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 h-full min-h-0">
        <div className="lg:col-span-3 flex flex-col border-r border-border min-h-0 bg-card">
            <ConversationListHeader />
            <div className="px-4 py-2 flex items-center justify-between border-b border-border">
                <div className="flex items-center gap-2">
                    <Checkbox id="select-all-empty" />
                    <Label htmlFor="select-all-empty" className="text-sm font-medium text-muted-foreground">0 RESULTS</Label>
                </div>
                <Select defaultValue="latest">
                    <SelectTrigger className="w-[120px] h-8 text-xs">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="latest">Latest-All</SelectItem>
                        <SelectItem value="oldest">Oldest-All</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <EmptyState message="No unread conversations found" icon={<Inbox className="h-16 w-16" />} />
        </div>
        <div className="lg:col-span-6 flex flex-col border-r border-border min-h-0 bg-background">
            <EmptyState message="No conversation selected" icon={<MessageCircle className="h-16 w-16" />} />
        </div>
        <div className="lg:col-span-3 hidden lg:flex flex-col min-h-0 bg-card">
            <EmptyState message="No contact selected" icon={<User className="h-16 w-16" />} />
        </div>
    </div>
);

const ConversationSidebar = () => {
    const [activeTab, setActiveTab] = useState('contact');

    const renderContent = () => {
        switch (activeTab) {
            case 'contact':
                return (
                    <div className="p-4">
                        <Accordion type="multiple" defaultValue={['contact', 'owner', 'dnd']} className="w-full">
                            <AccordionItem value="contact"><AccordionTrigger>Contact</AccordionTrigger><AccordionContent className="space-y-2 text-sm pt-2"><div className="flex justify-between items-center"><p className="text-foreground flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" />siomeyromero@gmail.com</p></div><div className="flex justify-between items-center"><span className="text-muted-foreground flex items-center gap-2"><Phone className="h-4 w-4" /> Phone</span><Button variant="ghost" size="icon" className="h-6 w-6"><PlusCircle className="h-4 w-4" /></Button></div></AccordionContent></AccordionItem>
                            <AccordionItem value="owner"><AccordionTrigger>Owner (Assigned to)</AccordionTrigger><AccordionContent className="pt-2 text-muted-foreground">Unassigned</AccordionContent></AccordionItem>
                            <AccordionItem value="followers"><AccordionTrigger>Followers</AccordionTrigger><AccordionContent className="pt-2"><Input placeholder="Search followers" /></AccordionContent></AccordionItem>
                            <AccordionItem value="tags"><AccordionTrigger>Tags</AccordionTrigger><AccordionContent className="pt-2">No tags yet.</AccordionContent></AccordionItem>
                            <AccordionItem value="automations"><AccordionTrigger>Active Automations</AccordionTrigger><AccordionContent className="pt-2">No active automations.</AccordionContent></AccordionItem>
                            <AccordionItem value="dnd"><AccordionTrigger><div className="flex items-center justify-between w-full"><span>DND</span><Badge variant="outline">OFF</Badge></div></AccordionTrigger><AccordionContent className="space-y-3 text-sm pt-4"><div className="flex items-center space-x-2"><Checkbox id="dnd-all" /><Label htmlFor="dnd-all" className="flex items-center gap-2 font-normal"><BellOff className="h-4 w-4 text-muted-foreground" /> DND All</Label></div><div className="flex items-center space-x-2"><Checkbox id="dnd-calls" /><Label htmlFor="dnd-calls" className="flex items-center gap-2 font-normal"><Phone className="h-4 w-4 text-muted-foreground" /> DND Calls & Voicemails</Label></div><div className="flex items-center space-x-2"><Checkbox id="dnd-text" /><Label htmlFor="dnd-text" className="flex items-center gap-2 font-normal"><MessageSquareText className="h-4 w-4 text-muted-foreground" /> DND Text Messages</Label></div><div className="flex items-center space-x-2"><Checkbox id="dnd-emails" /><Label htmlFor="dnd-emails" className="flex items-center gap-2 font-normal"><Mail className="h-4 w-4 text-muted-foreground" /> DND Emails</Label></div><div className="flex items-center space-x-2"><Checkbox id="dnd-incoming" /><Label htmlFor="dnd-incoming" className="flex items-center gap-2 font-normal"><Webhook className="h-4 w-4 text-muted-foreground" /> DND Incoming</Label></div></AccordionContent></AccordionItem>
                        </Accordion>
                    </div>
                );
            case 'appts':
                return <EmptyState message="No appointments" icon={<Calendar className="h-16 w-16" />} />;
            case 'oppts':
                return <EmptyState message="No opportunities" icon={<Briefcase className="h-16 w-16" />} />;
            case 'tasks':
                return <EmptyState message="No tasks" icon={<ClipboardList className="h-16 w-16" />} />;
            case 'notes':
                return <EmptyState message="No notes" icon={<Notebook className="h-16 w-16" />} />;
            default:
                return null;
        }
    };

    return (
        <div className="lg:col-span-3 hidden lg:flex flex-col min-h-0 bg-card relative">
            <div className="absolute right-0 top-0 h-full w-14 bg-card border-l border-border flex flex-col items-center py-4 space-y-4">
                <Button variant="ghost" size="icon" className={`h-12 w-12 flex flex-col items-center justify-center space-y-1 ${activeTab === 'contact' ? 'bg-muted' : ''}`} onClick={() => setActiveTab('contact')}>
                    <User className="h-5 w-5" /><span className="text-xs">Contact</span>
                </Button>
                <Button variant="ghost" size="icon" className={`h-12 w-12 flex flex-col items-center justify-center space-y-1 ${activeTab === 'appts' ? 'bg-muted' : ''}`} onClick={() => setActiveTab('appts')}>
                    <Calendar className="h-5 w-5" /><span className="text-xs">Appts</span>
                </Button>
                <Button variant="ghost" size="icon" className={`h-12 w-12 flex flex-col items-center justify-center space-y-1 ${activeTab === 'oppts' ? 'bg-muted' : ''}`} onClick={() => setActiveTab('oppts')}>
                    <Briefcase className="h-5 w-5" /><span className="text-xs">Oppts</span>
                </Button>
                <Button variant="ghost" size="icon" className={`h-12 w-12 flex flex-col items-center justify-center space-y-1 ${activeTab === 'tasks' ? 'bg-muted' : ''}`} onClick={() => setActiveTab('tasks')}>
                    <ClipboardList className="h-5 w-5" /><span className="text-xs">Tasks</span>
                </Button>
                <Button variant="ghost" size="icon" className={`h-12 w-12 flex flex-col items-center justify-center space-y-1 ${activeTab === 'notes' ? 'bg-muted' : ''}`} onClick={() => setActiveTab('notes')}>
                    <Notebook className="h-5 w-5" /><span className="text-xs">Notes</span>
                </Button>
            </div>
            <div className="flex flex-col flex-grow mr-14">
                <div className="p-6 text-center border-b border-border flex-shrink-0">
                    <Avatar className="h-16 w-16 mx-auto mb-2"><AvatarFallback className="bg-green-500/20 text-green-300 text-xl">SI</AvatarFallback></Avatar>
                    <a href="#" className="font-semibold text-foreground hover:underline flex items-center justify-center">siomeyromero@gmail.com <ExternalLink className="ml-1 h-4 w-4 text-muted-foreground" /></a>
                    <div className="flex justify-center gap-2 mt-4"><Button variant="outline" size="icon"><Phone className="h-4 w-4" /></Button><Button variant="outline" size="icon"><Mail className="h-4 w-4" /></Button></div>
                </div>
                <ScrollArea className="flex-grow">
                    {renderContent()}
                </ScrollArea>
            </div>
        </div>
    );
};

const AllConversationsView = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 h-full min-h-0">
            {/* Panel Izquierdo */}
            <div className="lg:col-span-3 flex flex-col border-r border-border min-h-0 bg-card">
                <ConversationListHeader />
                <div className="px-4 py-2 flex items-center justify-between border-b border-border flex-shrink-0">
                    <div className="flex items-center gap-2">
                        <Checkbox id="select-all" />
                        <Label htmlFor="select-all" className="text-sm font-medium text-muted-foreground">1 RESULTS</Label>
                    </div>
                    <Select defaultValue="latest">
                        <SelectTrigger className="w-[120px] h-8 text-xs">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="latest">Latest-All</SelectItem>
                            <SelectItem value="oldest">Oldest-All</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <ScrollArea>
                    <div className="p-2">
                        <div className={`p-4 border-l-4 border-primary bg-primary/10 cursor-pointer`}>
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="bg-green-500/20 text-green-300">SI</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <span className="font-semibold text-foreground">siomeyromero@gmail.com</span>
                                        <p className="text-sm text-muted-foreground truncate">@ cececfs hola siomey ff cccc f c...</p>
                                    </div>
                                </div>
                                <span className="text-xs text-muted-foreground whitespace-nowrap">Aug 25</span>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </div>

            {/* Panel Central */}
            <div className={`flex flex-col border-r border-border min-h-0 bg-background ${isSidebarOpen ? 'lg:col-span-6' : 'lg:col-span-9'}`}>
                <header className="p-4 border-b border-border flex-shrink-0 bg-card">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-foreground">siomeyromero@gmail.com</p>
                        <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon"><Star className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon"><Mail className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon"><AlignLeft className="h-4 w-4" /></Button>
                            <Separator orientation="vertical" className="h-6 mx-2" />
                            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                {isSidebarOpen ? <ChevronRight className="h-5 w-5" /> : <User className="h-5 w-5" />}
                            </Button>
                        </div>
                    </div>
                </header>
                <ScrollArea className="flex-grow p-4">
                    <div className="text-center text-xs text-muted-foreground my-4">Aug 25th, 2025</div>
                    <div className="flex gap-3">
                        <Avatar><AvatarFallback>UL</AvatarFallback></Avatar>
                        <div className="flex-grow">
                            <div className="flex items-baseline gap-2">
                                <span className="font-bold text-foreground">Udreamms LLC</span>
                                <span className="font-semibold text-muted-foreground text-sm">sdcsfcfcfdfs</span>
                            </div>
                            <div className="bg-card border border-border p-3 rounded-lg mt-1">
                                <p className="text-sm text-foreground/90">cececfs hola siomey ff cccc fc cf c df ad a a fq</p>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1 flex items-center">
                                <span>Aug 25, 2025, 5:40 PM</span>
                                <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto"><MoreHorizontal className="h-4 w-4" /></Button>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
                <div className="p-4 border-t border-border bg-card">
                    <Tabs defaultValue="email">
                        <TabsList><TabsTrigger value="email">Email</TabsTrigger><TabsTrigger value="comment">Internal Comment</TabsTrigger></TabsList>
                        <TabsContent value="email">
                            <div className="border rounded-lg mt-2 bg-background">
                                <div className="p-3 space-y-2 border-b">
                                    <div className="flex items-center text-sm">
                                        <span className="text-muted-foreground w-20">From Name:</span><span className="text-foreground">Udreamms Lic</span>
                                        <span className="text-muted-foreground ml-auto w-20 text-right">From email:</span><span className="text-foreground">joseph.flores.jc@gmail.com</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <span className="text-muted-foreground w-20">To:</span>
                                        <span className="text-foreground flex items-center gap-1"><Avatar className="h-5 w-5 text-xs"><AvatarFallback className="bg-green-500/20 text-green-300">SI</AvatarFallback></Avatar> siomeyromero@gmail.com (Primary)</span>
                                        <div className="ml-auto"><Button variant="link" size="sm" className="text-xs">CC</Button><Button variant="link" size="sm" className="text-xs">BCC</Button></div>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <span className="text-muted-foreground w-20">Subject:</span>
                                        <Input className="h-auto p-0 border-none focus-visible:ring-0" placeholder="Type a subject" />
                                    </div>
                                </div>
                                <Textarea className="min-h-[120px] border-none focus-visible:ring-0 p-3" placeholder="Type a message..." />
                                <div className="p-2 border-t flex justify-between items-center">
                                    <div className="flex items-center"><Button variant="ghost" size="icon"><Paperclip className="h-4 w-4" /></Button><Button variant="ghost" size="icon"><Smile className="h-4 w-4" /></Button><Button variant="ghost" size="icon"><PlusCircle className="h-4 w-4" /></Button></div>
                                    <div className="flex items-center gap-2"><span className="text-xs text-muted-foreground">0 word</span><Button variant="outline">Clear</Button><Button>Send</Button></div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
            {isSidebarOpen && <ConversationSidebar />}
        </div>
    );
};

const ManualActionsView = () => (
    <div className="h-full flex flex-col p-6 bg-background">
        <div className="flex items-center justify-between w-full border-b border-border pb-4">
            <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold">Manual Actions</h1>
                <div className="flex items-center gap-2">
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Type to Search Workflows" />
                        </SelectTrigger>
                        <SelectContent>
                            {/* Opciones de Workflows */}
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Assignee" />
                        </SelectTrigger>
                        <SelectContent>
                            {/* Opciones de Assignee */}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Button variant="ghost">Previous</Button>
                <Button variant="ghost">Next</Button>
                <Button>Let's start</Button>
            </div>
        </div>
        <div className="flex flex-col items-center justify-center flex-grow text-muted-foreground text-center">
            <CheckCircle className="h-24 w-24 text-green-500/60 mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-1">Good Work!</h2>
            <p>You have no pending tasks</p>
        </div>
        <div className="flex items-center justify-end w-full pt-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Button variant="ghost">Previous</Button>
                <Button variant="ghost">Next</Button>
            </div>
        </div>
    </div>
);

// ########## INICIO DE LA SECCIÓN MODIFICADA ##########
const SnippetsView = () => (
    <div className="h-full flex flex-col p-6 bg-background">
        <div className="flex items-center justify-between w-full border-b border-border pb-4">
            <div>
                <h1 className="text-xl font-bold">Snippets</h1>
                <p className="text-sm text-muted-foreground">
                    Create snippets to quickly insert predefined content into messages for faster, consistent communication.
                </p>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" className="flex items-center gap-2"><Folders className="h-4 w-4" /> Add Folder</Button>
                <Button className="flex items-center gap-2"><Plus className="h-4 w-4" /> Add Snippet</Button>
            </div>
        </div>
        <div className="flex-grow flex flex-col pt-4">
            <Tabs defaultValue="all-snippets" className="flex-grow flex flex-col">
                <TabsList className="px-0 border-b border-border justify-start rounded-none bg-background flex-shrink-0">
                    <TabsTrigger value="all-snippets" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none text-muted-foreground">
                        All Snippets
                    </TabsTrigger>
                    <TabsTrigger value="folders" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none text-muted-foreground">
                        Folders
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="all-snippets" className="flex-grow flex flex-col m-0">
                    <div className="flex items-center justify-between py-4">
                        <div className="relative flex-grow mr-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search Snippets" className="pl-10 max-w-sm" />
                        </div>
                        <Button variant="outline" className="flex items-center gap-2"><Filter className="h-4 w-4" /> Filters</Button>
                    </div>
                    <div className="flex-grow flex flex-col">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-border text-muted-foreground text-sm">
                                    <th className="p-3 w-10"><Checkbox /></th>
                                    <th className="p-3 font-normal">Name</th>
                                    <th className="p-3 font-normal">Body</th>
                                    <th className="p-3 font-normal">Folder</th>
                                    <th className="p-3 font-normal">Type</th>
                                </tr>
                            </thead>
                        </table>
                        <div className="flex flex-col items-center justify-center flex-grow text-muted-foreground text-center">
                            <Table className="h-16 w-16 text-muted-foreground/50 mb-4" />
                            <p>No Data</p>
                        </div>
                    </div>
                </TabsContent>
                
                {/* Contenido de "Folders" actualizado */}
                <TabsContent value="folders" className="flex-grow flex flex-col m-0 pt-4 space-y-4">
                    <div className="flex justify-end">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search Folders" className="pl-10" />
                        </div>
                    </div>
                    
                    <div className="rounded-md border bg-card text-card-foreground flex-grow flex flex-col">
                        <div className="flex-grow">
                            <table className="w-full text-sm">
                                <thead className="border-b">
                                    <tr className="text-muted-foreground">
                                        <th className="h-12 px-4 text-left font-medium">Folder Name</th>
                                        <th className="h-12 px-4 text-left font-medium">Snippets</th>
                                        <th className="h-12 px-4 text-left font-medium">Created on</th>
                                        <th className="h-12 px-4"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b">
                                        <td className="p-4 align-middle flex items-center gap-3">
                                            <Folder className="h-4 w-4" /> 1
                                        </td>
                                        <td className="p-4 align-middle">0</td>
                                        <td className="p-4 align-middle">02/09/2025 at 17:37 PM</td>
                                        <td className="p-4 align-middle text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 flex items-center justify-between text-sm text-muted-foreground border-t">
                            <div>
                                <p>Page 1 of 1</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" disabled>Previous</Button>
                                <Button variant="outline" size="sm" className="w-9 h-9 p-0 border-primary text-primary">1</Button>
                                <Button variant="outline" size="sm">Next</Button>
                                <Select defaultValue="10">
                                    <SelectTrigger className="w-[100px] h-9">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10">10 / page</SelectItem>
                                        <SelectItem value="20">20 / page</SelectItem>
                                        <SelectItem value="50">50 / page</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </TabsContent>
                
            </Tabs>
        </div>
    </div>
);
// ########## FIN DE LA SECCIÓN MODIFICADA ##########

const TriggerLinksView = () => (
    <div className="h-full flex flex-col p-6 bg-background">
        <div className="flex items-center justify-between w-full border-b border-border pb-4">
            <div>
                <h1 className="text-xl font-bold">Link</h1>
                <p className="text-sm text-muted-foreground">
                    Trigger links allow you to put links inside SMS messages and emails, which allow you to track specific customer actions and trigger events based on when the link is clicked.
                </p>
            </div>
            <Button className="flex items-center gap-2"><Plus className="h-4 w-4" /> Add Link</Button>
        </div>
        <div className="flex-grow flex flex-col pt-4">
            <div className="flex items-center justify-end py-4">
                <div className="relative flex-grow mr-4">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search Trigger Link" className="pr-10 max-w-sm ml-auto" />
                </div>
            </div>
            <div className="flex-grow flex flex-col">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-border text-muted-foreground text-sm">
                            <th className="p-3 font-normal">Name</th>
                            <th className="p-3 font-normal">Link URL</th>
                            <th className="p-3 font-normal">Link Key</th>
                            <th className="p-3 font-normal">Actions</th>
                        </tr>
                    </thead>
                </table>
                <div className="flex flex-col items-center justify-center flex-grow text-muted-foreground text-center">
                    <Table className="h-16 w-16 text-muted-foreground/50 mb-4" />
                    <p>No Data</p>
                </div>
            </div>
        </div>
    </div>
);


export default function ConversationsPage() {
    const [conversationSelected, setConversationSelected] = useState(true);

    return (
        <div className="h-screen flex flex-col bg-background text-foreground">
            <Tabs defaultValue="conversations" className="h-full flex flex-col">
                <header className="px-6 py-3 border-b border-border flex items-center justify-between bg-card flex-shrink-0">
                    <div className="flex items-center gap-6 text-sm">
                        <h1 className="font-bold text-lg text-foreground">Conversations</h1>
                        <TabsList className="bg-transparent p-0 h-auto gap-1">
                            <TabsTrigger value="conversations" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none text-muted-foreground">
                                Conversations
                            </TabsTrigger>
                            <TabsTrigger value="manual-actions" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none text-muted-foreground">
                                Manual Actions
                            </TabsTrigger>
                            <TabsTrigger value="snippets" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none text-muted-foreground">
                                Snippets
                            </TabsTrigger>
                            <TabsTrigger value="trigger-links" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none text-muted-foreground">
                                Trigger Links
                            </TabsTrigger>
                        </TabsList>
                    </div>
                </header>

                <main className="flex-grow flex flex-col min-h-0">
                    <TabsContent value="conversations" className="flex-grow flex flex-col m-0">
                        <Tabs defaultValue="all" className="flex-grow flex flex-col">
                            <TabsList className="px-4 border-b border-border justify-start rounded-none bg-card flex-shrink-0">
                                <TabsTrigger value="unread">Unread</TabsTrigger>
                                <TabsTrigger value="recents">Recents</TabsTrigger>
                                <TabsTrigger value="starred">Starred</TabsTrigger>
                                <TabsTrigger value="all">All</TabsTrigger>
                            </TabsList>
                            <div className="flex-grow flex min-h-0">
                                <TabsContent value="unread" className="w-full h-full m-0">
                                    <EmptyConversationPanel />
                                </TabsContent>
                                <TabsContent value="recents" className="w-full h-full m-0">
                                    <EmptyConversationPanel />
                                </TabsContent>
                                <TabsContent value="starred" className="w-full h-full m-0">
                                    <EmptyConversationPanel />
                                </TabsContent>
                                <TabsContent value="all" className="w-full h-full m-0">
                                    {conversationSelected ? (
                                        <AllConversationsView />
                                    ) : (
                                        <div className="grid grid-cols-1 lg:grid-cols-12 h-full min-h-0">
                                            <div className="lg:col-span-3 flex flex-col border-r border-border min-h-0 bg-card">
                                                <ConversationListHeader />
                                                <div className="px-4 py-2 flex items-center justify-between border-b border-border flex-shrink-0">
                                                    <div className="flex items-center gap-2">
                                                        <Checkbox id="select-all-initial" />
                                                        <Label htmlFor="select-all-initial" className="text-sm font-medium text-muted-foreground">1 RESULTS</Label>
                                                    </div>
                                                    <Select defaultValue="latest">
                                                        <SelectTrigger className="w-[120px] h-8 text-xs">
                                                            <SelectValue placeholder="Sort by" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="latest">Latest-All</SelectItem>
                                                            <SelectItem value="oldest">Oldest-All</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <ScrollArea>
                                                    <div className="p-2">
                                                        <div onClick={() => setConversationSelected(true)} className={`p-4 border-l-4 border-transparent hover:bg-muted cursor-pointer`}>
                                                            <div className="flex items-start justify-between">
                                                                <div className="flex items-start gap-3">
                                                                    <Avatar className="h-8 w-8">
                                                                        <AvatarFallback className="bg-green-500/20 text-green-300">SI</AvatarFallback>
                                                                    </Avatar>
                                                                    <div>
                                                                        <span className="font-semibold text-foreground">siomeyromero@gmail.com</span>
                                                                        <p className="text-sm text-muted-foreground truncate">@ cececfs hola siomey ff cccc f c...</p>
                                                                    </div>
                                                                </div>
                                                                <span className="text-xs text-muted-foreground whitespace-nowrap">Aug 25</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </ScrollArea>
                                            </div>
                                            <div className="lg:col-span-6 flex flex-col border-r border-border min-h-0 bg-background">
                                                <EmptyState message="No conversation selected" icon={<MessageCircle className="h-16 w-16" />} />
                                            </div>
                                            <div className="lg:col-span-3 hidden lg:flex flex-col min-h-0 bg-card">
                                                <EmptyState message="No contact selected" icon={<User className="h-16 w-16" />} />
                                            </div>
                                        </div>
                                    )}
                                </TabsContent>
                            </div>
                        </Tabs>
                    </TabsContent>
                    <TabsContent value="manual-actions" className="h-full m-0">
                        <ManualActionsView />
                    </TabsContent>
                    <TabsContent value="snippets" className="h-full m-0">
                        <SnippetsView />
                    </TabsContent>
                    <TabsContent value="trigger-links" className="h-full m-0">
                        <TriggerLinksView />
                    </TabsContent>
                </main>
            </Tabs>
        </div>
    );
}
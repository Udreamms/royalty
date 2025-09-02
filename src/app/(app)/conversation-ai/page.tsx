
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription_shadcn as AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ExternalLink, ChevronDown, Info, Search, Bot } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";


const CatIllustration = () => (
    <svg width="180" height="120" viewBox="0 0 180 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground/30">
        <path d="M54.5 90.5C54.5 86.9101 51.5899 84 48 84C44.4101 84 41.5 86.9101 41.5 90.5C41.5 94.0899 44.4101 97 48 97C51.5899 97 54.5 94.0899 54.5 90.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M129.5 90.5C129.5 86.9101 126.59 84 123 84C119.41 84 116.5 86.9101 116.5 90.5C116.5 94.0899 119.41 97 123 97C126.59 97 129.5 94.0899 129.5 90.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M102.77 56.76L108.5 49.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M86 49.5L78.5 56.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M107.5 35.5C107.5 35.5 108.5 40.5 92.5 40.5C76.5 40.5 77.5 35.5 77.5 35.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M141.64 63.85C141.64 63.85 146 76.5 163 76.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M30.5 64C30.5 64 24.5 76.5 11 76.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M117.5 49.5H84.5V107.5H117.5V49.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M101 78.5C102.381 78.5 103.5 77.3807 103.5 76C103.5 74.6193 102.381 73.5 101 73.5C99.6193 73.5 98.5 74.6193 98.5 76C98.5 77.3807 99.6193 78.5 101 78.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M101 83.5V78.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M93.5 49.5V35C93.5 32.7667 94.4214 30.6261 95.9891 29.0584C97.5568 27.4907 99.6974 26.5 101.93 26.5C104.163 26.5 106.304 27.4907 107.871 29.0584C109.439 30.6261 110.36 32.7667 110.36 35V49.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M47.5 107.5V59.5H79.5V107.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M47.5 59.5L63.5 44.5L79.5 59.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M117.5 93.5H135.5V4.5H3.5V107.5H47.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M84.5 107.5H47.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="15" y="15" width="40" height="30" rx="2" fill="hsl(var(--muted))" stroke="none"/>
        <rect x="65" y="15" width="40" height="30" rx="2" fill="hsl(var(--muted))" stroke="none"/>
        <path d="M20 20h30" stroke="currentColor" strokeWidth="2"/>
        <path d="M20 30h30" stroke="currentColor" strokeWidth="2"/>
        <path d="M70 20h30" stroke="currentColor" strokeWidth="2"/>
        <path d="M70 30h30" stroke="currentColor" strokeWidth="2"/>
    </svg>
);


export default function ConversationAiPage() {
    return (
        <div className="flex flex-col h-full gap-6">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Conversation AI Agents</h1>
                    <p className="text-muted-foreground mt-1">Create And Manage Multiple Agents For Your Business</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Manage Knowledge Base
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button>
                                Create Agent
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>From Scratch</DropdownMenuItem>
                            <DropdownMenuItem>From Template</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            <Tabs defaultValue="agents-list" className="w-full flex-grow flex flex-col">
                <TabsList className="border-b border-border justify-start rounded-none bg-transparent p-0">
                    <TabsTrigger 
                        value="agents-list" 
                        className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none text-muted-foreground px-4 py-2 h-auto"
                    >
                        Agents List
                    </TabsTrigger>
                    <TabsTrigger 
                        value="dashboard"
                         className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none text-muted-foreground px-4 py-2 h-auto"
                    >
                        Dashboard
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="agents-list" className="pt-6 flex-grow flex flex-col">
                    <Alert className="mb-6">
                        <Info className="h-4 w-4" />
                        <AlertTitle>Important</AlertTitle>
                        <AlertDescription>
                            Only the primary agent will reply to inbound messages. Make sure your preferred channels are assigned to the primary agent to handle inbound messages.
                        </AlertDescription>
                    </Alert>
                    <div className="flex justify-end">
                        <div className="relative w-full max-w-xs">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search Agent" className="pl-10" />
                        </div>
                    </div>
                    <div className="border border-border rounded-lg mt-6 flex-grow flex flex-col">
                        <div className="flex items-center p-4 border-b border-border text-sm font-medium text-muted-foreground">
                            <Checkbox className="mr-4" />
                            <div className="w-1/4">Agent Name</div>
                            <div className="w-1/4 flex items-center gap-1">Status <Info className="h-3.5 w-3.5" /></div>
                            <div className="w-1/4">Supported Channels</div>
                            <div className="w-1/4 flex items-center gap-1">Last Updated <Info className="h-3.5 w-3.5" /></div>
                        </div>
                        <div className="flex-grow flex flex-col items-center justify-center text-center gap-4 p-8">
                             <CatIllustration />
                             <h3 className="text-xl font-bold text-foreground mt-4">Welcome to Conversation AI!</h3>
                             <p className="text-muted-foreground max-w-sm">
                                Let your Bot take care of the mundane tasks, while you focus on building your Business!
                             </p>
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="mt-4">
                                        Create Agent
                                        <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="center">
                                    <DropdownMenuItem>From Scratch</DropdownMenuItem>
                                    <DropdownMenuItem>From Template</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </TabsContent>
                 <TabsContent value="dashboard" className="pt-6">
                     <div className="flex flex-col items-center justify-center text-center gap-4 py-16 border border-dashed rounded-lg">
                         <Bot className="h-16 w-16 text-muted-foreground/50" />
                         <h3 className="text-xl font-semibold text-foreground">Dashboard Not Available</h3>
                         <p className="text-muted-foreground">Analytics for your AI agents will be displayed here.</p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

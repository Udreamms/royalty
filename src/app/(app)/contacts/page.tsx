"use client";
import React, { useState } from "react";
import Link from 'next/link';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Plus,
  Filter,
  Network,
  Users,
  Mail,
  Tag,
  MessageSquare,
  Star,
  Trash2,
  Upload,
  Download,
  UserCheck,
  FileText,
  Settings,
  Search,
  Columns as ColumnsIcon,
  Calendar,
  FileX,
  UserRound,
  ChevronDown, 
  ArrowUpDown, 
  Settings2, 
  Globe,
  User,
  Users2,
} from "lucide-react";
import Image from 'next/image';

// --- Wrapper estilo card ---
const CardWrapper = ({ children }: { children: React.ReactNode }) => (
  // Se elimina el padding para que el contenido se ajuste mejor
  <div className="bg-card border border-border rounded-xl shadow-sm">
    {children}
  </div>
);

// Icono personalizado para WhatsApp
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

// Datos de ejemplo
const contactsData = [
  {
    id: "contact-1",
    nameInitial: "S",
    email: "siomeyromero@gmail.com",
    phone: "",
    created: "Aug 25 2025 04:40 PM (MDT)",
    lastActivity: "2 weeks ago",
    tags: [],
  },
];

// Toolbar de acciones
const ContactsToolbar = ({ selectedCount }: { selectedCount: number }) => {
  const isActionsDisabled = selectedCount === 0;
  const actionButtons = [
    { icon: Network, tooltip: "Add to Pipeline" },
    { icon: Users, tooltip: "Add to Campaign" },
    { icon: Mail, tooltip: "Send Email", disabled: isActionsDisabled },
    { icon: Tag, tooltip: "Add Tags", disabled: isActionsDisabled },
    { icon: MessageSquare, tooltip: "Send SMS", disabled: isActionsDisabled },
    { icon: Star, tooltip: "Add/Remove Favorite" },
    { icon: Trash2, tooltip: "Delete", disabled: isActionsDisabled },
    { icon: Upload, tooltip: "Export Contacts" },
    { icon: Download, tooltip: "Import Contacts" },
    { icon: UserCheck, tooltip: "Assign User" },
    { icon: WhatsAppIcon, tooltip: "Send WhatsApp Message" },
    { icon: FileText, tooltip: "Add Note" },
  ];
  return (
    <div className="flex items-center justify-between border-t border-b border-border py-2 px-4 bg-card">
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon"><Plus className="h-5 w-5" /></Button>
            </TooltipTrigger>
            <TooltipContent><p>Add Contact</p></TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon"><Filter className="h-5 w-5" /></Button>
            </TooltipTrigger>
            <TooltipContent><p>Filter Contacts</p></TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="h-6 border-l border-border mx-2"></div>
        <TooltipProvider>
          {actionButtons.map((btn, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={btn.disabled}><btn.icon className="h-5 w-5" /></Button>
              </TooltipTrigger>
              <TooltipContent><p>{btn.tooltip}</p></TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" className="gap-2"><ColumnsIcon className="h-4 w-4" /> Columns</Button>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Quick search" className="pl-8 w-64" />
        </div>
        <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" /> More Filters</Button>
      </div>
    </div>
  );
};

// Página principal
export default function ContactsPage() {
  const [selectedContacts, setSelectedContacts] = useState<Record<string, boolean>>({});

  const handleSelectAll = (checked: boolean) => {
    const newSelected: Record<string, boolean> = {};
    if (checked) {
      contactsData.forEach((contact) => { newSelected[contact.id] = true; });
    }
    setSelectedContacts(newSelected);
  };

  const handleSelectRow = (contactId: string, checked: boolean) => {
    setSelectedContacts((prev) => ({ ...prev, [contactId]: checked }));
  };

  const selectedCount = Object.values(selectedContacts).filter(Boolean).length;
  const allSelected = selectedCount === contactsData.length && contactsData.length > 0;

  return (
    <div className="p-8 bg-background text-foreground min-h-screen">
      <Tabs defaultValue="smart-lists" className="w-full">
        {/* INICIO: Cabecera reestructurada para que coincida con la imagen */}
        <header className="flex items-end justify-between border-b border-border mb-6">
          <div className="flex items-end gap-6">
            <h1 className="text-3xl font-semibold text-foreground pb-3">Contacts</h1>
            <TabsList className="bg-transparent p-0">
              <TabsTrigger value="smart-lists" className="data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent pb-3 text-muted-foreground">Smart Lists</TabsTrigger>
              <TabsTrigger value="bulk-actions" className="data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent pb-3 text-muted-foreground">Bulk Actions</TabsTrigger>
              <TabsTrigger value="restore" className="data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent pb-3 text-muted-foreground">Restore</TabsTrigger>
              <TabsTrigger value="tasks" className="data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent pb-3 text-muted-foreground">Tasks</TabsTrigger>
              <TabsTrigger value="companies" className="data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent pb-3 text-muted-foreground">Companies</TabsTrigger>
              <TabsTrigger value="manage-lists" className="data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent pb-3 text-muted-foreground">Manage Smart Lists</TabsTrigger>
            </TabsList>
          </div>
          <div className="pb-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/settings/custom-fields">
                    <Button variant="ghost" size="icon">
                      <Settings className="h-5 w-5" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent><p>Go to Custom Fields</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </header>
        {/* FIN: Cabecera reestructurada */}
        
        {/* El contenido de las pestañas ahora se renderiza aquí */}
        <TabsContent value="smart-lists">
          <CardWrapper>
            <div className="p-4 border-b border-border bg-muted/20">
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <ContactsToolbar selectedCount={selectedCount} />
            <div className="p-4 text-sm text-muted-foreground">
              Total {contactsData.length} records (1 of 1 Pages)
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"><Checkbox checked={allSelected} onCheckedChange={(checked) => handleSelectAll(Boolean(checked))} /></TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead>Tags</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contactsData.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell><Checkbox checked={!!selectedContacts[contact.id]} onCheckedChange={(checked) => handleSelectRow(contact.id, Boolean(checked))} /></TableCell>
                    <TableCell><div className="flex items-center gap-3"><Avatar><AvatarFallback className="bg-green-100 text-green-700 font-bold">{contact.nameInitial}</AvatarFallback></Avatar></div></TableCell>
                    <TableCell>{contact.phone || "-"}</TableCell>
                    <TableCell><a href={`mailto:${contact.email}`} className="text-primary hover:underline">{contact.email}</a></TableCell>
                    <TableCell>{contact.created}</TableCell>
                    <TableCell><div className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full inline-block">{contact.lastActivity}</div></TableCell>
                    <TableCell>{contact.tags.length > 0 ? contact.tags.join(", ") : "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="p-4 text-sm text-muted-foreground border-t border-border">
              Total {contactsData.length} records (1 of 1 Pages)
            </div>
          </CardWrapper>
        </TabsContent>

        <TabsContent value="bulk-actions">
           <CardWrapper>
             <div className="flex justify-end items-center p-4 gap-2 border-b">
               <div className="flex items-center gap-2 border border-input rounded-md px-3 py-1.5 text-sm">
                 <span>Mar 15 2025</span>
                 <span>→</span>
                 <span>Sep 16 2025</span>
                 <Calendar className="h-4 w-4 text-muted-foreground" />
               </div>
               <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
             </div>
             <Table>
               <TableHeader>
                 <TableRow>
                   <TableHead>Action Label</TableHead>
                   <TableHead>Operation</TableHead>
                   <TableHead>Status</TableHead>
                   <TableHead>User</TableHead>
                   <TableHead>Created (MDT)</TableHead>
                   <TableHead>Completed (MDT)</TableHead>
                   <TableHead>Statistics</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 <TableRow>
                   <TableCell colSpan={7} className="h-[300px] text-center">
                     <div className="flex flex-col items-center justify-center gap-2">
                       <FileX className="h-12 w-12 text-muted-foreground" />
                       <p className="text-muted-foreground">No Data</p>
                     </div>
                   </TableCell>
                 </TableRow>
               </TableBody>
             </Table>
           </CardWrapper>
        </TabsContent>
        
        <TabsContent value="restore">
          <CardWrapper>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Contacts Restore</h2>
              <div className="border border-border rounded-lg bg-card p-16">
                  <div className="flex flex-col items-center justify-center text-center gap-4">
                      <UserRound className="w-16 h-16 text-blue-500" />
                      <p className="text-muted-foreground">There is nothing here yet, when you delete contacts in the application, you will be able to restore them from here.</p>
                  </div>
              </div>
            </div>
          </CardWrapper>
        </TabsContent>

        <TabsContent value="tasks">
          <CardWrapper>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-semibold">Tasks</h2>
                      <span className="bg-muted text-muted-foreground text-sm font-medium px-2.5 py-1 rounded-md">0 Tasks</span>
                  </div>
                  <Button><Plus className="mr-2 h-4 w-4" /> Add Task</Button>
              </div>
              <Tabs defaultValue="all">
                  <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="due-today">Due Today</TabsTrigger>
                      <TabsTrigger value="overdue">Overdue</TabsTrigger>
                      <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  </TabsList>
              </Tabs>
              <div className="border border-border rounded-lg bg-card">
                  <div className="p-4 flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                              <Button variant="outline" className="gap-2">Assignee: Any <ChevronDown className="h-4 w-4" /></Button>
                              <Button variant="outline" className="gap-2">Status: All <ChevronDown className="h-4 w-4" /></Button>
                              <Button variant="outline" className="gap-2">Due Date: Any <ChevronDown className="h-4 w-4" /></Button>
                              <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" /> Advanced Filters</Button>
                              <Button variant="outline" className="gap-2"><ArrowUpDown className="h-4 w-4" /> Sort (1)</Button>
                          </div>
                          <div className="flex items-center gap-2">
                              <div className="relative"><Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /><Input placeholder="Search for task title" className="pl-8 w-64" /></div>
                              <Button variant="outline" className="gap-2"><Settings2 className="h-4 w-4" /> Manage Fields</Button>
                          </div>
                      </div>
                  </div>
                  <Table>
                      <TableHeader>
                          <TableRow>
                              <TableHead className="w-[50px]"><Checkbox /></TableHead>
                              <TableHead>Status</TableHead><TableHead>Title</TableHead><TableHead>Description</TableHead>
                              <TableHead>Associated Contacts</TableHead><TableHead>Assignee</TableHead>
                              <TableHead>Due Date (MDT)</TableHead><TableHead>Actions</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          <TableRow>
                            <TableCell colSpan={8} className="h-[400px]">
                                  <div className="flex flex-col items-center justify-center text-center gap-4">
                                      <Image src="/placeholder-task.svg" alt="No tasks" width={200} height={200} />
                                      <h3 className="text-lg font-semibold">It's so lonely in here!</h3>
                                      <p className="text-muted-foreground">No Tasks in sight! Ready to create a fresh one?</p>
                                      <Button><Plus className="mr-2 h-4 w-4" /> Add Task</Button>
                                  </div>
                            </TableCell>
                          </TableRow>
                      </TableBody>
                  </Table>
                  <div className="p-4 flex items-center justify-between text-sm text-muted-foreground border-t border-border">
                      <div>Page 1 of 1</div>
                      <div className="flex items-center gap-2">
                          <Input type="number" defaultValue="20" className="w-16 h-8" />
                          <Button variant="outline" size="sm" disabled>Prev</Button>
                          <Button variant="outline" size="sm" className="w-8 h-8 p-0">1</Button>
                          <Button variant="outline" size="sm" disabled>Next</Button>
                      </div>
                  </div>
              </div>
            </div>
          </CardWrapper>
        </TabsContent>

        <TabsContent value="companies">
          <CardWrapper>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-semibold">Companies</h2>
                      <span className="bg-muted text-muted-foreground text-sm font-medium px-2.5 py-1 rounded-md">0 Companies</span>
                  </div>
                  <Button><Plus className="mr-2 h-4 w-4" /> Add Company</Button>
              </div>
              <Tabs defaultValue="all">
                  <TabsList><TabsTrigger value="all">All</TabsTrigger></TabsList>
              </Tabs>
              <div className="border border-border rounded-lg bg-card">
                  <div className="p-4 flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                              <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" /> Advanced Filters</Button>
                              <Button variant="outline" className="gap-2"><ArrowUpDown className="h-4 w-4" /> Sort (1)</Button>
                          </div>
                          <div className="flex items-center gap-2">
                              <div className="relative"><Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /><Input placeholder="Search" className="pl-8 w-64" /></div>
                              <Button variant="outline" className="gap-2"><Settings2 className="h-4 w-4" /> Manage Fields</Button>
                          </div>
                      </div>
                  </div>
                  <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]"><Checkbox /></TableHead>
                                <TableHead className="whitespace-nowrap">Company <ChevronDown className="inline h-4 w-4" /></TableHead>
                                <TableHead className="whitespace-nowrap">Phone <ChevronDown className="inline h-4 w-4" /></TableHead>
                                <TableHead className="whitespace-nowrap">Email <ChevronDown className="inline h-4 w-4" /></TableHead>
                                <TableHead className="whitespace-nowrap">Website <ChevronDown className="inline h-4 w-4" /></TableHead>
                                <TableHead className="whitespace-nowrap">Address <ChevronDown className="inline h-4 w-4" /></TableHead>
                                <TableHead className="whitespace-nowrap">State <ChevronDown className="inline h-4 w-4" /></TableHead>
                                <TableHead className="whitespace-nowrap">City <ChevronDown className="inline h-4 w-4" /></TableHead>
                                <TableHead className="whitespace-nowrap">Description <ChevronDown className="inline h-4 w-4" /></TableHead>
                                <TableHead className="whitespace-nowrap">Postal Code <ChevronDown className="inline h-4 w-4" /></TableHead>
                                <TableHead className="whitespace-nowrap">Country <ChevronDown className="inline h-4 w-4" /></TableHead>
                                <TableHead className="whitespace-nowrap">Created At <ChevronDown className="inline h-4 w-4" /></TableHead>
                                <TableHead className="whitespace-nowrap">Updated At <ChevronDown className="inline h-4 w-4" /></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                              <TableCell colSpan={13} className="h-[400px]">
                                    <div className="flex flex-col items-center justify-center text-center gap-4">
                                        <Image src="/placeholder-task.svg" alt="No companies" width={200} height={200} />
                                        <h3 className="text-lg font-semibold">It's so lonely in here!</h3>
                                        <p className="text-muted-foreground">No Companies in sight! Ready to create a fresh one?</p>
                                        <Button><Plus className="mr-2 h-4 w-4" /> Add Company</Button>
                                    </div>
                              </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                  </div>
                  <div className="p-4 flex items-center justify-between text-sm text-muted-foreground border-t border-border">
                      <div>Page 1 of 1</div>
                      <div className="flex items-center gap-2">
                          <Input type="number" defaultValue="20" className="w-16 h-8" />
                          <Button variant="outline" size="sm" disabled>Prev</Button>
                          <Button variant="outline" size="sm" className="w-8 h-8 p-0">1</Button>
                          <Button variant="outline" size="sm" disabled>Next</Button>
                      </div>
                  </div>
              </div>
            </div>
          </CardWrapper>
        </TabsContent>
        
        <TabsContent value="manage-lists">
          <CardWrapper>
            <div className="p-6 space-y-4">
              <div className="border-b border-border pb-4">
                  <Tabs defaultValue="all"><TabsList><TabsTrigger value="all">All</TabsTrigger></TabsList></Tabs>
              </div>
              <h2 className="text-3xl font-semibold">Smart Lists</h2>
              <div className="flex items-center gap-6 text-muted-foreground">
                  <a href="#" className="flex items-center gap-2 hover:text-foreground"><Globe className="h-5 w-5" /><span>Global List</span></a>
                  <a href="#" className="flex items-center gap-2 hover:text-foreground"><User className="h-5 w-5" /><span>Shared By You</span></a>
                  <span className="text-muted-foreground/50">&gt;</span>
                  <a href="#" className="flex items-center gap-2 hover:text-foreground"><Users2 className="h-5 w-5" /><span>Shared With You</span></a>
              </div>
            </div>
          </CardWrapper>
        </TabsContent>
      </Tabs>
    </div>
  );
}
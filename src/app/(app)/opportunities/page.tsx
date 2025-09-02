"use client";

import * as React from "react";
import { Filter, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";


const EmptyStateIllustration = () => (
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

const NoDataIcon = () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-zinc-700">
        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 2V8H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="15" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.242 16.758L13.758 13.242" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const BulkActionsFilter = () => (
    <Popover>
        <PopoverTrigger asChild>
            <Button variant="outline" className="relative bg-transparent hover:bg-zinc-800 border-zinc-700 hover:text-zinc-100">
                <Filter className="mr-2 h-4 w-4" />
                Filter
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-4 mr-4 bg-zinc-900 border-zinc-700 text-zinc-100" align="end">
            <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-sm">Filters</h4>
                <Button variant="link" size="sm" className="text-blue-500 p-0 h-auto">Clear</Button>
            </div>
            <div className="space-y-4">
                {/* --- SECCIÓN ACTION ACTUALIZADA --- */}
                <div>
                    <Label htmlFor="action-filter" className="text-sm text-zinc-300">Action</Label>
                    <Select defaultValue="all">
                        <SelectTrigger id="action-filter" className="mt-1 bg-zinc-800 border-zinc-700">
                            <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-100">
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="edit">Edit</SelectItem>
                            <SelectItem value="import">Import</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {/* --- SECCIÓN STATUS ACTUALIZADA --- */}
                <div>
                    <Label htmlFor="status-filter" className="text-sm text-zinc-300">Status</Label>
                    <Select defaultValue="all">
                        <SelectTrigger id="status-filter" className="mt-1 bg-zinc-800 border-zinc-700">
                            <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-100">
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                            <SelectItem value="complete">Complete</SelectItem>
                            <SelectItem value="paused">Paused</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="queued">Queued</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="users-filter" className="text-sm text-zinc-300">Users</Label>
                    <Select defaultValue="all">
                        <SelectTrigger id="users-filter" className="mt-1 bg-zinc-800 border-zinc-700">
                            <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-100">
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="user1">User 1</SelectItem>
                            <SelectItem value="user2">User 2</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <Separator className="my-4 bg-zinc-700" />
            <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" className="bg-transparent hover:bg-zinc-800 border-zinc-700">Cancel</Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">Apply</Button>
            </div>
        </PopoverContent>
    </Popover>
);


export default function OpportunitiesPage() {
    return (
        <div className="flex flex-col h-full p-6">
            <header className="flex-shrink-0">
                <h1 className="text-3xl font-bold text-foreground sr-only">Opportunities</h1> {/* Ocultar H1 si no es necesario visible */}
            </header>

            <Tabs defaultValue="pipelines" className="w-full flex-grow flex flex-col">
                <TabsList className="border-b border-zinc-800 justify-start rounded-none bg-transparent p-0 flex-shrink-0">
                    {['Opportunities', 'Pipelines', 'Bulk Actions'].map((tab) => (
                         <TabsTrigger
                            key={tab}
                            value={tab.toLowerCase().replace(' ', '-')}
                            className="data-[state=active]:bg-transparent data-[state=active]:text-blue-500 data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-blue-500 rounded-none transition-none text-zinc-400 px-4 pb-3 border-b-2 border-transparent"
                        >
                            {tab}
                        </TabsTrigger>
                    ))}
                </TabsList>
                
                <TabsContent value="opportunities" className="flex-grow flex flex-col items-center justify-center pt-4">
                    <div className="flex flex-col items-center justify-center text-center gap-4 p-4">
                        <EmptyStateIllustration />
                        <h3 className="text-2xl font-bold text-foreground mt-4">Create a New Pipeline to Get Started!</h3>
                        <p className="text-muted-foreground max-w-md">
                            Organize Deals, track Progress, and turn Leads into Customers with a clear view of every Stage.
                        </p>
                        <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white">
                            <Plus className="mr-2 h-4 w-4" />
                            Create New Pipeline
                        </Button>
                    </div>
                </TabsContent>

                <TabsContent value="pipelines" className="flex-grow flex flex-col p-0"> {/* Eliminado pt-4 */}
                     <div className="flex justify-between items-center py-4 px-0"> {/* Agregado py-4 para el espacio */}
                        <h2 className="text-xl font-semibold text-foreground sr-only">Pipelines</h2> {/* Ocultar H2 si no es necesario visible */}
                        <Button className="bg-green-600 hover:bg-green-700 text-white ml-auto"> {/* ml-auto para empujar a la derecha */}
                            <Plus className="mr-2 h-4 w-4" />
                            Create new pipeline
                        </Button>
                    </div>
                    {/* Se ha eliminado el border-dashed y se ha ajustado el color de fondo y texto */}
                    <div className="flex-grow flex items-center justify-center text-center p-4 bg-transparent"> {/* bg-transparent para que no tenga fondo */}
                        <p className="text-zinc-500">Create your first pipeline.</p>
                    </div>
                </TabsContent>

                <TabsContent value="bulk-actions" className="flex-grow flex flex-col pt-4 gap-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-foreground">Bulk Actions</h2>
                        <div className="flex items-center gap-2">
                           <DatePickerWithRange />
                           <BulkActionsFilter />
                        </div>
                    </div>
                    <div className="border border-zinc-800 rounded-lg bg-zinc-900 flex-grow flex flex-col">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-b border-zinc-800">
                                    <TableHead className="text-zinc-400 font-medium">Action Label</TableHead>
                                    <TableHead className="text-zinc-400 font-medium">Operation</TableHead>
                                    <TableHead className="text-zinc-400 font-medium">Status</TableHead>
                                    <TableHead className="text-zinc-400 font-medium">User</TableHead>
                                    <TableHead className="text-zinc-400 font-medium">Created (MDT)</TableHead>
                                    <TableHead className="text-zinc-400 font-medium">Completed (MDT)</TableHead>
                                    <TableHead className="text-zinc-400 font-medium">Statistics</TableHead>
                                </TableRow>
                            </TableHeader>
                        </Table>
                        <div className="flex-grow flex flex-col items-center justify-center p-12 text-center">
                            <NoDataIcon />
                            <p className="mt-4 text-sm font-semibold text-zinc-500">No Data</p>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

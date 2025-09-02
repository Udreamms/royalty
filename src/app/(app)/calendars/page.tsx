// src/app/(app)/calendars/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Calendar as CalendarIcon, Server, BedDouble, Wrench, Image as ImageIcon, Users, Lock, Info, ExternalLink, SlidersHorizontal, ListFilter, AlignJustify } from "lucide-react";
import { Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// --- ILUSTRACIONES ---

const CalendarNotFoundIllustration = () => (
    <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground/30">
        <path d="M75 12.5C75 12.5 75 12.5 75 12.5C40.5283 12.5 12.5 40.5283 12.5 75C12.5 109.472 40.5283 137.5 75 137.5C109.472 137.5 137.5 109.472 137.5 75C137.5 40.5283 109.472 12.5 75 12.5Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M75 106.25V75" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M75 75L93.75 93.75" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M75 43.75C75 43.75 75 43.75 75 43.75C60.6723 43.75 49.3491 55.0732 49.3491 69.4009C49.3491 83.7286 60.6723 95.0518 75 95.0518C89.3277 95.0518 100.651 83.7286 100.651 69.4009C100.651 55.0732 89.3277 43.75 75 43.75Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const AppointmentIllustration = () => (
    <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground/30">
        <rect x="25" y="45" width="100" height="85" rx="10" stroke="currentColor" strokeWidth="4" />
        <path d="M45 25V45" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M105 25V45" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M25 55H125" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <circle cx="50" cy="75" r="5" fill="currentColor" />
        <circle cx="80" cy="75" r="5" fill="currentColor" />
        <circle cx="110" cy="75" r="5" fill="currentColor" />
        <path d="M50 95H100" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M50 105H100" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
);

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
        <path d="M68 28.5C68 33.7467 63.7467 38 58.5 38C53.2533 38 49 33.7467 49 28.5C49 23.2533 53.2533 19 58.5 19C63.7467 19 68 23.2533 68 28.5Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M36.5 68C36.5 59.4396 42.6896 52.5 49.5 52.5H67.5C74.3104 52.5 80.5 59.4396 80.5 68V68.5H36.5V68Z" stroke="currentColor" strokeWidth="2"/>
    </svg>
);

const AvailabilityIllustration = () => (
    <svg width="140" height="112" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground/60 mb-6">
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M107.41,41.92H52.59a3,3,0,0,0-3,3V77.18a3,3,0,0,0,3,3h54.82a3,3,0,0,0,3-3V44.92A3,3,0,0,0,107.41,41.92Z" fill="hsl(var(--muted))" stroke="none"/>
            <path d="M80,63.18a1.64,1.64,0,0,1-.55-3.19,1.64,1.64,0,0,1,2.23.36,1.6,1.6,0,0,1,.36,2.23A1.62,1.62,0,0,1,80,63.18Z" />
            <path d="M96,41.92V31.56a16,16,0,0,0-32,0v10.36" />
            <rect x="98" y="55" width="55" height="50" rx="4" fill="hsl(var(--background))"/>
            <path d="M141.5,80.5H110.38a3.12,3.12,0,0,1-2.29-1,2.83,2.83,0,0,1-.83-2.1V60.3a3,3,0,0,1,3-3H129.4a3,3,0,0,1,3,3v2.88" />
            <path d="M125.14,64.29a3,3,0,0,1,3-3h11.21a3,3,0,0,1,3,3v2.88" />
            <circle cx="120" cy="88" r="1.5" />
            <path d="M117.5,74.5h4.63" />
            <path d="M129.4,74.5h2.31" />
            <path d="M117.5,68.5h9.25" />
        </g>
    </svg>
);

const ConnectedCatIllustration = () => (
    <svg width="150" height="120" viewBox="0 0 150 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground/30">
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
        <rect x="55" y="55" width="55" height="50" rx="4" fill="hsl(var(--background))"/>
        <path d="M85.5 80.5H54.38a3.12,3.12,0,0,1-2.29-1,2.83,2.83,0,0,1-.83-2.1V60.3a3,3,0,0,1,3-3H73.4a3,3,0,0,1,3,3v2.88" />
        <path d="M69.14,64.29a3,3,0,0,1,3-3h11.21a3,3,0,0,1,3,3v2.88" />
        <circle cx="64" cy="88" r="1.5" />
        <path d="M61.5,74.5h4.63" />
        <path d="M73.4,74.5h2.31" />
        <path d="M61.5,68.5h9.25" />
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


// --- COMPONENTES DE VISTAS ---

const CalendarsView = () => (
    <div className="flex-grow flex flex-row min-h-0">
        <aside className="w-64 border-r border-border p-4 flex flex-col gap-4">
            <Button variant="outline" className="w-full justify-start bg-primary/10 border-primary/20 text-primary">All Calendars (0)</Button>
            <h3 className="font-semibold text-lg">Groups</h3>
            <p className="text-sm text-muted-foreground">Not Grouped <span className="bg-muted px-2 py-0.5 rounded-full text-xs">0</span></p>

            <Button variant="outline"><Plus className="mr-2 h-4 w-4" /> New Group</Button>
        </aside>
        <main className="flex-grow flex flex-col p-4">
            <div className="flex items-center gap-2 mb-4">
                <Select defaultValue="all">
                    <SelectTrigger className="w-[120px]"><SelectValue placeholder="Status: All" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                    </SelectContent>
                </Select>
                <Select defaultValue="all">
                    <SelectTrigger className="w-[120px]"><SelectValue placeholder="Type: All" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="round-robin">Round Robin</SelectItem>
                        <SelectItem value="event">Event</SelectItem>
                        <SelectItem value="class-booking">Class Booking</SelectItem>
                        <SelectItem value="collective-booking">Collective Booking</SelectItem>
                        <SelectItem value="service">Service</SelectItem>
                        <SelectItem value="personal">Personal</SelectItem>
                    </SelectContent>
                </Select>
                <Select defaultValue="anyone">
                    <SelectTrigger className="w-[150px]"><SelectValue placeholder="Owned by: Anyone" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="me">Me</SelectItem>
                        <SelectItem value="anyone">Anyone</SelectItem>
                    </SelectContent>
                </Select>
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Calendar/Group Name" className="pl-10" />
                </div>
                <Button><Plus className="mr-2 h-4 w-4" /> New Calendar</Button>
            </div>
            <div className="border rounded-lg flex-grow flex flex-col">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead>Calendar Name</TableHead>
                            <TableHead>Group</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date Updated</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
                <div className="flex-grow flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center text-center gap-4 p-4">
                        <CatIllustration />
                        <h3 className="text-xl font-bold text-foreground">No Calendars Yet - Set One Up!</h3>
                        <p className="text-muted-foreground max-w-sm">Create your first calendar to start scheduling effortlessly.</p>
                        <Button className="mt-4">Create Calendar</Button>
                    </div>
                </div>
            </div>
        </main>
    </div>
);


const RoomsView = () => (
    <div className="flex-grow flex flex-col p-4">
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <h2 className="text-xl font-semibold text-foreground">Rooms</h2>
            <div className="flex items-center gap-2">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Room Name" className="pl-10 w-48" />
                </div>
                <Button><Plus className="mr-2 h-4 w-4" /> Create Room</Button>
            </div>
        </div>
        <div className="border rounded-lg flex-grow flex flex-col">
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="font-normal text-muted-foreground">Name</TableHead>
                        <TableHead className="font-normal text-muted-foreground">Total Capacity</TableHead>
                        <TableHead className="font-normal text-muted-foreground">Services Associated to</TableHead>
                        <TableHead className="font-normal text-muted-foreground">Status</TableHead>
                        <TableHead className="font-normal text-muted-foreground">Date Updated</TableHead>
                        <TableHead className="font-normal text-muted-foreground">Action Dropdown</TableHead>
                    </TableRow>
                </TableHeader>
            </Table>
            <div className="flex-grow flex items-center justify-center">
                <div className="flex flex-col items-center justify-center text-center gap-4 p-4">
                    <div className="p-3 rounded-full bg-primary/10 mb-4">
                        <CalendarIcon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">No rooms found</h3>
                    <p className="text-muted-foreground max-w-sm">No rooms found in this location</p>
                    <Button className="mt-4">
                        <Plus className="mr-2 h-4 w-4" />
                        Add new room
                    </Button>
                </div>
            </div>
        </div>
    </div>
);


const EquipmentView = () => (
     <div className="flex-grow flex flex-col p-4">
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <h2 className="text-xl font-semibold text-foreground">Equipment</h2>
            <div className="flex items-center gap-2">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Name" className="pl-10 w-48" />
                </div>
                <Button><Plus className="mr-2 h-4 w-4" /> Create Equipment</Button>
            </div>
        </div>
        <div className="border rounded-lg flex-grow flex flex-col">
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="font-normal text-muted-foreground">Name</TableHead>
                        <TableHead className="font-normal text-muted-foreground">Total Quantity</TableHead>
                        <TableHead className="font-normal text-muted-foreground">Services Associated to</TableHead>
                        <TableHead className="font-normal text-muted-foreground">Status</TableHead>
                        <TableHead className="font-normal text-muted-foreground">Date Updated</TableHead>
                        <TableHead className="font-normal text-muted-foreground">Action Dropdown</TableHead>
                    </TableRow>
                </TableHeader>
            </Table>
            <div className="flex-grow flex items-center justify-center">
                <Card className="flex flex-col items-center justify-center text-center p-8 border-dashed shadow-none">
                    <div className="p-3 rounded-full bg-primary/10 mb-4">
                        <CalendarIcon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">No equipment found</h3>
                    <p className="text-muted-foreground max-w-sm">No equipment found in this location</p>
                    <Button className="mt-4">
                        <Plus className="mr-2 h-4 w-4" />
                        Add new Equipment
                    </Button>
                </Card>
            </div>
        </div>
    </div>
);

const ServiceMenuView = () => (
    <div className="flex-grow flex flex-col p-4">
          <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <h2 className="text-xl font-semibold text-foreground">Service Menu</h2>
              <div className="flex items-center gap-2">
                  <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search" className="pl-10 w-48" />
                  </div>
                  <Button><Plus className="mr-2 h-4 w-4" /> Add Group</Button>
              </div>
        </div>
        <Card className="flex flex-col items-center justify-center text-center p-8 border-dashed shadow-none flex-grow">
            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 text-primary mb-4">
                <CalendarIcon className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Create your customized Service Menu</h3>
            <p className="text-muted-foreground max-w-sm mb-6">Start by creating a new service menu and adding Groups to it</p>
        </Card>
    </div>
);

const PreferencesView = () => (
    <div className="flex-grow h-full p-6 bg-card rounded-lg">
        <Card>
            <CardHeader>
            <h2 className="text-xl font-bold">Preferences</h2>
            <p className="text-sm text-primary font-semibold border-b-2 border-primary inline-block pb-1">
                Account Preference
            </p>
            </CardHeader>
            <CardContent className="space-y-8">
            <div>
                <h3 className="text-lg font-semibold">In App preferences</h3>
                <p className="text-sm text-muted-foreground">Set preferences like start day for the app</p>
                <Separator className="my-4" />
                <div className="grid grid-cols-2 gap-4 items-center">
                    <Label>View Options</Label>
                    <div>
                        <Label htmlFor="week-starts-on" className="text-xs text-muted-foreground">Week Starts On</Label>
                        <Select defaultValue="sunday">
                            <SelectTrigger id="week-starts-on"><SelectValue placeholder="Select a day" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="sunday">Sunday</SelectItem>
                                <SelectItem value="monday">Monday</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Separator className="my-4" />
                <div className="grid grid-cols-2 gap-4 items-center">
                    <Label>Services</Label>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="service-menu-switch">Service Menu</Label>
                            <Switch id="service-menu-switch" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="rooms-switch">Rooms</Label>
                            <Switch id="rooms-switch" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="equipments-switch">Equipments</Label>
                            <Switch id="equipments-switch" defaultChecked />
                        </div>
                    </div>
                </div>
            </div>
                <div>
                <h3 className="text-lg font-semibold">Widget preferences</h3>
                <p className="text-sm text-muted-foreground">Set preferences like language for widget</p>
                <Separator className="my-4" />
                <div className="grid grid-cols-2 gap-4 items-center">
                    <Label>Language and region</Label>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="language-select" className="text-xs text-muted-foreground">Language</Label>
                            <Select defaultValue="english">
                                <SelectTrigger id="language-select"><SelectValue placeholder="Select language" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="english">English</SelectItem>
                                    <SelectItem value="spanish">Spanish</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="time-format-select" className="text-xs text-muted-foreground">Time Format</Label>
                            <Select defaultValue="12h">
                                <SelectTrigger id="time-format-select"><SelectValue placeholder="Select time format" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="12h">1:30 PM</SelectItem>
                                    <SelectItem value="24h">13:30</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <Separator className="my-4" />
                <div className="grid grid-cols-2 gap-4 items-center">
                    <Label>View Options</Label>
                    <div>
                        <Label htmlFor="week-starts-on-widget" className="text-xs text-muted-foreground">Week Starts On</Label>
                        <Select defaultValue="sunday">
                            <SelectTrigger id="week-starts-on-widget"><SelectValue placeholder="Select a day" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="sunday">Sunday</SelectItem>
                                <SelectItem value="monday">Monday</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            </CardContent>
            <CardFooter className="flex justify-end p-6">
                <Button>Save Preferences</Button>
            </CardFooter>
        </Card>
    </div>
);

const AvailabilityView = () => (
    <div className="flex-grow h-full p-6">
        <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-16 bg-card rounded-lg">
            <AvailabilityIllustration />
            <h3 className="text-xl font-bold text-foreground">Access Restricted</h3>
            <p className="text-muted-foreground max-w-sm">
                You're not a part of this account. To get access, add yourself to this account via Agency Settings &gt; Teams &gt; Edit Team Member, and assign the account under 'Roles & Permissions'
            </p>
            <Button className="mt-4">Go to Agency Settings</Button>
        </div>
    </div>
);

const ConnectionsView = () => (
    <div className="flex-grow h-full p-6">
        <div className="flex items-center gap-2 mb-4">
            <Label htmlFor="my-staff">My Staff</Label>
            <Select>
                <SelectTrigger id="my-staff" className="w-[200px]"><SelectValue placeholder="IJ2ostfuduTpIOLMaJi" /></SelectTrigger>
            </Select>
        </div>
        <Tabs defaultValue="calendars" className="w-full h-full flex flex-col">
            <TabsList className="border-b border-border justify-start rounded-none bg-transparent p-0 flex-shrink-0">
                <TabsTrigger value="calendars" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none text-muted-foreground px-4 py-2 h-auto">
                    Calendars
                </TabsTrigger>
                <TabsTrigger value="video-conferencing" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none text-muted-foreground px-4 py-2 h-auto">
                    Video Conferencing
                </TabsTrigger>
                <TabsTrigger value="google-organic-booking" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none text-muted-foreground px-4 py-2 h-auto">
                    Google Organic Booking
                </TabsTrigger>
            </TabsList>
            <TabsContent value="calendars" className="flex-grow flex flex-col pt-4">
                <h3 className="text-xl font-semibold mb-4">Connected Calendars</h3>
                <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-16 bg-card rounded-lg">
                    <ConnectedCatIllustration />
                    <h3 className="text-xl font-bold text-foreground">No connections found</h3>
                    <p className="text-muted-foreground max-w-sm">Connect your third-party calendar(s) to sync bookings and check availability</p>
                    <Button className="mt-4">
                        <Plus className="mr-2 h-4 w-4" /> Add New
                    </Button>
                </div>
                <div className="mt-6 flex items-center justify-between p-4 bg-card rounded-lg border">
                    <div className="flex items-center gap-2">
                        <Switch id="private-mode" />
                        <Label htmlFor="private-mode" className="font-semibold text-base">Private Mode for Synced Events</Label>
                        <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                    </div>
                    <div className="text-right text-sm text-muted-foreground max-w-xs">
                        Hide event details
                        <p className="text-xs">When turned on, only you can see your third-party calendar details, and others won't be able to.</p>
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="video-conferencing" className="flex-grow flex items-center justify-center pt-4">
                <p>Content for Video Conferencing...</p>
            </TabsContent>
            <TabsContent value="google-organic-booking" className="flex-grow flex items-center justify-center pt-4">
                <p>Content for Google Organic Booking...</p>
            </TabsContent>
        </Tabs>
    </div>
);

const CalendarSettingsView = () => {
    return (
        <div className="flex flex-col h-screen p-6 bg-background text-foreground">
            <h1 className="text-3xl font-bold text-foreground mb-6">Calendars</h1>
            <Tabs defaultValue="calendars" className="w-full h-full flex flex-col">
                <TabsList className="border-b border-border justify-start rounded-none bg-transparent p-0 mb-4 flex-shrink-0">
                    <TabsTrigger value="calendars" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none text-muted-foreground px-4 py-2 h-auto">
                        Calendars
                    </TabsTrigger>
                    <TabsTrigger value="preferences" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none text-muted-foreground px-4 py-2 h-auto">
                        Preferences
                    </TabsTrigger>
                    <TabsTrigger value="availability" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none text-muted-foreground px-4 py-2 h-auto">
                        Availability
                    </TabsTrigger>
                    <TabsTrigger value="connections" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none text-muted-foreground px-4 py-2 h-auto">
                        Connections
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="calendars" className="flex-grow flex flex-col min-h-0">
                    <Tabs defaultValue="calendars-sub" className="w-full h-full flex flex-col">
                        <TabsList className="border-b border-border justify-start rounded-none bg-card p-0 flex-shrink-0">
                            <TabsTrigger value="calendars-sub" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none rounded-none transition-none text-muted-foreground px-4 py-2 h-auto">
                                Calendars
                            </TabsTrigger>
                            <TabsTrigger value="service-menu" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none rounded-none transition-none text-muted-foreground px-4 py-2 h-auto">
                                Service Menu
                            </TabsTrigger>
                            <TabsTrigger value="rooms" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none rounded-none transition-none text-muted-foreground px-4 py-2 h-auto">
                                Rooms
                            </TabsTrigger>
                            <TabsTrigger value="equipment" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none rounded-none transition-none text-muted-foreground px-4 py-2 h-auto">
                                Equipment
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="calendars-sub" className="flex-grow">
                            <CalendarsView />
                        </TabsContent>
                        <TabsContent value="rooms" className="flex-grow">
                            <RoomsView />
                        </TabsContent>
                        <TabsContent value="equipment" className="flex-grow">
                            <EquipmentView />
                        </TabsContent>
                        <TabsContent value="service-menu" className="flex-grow">
                            <ServiceMenuView />
                        </TabsContent>
                    </Tabs>
                </TabsContent>
                <TabsContent value="preferences" className="flex-grow">
                    <PreferencesView />
                </TabsContent>
                <TabsContent value="availability" className="flex-grow">
                    <AvailabilityView />
                </TabsContent>
                <TabsContent value="connections" className="flex-grow">
                    <ConnectionsView />
                </TabsContent>
            </Tabs>
        </div>
    );
};

const AppointmentListView = () => (
    <div className="flex flex-col h-screen p-6 bg-background text-foreground">
        <header className="flex items-center justify-between pb-4 mb-4">
            <h1 className="text-3xl font-bold text-foreground">Appointments</h1>
            <Button><Plus className="mr-2 h-4 w-4" /> New Appointment</Button>
        </header>
        <div className="flex items-center justify-between mb-4">
            <Tabs defaultValue="upcoming" className="w-full flex flex-col">
                <TabsList className="border-b border-border justify-start rounded-none bg-transparent p-0 flex-shrink-0">
                    <TabsTrigger value="upcoming" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none text-muted-foreground px-4 py-2 h-auto">
                        Upcoming
                    </TabsTrigger>
                    <TabsTrigger value="cancelled" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none text-muted-foreground px-4 py-2 h-auto">
                        Cancelled
                    </TabsTrigger>
                    <TabsTrigger value="all" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none text-muted-foreground px-4 py-2 h-auto">
                        All
                    </TabsTrigger>
                    <TabsTrigger value="smart-list" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none text-muted-foreground px-4 py-2 h-auto">
                        <Plus className="mr-2 h-4 w-4" /> Smart list
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming" className="flex-grow flex flex-col pt-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                            <Button variant="outline" className="text-sm"><ListFilter className="mr-2 h-4 w-4"/> Advanced Filters (1)</Button>
                            <Button variant="outline" className="text-sm"><SlidersHorizontal className="mr-2 h-4 w-4"/> Sort by (1)</Button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search by title" className="pl-10 w-48" />
                            </div>
                            <Button variant="outline" className="text-sm"><AlignJustify className="mr-2 h-4 w-4"/> Manage Columns</Button>
                        </div>
                    </div>
                    <div className="border rounded-lg flex-grow flex flex-col">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="w-[50px]">#</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Invitees</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Appointment Time</TableHead>
                                    <TableHead>Calendar</TableHead>
                                    <TableHead>Appointment Owner</TableHead>
                                </TableRow>
                            </TableHeader>
                        </Table>
                        <div className="flex-grow flex items-center justify-center">
                            <div className="flex flex-col items-center justify-center text-center gap-4 p-4">
                                <AppointmentIllustration />
                                <h3 className="text-xl font-bold text-foreground">No Upcoming Appointments!</h3>
                                <p className="text-muted-foreground max-w-sm">You don't have any upcoming appointments right now.</p>
                                <Button className="mt-4">See All Appointments</Button>
                            </div>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="cancelled" className="flex-grow flex items-center justify-center">
                    <p>Contenido para citas canceladas...</p>
                </TabsContent>
                <TabsContent value="all" className="flex-grow flex items-center justify-center">
                    <p>Contenido para todas las citas...</p>
                </TabsContent>
                <TabsContent value="smart-list" className="flex-grow flex items-center justify-center">
                    <p>Contenido para lista inteligente...</p>
                </TabsContent>
            </Tabs>
        </div>
    </div>
);


// --- COMPONENTE PRINCIPAL DE LA PÁGINA ---

export default function CalendarPage() {
    // Estado para controlar qué vista se muestra: 'calendar', 'appointments', o 'settings'
    const [view, setView] = useState("calendar");

    // Funciones para cambiar la vista al hacer clic en los botones
    const handleCalendarSettingsClick = () => {
        setView("settings");
    };

    const handleAppointmentListClick = () => {
        setView("appointments");
    };

    const handleCalendarViewClick = () => {
        setView("calendar");
    };

    return (
        <div className="flex flex-col h-screen p-6 bg-background text-foreground">
            {/* Encabezado con la navegación principal */}
            <header className="flex items-center justify-between border-b pb-4 mb-4">
                <nav className="flex items-center space-x-4 text-sm font-medium">
                    <a href="#" className="text-muted-foreground hover:text-foreground">Contacts</a>
                    <button onClick={handleCalendarViewClick} className={`${view === 'calendar' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'} hover:text-foreground pb-1 transition-colors duration-200`}>Calendar View</button>
                    <button onClick={handleAppointmentListClick} className={`${view === 'appointments' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'} hover:text-foreground pb-1 transition-colors duration-200`}>Appointment List View</button>
                </nav>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground" onClick={handleCalendarSettingsClick}>
                    Calendar Settings
                </Button>
            </header>

            {/* Renderizado condicional basado en el estado 'view' */}
            
            {/* CORRECCIÓN: Esta es la nueva vista para 'Calendar View' que solicitaste */}
            {view === "calendar" && (
                <main className="flex-grow flex items-center justify-center text-center">
                    <div className="flex flex-col items-center justify-center">
                        <CalendarNotFoundIllustration />
                        <h2 className="text-2xl font-bold mt-6 mb-2">No calendar found!</h2>
                        <p className="text-muted-foreground max-w-sm">
                            Please create a new one or ask the admin to assign you to an existing calendar
                        </p>
                        <Button className="mt-4" onClick={handleCalendarSettingsClick}>
                            Go to calendar settings
                        </Button>
                    </div>
                </main>
            )}

            {/* Mantiene la vista de la lista de citas */}
            {view === "appointments" && <AppointmentListView />}

            {/* Mantiene la vista de configuración del calendario */}
            {view === "settings" && <CalendarSettingsView />}
        </div>
    );
}
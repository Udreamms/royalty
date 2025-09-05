"use client";

import { useState } from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Plus, Search, Calendar as CalendarIcon, Server, BedDouble, Wrench, Image as ImageIcon, Users, Lock, Info, ExternalLink, SlidersHorizontal, ListFilter, AlignJustify, Trash2, Check, GripVertical, ChevronRight, Pencil, User } from "lucide-react";

// --- UTILITY FUNCTION ---
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- ILUSTRACIONES ---

const CalendarNotFoundIllustration = () => (
    <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" className="text-muted-foreground/30">
        <path d="M75 12.5C75 12.5 75 12.5 75 12.5C40.5283 12.5 12.5 40.5283 12.5 75C12.5 109.472 40.5283 137.5 75 137.5C109.472 137.5 137.5 109.472 137.5 75C137.5 40.5283 109.472 12.5 75 12.5Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M75 106.25V75" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M75 75L93.75 93.75" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M75 43.75C75 43.75 75 43.75 75 43.75C60.6723 43.75 49.3491 55.0732 49.3491 69.4009C49.3491 83.7286 60.6723 95.0518 75 95.0518C89.3277 95.0518 100.651 83.7286 100.651 69.4009C100.651 55.0732 89.3277 43.75 75 43.75Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const AppointmentIllustration = () => (
    <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" className="text-muted-foreground/30">
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
const CancelledAppointmentIllustration = () => (
    <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" className="text-muted-foreground/30 mb-4">
        <path d="M45 35 H105 L105 25 L55 25 L45 35 Z" fill="hsl(var(--muted))" />
        <path d="M48 32 H98 V22 H58 L48 32 Z" stroke="currentColor" strokeWidth="2" fill="hsl(var(--card))" />
        <path d="M55 27 h35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M55 29 h25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M50 40 H110 L110 30 L60 30 L50 40 Z" fill="hsl(var(--muted))" />
        <path d="M53 37 H103 V27 H63 L53 37 Z" stroke="currentColor" strokeWidth="2" fill="hsl(var(--card))" />
        <path d="M60 32 h35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M60 34 h25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="35" y="45" width="80" height="70" rx="8" stroke="currentColor" strokeWidth="3" fill="hsl(var(--background))" />
        <path d="M35 60 H115" stroke="currentColor" strokeWidth="3" />
        <path d="M60 75 L80 95" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M80 75 L60 95" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M90 90 L100 100" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M100 90 L90 100" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
);
const AllAppointmentsYetIllustration = () => (
    <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" className="text-muted-foreground/30 mb-4">
        <path d="M45 35 H105 L105 25 L55 25 L45 35 Z" fill="hsl(var(--muted))" />
        <path d="M48 32 H98 V22 H58 L48 32 Z" stroke="currentColor" strokeWidth="2" fill="hsl(var(--card))" />
        <path d="M55 27 h35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M55 29 h25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M50 40 H110 L110 30 L60 30 L50 40 Z" fill="hsl(var(--muted))" />
        <path d="M53 37 H103 V27 H63 L53 37 Z" stroke="currentColor" strokeWidth="2" fill="hsl(var(--card))" />
        <path d="M60 32 h35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M60 34 h25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="35" y="45" width="80" height="70" rx="8" stroke="currentColor" strokeWidth="3" fill="hsl(var(--background))" />
        <path d="M35 60 H115" stroke="currentColor" strokeWidth="3" />
        <path d="M55 85 L65 85" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M72.5 85 L82.5 85" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M90 85 L100 85" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M55 100 L65 100" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M72.5 100 L82.5 100" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
);
const SmartListIllustration = () => (
    <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" className="text-muted-foreground/30 mb-4">
        <path d="M50 37.5H100" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        <path d="M50 75H100" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        <path d="M50 112.5H100" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        <path d="M25 25V125" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        <path d="M125 25V125" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        <path d="M112.5 25L100 12.5L87.5 25L100 37.5L112.5 25Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const CatIllustration = () => (
    <svg width="180" height="120" viewBox="0 0 180 120" fill="none" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" className="text-muted-foreground/30">
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
    <svg width="140" height="112" viewBox="0 0 160 120" fill="none" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" className="text-muted-foreground/60 mb-6">
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
    <svg width="150" height="120" viewBox="0 0 150 120" fill="none" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" className="text-muted-foreground/30">
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

// --- MODALS & PANELES DESPLEGABLES ---

function BookAppointmentModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
    const [activeModalTab, setActiveModalTab] = useState("appointment");

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={cn(
                "p-0 max-w-4xl",
                activeModalTab === 'appointment' ? "grid grid-cols-2 gap-8" : ""
            )}>
                <div className="p-6">
                    <DialogHeader>
                        <DialogTitle>
                            {activeModalTab === 'appointment' ? 'Book Appointment' : 'Add Blocked Off Time'}
                        </DialogTitle>
                    </DialogHeader>
                    <Tabs value={activeModalTab} onValueChange={setActiveModalTab} className="mt-4">
                        <TabsList>
                            <TabsTrigger value="appointment">Appointment</TabsTrigger>
                            <TabsTrigger value="blocked">Blocked off time</TabsTrigger>
                        </TabsList>
                        <TabsContent value="appointment" className="mt-6 space-y-4">
                            <div>
                                <Label>Calendar</Label>
                                <Select><SelectTrigger><SelectValue placeholder="Select a calendar" /></SelectTrigger></Select>
                                <p className="text-red-500 text-xs mt-1">No calendars found in the location.</p>
                            </div>
                            <div>
                                <Label>Appointment Title</Label>
                                <Input placeholder="(eg) Appointment with Bob" />
                            </div>
                            <Button variant="link" className="p-0">Add Description</Button>
                            <div>
                                <Label>Date & Time</Label>
                                <div className="p-3 bg-muted rounded-md text-sm">
                                    <p>Showing slots in this timezone: (Account Timezone)</p>
                                    <Select defaultValue="denver"><SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent><SelectItem value="denver">GMT-06:00 America/Denver (MDT)</SelectItem></SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" className="w-full bg-background">Default</Button>
                                <Button variant="ghost" className="w-full">Custom</Button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>Date</Label><Input type="date" defaultValue="2025-09-03" /></div>
                                <div><Label>Slot</Label><Select><SelectTrigger><SelectValue placeholder="Please Select" /></SelectTrigger></Select></div>
                            </div>
                             <div>
                                <Label>Meeting Location</Label>
                                <RadioGroup defaultValue="default" className="mt-2 space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="default" id="r1" />
                                        <Label htmlFor="r1">Calendar Default <span className="text-muted-foreground text-xs">(as confirmed in the calendar)</span></Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="custom" id="r2" />
                                        <Label htmlFor="r2">Custom <span className="text-muted-foreground text-xs">(set specific to this appointment)</span></Label>
                                    </div>
                                </RadioGroup>
                            </div>
                             <div>
                                <Label>Status</Label>
                                <Select defaultValue="confirmed"><SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent><SelectItem value="confirmed">Confirmed</SelectItem></SelectContent>
                                </Select>
                            </div>
                        </TabsContent>
                         <TabsContent value="blocked" className="mt-6 space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Going on vacation? Taking some time off? Block off time on your calendar to prevent clients from booking appointments existing appointments will still remain on your calendar.
                            </p>
                            <div>
                                <Label>User/Calendar</Label>
                                <Select><SelectTrigger><SelectValue placeholder="Select User/Calendar" /></SelectTrigger></Select>
                            </div>
                            <div>
                                <Label>Appointment Title</Label>
                                <Input placeholder="(eg) Appointment with Bob" />
                            </div>
                            <div>
                                <Label>Date & Time</Label>
                                <div className="p-3 bg-muted rounded-md text-sm">
                                    <p>Showing slots in this timezone: (Account Timezone)</p>
                                    <Select defaultValue="denver">
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent><SelectItem value="denver">GMT-06:00 America/Denver (MDT)</SelectItem></SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><Label>Start Time</Label><Input type="text" defaultValue="Sep 3, 2025 5:33 PM" /></div>
                                <div><Label>End Time</Label><Input type="text" defaultValue="Sep 3, 2025 6:03 PM" /></div>
                            </div>
                        </TabsContent>
                    </Tabs>
                    
                    {activeModalTab === 'blocked' && (
                         <DialogFooter className="pt-6 mt-6 border-t">
                            <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                            <Button>Block Time</Button>
                        </DialogFooter>
                    )}
                </div>
                
                {activeModalTab === 'appointment' && (
                    <div className="bg-muted/50 p-6 rounded-r-lg flex flex-col justify-between">
                         <div>
                            <div className="flex items-center gap-2 mb-4">
                                <User className="h-5 w-5 text-muted-foreground" />
                                <Label>Select Contact *</Label>
                            </div>
                            <Select><SelectTrigger><SelectValue placeholder="Search by name, email or phone"/></SelectTrigger></Select>
    
                             <div className="mt-6">
                                <Label>Internal Notes</Label>
                                <Button variant="link" className="p-0 block"><Plus className="inline-block mr-1 h-4 w-4"/>Add Internal Note</Button>
                            </div>
                        </div>
                         <DialogFooter className="!justify-between items-center bg-transparent w-full">
                            <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                            <Button>Book Appointment</Button>
                        </DialogFooter>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

function AdvancedFiltersSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void; }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
        <SheetHeader><SheetTitle>Advanced Filters</SheetTitle><SheetDescription>Apply filters to appointments.</SheetDescription></SheetHeader>
        <div className="flex-grow p-1 overflow-y-auto">
          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <Select defaultValue="appointment-time"><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="appointment-time">Appointment Time</SelectItem></SelectContent></Select>
              <Select defaultValue="is"><SelectTrigger className="w-[120px]"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="is">Is</SelectItem></SelectContent></Select>
            </div>
            <div className="flex items-center gap-2 pl-4">
                 <Select defaultValue="after-date"><SelectTrigger className="w-[150px]"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="after-date">After Date</SelectItem></SelectContent></Select>
                <Input type="date" defaultValue="2025-09-03" className="flex-grow" />
                <Button variant="outline" size="icon"><Trash2 className="h-4 w-4" /></Button>
            </div>
            <Button variant="ghost" size="sm" className="text-xs"><Plus className="mr-2 h-4 w-4" /> AND</Button>
          </div>
          <div className="mt-4"><Button variant="outline"><Plus className="mr-2 h-4 w-4" /> Add Filter</Button></div>
        </div>
        <SheetFooter className="pt-4 border-t"><Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button><Button onClick={() => onOpenChange(false)}>Apply</Button></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

const sortOptions = [
  { id: 'date-added-asc', label: 'Date Added - Ascending' },
  { id: 'date-added-desc', label: 'Date Added - Descending' },
  { id: 'appointment-time-asc', label: 'Appointment Time - Ascending' },
  { id: 'appointment-time-desc', label: 'Appointment Time - Descending' },
];
function SortBySheet({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void; }) {
  const [selectedOption, setSelectedOption] = useState('appointment-time-asc');
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[450px] flex flex-col">
        <SheetHeader><SheetTitle>Sort by</SheetTitle><SheetDescription>Apply sorting to appointments</SheetDescription></SheetHeader>
        <div className="flex-grow py-4">
          <div className="flex flex-col space-y-1">
            {sortOptions.map((option) => (
              <button key={option.id} onClick={() => setSelectedOption(option.id)} className={cn("flex items-center justify-between w-full text-left p-3 rounded-md text-sm hover:bg-muted", selectedOption === option.id && "bg-muted font-semibold")}>
                {option.label}
                {selectedOption === option.id && <Check className="h-4 w-4 text-primary" />}
              </button>
            ))}
          </div>
        </div>
        <SheetFooter className="pt-4 border-t"><Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button><Button onClick={() => onOpenChange(false)}>Apply</Button></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

const initialColumns = [
    { id: 'title', label: 'Title', checked: true, locked: true },
    { id: 'invitees', label: 'Invitees', checked: true },
    { id: 'status', label: 'Status', checked: true },
    { id: 'appointment-time', label: 'Appointment Time', checked: true },
    { id: 'calendar', label: 'Calendar', checked: true },
    { id: 'appointment-owner', label: 'Appointment Owner', checked: true },
    { id: 'created-by', label: 'Created By', checked: false },
    { id: 'date-added', label: 'Date Added', checked: false },
    { id: 'source', label: 'Source', checked: false },
];

function ManageColumnsSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void; }) {
  const [columns, setColumns] = useState(initialColumns);

  const handleCheckedChange = (id: string, checked: boolean) => {
    setColumns(columns.map(col => col.id === id ? { ...col, checked } : col));
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[450px] flex flex-col">
        <SheetHeader>
          <SheetTitle>Manage Columns</SheetTitle>
          <SheetDescription>Manage columns for the appointment list view</SheetDescription>
        </SheetHeader>
        <div className="flex-grow py-4 space-y-4">
            {columns.map(column => (
                <div key={column.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                    <div className="flex items-center gap-3">
                        <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                        <Checkbox
                            id={column.id}
                            checked={column.checked}
                            onCheckedChange={(checked) => handleCheckedChange(column.id, !!checked)}
                            disabled={column.locked}
                        />
                        <Label htmlFor={column.id} className={cn(column.locked && "text-muted-foreground")}>
                            {column.label}
                        </Label>
                    </div>
                    {column.locked && <Lock className="h-4 w-4 text-muted-foreground" />}
                </div>
            ))}
        </div>
        <SheetFooter className="pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={() => onOpenChange(false)}>Apply</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

interface CustomizeListSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onFiltersClick: () => void;
    onSortByClick: () => void;
    onColumnsClick: () => void;
}

function CustomizeListSheet({ open, onOpenChange, onFiltersClick, onSortByClick, onColumnsClick }: CustomizeListSheetProps) {
    
    const handleNavigation = (callback: () => void) => {
        onOpenChange(false); 
        setTimeout(callback, 150);
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-[400px] sm:w-[450px] flex flex-col">
                <SheetHeader>
                    <SheetTitle>Customize List</SheetTitle>
                </SheetHeader>
                <div className="flex-grow py-4 space-y-4">
                    <div className="relative">
                        <Pencil className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="New Smart List" className="pl-10" />
                    </div>
                    <div className="space-y-2">
                        <button onClick={() => handleNavigation(onFiltersClick)} className="flex items-center justify-between w-full text-left p-3 rounded-md hover:bg-muted">
                            <div className="flex items-center gap-3">
                                <ListFilter className="h-5 w-5 text-muted-foreground" />
                                <span>Advanced Filters</span>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </button>
                         <button onClick={() => handleNavigation(onSortByClick)} className="flex items-center justify-between w-full text-left p-3 rounded-md hover:bg-muted">
                            <div className="flex items-center gap-3">
                                <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
                                <span>Sort by</span>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </button>
                        <button onClick={() => handleNavigation(onColumnsClick)} className="flex items-center justify-between w-full text-left p-3 rounded-md hover:bg-muted">
                            <div className="flex items-center gap-3">
                                <AlignJustify className="h-5 w-5 text-muted-foreground" />
                                <span>Columns</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">6 shown</span>
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </div>
                        </button>
                    </div>
                </div>
                 <SheetFooter className="pt-4 border-t">
                    <Button variant="ghost">Discard Changes</Button>
                    <Button><Plus className="mr-2 h-4 w-4" /> Save as New</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

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
                <Select defaultValue="all"><SelectTrigger className="w-[120px]"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem></SelectContent></Select>
                <Select defaultValue="all"><SelectTrigger className="w-[120px]"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem></SelectContent></Select>
                <Select defaultValue="anyone"><SelectTrigger className="w-[150px]"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="me">Me</SelectItem></SelectContent></Select>
                <div className="relative flex-grow"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Calendar/Group Name" className="pl-10" /></div>
                <Button><Plus className="mr-2 h-4 w-4" /> New Calendar</Button>
            </div>
            <div className="border rounded-lg flex-grow flex flex-col">
                <Table><TableHeader><TableRow className="hover:bg-transparent"><TableHead>Calendar Name</TableHead><TableHead>Group</TableHead><TableHead>Duration</TableHead><TableHead>Type</TableHead><TableHead>Status</TableHead><TableHead>Date Updated</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader></Table>
                <div className="flex-grow flex items-center justify-center"><div className="flex flex-col items-center justify-center text-center gap-4 p-4"><CatIllustration /><h3 className="text-xl font-bold text-foreground">No Calendars Yet</h3><p className="text-muted-foreground max-w-sm">Create your first calendar.</p><Button className="mt-4">Create Calendar</Button></div></div>
            </div>
        </main>
    </div>
);
const RoomsView = () => (
    <div className="flex-grow flex flex-col p-4">
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <h2 className="text-xl font-semibold text-foreground">Rooms</h2>
            <div className="flex items-center gap-2"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Room Name" className="pl-10 w-48" /></div><Button><Plus className="mr-2 h-4 w-4" /> Create Room</Button></div>
        </div>
        <div className="border rounded-lg flex-grow flex flex-col">
            <Table><TableHeader><TableRow className="hover:bg-transparent"><TableHead className="font-normal text-muted-foreground">Name</TableHead><TableHead className="font-normal text-muted-foreground">Total Capacity</TableHead></TableRow></TableHeader></Table>
            <div className="flex-grow flex items-center justify-center"><div className="flex flex-col items-center justify-center text-center gap-4 p-4"><div className="p-3 rounded-full bg-primary/10 mb-4"><CalendarIcon className="h-8 w-8 text-primary" /></div><h3 className="text-xl font-bold text-foreground">No rooms found</h3><p className="text-muted-foreground max-w-sm">No rooms found</p><Button className="mt-4"><Plus className="mr-2 h-4 w-4" /> Add new room</Button></div></div>
        </div>
    </div>
);
const EquipmentView = () => (
    <div className="flex-grow flex flex-col p-4">
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <h2 className="text-xl font-semibold text-foreground">Equipment</h2>
            <div className="flex items-center gap-2"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Name" className="pl-10 w-48" /></div><Button><Plus className="mr-2 h-4 w-4" /> Create Equipment</Button></div>
        </div>
        <div className="border rounded-lg flex-grow flex flex-col">
            <Table><TableHeader><TableRow className="hover:bg-transparent"><TableHead className="font-normal text-muted-foreground">Name</TableHead><TableHead className="font-normal text-muted-foreground">Total Quantity</TableHead></TableRow></TableHeader></Table>
            <div className="flex-grow flex items-center justify-center"><Card className="flex flex-col items-center justify-center text-center p-8 border-dashed shadow-none"><div className="p-3 rounded-full bg-primary/10 mb-4"><CalendarIcon className="h-8 w-8 text-primary" /></div><h3 className="text-xl font-bold text-foreground">No equipment found</h3><p className="text-muted-foreground max-w-sm">No equipment found</p><Button className="mt-4"><Plus className="mr-2 h-4 w-4" /> Add new Equipment</Button></Card></div>
        </div>
    </div>
);
const ServiceMenuView = () => (
    <div className="flex-grow flex flex-col p-4">
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <h2 className="text-xl font-semibold text-foreground">Service Menu</h2>
            <div className="flex items-center gap-2"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search" className="pl-10 w-48" /></div><Button><Plus className="mr-2 h-4 w-4" /> Add Group</Button></div>
        </div>
        <Card className="flex flex-col items-center justify-center text-center p-8 border-dashed shadow-none flex-grow"><div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 text-primary mb-4"><CalendarIcon className="h-10 w-10" /></div><h3 className="text-xl font-semibold mb-2">Create your customized Service Menu</h3><p className="text-muted-foreground max-w-sm mb-6">Start by creating a new service menu</p></Card>
    </div>
);
const PreferencesView = () => (
    <div className="flex-grow h-full p-6 bg-card rounded-lg">
        <Card>
            <CardHeader><h2 className="text-xl font-bold">Preferences</h2><p className="text-sm text-primary font-semibold border-b-2 border-primary inline-block pb-1">Account Preference</p></CardHeader>
            <CardContent className="space-y-8">
                <div>
                    <h3 className="text-lg font-semibold">In App preferences</h3><p className="text-sm text-muted-foreground">Set app preferences</p><Separator className="my-4" />
                    <div className="grid grid-cols-2 gap-4 items-center"><Label>View Options</Label><div><Label htmlFor="week-starts-on" className="text-xs text-muted-foreground">Week Starts On</Label><Select defaultValue="sunday"><SelectTrigger id="week-starts-on"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="sunday">Sunday</SelectItem></SelectContent></Select></div></div><Separator className="my-4" />
                    <div className="grid grid-cols-2 gap-4 items-center"><Label>Services</Label><div className="space-y-4"><div className="flex items-center justify-between"><Label htmlFor="service-menu-switch">Service Menu</Label><Switch id="service-menu-switch" defaultChecked /></div><div className="flex items-center justify-between"><Label htmlFor="rooms-switch">Rooms</Label><Switch id="rooms-switch" defaultChecked /></div><div className="flex items-center justify-between"><Label htmlFor="equipments-switch">Equipments</Label><Switch id="equipments-switch" defaultChecked /></div></div></div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Widget preferences</h3><p className="text-sm text-muted-foreground">Set widget preferences</p><Separator className="my-4" />
                    <div className="grid grid-cols-2 gap-4 items-center"><Label>Language and region</Label><div className="space-y-4"><div><Label htmlFor="language-select" className="text-xs text-muted-foreground">Language</Label><Select defaultValue="english"><SelectTrigger id="language-select"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="english">English</SelectItem></SelectContent></Select></div><div><Label htmlFor="time-format-select" className="text-xs text-muted-foreground">Time Format</Label><Select defaultValue="12h"><SelectTrigger id="time-format-select"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="12h">1:30 PM</SelectItem></SelectContent></Select></div></div></div><Separator className="my-4" />
                    <div className="grid grid-cols-2 gap-4 items-center"><Label>View Options</Label><div><Label htmlFor="week-starts-on-widget" className="text-xs text-muted-foreground">Week Starts On</Label><Select defaultValue="sunday"><SelectTrigger id="week-starts-on-widget"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="sunday">Sunday</SelectItem></SelectContent></Select></div></div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end p-6"><Button>Save Preferences</Button></CardFooter>
        </Card>
    </div>
);
const AvailabilityView = () => (
    <div className="flex-grow h-full p-6">
        <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-16 bg-card rounded-lg">
            <AvailabilityIllustration /><h3 className="text-xl font-bold text-foreground">Access Restricted</h3><p className="text-muted-foreground max-w-sm">You're not a part of this account.</p><Button className="mt-4">Go to Agency Settings</Button>
        </div>
    </div>
);
const ConnectionsView = () => (
    <div className="flex-grow h-full p-6">
        <div className="flex items-center gap-2 mb-4"><Label htmlFor="my-staff">My Staff</Label><Select><SelectTrigger id="my-staff" className="w-[200px]"><SelectValue placeholder="IJ2ostfuduTpIOLMaJi" /></SelectTrigger></Select></div>
        <Tabs defaultValue="calendars" className="w-full h-full flex flex-col">
            <TabsList className="border-b border-border justify-start rounded-none bg-transparent p-0 flex-shrink-0"><TabsTrigger value="calendars" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none text-muted-foreground px-4 py-2 h-auto">Calendars</TabsTrigger><TabsTrigger value="video-conferencing" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none text-muted-foreground px-4 py-2 h-auto">Video Conferencing</TabsTrigger><TabsTrigger value="google-organic-booking" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none text-muted-foreground px-4 py-2 h-auto">Google Organic Booking</TabsTrigger></TabsList>
            <TabsContent value="calendars" className="flex-grow flex flex-col pt-4">
                <h3 className="text-xl font-semibold mb-4">Connected Calendars</h3>
                <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-16 bg-card rounded-lg"><ConnectedCatIllustration /><h3 className="text-xl font-bold text-foreground">No connections found</h3><p className="text-muted-foreground max-w-sm">Connect your third-party calendar(s).</p><Button className="mt-4"><Plus className="mr-2 h-4 w-4" /> Add New</Button></div>
                <div className="mt-6 flex items-center justify-between p-4 bg-card rounded-lg border"><div className="flex items-center gap-2"><Switch id="private-mode" /><Label htmlFor="private-mode" className="font-semibold text-base">Private Mode for Synced Events</Label><Info className="h-4 w-4 text-muted-foreground cursor-pointer" /></div><div className="text-right text-sm text-muted-foreground max-w-xs">Hide event details<p className="text-xs">Only you can see your third-party calendar details.</p></div></div>
            </TabsContent>
            <TabsContent value="video-conferencing" className="flex-grow flex items-center justify-center pt-4"><p>Video Conferencing Content...</p></TabsContent>
            <TabsContent value="google-organic-booking" className="flex-grow flex items-center justify-center pt-4"><p>Google Organic Booking Content...</p></TabsContent>
        </Tabs>
    </div>
);
const CalendarSettingsView = () => (
    <div className="flex flex-col h-full p-6 bg-background text-foreground">
        <h1 className="text-3xl font-bold text-foreground mb-6">Calendars</h1>
        <Tabs defaultValue="calendars" className="w-full h-full flex flex-col">
            <TabsList className="border-b border-border justify-start rounded-none bg-transparent p-0 mb-4 flex-shrink-0"><TabsTrigger value="calendars" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none text-muted-foreground px-4 py-2 h-auto">Calendars</TabsTrigger><TabsTrigger value="preferences" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none text-muted-foreground px-4 py-2 h-auto">Preferences</TabsTrigger><TabsTrigger value="availability" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none text-muted-foreground px-4 py-2 h-auto">Availability</TabsTrigger><TabsTrigger value="connections" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none text-muted-foreground px-4 py-2 h-auto">Connections</TabsTrigger></TabsList>
            <TabsContent value="calendars" className="flex-grow flex flex-col min-h-0">
                <Tabs defaultValue="calendars-sub" className="w-full h-full flex flex-col">
                    <TabsList className="border-b border-border justify-start rounded-none bg-card p-0 flex-shrink-0"><TabsTrigger value="calendars-sub" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none rounded-none transition-none text-muted-foreground px-4 py-2 h-auto">Calendars</TabsTrigger><TabsTrigger value="service-menu" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none rounded-none transition-none text-muted-foreground px-4 py-2 h-auto">Service Menu</TabsTrigger><TabsTrigger value="rooms" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none rounded-none transition-none text-muted-foreground px-4 py-2 h-auto">Rooms</TabsTrigger><TabsTrigger value="equipment" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none rounded-none transition-none text-muted-foreground px-4 py-2 h-auto">Equipment</TabsTrigger></TabsList>
                    <TabsContent value="calendars-sub" className="flex-grow"><CalendarsView /></TabsContent>
                    <TabsContent value="rooms" className="flex-grow"><RoomsView /></TabsContent>
                    <TabsContent value="equipment" className="flex-grow"><EquipmentView /></TabsContent>
                    <TabsContent value="service-menu" className="flex-grow"><ServiceMenuView /></TabsContent>
                </Tabs>
            </TabsContent>
            <TabsContent value="preferences" className="flex-grow"><PreferencesView /></TabsContent>
            <TabsContent value="availability" className="flex-grow"><AvailabilityView /></TabsContent>
            <TabsContent value="connections" className="flex-grow"><ConnectionsView /></TabsContent>
        </Tabs>
    </div>
);

// --- COMPONENTE REUTILIZABLE PARA LA BARRA DE ACCIONES ---
const AppointmentActionsBar = ({ onFiltersClick, onSortByClick, onManageColumnsClick }: { onFiltersClick: () => void; onSortByClick: () => void; onManageColumnsClick: () => void; }) => (
    <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
            <Button variant="outline" className="text-sm" onClick={onFiltersClick}>
                <ListFilter className="mr-2 h-4 w-4"/> Advanced Filters (1)
            </Button>
            <Button variant="outline" className="text-sm" onClick={onSortByClick}>
                <SlidersHorizontal className="mr-2 h-4 w-4"/> Sort by (1)
            </Button>
        </div>
        <div className="flex items-center space-x-2">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by title" className="pl-10 w-48" />
            </div>
            <Button variant="outline" className="text-sm" onClick={onManageColumnsClick}>
                <AlignJustify className="mr-2 h-4 w-4"/> Manage Columns
            </Button>
        </div>
    </div>
);

// --- VISTA DE LISTA DE CITAS (ACTUALIZADA) ---

const AppointmentListView = () => {
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [isSortByOpen, setIsSortByOpen] = useState(false);
    const [isColumnsOpen, setIsColumnsOpen] = useState(false);
    const [isCustomizeListOpen, setIsCustomizeListOpen] = useState(false);
    const [isBookAppointmentOpen, setIsBookAppointmentOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("upcoming");

    return (
        <div className="flex flex-row h-full gap-6 bg-background text-foreground">
            {/* Columna principal con la tabla de citas */}
            <div className="flex-grow flex flex-col min-w-0">
                <h1 className="text-3xl font-bold text-foreground pb-4 mb-4">Appointments</h1>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col flex-grow min-h-0">
                    <TabsList className="border-b border-border justify-start rounded-none bg-transparent p-0 flex-shrink-0">
                        <TabsTrigger value="upcoming" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none text-muted-foreground px-4 py-2 h-auto">Upcoming</TabsTrigger>
                        <TabsTrigger value="cancelled" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none text-muted-foreground px-4 py-2 h-auto">Cancelled</TabsTrigger>
                        <TabsTrigger value="all" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none text-muted-foreground px-4 py-2 h-auto">All</TabsTrigger>
                        <TabsTrigger value="smart-list" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none text-muted-foreground px-4 py-2 h-auto"><Plus className="mr-2 h-4 w-4" /> Smart list</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="upcoming" className="flex-grow flex flex-col pt-4 min-h-0"><AppointmentActionsBar onFiltersClick={() => setIsFiltersOpen(true)} onSortByClick={() => setIsSortByOpen(true)} onManageColumnsClick={() => setIsColumnsOpen(true)}/><div className="border rounded-lg flex-grow flex flex-col"><Table><TableHeader><TableRow className="hover:bg-transparent"><TableHead className="w-[50px]">#</TableHead><TableHead>Title</TableHead><TableHead>Invitees</TableHead><TableHead>Status</TableHead><TableHead>Appointment Time</TableHead><TableHead>Calendar</TableHead><TableHead>Appointment Owner</TableHead></TableRow></TableHeader></Table><div className="flex-grow flex items-center justify-center"><div className="flex flex-col items-center justify-center text-center gap-4 p-4"><AppointmentIllustration /><h3 className="text-xl font-bold text-foreground">No Upcoming Appointments!</h3><p className="text-muted-foreground max-w-sm">You don't have any upcoming appointments right now.</p><Button className="mt-4">See All Appointments</Button></div></div></div></TabsContent>
                    <TabsContent value="cancelled" className="flex-grow flex flex-col pt-4 min-h-0"><AppointmentActionsBar onFiltersClick={() => setIsFiltersOpen(true)} onSortByClick={() => setIsSortByOpen(true)} onManageColumnsClick={() => setIsColumnsOpen(true)}/><div className="border rounded-lg flex-grow flex flex-col"><Table><TableHeader><TableRow className="hover:bg-transparent"><TableHead className="w-[50px]">#</TableHead><TableHead>Title</TableHead><TableHead>Invitees</TableHead><TableHead>Status</TableHead><TableHead>Appointment Time</TableHead><TableHead>Calendar</TableHead><TableHead>Appointment Owner</TableHead></TableRow></TableHeader></Table><div className="flex-grow flex items-center justify-center"><div className="flex flex-col items-center justify-center text-center gap-4 p-4"><CancelledAppointmentIllustration /><h3 className="text-xl font-bold text-foreground">No Cancelled Appointments!</h3><p className="text-muted-foreground max-w-sm">You don't have any cancelled appointments at the moment.</p><Button className="mt-4">See All Appointments</Button></div></div></div></TabsContent>
                    <TabsContent value="all" className="flex-grow flex flex-col pt-4 min-h-0"><AppointmentActionsBar onFiltersClick={() => setIsFiltersOpen(true)} onSortByClick={() => setIsSortByOpen(true)} onManageColumnsClick={() => setIsColumnsOpen(true)} /><div className="border rounded-lg flex-grow flex flex-col"><Table><TableHeader><TableRow className="hover:bg-transparent"><TableHead className="w-[50px]">#</TableHead><TableHead>Title</TableHead><TableHead>Invitees</TableHead><TableHead>Status</TableHead><TableHead>Appointment Time</TableHead><TableHead>Calendar</TableHead><TableHead>Appointment Owner</TableHead></TableRow></TableHeader></Table><div className="flex-grow flex items-center justify-center"><div className="flex flex-col items-center justify-center text-center gap-4 p-4"><AllAppointmentsYetIllustration /><h3 className="text-xl font-bold text-foreground">No Appointments Yet</h3><p className="text-muted-foreground max-w-sm">Book a test appointment to see how it works.</p><Button className="mt-4">Book a Test Appointment</Button></div></div></div></TabsContent>
                    <TabsContent value="smart-list" className="flex-grow flex flex-col pt-4 min-h-0"><div className="border rounded-lg flex-grow flex flex-col"><Table><TableHeader><TableRow className="hover:bg-transparent"><TableHead className="w-[50px]">#</TableHead><TableHead>Title</TableHead><TableHead>Invitees</TableHead><TableHead>Status</TableHead><TableHead>Appointment Time</TableHead><TableHead>Calendar</TableHead><TableHead>Appointment Owner</TableHead></TableRow></TableHeader></Table><div className="flex-grow flex items-center justify-center"><div className="flex flex-col items-center justify-center text-center gap-4 p-4"><SmartListIllustration /><h3 className="text-xl font-bold text-foreground">Create Your First Smart List</h3><p className="text-muted-foreground max-w-sm">Filter and save your appointments for quick access.</p><Button className="mt-4" onClick={() => setIsCustomizeListOpen(true)}><Plus className="mr-2 h-4 w-4"/> Create Smart List</Button></div></div></div></TabsContent>
                </Tabs>
            </div>
            {/* Barra lateral derecha de acciones */}
            <aside className="w-52 flex-shrink-0 pt-24">
                <div className="space-y-3">
                    <Button className="w-full" onClick={() => setIsBookAppointmentOpen(true)}><Plus className="mr-2 h-4 w-4" /> New Appointment</Button>
                    <Button variant="outline" className="w-full justify-start text-muted-foreground" onClick={() => setIsCustomizeListOpen(true)}>
                         <SlidersHorizontal className="mr-2 h-4 w-4" /> Customize List
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-muted-foreground" onClick={() => setIsColumnsOpen(true)}>
                        <AlignJustify className="mr-2 h-4 w-4" /> Manage Columns
                    </Button>
                </div>
            </aside>
            
            {/* Modals y Paneles que se abren */}
            <BookAppointmentModal open={isBookAppointmentOpen} onOpenChange={setIsBookAppointmentOpen} />
            <AdvancedFiltersSheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen} />
            <SortBySheet open={isSortByOpen} onOpenChange={setIsSortByOpen} />
            <ManageColumnsSheet open={isColumnsOpen} onOpenChange={setIsColumnsOpen} />
            <CustomizeListSheet 
                open={isCustomizeListOpen} 
                onOpenChange={setIsCustomizeListOpen}
                onFiltersClick={() => { setIsCustomizeListOpen(false); setTimeout(() => setIsFiltersOpen(true), 150); }}
                onSortByClick={() => { setIsCustomizeListOpen(false); setTimeout(() => setIsSortByOpen(true), 150); }}
                onColumnsClick={() => { setIsCustomizeListOpen(false); setTimeout(() => setIsColumnsOpen(true), 150); }}
            />
        </div>
    );
};


// --- COMPONENTE PRINCIPAL DE LA PÁGINA ---

export default function CalendarPage() {
    const [view, setView] = useState("calendar");
    const handleCalendarSettingsClick = () => setView("settings");
    const handleAppointmentListClick = () => setView("appointments");
    const handleCalendarViewClick = () => setView("calendar");

    return (
        <div className="flex flex-col h-screen bg-background text-foreground">
            <div className="p-6 flex flex-col h-full">
                <header className="flex items-center justify-between border-b pb-4 mb-4 flex-shrink-0">
                    <nav className="flex items-center space-x-4 text-sm font-medium">
                        <a href="#" className="text-muted-foreground hover:text-foreground">Contacts</a>
                        <button onClick={handleCalendarViewClick} className={`${view === 'calendar' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'} hover:text-foreground pb-1 transition-colors duration-200`}>Calendar View</button>
                        <button onClick={handleAppointmentListClick} className={`${view === 'appointments' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'} hover:text-foreground pb-1 transition-colors duration-200`}>Appointment List View</button>
                    </nav>
                    <Button variant="ghost" className="text-muted-foreground hover:text-foreground" onClick={handleCalendarSettingsClick}>Calendar Settings</Button>
                </header>

                <main className="flex-grow min-h-0">
                    {view === "calendar" && (<div className="flex h-full items-center justify-center text-center"><div className="flex flex-col items-center justify-center"><CalendarNotFoundIllustration /><h2 className="text-2xl font-bold mt-6 mb-2">No calendar found!</h2><p className="text-muted-foreground max-w-sm">Please create a new one or ask the admin to assign you to an existing calendar</p><Button className="mt-4" onClick={handleCalendarSettingsClick}>Go to calendar settings</Button></div></div>)}
                    {view === "appointments" && <AppointmentListView />}
                    {view === "settings" && <CalendarSettingsView />}
                </main>
            </div>
        </div>
    );
}
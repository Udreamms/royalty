"use client";

import { useState } from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, Search, Calendar as CalendarIcon, Info } from "lucide-react";

// Utility function to merge class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Illustrations
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

const RestrictedAccessIllustration = () => (
    <svg width="160" height="120" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground/20">
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M74 46.8V34.5c0-9.11 7.39-16.5 16.5-16.5h0c9.11 0 16.5 7.39 16.5 16.5v8.3" />
            <path d="M60 51h50v48H60z" fill="hsl(var(--background))" />
            <path d="M60 51h50v48H60z" />
            <circle cx="85" cy="79" r="3" />
            <path d="M85 82v6" />
            <path d="M132.89 107.5s-2.73-21-16.39-21-23.5 0-23.5 0" />
            <path d="M125.89 42.5a24.11 24.11 0 0 1-31.78 0" />
            <path d="M112.5 50.5a23.5 23.5 0 0 1-46 0" />
            <path d="M94 51v2" />
            <path d="M121.73 66.5H129a4 4 0 0 1 4 4v29a4 4 0 0 1-4 4h-1.5" />
            <path d="M119.5 42.5c0-11.05-8.95-20-20-20s-20 8.95-20 20" fill="hsl(var(--muted))" />
            <path d="M119.5 42.5c0-11.05-8.95-20-20-20s-20 8.95-20 20" />
            <path d="M79.5 42.5v44h40v-44" fill="hsl(var(--background))" />
            <path d="M79.5 42.5v44h40v-44z" />
        </g>
    </svg>
);

const GoogleLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 mr-2">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
        <path d="M12 5.48c1.63 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

// View Components
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
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Status: All" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                </Select>
                <Select defaultValue="all">
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Type: All" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="team">Team</SelectItem>
                        <SelectItem value="public">Public</SelectItem>
                    </SelectContent>
                </Select>
                <Select defaultValue="anyone">
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Owned by: Anyone" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="anyone">Anyone</SelectItem>
                        <SelectItem value="me">Me</SelectItem>
                        <SelectItem value="team">Team</SelectItem>
                    </SelectContent>
                </Select>
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Calendar/Group Name" className="pl-10" />
                </div>
                <Button><Plus className="mr-2 h-4 w-4" /> New Calendar</Button>
            </div>
            <div className="border rounded-lg flex-grow flex flex-col">
                <Table><TableHeader><TableRow className="hover:bg-transparent"><TableHead>Calendar Name</TableHead><TableHead>Group</TableHead><TableHead>Duration</TableHead><TableHead>Type</TableHead><TableHead>Status</TableHead><TableHead>Date Updated</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader></Table>
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

const PreferencesView = () => (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      {/* In App Preferences Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">In App preferences</h2>
          <p className="text-sm text-muted-foreground">Set preferences like start day for the app</p>
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label className="text-muted-foreground">View Options</Label>
            <div className="col-span-2">
                <Label htmlFor="week-starts-on" className="text-xs font-normal">Week Starts On</Label>
                <Select defaultValue="sunday">
                    <SelectTrigger id="week-starts-on">
                        <SelectValue placeholder="Sunday" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="sunday">Sunday</SelectItem>
                        <SelectItem value="monday">Monday</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
          <div className="grid grid-cols-3 items-start gap-4">
            <Label className="text-muted-foreground mt-2">Services</Label>
            <div className="col-span-2 space-y-4">
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
      </div>

      <Separator />

      {/* Widget Preferences Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Widget preferences</h2>
          <p className="text-sm text-muted-foreground">Set preferences like language for widget</p>
        </div>
        <div className="space-y-6">
            <div className="grid grid-cols-3 items-start gap-4">
                <Label className="text-muted-foreground mt-2">Language and region</Label>
                <div className="col-span-2 space-y-4">
                    <div>
                        <Label htmlFor="language-select" className="text-xs font-normal">Language</Label>
                        <Select defaultValue="english">
                            <SelectTrigger id="language-select">
                                <SelectValue placeholder="English" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="english">English</SelectItem>
                                <SelectItem value="spanish">Spanish</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div>
                        <Label htmlFor="time-format-select" className="text-xs font-normal">Time Format</Label>
                        <Select defaultValue="12h">
                            <SelectTrigger id="time-format-select">
                                <SelectValue placeholder="1:30 PM" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="12h">1:30 PM (12 hours)</SelectItem>
                                <SelectItem value="24h">13:30 (24 hours)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
                <Label className="text-muted-foreground">View Options</Label>
                <div className="col-span-2">
                    <Label htmlFor="widget-week-starts-on" className="text-xs font-normal">Week Starts On</Label>
                    <Select defaultValue="sunday">
                        <SelectTrigger id="widget-week-starts-on">
                            <SelectValue placeholder="Sunday" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="sunday">Sunday</SelectItem>
                            <SelectItem value="monday">Monday</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
      </div>
      
      <div className="flex justify-end pt-4">
        <Button>Save Preferences</Button>
      </div>
    </div>
);

const AvailabilityView = () => (
    <div className="border rounded-lg flex-grow flex flex-col items-center justify-center p-4 text-center">
        <div className="flex flex-col items-center justify-center gap-4">
            <RestrictedAccessIllustration />
            <h3 className="text-2xl font-bold text-foreground">Access Restricted</h3>
            <p className="text-muted-foreground max-w-md">
                You're not a part of this account. To get access, add yourself to this account via Agency Settings &gt; Teams &gt; Edit Team Member, and assign the account under 'Roles & Permissions'
            </p>
            <Button className="mt-4">Go to Agency Settings</Button>
        </div>
    </div>
);

const ConnectionsView = () => {
    const [innerTab, setInnerTab] = useState("calendars");

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            <div className="space-y-2">
                <Label htmlFor="staff-select" className="flex items-center text-sm font-medium">
                    My Staff
                    <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                </Label>
                <Select defaultValue="staff-id-1">
                    <SelectTrigger id="staff-select">
                        <SelectValue placeholder="Select Staff" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="staff-id-1">IJ2ostfuduTpR7OLmAji</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Card>
                <CardContent className="p-4 sm:p-6">
                    <Tabs value={innerTab} onValueChange={setInnerTab} className="w-full">
                        <TabsList className="bg-transparent p-0 border-b rounded-none justify-start">
                            <TabsTrigger value="calendars" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">Calendars</TabsTrigger>
                            <TabsTrigger value="video" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">Video Conferencing</TabsTrigger>
                            <TabsTrigger value="booking" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">Google Organic Booking</TabsTrigger>
                        </TabsList>
                        <TabsContent value="calendars" className="pt-6">
                            <h3 className="text-lg font-semibold">Connected Calendars</h3>
                            <div className="flex flex-col items-center justify-center text-center gap-4 py-8">
                                <CatIllustration />
                                <h4 className="text-xl font-bold">No connections found</h4>
                                <p className="text-muted-foreground max-w-xs">Connect your third-party calendar(s) to sync bookings and check availability</p>
                                <Button className="mt-4">
                                    <Plus className="mr-2 h-4 w-4" /> Add New
                                </Button>
                            </div>
                        </TabsContent>
                        <TabsContent value="video" className="pt-6">
                            <h3 className="text-lg font-semibold">Video Conferencing</h3>
                             <div className="flex flex-col items-center justify-center text-center gap-4 py-8">
                                <CatIllustration />
                                <h4 className="text-xl font-bold">No connections found</h4>
                                <p className="text-muted-foreground max-w-xs">Connect your video conferencing tools to generate unique meeting links</p>
                                <Button className="mt-4">
                                    <Plus className="mr-2 h-4 w-4" /> Add New
                                </Button>
                            </div>
                        </TabsContent>
                        <TabsContent value="booking" className="pt-6 space-y-6">
                            <div className="flex items-center">
                                <GoogleLogo />
                                <h3 className="text-lg font-semibold">Google Organic Booking</h3>
                            </div>
                            <div className="bg-muted border rounded-lg p-4 space-y-4 text-sm">
                                <p className="font-semibold text-foreground">Before you start</p>
                                <p className="text-muted-foreground">
                                    <span className="font-semibold text-foreground">Verify Location Details:</span> Ensure your Business Profile's location information matches your GMB profile. Consistency is key for Google's approval. <a href="#" className="text-primary font-medium">Check here</a>
                                </p>
                                 <p className="text-muted-foreground">
                                    <span className="font-semibold text-foreground">Match Descriptions:</span> Match the descriptions of your Calendars/Services to their names. Google's team will verify this information for approval. <a href="#" className="text-primary font-medium">Learn more</a>
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch id="enable-booking" />
                                <div className="grid gap-1.5">
                                    <Label htmlFor="enable-booking">Enable Google Organic Booking</Label>
                                    <p className="text-sm text-muted-foreground">
                                       Enabling may take 24 to 48 hours for the changes to appear on your GMB profile
                                    </p>
                                </div>
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Primary Action Feed (Service Menu/Group) <span className="text-red-500">*</span></Label>
                                    <Select><SelectTrigger><SelectValue/></SelectTrigger></Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Services Feed (Calendars)</Label>
                                     <Select><SelectTrigger><SelectValue/></SelectTrigger></Select>
                                </div>
                             </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            {innerTab === 'calendars' && (
                <Card>
                    <CardHeader>
                        <h3 className="text-lg font-semibold">Private Mode for Synced Events</h3>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-start gap-4">
                            <Switch id="hide-details" defaultChecked />
                            <div className="grid gap-1.5">
                                <Label htmlFor="hide-details">Hide event details</Label>
                                <p className="text-sm text-muted-foreground">
                                    When turned on, only you can see your third-party calendar details, and others won't be able to.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button disabled>Save</Button>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
}

// Main Calendar Settings Page Component
export default function CalendarSettingsPage() {
    const [activeTab, setActiveTab] = useState("calendars");

    return (
        <div className="flex flex-col h-screen bg-background text-foreground">
            <div className="p-6 flex flex-col h-full">
                <header className="flex items-center justify-between border-b pb-4 mb-4 flex-shrink-0">
                    <h1 className="text-3xl font-bold text-foreground">Calendar Settings</h1>
                </header>
                <main className="flex-grow min-h-0">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full flex flex-col">
                        <TabsList className="border-b border-border justify-start rounded-none bg-transparent p-0 flex-shrink-0">
                            <TabsTrigger value="calendars" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none text-muted-foreground px-4 py-2 h-auto">Calendars</TabsTrigger>
                            <TabsTrigger value="preferences" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none text-muted-foreground px-4 py-2 h-auto">Preferences</TabsTrigger>
                            <TabsTrigger value="availability" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none text-muted-foreground px-4 py-2 h-auto">Availability</TabsTrigger>
                            <TabsTrigger value="connections" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none text-muted-foreground px-4 py-2 h-auto">Connections</TabsTrigger>
                        </TabsList>
                        <TabsContent value="calendars" className="flex-grow min-h-0 pt-4"><CalendarsView /></TabsContent>
                        <TabsContent value="preferences" className="flex-grow min-h-0 pt-4"><PreferencesView /></TabsContent>
                        <TabsContent value="availability" className="flex-grow min-h-0 pt-4"><AvailabilityView /></TabsContent>
                        <TabsContent value="connections" className="flex-grow min-h-0 pt-4"><ConnectionsView /></TabsContent>
                    </Tabs>
                </main>
            </div>
        </div>
    );
}
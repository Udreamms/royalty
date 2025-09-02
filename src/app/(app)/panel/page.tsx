
"use client";

import * as React from "react";
import { format, addDays, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";
import { DateRange } from "react-day-picker";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal, Edit, MoreHorizontal, Calendar as CalendarIcon, ArrowRight, BarChart, CheckSquare, Send, FileText, BarChart2, Briefcase, Facebook, TrendingUp, Copy, Share, Upload, Home, Globe, KeyRound, Trash2, AreaChart, Lock, ChevronDown, Plus, Pin, LayoutGrid } from "lucide-react";
import { RingChart, type RingChartData } from '@/components/ui/ring-chart';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";


const conversionRateData: RingChartData[] = [
    { name: 'Won', value: 0, color: 'hsl(var(--primary))' },
    { name: 'Lost', value: 100, color: 'hsl(var(--muted))' }
];

const ReportMetric = ({ label, value }: { label: string, value: string | number }) => (
    <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
    </div>
);

const SalesEfficiencyMetric = ({ label, value, trend }: { label: string, value: string, trend: string }) => (
     <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-green-500 flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            {trend}
        </p>
    </div>
);

function DateRangePicker({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2025, 6, 28),
    to: new Date(2025, 7, 27),
  });
  const [isOpen, setIsOpen] = React.useState(false);

  const presets = [
    { label: "This Week", range: { from: startOfWeek(new Date()), to: endOfWeek(new Date()) } },
    { label: "Last Week", range: { from: startOfWeek(subDays(new Date(), 7)), to: endOfWeek(subDays(new Date(), 7)) } },
    { label: "Last 7 Days", range: { from: subDays(new Date(), 6), to: new Date() } },
    { label: "This Month", range: { from: startOfMonth(new Date()), to: endOfMonth(new Date()) } },
    { label: "This Year", range: { from: startOfYear(new Date()), to: endOfYear(new Date()) } },
  ];

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-auto justify-start text-left font-normal bg-card",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex flex-col sm:flex-row">
            <div className="p-4 border-b sm:border-b-0 sm:border-r">
                <div className="grid gap-2">
                    {presets.map(preset => (
                        <Button 
                            key={preset.label}
                            variant="ghost" 
                            className="justify-start"
                            onClick={() => {
                                setDate(preset.range);
                            }}
                        >
                            {preset.label}
                        </Button>
                    ))}
                </div>
            </div>
            <div className="flex flex-col">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
              <div className="flex justify-end p-4 border-t">
                  <Button onClick={() => setIsOpen(false)}>Confirm</Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}


export default function PanelPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-primary/10 border-primary/20 text-primary hover:bg-primary/20 text-lg h-10 px-3">
            <LayoutGrid className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
        </div>
        <div className="flex items-center gap-2">
            <DateRangePicker />
            <Button variant="ghost" size="icon"><Edit className="h-4 w-4"/></Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4"/></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem><Copy className="mr-2 h-4 w-4" /> Clone</DropdownMenuItem>
                    <DropdownMenuItem><Share className="mr-2 h-4 w-4" /> Duplicate to another account</DropdownMenuItem>
                    <DropdownMenuItem><Upload className="mr-2 h-4 w-4" /> Upload Dashboard Template</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><Home className="mr-2 h-4 w-4" /> Set as default dashboard</DropdownMenuItem>
                    <DropdownMenuItem><Globe className="mr-2 h-4 w-4" /> Manage Dashboard Timezone</DropdownMenuItem>
                    <DropdownMenuItem><KeyRound className="mr-2 h-4 w-4" /> Manage permissions</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base font-semibold">Opportunity Status</CardTitle>
                <div className="flex items-center gap-2">
                     <Select defaultValue="all">
                        <SelectTrigger className="w-[150px] h-8 text-xs">
                            <SelectValue placeholder="All Pipelines" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Pipelines</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><SlidersHorizontal className="h-4 w-4"/></Button>
                </div>
            </CardHeader>
            <CardContent className="h-72 flex flex-col items-center justify-center text-center">
                 <div className="p-3 rounded-full bg-primary/10 mb-4">
                    <Search className="h-8 w-8 text-primary" />
                 </div>
                 <p className="font-semibold text-foreground">No Data Found</p>
            </CardContent>
        </Card>
        
         <Card className="lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base font-semibold">Opportunity Value</CardTitle>
                 <div className="flex items-center gap-2">
                     <Select defaultValue="all">
                        <SelectTrigger className="w-[150px] h-8 text-xs">
                            <SelectValue placeholder="All Pipelines" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Pipelines</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><SlidersHorizontal className="h-4 w-4"/></Button>
                </div>
            </CardHeader>
            <CardContent className="h-72 flex flex-col items-center justify-center text-center">
                 <div className="p-3 rounded-full bg-primary/10 mb-4">
                    <Search className="h-8 w-8 text-primary" />
                 </div>
                 <p className="font-semibold text-foreground">No Data Found</p>
            </CardContent>
        </Card>

        <Card className="lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base font-semibold">Conversion Rate</CardTitle>
                 <div className="flex items-center gap-2">
                     <Select defaultValue="all">
                        <SelectTrigger className="w-[150px] h-8 text-xs">
                            <SelectValue placeholder="All Pipelines" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Pipelines</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><SlidersHorizontal className="h-4 w-4"/></Button>
                </div>
            </CardHeader>
            <CardContent className="h-72 flex flex-col items-center justify-center text-center gap-2">
                <p className="text-3xl font-bold">$0</p>
                <p className="text-sm text-green-500 flex items-center gap-1">
                    <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path d="M7.247 4.86l-4.773 4.773-.943-.943L7.247 3l5.717 5.717-.943.943-4.773-4.773v11.69h-1.334V4.86z"></path></svg>
                    0% <span className="text-muted-foreground">vs Last 31 Days</span>
                </p>
                <div className="relative w-40 h-40 mt-2">
                    <RingChart data={conversionRateData} width={160} height={160} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold">0%</span>
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">Won revenue</p>
                    <p className="font-semibold">$0</p>
                </div>
            </CardContent>
        </Card>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <Card className="col-span-1">
                <CardHeader>
                    <CardTitle className="text-base font-semibold">Funnel</CardTitle>
                </CardHeader>
                <CardContent className="h-60 flex flex-col items-center justify-center text-center text-sm text-muted-foreground">
                    <p>Funnel report coming soon</p>
                </CardContent>
            </Card>
            
            <Card className="col-span-1">
                <CardHeader>
                    <CardTitle className="text-base font-semibold">Stage Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-60 flex flex-col items-center justify-center text-center text-sm text-muted-foreground">
                   <p>Stage distribution report coming soon</p>
                </CardContent>
            </Card>
            
            <Card className="col-span-1">
                 <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                        <CheckSquare className="h-5 w-5" /> Tasks
                    </CardTitle>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Plus className="h-4 w-4"/></Button>
                </CardHeader>
                <CardContent className="h-60 flex items-center justify-around text-center">
                    <div>
                        <p className="text-sm text-muted-foreground">Overdue</p>
                        <p className="text-3xl font-bold">0</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Due today</p>
                        <p className="text-3xl font-bold">0</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Completed</p>
                        <p className="text-3xl font-bold">0</p>
                    </div>
                </CardContent>
            </Card>

            <Card className="col-span-1">
                 <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                         <Send className="h-5 w-5" /> Manual Actions
                    </CardTitle>
                </CardHeader>
                <CardContent className="h-60 flex items-center justify-around text-center">
                    <div>
                        <p className="text-sm text-muted-foreground">Emails sent</p>
                        <p className="text-3xl font-bold">0</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">SMS sent</p>
                        <p className="text-3xl font-bold">0</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Calls made</p>
                        <p className="text-3xl font-bold">0</p>
                    </div>
                </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-2 lg:col-span-2">
                <CardHeader>
                    <CardTitle className="text-base font-semibold">Lead Source Report</CardTitle>
                </CardHeader>
                <CardContent className="h-60 flex flex-col items-center justify-center text-center">
                    <div className="p-3 rounded-full bg-primary/10 mb-4">
                        <Search className="h-8 w-8 text-primary" />
                    </div>
                    <p className="font-semibold text-foreground">No Data Found</p>
                </CardContent>
            </Card>
            
             <Card className="col-span-1 md:col-span-2 lg:col-span-3">
                <CardHeader>
                    <div>
                        <CardTitle className="text-base font-semibold">Google Analytics Report</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="h-72 flex flex-col items-center justify-center text-center relative">
                    <AreaChart className="h-full w-full text-blue-500/20 absolute opacity-50" />
                    <div className="z-10 bg-card/80 backdrop-blur-sm p-3 rounded-lg">
                        <p className="font-semibold text-foreground">No Data Found</p>
                    </div>
                </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-2 lg:col-span-3">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-base font-semibold">Google Business Profile</CardTitle>
                        <p className="text-sm text-muted-foreground">(Last 30 Days)</p>
                    </div>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Please Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="profile1">Profile 1</SelectItem>
                            <SelectItem value="profile2">Profile 2</SelectItem>
                        </SelectContent>
                    </Select>
                </CardHeader>
                <CardContent className="grid grid-cols-4 gap-6">
                    <div className="col-span-1 flex flex-col justify-center">
                        <ReportMetric label="Total views" value="0" />
                    </div>
                    <div className="col-span-1 space-y-4">
                        <ReportMetric label="Search (Desktop & Mobile)" value="0" />
                        <ReportMetric label="Maps (Desktop & Mobile)" value="0" />
                    </div>
                    <div className="col-span-1 space-y-4">
                        <ReportMetric label="Conversations" value="0" />
                        <ReportMetric label="Bookings" value="0" />
                    </div>
                    <div className="col-span-1 space-y-4">
                        <ReportMetric label="Website visits" value="0" />
                        <ReportMetric label="Calls" value="0" />
                    </div>
                </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-1 lg:col-span-1.5">
                <CardHeader>
                    <CardTitle className="text-base font-semibold flex items-center gap-2"><Facebook className="h-5 w-5" />Facebook Ads Report</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-y-4 gap-x-2">
                   <ReportMetric label="Total Clicks" value="0" />
                   <ReportMetric label="Total Spent" value="$0" />
                   <ReportMetric label="CPC" value="$0" />
                   <ReportMetric label="CTR" value="0%" />
                </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-1 lg:col-span-1.5">
                <CardHeader>
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.5 16.5c-2-1.5-2-4-2-4s0-2.5 2-4"/><path d="M4.5 12H13"/><path d="M13 8V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-1"/><path d="M21.5 12H13"/></svg>
                        Google Ads Report
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-y-4 gap-x-2">
                    <ReportMetric label="Total Clicks" value="0" />
                   <ReportMetric label="Total Spent" value="$0" />
                   <ReportMetric label="CPC" value="$0" />
                   <ReportMetric label="CTR" value="0%" />
                </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-2 lg:col-span-3">
                 <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-base font-semibold">Sales Efficiency</CardTitle>
                    <div className="flex items-center gap-2">
                        <Select defaultValue="all">
                            <SelectTrigger className="w-[150px] h-8 text-xs">
                                <SelectValue placeholder="All Pipelines" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Pipelines</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select defaultValue="all-time">
                            <SelectTrigger className="w-[150px] h-8 text-xs">
                                <SelectValue placeholder="All Time" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all-time">All Time</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><SlidersHorizontal className="h-4 w-4"/></Button>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <SalesEfficiencyMetric label="Average Sales Duration" value="0s" trend="+0%" />
                    <SalesEfficiencyMetric label="Total Sale Value" value="$0" trend="+0%" />
                    <SalesEfficiencyMetric label="Sales Velocity" value="$0/M" trend="+0%" />
                </CardContent>
            </Card>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import {
    TrendingUp,
    MousePointerClick,
    CheckCircle,
    DollarSign,
    Settings,
    Columns,
    Search,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    Users,
    Network,
    Calendar,
    RefreshCw,
    Download,
    Filter,
    FileX,
    LayoutGrid,
    List,
    Sun,
    Gauge,
    CheckCircle2,
} from 'lucide-react';

// --- Componente para una tarjeta de gráfico ---
const ChartCard = ({ title, value, icon: Icon }: { title: string; value: string; icon: React.ElementType }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            <div className="h-24 mt-4 bg-muted/50 rounded-md flex items-center justify-center">
                <p className="text-xs text-muted-foreground">Line Chart Placeholder</p>
            </div>
        </CardContent>
    </Card>
);

// --- Componente para una tarjeta de KPI ---
const KpiCard = ({ title, value, icon: Icon }: { title: string; value: string; icon?: React.ElementType }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
        </CardContent>
    </Card>
);


// --- Vista para "Google Ads Report" ---
const GoogleAdsReportView = () => {
    // Datos de ejemplo para la tabla
    const campaignData = [
        { campaign: "Interior Design: High-end Residential", status: true, clicks: 3852, cost: 627.00, revenue: 3189.00, roi: 508.61, cpc: 0.16, ctr: "0.00%", sales: 57, cps: 11.00, leads: 73, cpl: 8.59, impressions: 43777, avgRevenue: 55.95 },
        { campaign: "Furniture Logistics", status: true, clicks: 4833, cost: 581.97, revenue: 3162.00, roi: 543.33, cpc: 0.12, ctr: "0.00%", sales: 61, cps: 9.54, leads: 84, cpl: 6.93, impressions: 29446, avgRevenue: 51.84 },
        { campaign: "Lawn Space Gardening", status: false, clicks: 5010, cost: 210.41, revenue: 3260.00, roi: 1549.36, cpc: 0.04, ctr: "0.00%", sales: 56, cps: 3.76, leads: 83, cpl: 2.54, impressions: 32188, avgRevenue: 58.21 },
        { campaign: "Interior Design: Miami", status: true, clicks: 3818, cost: 195.08, revenue: 2718.00, roi: 1393.63, cpc: 0.05, ctr: "0.00%", sales: 87, cps: 2.24, leads: 118, cpl: 1.65, impressions: 35827, avgRevenue: 31.24 },
        { campaign: "Planting and Trimming", status: true, clicks: 3625, cost: 472.59, revenue: 2732.00, roi: 578.09, cpc: 0.13, ctr: "0.00%", sales: 61, cps: 7.75, leads: 84, cpl: 5.63, impressions: 33797, avgRevenue: 44.79 },
    ];
    
    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Google Ads Report</h1>
                <div className="flex items-center gap-4">
                    <Button variant="outline">Submit Feedback</Button>
                    <p className="text-sm text-muted-foreground">sep. 3º 2025 - sep. 18º 2025</p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ChartCard title="Impressions" value="175,235" icon={TrendingUp} />
                <ChartCard title="Clicks" value="21,138" icon={MousePointerClick} />
                <ChartCard title="Conversions" value="7,125" icon={CheckCircle} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard title="Client Spends" value="$2,085.00" icon={DollarSign} />
                <KpiCard title="Average CPC" value="$0.10" />
                <KpiCard title="Cost per Conversion" value="$0.29" />
                <KpiCard title="Conversion Rate" value="6.90%" />
            </div>

            <Card>
                <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <div className="relative w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Type to search" className="pl-10" />
                        </div>
                        <Button variant="outline"><Columns className="mr-2 h-4 w-4"/> Columns</Button>
                    </div>
                    <div className="border rounded-lg overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {["CAMPAIGN", "STATUS", "CLICKS", "COST", "REVENUE", "ROI %", "CPC", "CTR", "SALES", "CPS", "LEADS", "CPL", "IMPRESSIONS", "AVERAGE REVENUE"].map(h => (
                                        <TableHead key={h}><div className="flex items-center gap-1 whitespace-nowrap">{h} <ArrowUpDown className="h-3 w-3"/></div></TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {campaignData.map((row) => (
                                    <TableRow key={row.campaign}>
                                        <TableCell className="font-medium text-blue-600">{row.campaign}</TableCell>
                                        <TableCell><div className={`w-3 h-3 rounded-full ${row.status ? 'bg-green-500' : 'bg-orange-500'}`}></div></TableCell>
                                        <TableCell>{row.clicks.toLocaleString()}</TableCell>
                                        <TableCell>${row.cost.toFixed(2)}</TableCell>
                                        <TableCell>${row.revenue.toFixed(2)}</TableCell>
                                        <TableCell>{row.roi.toFixed(2)}%</TableCell>
                                        <TableCell>${row.cpc.toFixed(2)}</TableCell>
                                        <TableCell>{row.ctr}</TableCell>
                                        <TableCell>{row.sales}</TableCell>
                                        <TableCell>${row.cps.toFixed(2)}</TableCell>
                                        <TableCell>{row.leads}</TableCell>
                                        <TableCell>${row.cpl.toFixed(2)}</TableCell>
                                        <TableCell>{row.impressions.toLocaleString()}</TableCell>
                                        <TableCell>${row.avgRevenue.toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
                        <p>5 Results</p>
                        <div className="flex items-center gap-1">
                            <Button variant="outline" size="icon" className="h-8 w-8"><ChevronLeft className="h-4 w-4"/></Button>
                            <Button variant="outline" size="icon" className="h-8 w-8 bg-muted">1</Button>
                            <Button variant="outline" size="icon" className="h-8 w-8"><ChevronRight className="h-4 w-4"/></Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// --- Vista para "Facebook Ads Report" ---
const FacebookAdsReportView = () => {
    // Datos de ejemplo para la tabla, extraídos de la imagen
    const campaignData = [
        { campaign: "Interior Design: High-end Residential", status: true, clicks: 3852, cost: 627.00, revenue: 3492.00, roi: 555.54, cpc: 0.16, ctr: "2.99%", sales: 77, cps: 8.14, leads: 71, cpl: 8.83, impressions: 43777, avgRevenue: 45.22 },
        { campaign: "Lawn Space Gardening", status: true, clicks: 5010, cost: 210.41, revenue: 2546.00, roi: 1210.02, cpc: 0.04, ctr: "1.16%", sales: 81, cps: 2.60, leads: 97, cpl: 2.17, impressions: 32118, avgRevenue: 31.43 },
        { campaign: "Furniture Logistics", status: true, clicks: 4833, cost: 581.97, revenue: 2997.00, roi: 514.97, cpc: 0.12, ctr: "1.16%", sales: 68, cps: 8.56, leads: 93, cpl: 6.26, impressions: 29446, avgRevenue: 44.07 },
        { campaign: "Interior Design: Miami", status: false, clicks: 3818, cost: 195.08, revenue: 3271.00, roi: 1677.18, cpc: 0.05, ctr: "1.16%", sales: 100, cps: 1.95, leads: 115, cpl: 1.70, impressions: 35827, avgRevenue: 32.71 },
        { campaign: "Planting and Trimming", status: true, clicks: 3625, cost: 472.59, revenue: 2551.00, roi: 539.79, cpc: 0.13, ctr: "1.16%", sales: 53, cps: 8.92, leads: 120, cpl: 3.94, impressions: 33797, avgRevenue: 48.13 },
    ];

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Facebook Ads Report</h1>
                <div className="flex items-center gap-4">
                    <Button variant="outline">Submit Feedback</Button>
                    <p className="text-sm text-muted-foreground">sep. 3º 2025 - sep. 18º 2025</p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ChartCard title="Impressions" value="175,235" icon={TrendingUp} />
                <ChartCard title="clicks" value="21,138" icon={MousePointerClick} />
                <ChartCard title="Conversions" value="7,125" icon={CheckCircle} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <KpiCard title="Client Spends" value="$2,085.00" icon={Settings} />
                 <KpiCard title="Average CPC" value="$0.10" />
                 <KpiCard title="Cost per Conversion" value="$0.29" />
            </div>

            <Card>
                <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <div className="relative w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Type to search" className="pl-10" />
                        </div>
                        <Button variant="outline"><Columns className="mr-2 h-4 w-4"/> Columns</Button>
                    </div>
                    <div className="border rounded-lg overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {["CAMPAIGN", "STATUS", "CLICKS", "COST", "REVENUE", "ROI %", "CPC", "CTR", "SALES", "CPS", "LEADS", "CPL", "IMPRESSIONS", "AVERAGE REVENUE"].map(h => (
                                        <TableHead key={h}><div className="flex items-center gap-1 whitespace-nowrap">{h} <ArrowUpDown className="h-3 w-3"/></div></TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {campaignData.map((row) => (
                                    <TableRow key={row.campaign}>
                                        <TableCell className="font-medium text-blue-600">{row.campaign}</TableCell>
                                        <TableCell><div className={`w-3 h-3 rounded-full ${row.status ? 'bg-green-500' : 'bg-orange-500'}`}></div></TableCell>
                                        <TableCell>{row.clicks.toLocaleString()}</TableCell>
                                        <TableCell>${row.cost.toFixed(2)}</TableCell>
                                        <TableCell>${row.revenue.toFixed(2)}</TableCell>
                                        <TableCell>{row.roi.toFixed(2)}%</TableCell>
                                        <TableCell>${row.cpc.toFixed(2)}</TableCell>
                                        <TableCell>{row.ctr}</TableCell>
                                        <TableCell>{row.sales}</TableCell>
                                        <TableCell>${row.cps.toFixed(2)}</TableCell>
                                        <TableCell>{row.leads}</TableCell>
                                        <TableCell>${row.cpl.toFixed(2)}</TableCell>
                                        <TableCell>{row.impressions.toLocaleString()}</TableCell>
                                        <TableCell>${row.avgRevenue.toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
                        <p>5 Results</p>
                        <div className="flex items-center gap-1">
                            <Button variant="outline" size="icon" className="h-8 w-8"><ChevronLeft className="h-4 w-4"/></Button>
                            <Button variant="outline" size="icon" className="h-8 w-8 bg-muted">1</Button>
                            <Button variant="outline" size="icon" className="h-8 w-8"><ChevronRight className="h-4 w-4"/></Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// --- Vista para "Attribution Report" ---
const AttributionReportView = () => {
    // Componente reutilizable para las tarjetas de métricas
    const MetricCard = ({ title, value, icon: Icon }: { title: string; value: string; icon: React.ElementType }) => (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold">{value}</div>
            </CardContent>
        </Card>
    );

    const sessionEventsHeaders = ["Event Type", "Source", "Contact", "Campaign", "UTM Medium", "UTM Content", "UTM Source", "UTM Term", "Referrer", "URL Link", "Created At"];

    return (
        <div className="space-y-6">
            {/* Cabecera */}
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Attribution Report</h1>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 border rounded-md px-3 py-1.5 text-sm">
                        <span>2025-08-18</span>
                        <span>→</span>
                        <span>2025-09-18</span>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center border rounded-md p-1">
                        <Button variant="secondary" size="sm" className="bg-primary/10 text-primary">First Attribution</Button>
                        <Button variant="ghost" size="sm">Last Attribution</Button>
                    </div>
                    <Button variant="outline" size="icon">
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </div>
            </header>

            {/* Tarjetas de Métricas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard title="Revenue Closed" value="$0.00" icon={DollarSign} />
                <MetricCard title="Opportunities Won" value="0" icon={Network} />
                <MetricCard title="Total Leads" value="0" icon={Users} />
            </div>

            {/* Gráfico Principal */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center border-b">
                            <Button variant="ghost" className="border-b-2 border-primary text-primary rounded-none">Revenue</Button>
                            <Button variant="ghost" className="text-muted-foreground rounded-none">Leads</Button>
                            <Button variant="ghost" className="text-muted-foreground rounded-none">Opportunities</Button>
                        </div>
                        <div>
                             <Select defaultValue="day">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Day" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="day">Day</SelectItem>
                                    <SelectItem value="week">Week</SelectItem>
                                    <SelectItem value="month">Month</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                     <div className="mt-4">
                        <p className="font-semibold mb-2">Revenue Generated</p>
                        <div className="h-72 w-full bg-muted/30 rounded-lg flex items-center justify-center">
                            <p className="text-muted-foreground">No Data Found</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            
            {/* Tabla de Session Events */}
            <Card>
                <CardHeader className="flex flex-row justify-between items-center">
                    <CardTitle>Session Events</CardTitle>
                    <div className="flex items-center gap-2">
                        <Button variant="outline"><Columns className="mr-2 h-4 w-4" /> Columns</Button>
                        <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export</Button>
                        <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {sessionEventsHeaders.map(header => <TableHead key={header}>{header}</TableHead>)}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={sessionEventsHeaders.length} className="h-48 text-center">
                                         <div className="flex flex-col items-center justify-center gap-2">
                                            <FileX className="h-10 w-10 text-muted-foreground" />
                                            <p className="text-muted-foreground">No Data</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// --- Vista para "Call Report" ---
const CallReportView = () => {
    // Componente reutilizable para los gráficos de dona
    const DonutChartPlaceholder = ({ title }: { title: string }) => (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-6 py-8">
                <div className="relative w-40 h-40">
                    <div className="absolute inset-0 bg-muted rounded-full"></div>
                    <div className="absolute inset-4 bg-background rounded-full flex flex-col items-center justify-center">
                        <span className="text-xs text-muted-foreground">Total</span>
                        <span className="text-2xl font-bold">0</span>
                    </div>
                </div>
                <div className="text-sm text-muted-foreground border-t pt-4 w-full text-center">
                    <span>Avg. call duration: 0s</span> | <span>Total call duration: 0s</span>
                </div>
            </CardContent>
        </Card>
    );

    const callLogHeaders = ["Date & Time", "Contact Name", "Number Name", "Source Type", "Call Status", "Keyword", "Duration", "Recording", "First Time", "Device Type"];

    return (
        <div className="space-y-6">
            {/* Cabecera y Gráficos Principales */}
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Call Report</h1>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 border rounded-md px-3 py-1.5 text-sm">
                        <span>2025-09-12</span>
                        <span>→</span>
                        <span>2025-09-18</span>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Select defaultValue="all-numbers">
                        <SelectTrigger className="w-[180px]"><SelectValue placeholder="All numbers" /></SelectTrigger>
                        <SelectContent><SelectItem value="all-numbers">All numbers</SelectItem></SelectContent>
                    </Select>
                    <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
                    <Button variant="outline" size="icon"><RefreshCw className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon"><Download className="h-4 w-4" /></Button>
                </div>
            </header>

            <div>
                <div className="border-b mb-6">
                    <Button variant="ghost" className="border-b-2 border-primary text-primary rounded-none px-4">Incoming</Button>
                    <Button variant="ghost" className="text-muted-foreground rounded-none px-4">Outgoing</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DonutChartPlaceholder title="Call by Status" />
                    <DonutChartPlaceholder title="First-time calls by status" />
                </div>
            </div>

            {/* Top Call Sources */}
            <Card>
                <CardHeader>
                    <CardTitle>Top Call Sources</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Bar Chart - No Data Found</p>
                    </div>
                    <div>
                        <div className="grid grid-cols-4 text-sm font-semibold text-muted-foreground border-b pb-2 mb-2">
                            <span>Source</span>
                            <span className="text-center">Total Calls</span>
                            <span className="text-center">Won Deals</span>
                            <span className="text-right">Avg Duration</span>
                        </div>
                        <div className="h-48 flex flex-col items-center justify-center text-center">
                             <FileX className="h-10 w-10 text-muted-foreground mb-2" />
                             <p className="text-muted-foreground">No Data</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Tabla de Llamadas */}
            <Card>
                <CardContent className="p-4">
                     <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center border rounded-md p-1">
                             <Button variant="secondary" size="sm" className="bg-primary/10 text-primary">All calls</Button>
                             <Button variant="ghost" size="sm">Incoming</Button>
                             <Button variant="ghost" size="sm">Outgoing</Button>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline"><Columns className="mr-2 h-4 w-4" /> Columns</Button>
                            <Button variant="outline" size="icon"><Download className="h-4 w-4" /></Button>
                        </div>
                    </div>
                    <div className="border rounded-lg">
                        <Table>
                             <TableHeader>
                                <TableRow>
                                    {callLogHeaders.map(header => <TableHead key={header}>{header}</TableHead>)}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={callLogHeaders.length} className="h-48 text-center">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <FileX className="h-10 w-10 text-muted-foreground" />
                                            <p className="text-muted-foreground">No Data</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// --- Vista para "Appointment Report" ---
const AppointmentReportView = () => {
    // Sub-componente para las tarjetas de KPI en la fila superior
    const AppointmentKpiCard = ({ title, value }: { title: string; value: string }) => (
        <Card>
            <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground truncate">{title}</p>
                <p className="text-3xl font-bold">{value}</p>
            </CardContent>
        </Card>
    );

    // Sub-componente para las tarjetas con placeholder de gráfico de barras
    const ChartPlaceholderCard = ({ title }: { title: string }) => (
        <Card>
            <CardHeader><CardTitle className="text-base font-semibold">{title}</CardTitle></CardHeader>
            <CardContent>
                <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground bg-background/80 px-4 py-1 rounded">No Data Found</p>
                </div>
            </CardContent>
        </Card>
    );
    
    // Sub-componente para las tarjetas con el placeholder de "No Data" (lupa)
    const NoDataCard = ({ title, children }: { title: string; children?: React.ReactNode }) => (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base font-semibold">{title}</CardTitle>
                {children}
            </CardHeader>
            <CardContent className="h-64 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-primary" />
                </div>
                <p className="text-muted-foreground">No Data Found</p>
            </CardContent>
        </Card>
    );

    const kpiMetrics = ["Booked", "Confirmed", "Cancelled", "New", "Showed", "No Show", "Invalid", "Rescheduled"];
    const appointmentTableHeaders = ["Appointment Id", "Requested Time", "Calendar", "Date Added", "Contact Name", "Email", "Phone", "Appointment Owner", "Created By"];

    return (
        <div className="space-y-6">
            {/* Cabecera */}
            <header className="flex flex-wrap justify-between items-center gap-4">
                <h1 className="text-3xl font-bold">Appointment Reporting</h1>
                <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-2 border rounded-md px-3 py-1.5 text-sm">
                        <span>2025-08-19</span>
                        <span>→</span>
                        <span>2025-09-18</span>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Select defaultValue="all-calendars"><SelectTrigger className="w-[180px]"><SelectValue placeholder="All Calendars" /></SelectTrigger><SelectContent><SelectItem value="all-calendars">All Calendars</SelectItem></SelectContent></Select>
                    <Select defaultValue="date-added"><SelectTrigger className="w-[180px]"><SelectValue placeholder="Date Added" /></SelectTrigger><SelectContent><SelectItem value="date-added">Date Added</SelectItem></SelectContent></Select>
                    <Button variant="outline" size="icon"><LayoutGrid className="h-4 w-4" /></Button>
                </div>
            </header>

            {/* KPIs */}
            <div className="grid grid-cols-4 lg:grid-cols-8 gap-4">
                {kpiMetrics.map(metric => <AppointmentKpiCard key={metric} title={metric} value="0" />)}
            </div>

            {/* Channel & Source */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <NoDataCard title="Channel" />
                <NoDataCard title="Source">
                    <Select defaultValue="funnel"><SelectTrigger className="w-[180px]"><SelectValue placeholder="Funnel" /></SelectTrigger><SelectContent><SelectItem value="funnel">Funnel</SelectItem></SelectContent></Select>
                </NoDataCard>
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <NoDataCard title="Outcomes" />
                <ChartPlaceholderCard title="Top 5 Most Booked Calendars" />
                <ChartPlaceholderCard title="Top 5 Appointment Owners" />
                <ChartPlaceholderCard title="Most Popular Days (No of Appointments Booked Day Wise)" />
                <ChartPlaceholderCard title="Top 5 Calendars with Cancellations" />
                <ChartPlaceholderCard title="Top 5 Calendars with Reschedules" />
            </div>
            
            {/* Tabla de Citas */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex justify-end items-center mb-4 gap-2">
                         <Select defaultValue="all-status"><SelectTrigger className="w-[180px]"><SelectValue placeholder="All Status" /></SelectTrigger><SelectContent><SelectItem value="all-status">All Status</SelectItem></SelectContent></Select>
                         <Button variant="outline"><Columns className="mr-2 h-4 w-4" /> Columns</Button>
                         <Button variant="outline" size="icon"><RefreshCw className="h-4 w-4" /></Button>
                    </div>
                     <div className="border rounded-lg overflow-x-auto">
                        <Table>
                             <TableHeader><TableRow>{appointmentTableHeaders.map(h => <TableHead key={h}>{h}</TableHead>)}</TableRow></TableHeader>
                            <TableBody><TableRow><TableCell colSpan={appointmentTableHeaders.length} className="h-48 text-center">
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <FileX className="h-10 w-10 text-muted-foreground" />
                                    <p className="text-muted-foreground">No Data</p>
                                </div>
                            </TableCell></TableRow></TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// --- Vista para "Audit Report" ---
const AuditReportView = () => {
    // Sub-componente para las tarjetas de funcionalidades de la auditoría
    const AuditFeatureCard = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
        <div className="bg-background rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center w-56 h-32 hover:shadow-xl transition-shadow cursor-pointer">
            <Icon className="h-8 w-8 text-primary mb-3" />
            <p className="font-semibold text-sm">{text}</p>
        </div>
    );

    // Lista de funcionalidades para mapear en las tarjetas
    const features = [
        { icon: Sun, text: "View Reviews Information" },
        { icon: Gauge, text: "View Website Performance Score" },
        { icon: CheckCircle2, text: "Check Your GBP Health" },
        { icon: Search, text: "View SEO Score" },
        { icon: List, text: "View Listing Information" },
    ];

    return (
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg p-8 min-h-[70vh] flex items-center justify-center mt-6">
            <div className="text-center space-y-8 max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold text-white leading-tight">
                    Generate Marketing Audit 
                    <br />
                    Report for <span className="text-cyan-300">Free!</span>
                </h1>
                
                <Button size="lg" className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-6 text-lg">
                    Generate Report Now
                </Button>

                <div className="flex flex-wrap items-center justify-center gap-6 pt-6">
                    {features.map(feature => (
                        <AuditFeatureCard key={feature.text} icon={feature.icon} text={feature.text} />
                    ))}
                </div>
            </div>
        </div>
    );
};



// --- Componente de Placeholder para otras vistas ---
const PlaceholderView = ({ title }: { title: string }) => (
    <div className="flex flex-col items-center justify-center text-center py-20">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-muted-foreground mt-2">Content for this section is under construction.</p>
    </div>
);

// --- Componente Principal ---
export default function ReportingPage() {
  const [activeTab, setActiveTab] = useState('Google Ads Report');
  const navItems = ['Google Ads Report', 'Facebook Ads Report', 'Attribution Report', 'Call Report', 'Appointment Report', 'Audit Report'];

  const renderContent = () => {
      switch(activeTab) {
          case 'Google Ads Report':
              return <GoogleAdsReportView />;
          case 'Facebook Ads Report':
            return <FacebookAdsReportView />;
          case 'Attribution Report':
            return <AttributionReportView />;
          case 'Call Report':
            return <CallReportView />;
          case 'Appointment Report':
            return <AppointmentReportView />;
          case 'Audit Report':
            return <AuditReportView />;
          default:
              return <PlaceholderView title={activeTab} />;
      }
  };

  return (
    <div className="p-6 bg-background text-foreground min-h-screen">
        <header className="flex items-center border-b pb-2 mb-6">
            <h1 className="text-xl font-bold pr-6">Reporting</h1>
            <nav className="flex items-center gap-2">
                {navItems.map(item => (
                    <Button
                        key={item}
                        variant="ghost"
                        onClick={() => setActiveTab(item)}
                        className={`font-semibold transition-none rounded-md
                            ${activeTab === item 
                                ? 'text-primary bg-primary/10' 
                                : 'text-muted-foreground hover:text-primary'
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
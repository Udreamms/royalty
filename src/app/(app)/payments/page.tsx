"use client";

import { useState } from "react";
import {
    CreditCard,
    DollarSign,
    Shield,
    Info,
    ChevronDown,
    Search,
    Download,
    Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription_shadcn, AlertTitle } from "@/components/ui/alert";
import {
    Table,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DatePickerWithRange as DateRangePicker } from "@/components/ui/date-range-picker";


// --- Sub-componente para la página de "All Invoices" ---
const AllInvoicesContent = ({ onNavigate }: { onNavigate: (tab: string) => void }) => {
    const PaymentMetricCard = ({ title, value }: { title: string, value: string }) => (
        <Card>
            <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">{title}</p>
                <p className="text-2xl font-bold">{value}</p>
            </CardContent>
        </Card>
    );

    const GetStartedMenu = () => (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="absolute top-2 right-2 text-muted-foreground">
                    <ChevronDown className="h-5 w-5" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
                <div className="space-y-1">
                    <h4 className="font-semibold text-foreground">Get started with payments</h4>
                    <div className="p-2 hover:bg-muted rounded-md cursor-pointer" onClick={() => onNavigate('Integrations')}>
                        <div className="flex items-center">
                            <CreditCard className="h-5 w-5 mr-3 text-primary"/>
                            <div>
                                <p className="font-medium text-sm">Connect your payment provider</p>
                                <p className="text-xs text-muted-foreground">Stripe, NMI, Authorize.net, Paypal...</p>
                            </div>
                        </div>
                    </div>
                     <div className="p-2 hover:bg-muted rounded-md cursor-pointer">
                        <div className="flex items-center">
                            <DollarSign className="h-5 w-5 mr-3 text-primary"/>
                            <div>
                                <p className="font-medium text-sm">Connect your accounting</p>
                                <p className="text-xs text-muted-foreground">Connect Quickbooks</p>
                            </div>
                        </div>
                    </div>
                     <div className="p-2 hover:bg-muted rounded-md cursor-pointer">
                        <div className="flex items-center">
                            <Shield className="h-5 w-5 mr-3 text-primary"/>
                            <div>
                                <p className="font-medium text-sm">Control who can see your payments</p>
                                <p className="text-xs text-muted-foreground">Set permissions for your team members</p>
                            </div>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold">Invoices & Estimates</h2>
                    <p className="text-muted-foreground">Create and manage all invoices generated for your business</p>
                </div>
            </div>

            <Alert className="border-blue-500/50 text-blue-300 [&>svg]:text-blue-400">
                <Info className="h-4 w-4" />
                <div className="flex justify-between items-center w-full">
                    <div>
                        <AlertTitle>Action Required</AlertTitle>
                        <AlertDescription_shadcn>
                            Connect at least one payment gateway to start receiving payments
                        </AlertDescription_shadcn>
                    </div>
                    <Button variant="outline" className="bg-transparent border-current hover:bg-blue-500/20" onClick={() => onNavigate('Integrations')}>
                       Integrate Payment Gateway
                    </Button>
                </div>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <PaymentMetricCard title="0 Invoice(s) in Draft" value="$0.00" />
                <PaymentMetricCard title="0 Invoice(s) in Due" value="$0.00" />
                <PaymentMetricCard title="0 Invoice(s) received" value="$0.00" />
                <Card className="relative">
                    <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground opacity-0">Placeholder</p>
                        <p className="text-2xl font-bold">$0.00</p>
                    </CardContent>
                    <GetStartedMenu />
                </Card>
            </div>

            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-2 flex-grow">
                            <DateRangePicker />
                             <div className="relative flex-grow max-w-xs">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search" className="pl-10" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                             <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline">
                                        <Filter className="mr-2 h-4 w-4"/>
                                        Filters
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-64" align="end">
                                    <div className="flex justify-between items-center mb-4 pb-2 border-b">
                                        <h4 className="font-semibold text-sm">Filters</h4>
                                        <div>
                                            <Button variant="link" className="text-muted-foreground p-0 h-auto text-sm">Clear</Button>
                                            <Button variant="link" className="p-0 h-auto ml-4 text-sm">Apply</Button>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium">Invoice Status</label>
                                            <Select defaultValue="all">
                                                <SelectTrigger className="mt-1">
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All</SelectItem>
                                                    <SelectItem value="draft">Draft</SelectItem>
                                                    <SelectItem value="due">Due</SelectItem>
                                                    <SelectItem value="paid">Paid</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Payment Mode</label>
                                            <Select defaultValue="all">
                                                <SelectTrigger className="mt-1">
                                                    <SelectValue placeholder="Select mode" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All</SelectItem>
                                                    <SelectItem value="card">Card</SelectItem>
                                                    <SelectItem value="paypal">PayPal</SelectItem>
                                                    <SelectItem value="manual">Manual</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                            <Button variant="ghost" size="icon">
                                <Download className="h-5 w-5 text-muted-foreground" />
                            </Button>
                        </div>
                    </div>
                     <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead>Invoice Name</TableHead>
                                    <TableHead>Invoice Number</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Issue Date</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                        </Table>
                        <div className="h-48 flex flex-col items-center justify-center text-center">
                            <Search className="h-10 w-10 text-muted-foreground/50 mb-2"/>
                            <p className="font-semibold text-foreground">No invoices to show yet</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// --- Sub-componente para la página de "Integrations" ---
const IntegrationsContent = () => {
    // ... (Este componente no se modifica)
    return <div>Integrations Page</div>;
};

// --- Componente de placeholder para vistas no implementadas ---
const PlaceholderContent = ({ title }: { title: string }) => (
    <div>
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-muted-foreground">This section is under construction.</p>
    </div>
);


// --- Componente Principal ---
export default function PaymentsPage() {
    
    const [activeTab, setActiveTab] = useState("Invoices & Estimates");

    const navItems = [
        { name: "Invoices & Estimates", hasDropdown: true, isNew: true },
        { name: "Documents & Contracts", hasDropdown: true, isNew: false },
        { name: "Orders", hasDropdown: true, isNew: false },
        { name: "Subscriptions", hasDropdown: false, isNew: false },
        { name: "Payment Links", hasDropdown: false, isNew: false },
        { name: "Transactions", hasDropdown: false, isNew: false },
        { name: "Products", hasDropdown: false, isNew: true },
        { name: "Coupons", hasDropdown: false, isNew: false },
        { name: "Settings", hasDropdown: false, isNew: false },
        { name: "Integrations", hasDropdown: false, isNew: false },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'Invoices & Estimates':
                return <AllInvoicesContent onNavigate={setActiveTab} />;
            case 'Integrations':
                return <IntegrationsContent />;
            default:
                return <PlaceholderContent title={activeTab} />;
        }
    };
    
    return (
        // Se envuelve todo en un contenedor para centrar y añadir padding
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col h-full gap-6">
                <header className="flex-shrink-0">
                    <div className="flex items-center border-b">
                        <h1 className="text-xl font-bold pr-6">Payments</h1>
                        <nav className="flex-grow">
                            <ul className="flex items-center gap-1">
                                {navItems.map((item) => (
                                    <li key={item.name}>
                                        <Button
                                            onClick={() => setActiveTab(item.name)}
                                            variant="ghost"
                                            className={`text-sm font-medium h-auto py-3 px-4 rounded-none border-b-2
                                                ${activeTab === item.name
                                                    ? 'border-primary text-primary'
                                                    : 'border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground'}`
                                            }
                                        >
                                            {item.isNew && <span className="mr-2 text-xs bg-yellow-400/80 text-yellow-900 px-1.5 py-0.5 rounded-sm font-bold">New</span>}
                                            {item.name}
                                            {item.hasDropdown && <ChevronDown className="h-4 w-4 ml-1" />}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </header>

                <main className="flex-grow">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}

"use client";

import { useState } from "react";
import {
    CreditCard,
    DollarSign,
    Shield,
    Info,
    ChevronDown,
    Search,
    Filter,
    Settings,
    Plus,
    RefreshCw,
    X,
    UploadCloud,
    Bold, 
    Italic, 
    Underline,
    List,
    ListOrdered,
    Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription_shadcn, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";


// --- Componente Simulado de Editor de Texto Rico ---
const MockRichTextEditor = () => (
    <div className="border rounded-md">
        <div className="flex items-center gap-1 border-b p-2 bg-muted/50">
            <Button variant="ghost" size="icon" className="h-8 w-8" disabled><Bold className="h-4 w-4"/></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" disabled><Italic className="h-4 w-4"/></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" disabled><Underline className="h-4 w-4"/></Button>
            <Select defaultValue="16px" disabled><SelectTrigger className="w-24 h-8"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="16px">16px</SelectItem></SelectContent></Select>
            <Select defaultValue="paragraph" disabled><SelectTrigger className="w-32 h-8"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="paragraph">Paragraph</SelectItem></SelectContent></Select>
            <Button variant="ghost" size="icon" className="h-8 w-8" disabled><List className="h-4 w-4"/></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" disabled><ListOrdered className="h-4 w-4"/></Button>
        </div>
        <Textarea placeholder="Write something ..." className="border-none focus-visible:ring-0 rounded-t-none" rows={5}/>
    </div>
);

// --- Componente para un bloque de recordatorio individual ---
const ReminderBlock = ({ reminder, onRemove }: { reminder: any, onRemove: () => void }) => (
    <div className="space-y-4 border p-4 rounded-lg">
        <div className="flex justify-between items-center">
            <div className="w-full mr-2">
                <Label htmlFor={`reminderName-${reminder.id}`}>Reminder Name *</Label>
                <div className="flex items-center gap-2">
                    <Input id={`reminderName-${reminder.id}`} defaultValue={reminder.name} />
                    <Button variant="outline" size="icon" onClick={onRemove}><Trash2 className="h-4 w-4"/></Button>
                </div>
            </div>
            <Switch defaultChecked={reminder.enabled} />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div><Label>Email Template</Label><div className="flex items-center"><Select defaultValue="default"><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="default">Default</SelectItem></SelectContent></Select><Button variant="link">Preview</Button></div></div>
             <div><Label>SMS Template</Label><div className="flex items-center"><Select defaultValue="default"><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="default">Default</SelectItem></SelectContent></Select><Button variant="link">Manage</Button></div></div>
        </div>
        <div><Label htmlFor={`subject-${reminder.id}`}>Subject *</Label><Input id={`subject-${reminder.id}`} defaultValue={reminder.subject} /></div>
        <div><Label>Reminder Frequency</Label><div className="flex items-center gap-2 flex-wrap"><span>Every</span><Input className="w-16" defaultValue={reminder.freq.every} /><Select defaultValue={reminder.freq.unit}><SelectTrigger className="w-28"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="Days">Days</SelectItem><SelectItem value="Hours">Hours</SelectItem></SelectContent></Select><Select defaultValue={reminder.freq.timing}><SelectTrigger className="w-28"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="Before">Before</SelectItem><SelectItem value="After">After</SelectItem></SelectContent></Select><Select defaultValue={reminder.freq.event}><SelectTrigger className="w-48"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="Invoice is overdue">Invoice is overdue</SelectItem></SelectContent></Select><span>Max Reminders</span><Input className="w-16" defaultValue={reminder.freq.max} /></div></div>
        <div><Label>Business Hours</Label><div className="flex items-center gap-2"><Select defaultValue="8:00"><SelectTrigger className="w-28"><SelectValue/></SelectTrigger></Select><Select defaultValue="AM"><SelectTrigger className="w-20"><SelectValue/></SelectTrigger></Select><span>to</span><Select defaultValue="6:00"><SelectTrigger className="w-28"><SelectValue/></SelectTrigger></Select><Select defaultValue="PM"><SelectTrigger className="w-20"><SelectValue/></SelectTrigger></Select></div></div>
        <div><Label>Preferred Timezone</Label><RadioGroup defaultValue="contact" className="flex items-center gap-4 mt-2"><div className="flex items-center space-x-2"><RadioGroupItem value="business" id={`r1-${reminder.id}`} /><Label htmlFor={`r1-${reminder.id}`}>Business Timezone</Label></div><div className="flex items-center space-x-2"><RadioGroupItem value="contact" id={`r2-${reminder.id}`} /><Label htmlFor={`r2-${reminder.id}`}>Contact Timezone</Label></div></RadioGroup></div>
    </div>
);

// --- Vista para "Reminder Settings" ---
const ReminderSettingsView = () => {
    const initialReminders = [
        { id: 1, name: "Reminder 1", subject: "{{ invoice.company.name }}} Friendly Reminder:", freq: { every: 3, unit: "Days", timing: "Before", event: "Invoice is overdue", max: 1 }, enabled: true }, { id: 2, name: "Reminder 2", subject: "{{ invoice.company.name }}} Action Required:", freq: { every: 1, unit: "Hours", timing: "Before", event: "Invoice is overdue", max: 1 }, enabled: true }, { id: 3, name: "Reminder 3", subject: "{{ invoice.company.name }}} Urgent: Invoice #{{", freq: { every: 7, unit: "Days", timing: "After", event: "Invoice is overdue", max: 1 }, enabled: true },
    ];
    const [reminders, setReminders] = useState(initialReminders);
    const addReminder = () => { const newId = reminders.length > 0 ? Math.max(...reminders.map(r => r.id)) + 1 : 1; setReminders([...reminders, { id: newId, name: `Reminder ${newId}`, subject: "", freq: { every: 1, unit: "Days", timing: "Before", event: "Invoice is overdue", max: 1}, enabled: true }]); };
    const removeReminder = (id: number) => { setReminders(reminders.filter(r => r.id !== id)); };
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold">Invoice Reminders</h3>
            <p className="text-sm text-muted-foreground">Invoice reminders are applied to all one-time and recurring invoices where Automatic Payment is disabled and a payment schedule doesn't exist.</p>
            <div className="space-y-4">{reminders.map(reminder => (<ReminderBlock key={reminder.id} reminder={reminder} onRemove={() => removeReminder(reminder.id)} />))}</div>
            <Button variant="outline" onClick={addReminder}><Plus className="mr-2 h-4 w-4"/>Add another reminder</Button>
        </div>
    );
};

// --- Componente Reutilizable para un Bloque de Notificación ---
const NotificationBlock = ({ title, description, defaultSubject, showSms = true }: { title: string, description: string, defaultSubject: string, showSms?: boolean }) => (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <div>
                <Label className="font-semibold text-base">{title}</Label>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <Switch defaultChecked />
        </div>
        <div className={showSms ? "grid grid-cols-2 gap-4" : ""}>
            <div>
                <Label>Email Template</Label>
                <div className="flex items-center">
                    <Select defaultValue="default"><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="default">Default</SelectItem></SelectContent></Select>
                    <Button variant="link">Preview</Button>
                </div>
            </div>
            {showSms && (
                 <div>
                    <Label>SMS Template</Label>
                    <div className="flex items-center">
                        <Select defaultValue="default"><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="default">Default</SelectItem></SelectContent></Select>
                        <Button variant="link">Manage</Button>
                    </div>
                </div>
            )}
        </div>
        <div>
            <Label>Subject</Label>
            <Input defaultValue={defaultSubject} />
        </div>
    </div>
);

// --- Vista para "Customer Notifications" ---
const CustomerNotificationsView = () => {
    const notifications = [
        { title: "Invoice received", description: "Template used to send the invoice", subject: "{{ invoice.company.name }}} Invoice received" }, { title: "Estimate Received", description: "Template used to send the estimate", subject: "{{ invoice.company.name }}} Estimate received" }, { title: "Invoice payment successful", description: "Template used when an attempt to pay the invoice is successful", subject: "{{ invoice.company.name }}} Invoice payment su..." }, { title: "Invoice payment failed", description: "Template used when an attempt to pay the invoice fails", subject: "{{ invoice.company.name }}} Invoice payment fa..." }, { title: "Auto payment information", description: "Template used to notify customers regarding upcoming auto debit on the card", subject: "{{ invoice.company.name }}} Invoice auto payme..." }, { title: "Auto payment amount changed", description: "Template used to notify customers regarding the change in auto debit amount", subject: "{{ invoice.company.name }}} Invoice auto payme..." }, { title: "Auto payment failed", description: "Template used to notify customers regarding an error in auto debit from the card", subject: "{{ invoice.company.name }}} Invoice auto payme..." },
    ];

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold">Customer Notifications</h3>
            <div className="space-y-8">
                {notifications.map((notification, index) => (
                    <div key={notification.title}>
                        <NotificationBlock 
                            title={notification.title}
                            description={notification.description}
                            defaultSubject={notification.subject}
                            showSms={true}
                        />
                        {index < notifications.length - 1 && <Separator className="mt-8" />}
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Vista para "Team Notifications" ---
const TeamNotificationsView = () => {
    const notifications = [
        { title: "Invoice payment successful", description: "Template used when the invoice has been successfully paid", subject: "{{ invoice.customer.name }}} Invoice payment su..." }, { title: "Invoice payment failed", description: "Template used when an attempt to pay the invoice fails", subject: "{{ invoice.customer.name }}} Invoice payment fa..." }, { title: "The invoice could not be sent", description: "Template used when an invoice could not be sent successfully", subject: "{{ invoice.customer.name }}} Invoice not sent" }, { title: "Estimate accepted successfully", description: "Template used when the estimate has been accepted", subject: "{{ invoice.company.name }}} Estimate accepted" }, { title: "Estimate declined successfully", description: "Template used when the estimate has been declined", subject: "{{ invoice.company.name }}} Estimate declined" }, { title: "Auto payment failed", description: "Template used when an error occurs in auto debit from the card", subject: "{{ invoice.customer.name }}} Invoice auto payme..." }, { title: "Auto payment skipped", description: "Template used when auto payment is skipped because amount was updated manually", subject: "{{ invoice.customer.name }}} Invoice auto payme..." },
    ];

     return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold">Team Notifications</h3>
            <div className="space-y-8">
                {notifications.map((notification, index) => (
                    <div key={notification.title}>
                        <NotificationBlock 
                            title={notification.title}
                            description={notification.description}
                            defaultSubject={notification.subject}
                            showSms={false}
                        />
                        {index < notifications.length - 1 && <Separator className="mt-8" />}
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Componente para el Panel de Ajustes ---
const SettingsDialog = ({ open, onOpenChange }: { open: boolean, onOpenChange: (isOpen: boolean) => void }) => {
    const [activeSection, setActiveSection] = useState("Business Information");
    const [customFields, setCustomFields] = useState([{ id: 1 }]);

    const addCustomField = () => setCustomFields([...customFields, { id: Date.now() }]);
    const removeCustomField = (id: number) => setCustomFields(customFields.filter(field => field.id !== id));

    const settingsNav = [
        { name: "Business Information" }, { name: "Email Configurations" }, { name: "Title and Terms" },
        { name: "Payment Settings" }, { name: "Product Settings" }, { name: "Reminder Settings" },
        { name: "Custom fields" }, { name: "Notifications", subItems: ["Customer Notifications", "Team Notifications"] }
    ];

    const renderSectionContent = () => {
        switch(activeSection) {
            case "Business Information": return (<div className="space-y-6"><h3 className="text-xl font-semibold">Business Information</h3><div className="space-y-2"><Label>Business Logo</Label><div className="flex flex-col items-center justify-center w-48 h-48 border-2 border-dashed rounded-lg"><UploadCloud className="h-8 w-8 text-muted-foreground" /><Button variant="link" className="text-sm">Upload a file</Button><p className="text-xs text-muted-foreground">Recommended size: 350 x 180 pixels</p></div></div><div className="grid grid-cols-2 gap-4"><div><Label htmlFor="businessName">Business Name *</Label><Input id="businessName" defaultValue="Udreamms LLC" /></div><div><Label htmlFor="phone">Phone No</Label><Input id="phone" defaultValue="+16507840581" /></div></div><div><Label htmlFor="address">Address</Label><Input id="address" defaultValue="470 W 200 NUnit 115" /></div><div className="grid grid-cols-2 gap-4"><div><Label htmlFor="country">Country *</Label><Select defaultValue="us"><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="us">United States</SelectItem></SelectContent></Select></div><div><Label htmlFor="state">State</Label><Select defaultValue="utah"><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="utah">Utah</SelectItem></SelectContent></Select></div></div><div className="grid grid-cols-2 gap-4"><div><Label htmlFor="city">City</Label><Input id="city" defaultValue="Salt Lake City" /></div><div><Label htmlFor="zip">Zip Code</Label><Input id="zip" defaultValue="84103" /></div></div><div><Label htmlFor="website">Website</Label><Input id="website" defaultValue="medio" /></div><Button variant="outline" className="w-full border-dashed"><Plus className="mr-2 h-4 w-4"/>Add custom value</Button></div>);
            case "Email Configurations": return (<div className="space-y-6"><h3 className="text-xl font-semibold">Email Configurations</h3><div className="space-y-4"><div><Label htmlFor="fromName">From Name</Label><Input id="fromName" placeholder="From Name" /></div><div><Label htmlFor="fromEmail">From Email</Label><Input id="fromEmail" placeholder="From Email" type="email" /></div></div></div>);
            case "Title and Terms": return (<div className="space-y-8"><div className="space-y-4"><h3 className="text-xl font-semibold">Estimate Title & Terms</h3><div><Label htmlFor="estimateTitle">Title</Label><Input id="estimateTitle" defaultValue="ESTIMATE"/></div><div><Label>Terms/Notes</Label><MockRichTextEditor /></div></div><div className="space-y-4"><h3 className="text-xl font-semibold">Invoice Title and Terms</h3><div><Label htmlFor="invoiceTitle">Title *</Label><Input id="invoiceTitle" defaultValue="INVOICE"/></div><div><Label>Terms/Notes</Label><MockRichTextEditor /></div><p className="text-xs text-muted-foreground">Pro tip: It pays to be polite. Invoices that include "please" and "thanks" get paid up to 2 days faster.</p></div></div>);
            case "Payment Settings": return (<div className="space-y-6"><h3 className="text-xl font-semibold">Payment Settings</h3><div className="grid grid-cols-1 gap-4"><div><Label htmlFor="estimateExpire">Estimate expire after X days *</Label><Input id="estimateExpire" defaultValue="14" /></div><div><Label htmlFor="estimatePrefix">Estimate Prefix *</Label><Input id="estimatePrefix" defaultValue="EST-" /><p className="text-xs text-muted-foreground mt-1">Prefix to be used while generating all estimates</p></div><div><Label htmlFor="invoiceDue">Invoice due after X days *</Label><Input id="invoiceDue" defaultValue="14" /></div><div><Label htmlFor="invoicePrefix">Invoice Prefix *</Label><Input id="invoicePrefix" defaultValue="INV-" /><p className="text-xs text-muted-foreground mt-1">Prefix to be used while generating all invoices</p></div></div><Separator /><div><div className="flex items-center justify-between"><h4 className="font-medium">Manage default stripe payment methods for your invoices</h4><Button variant="link" className="p-0 h-auto">Manage</Button></div><p className="text-sm text-muted-foreground">Note - Any invoice created from Workflows, Document & Contracts, Estimates will have these default settings</p></div><Separator /><div className="flex items-center justify-between"><div className="w-2/3"><Label className="font-semibold">Allow Partial Payments</Label><p className="text-sm text-muted-foreground">Allows customer to pay your invoices partially with any amount less than the total amount. Set the minimum percentage of total amount you want to collect in each payment</p></div><Switch /></div><Separator /><div className="flex items-center justify-between"><div className="w-2/3"><Label className="font-semibold">Charge Late Fees</Label><p className="text-sm text-muted-foreground">It will be applied to overdue invoices created past the enablement by default, which can be changed at an invoice level</p></div><Switch /></div><Separator /><div className="flex items-center justify-between"><div className="w-2/3"><Label className="font-semibold">Allow Tip Payments</Label><p className="text-sm text-muted-foreground">Allow customers to add a tip to their invoice payment</p></div><Switch /></div></div>);
            case "Product Settings": return (<div className="space-y-6"><h3 className="text-xl font-semibold">Product Settings</h3><div className="flex items-start justify-between"><div className="w-2/3"><Label className="font-semibold">Import Product Description</Label><p className="text-sm text-muted-foreground">When enabled the product description will be imported from the product to the invoice automatically and you will be able to edit it in the invoice</p></div><Switch defaultChecked/></div><Separator /><div className="flex items-start justify-between"><div className="w-2/3"><Label className="font-semibold">Make Product Description Optional</Label><p className="text-sm text-muted-foreground">Choose whether product descriptions are shown by default or hidden behind an "Add/show description" button in the editor</p></div><Switch defaultChecked/></div></div>);
            case "Reminder Settings": return <ReminderSettingsView />;
            case "Custom fields": return (<div className="space-y-6"><h3 className="text-xl font-semibold">Custom fields</h3><div className="space-y-4">{customFields.map((field, index) => (<div key={field.id} className="flex items-center gap-2"><div className="flex-grow"><Label htmlFor={`cf-${field.id}`}>Custom Field {index + 1} *</Label><Select><SelectTrigger><SelectValue placeholder="Choose an item"/></SelectTrigger><SelectContent><SelectItem value="item1">Item 1</SelectItem></SelectContent></Select></div><Button variant="ghost" size="icon" onClick={() => removeCustomField(field.id)}><X className="h-4 w-4"/></Button></div>))}</div><Button variant="outline" className="w-full border-dashed" onClick={addCustomField}><Plus className="mr-2 h-4 w-4"/>Add more custom field</Button></div>);
            case "Customer Notifications": return <CustomerNotificationsView />;
            case "Team Notifications": return <TeamNotificationsView />;
            default: return <PlaceholderContent title={activeSection} />;
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-6xl h-[90vh] flex flex-col p-0">
                <DialogHeader className="p-6 pb-4 border-b"><DialogTitle>Settings</DialogTitle><DialogDescription>Change your document settings</DialogDescription></DialogHeader>
                <div className="flex flex-grow overflow-hidden">
                    <aside className="w-1/4 border-r p-6 overflow-y-auto">
                        <nav className="flex flex-col gap-1">
                           {settingsNav.map(item => (
                               item.subItems ? (
                                   <Accordion key={item.name} type="single" collapsible>
                                       <AccordionItem value={item.name} className="border-none">
                                           <AccordionTrigger className="py-2 px-3 hover:bg-muted rounded-md">{item.name}</AccordionTrigger>
                                           <AccordionContent className="pl-4">
                                               {item.subItems.map(subItem => (
                                                    <Button key={subItem} variant="ghost" className={`w-full justify-start ${activeSection === subItem ? 'bg-muted font-semibold' : ''}`} onClick={() => setActiveSection(subItem)}>{subItem}</Button>
                                               ))}
                                           </AccordionContent>
                                       </AccordionItem>
                                   </Accordion>
                               ) : (
                                <Button key={item.name} variant="ghost" className={`justify-start ${activeSection === item.name ? 'bg-muted font-semibold' : ''}`} onClick={() => setActiveSection(item.name)}>{item.name}</Button>
                               )
                           ))}
                        </nav>
                    </aside>
                    <main className="w-3/4 overflow-y-auto p-6">{renderSectionContent()}</main>
                </div>
                 <DialogFooter className="p-6 border-t"><Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button><Button>Save</Button></DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// --- View for "All Invoices" ---
const AllInvoicesView = ({ onNavigate }: { onNavigate: (tab: string) => void }) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const PaymentMetricCard = ({ title, value }: { title: string, value: string }) => ( <Card className="bg-muted/40"><CardContent className="p-4"><p className="text-sm text-muted-foreground">{title}</p><p className="text-2xl font-bold">{value}</p></CardContent></Card> );
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center"><div><h2 className="text-3xl font-bold">Invoices</h2><p className="text-muted-foreground">Create and manage all invoices generated for your business</p></div><div className="flex items-center gap-2"><Button variant="outline" onClick={() => setIsSettingsOpen(true)}><Settings className="mr-2 h-4 w-4" />Settings</Button><Button><Plus className="mr-2 h-4 w-4" />New</Button></div></div>
            <Alert className="relative border-blue-200 bg-blue-50/50 text-blue-800 [&>svg]:text-blue-500"><Info className="h-4 w-4" /><X className="absolute top-3 right-3 h-4 w-4 cursor-pointer" /><div className="flex justify-between items-center w-full"><div><AlertDescription_shadcn>Connect at least one payment gateway to start receiving payments</AlertDescription_shadcn></div><Button variant="outline" className="bg-transparent border-blue-300 hover:bg-blue-100" onClick={() => onNavigate('Integrations')}>Integrate Payment Gateway</Button></div></Alert>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6"><PaymentMetricCard title="0 Invoice(s) in Draft" value="$0.00" /><PaymentMetricCard title="0 Invoice(s) in Due" value="$0.00" /><PaymentMetricCard title="0 Invoice(s) received" value="$0.00" /><PaymentMetricCard title="0 Invoice(s) Overdue" value="$0.00" /></div>
            <Card><CardContent className="p-6"><div className="flex flex-wrap items-center justify-between gap-4 mb-4"><div className="flex items-center gap-2 flex-grow"><Input placeholder="Start Date" className="w-40" /><span>→</span><Input placeholder="End Date" className="w-40" /><div className="relative flex-grow max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search" className="pl-10" /></div></div><div className="flex items-center gap-2"><Popover><PopoverTrigger asChild><Button variant="outline"><Filter className="mr-2 h-4 w-4"/>Filters</Button></PopoverTrigger><PopoverContent className="w-64" align="end"><div className="flex justify-between items-center mb-4 pb-2 border-b"><h4 className="font-semibold text-sm">Filters</h4><div><Button variant="link" className="text-muted-foreground p-0 h-auto text-sm">Clear</Button><Button variant="link" className="p-0 h-auto ml-4 text-sm">Apply</Button></div></div><div className="space-y-4"><div><label className="text-sm font-medium">Invoice Status</label><Select defaultValue="all"><SelectTrigger className="mt-1"><SelectValue placeholder="Select status" /></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="draft">Draft</SelectItem><SelectItem value="due">Due</SelectItem><SelectItem value="paid">Paid</SelectItem></SelectContent></Select></div><div><label className="text-sm font-medium">Payment Mode</label><Select defaultValue="all"><SelectTrigger className="mt-1"><SelectValue placeholder="Select mode" /></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="card">Card</SelectItem><SelectItem value="paypal">PayPal</SelectItem><SelectItem value="manual">Manual</SelectItem></SelectContent></Select></div></div></PopoverContent></Popover><Button variant="ghost" size="icon"><RefreshCw className="h-5 w-5 text-muted-foreground" /></Button></div></div><div className="border rounded-lg"><Table><TableHeader><TableRow className="hover:bg-transparent"><TableHead>Invoice Name</TableHead><TableHead>Invoice Number</TableHead><TableHead>Customer</TableHead><TableHead>Issue Date</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell colSpan={6}><div className="h-64 flex flex-col items-center justify-center text-center"><div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4"><Search className="h-6 w-6 text-muted-foreground"/></div><p className="font-semibold text-foreground">No invoices to show yet</p></div></TableCell></TableRow></TableBody></Table></div></CardContent></Card>
            <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
        </div>
    );
};

// --- View for "Recurring Invoices" ---
const RecurringInvoicesView = ({ onNavigate }: { onNavigate: (tab: string) => void }) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div><h2 className="text-3xl font-bold">Recurring Invoices</h2><p className="text-muted-foreground">Automatically send invoices to customers at scheduled frequency</p></div>
                <div className="flex items-center gap-2"><Button variant="outline" onClick={() => setIsSettingsOpen(true)}><Settings className="mr-2 h-4 w-4" />Settings</Button><Button><Plus className="mr-2 h-4 w-4" />New</Button></div>
            </div>
            <Alert className="relative border-blue-200 bg-blue-50/50 text-blue-800 [&>svg]:text-blue-500"><Info className="h-4 w-4" /><X className="absolute top-3 right-3 h-4 w-4 cursor-pointer" /><div className="flex justify-between items-center w-full"><div><AlertDescription_shadcn>Connect at least one payment gateway to start receiving payments</AlertDescription_shadcn></div><Button variant="outline" className="bg-transparent border-blue-300 hover:bg-blue-100" onClick={() => onNavigate('Integrations')}>Integrate Payment Gateway</Button></div></Alert>
            <Card><CardContent className="p-6"><div className="flex justify-end gap-4 mb-4"><div className="relative max-w-xs w-full"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search" className="pl-10" /></div><Button variant="outline"><Filter className="mr-2 h-4 w-4"/>Filters</Button></div><div className="border rounded-lg"><Table><TableHeader><TableRow className="hover:bg-transparent"><TableHead>Recurring Invoice Name</TableHead><TableHead>Customer</TableHead><TableHead>Last Issued On</TableHead><TableHead>Frequency</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell colSpan={6}><div className="h-64 flex flex-col items-center justify-center text-center"><div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4"><Search className="h-6 w-6 text-muted-foreground"/></div><p className="font-semibold text-foreground">No recurring invoices to show yet</p></div></TableCell></TableRow></TableBody></Table></div></CardContent></Card>
            <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
        </div>
    );
};

// --- View for "Templates" ---
const TemplatesView = ({ onNavigate }: { onNavigate: (tab: string) => void }) => {
    const TemplateListView = ({ type }: { type: 'invoice' | 'estimate' }) => {
        const emptyText = type === 'invoice' ? "No invoice templates to show yet" : "No estimate templates to show yet";
        return (<Card><CardContent className="p-6"><div className="flex justify-end gap-4 mb-4"><div className="relative max-w-xs w-full"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search" className="pl-10" /></div></div><div className="border rounded-lg"><Table><TableHeader><TableRow className="hover:bg-transparent"><TableHead>Template Name</TableHead><TableHead>Amount</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell colSpan={2}><div className="h-64 flex flex-col items-center justify-center text-center gap-4"><div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center"><Search className="h-6 w-6 text-muted-foreground"/></div><p className="font-semibold text-foreground">{emptyText}</p>{type === 'estimate' && (<Button><Plus className="mr-2 h-4 w-4" />New Template</Button>)}</div></TableCell></TableRow></TableBody></Table></div></CardContent></Card>);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center"><div><h2 className="text-3xl font-bold">Templates</h2><p className="text-muted-foreground">Create templates for invoices and estimates for automation and consistency</p></div><Button><Plus className="mr-2 h-4 w-4" />New Template</Button></div>
            <Tabs defaultValue="invoices"><TabsList><TabsTrigger value="invoices">Invoices</TabsTrigger><TabsTrigger value="estimates">Estimates</TabsTrigger></TabsList>
                <TabsContent value="invoices" className="mt-4 space-y-4"><Alert className="relative border-blue-200 bg-blue-50/50 text-blue-800 [&>svg]:text-blue-500"><Info className="h-4 w-4" /><X className="absolute top-3 right-3 h-4 w-4 cursor-pointer" /><div className="flex justify-between items-center w-full"><div><AlertDescription_shadcn>Connect at least one payment gateway to start receiving payments</AlertDescription_shadcn></div><Button variant="outline" className="bg-transparent border-blue-300 hover:bg-blue-100" onClick={() => onNavigate('Integrations')}>Integrate Payment Gateway</Button></div></Alert><TemplateListView type="invoice" /></TabsContent>
                <TabsContent value="estimates" className="mt-4"><TemplateListView type="estimate" /></TabsContent>
            </Tabs>
        </div>
    )
}

// --- View for "Estimates" ---
const EstimatesView = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const MetricCard = ({ title, value }: { title: string, value: string }) => (<Card className="bg-muted/40"><CardContent className="p-4"><p className="text-sm text-muted-foreground">{title}</p><p className="text-2xl font-bold">{value}</p></CardContent></Card>);
    const tabs = ["All", "Draft", "Sent", "Accepted", "Declined", "Invoiced"];
    const tabContent = (<Card><CardContent className="p-6"><div className="flex justify-between items-center gap-4 mb-4"><div className="flex items-center gap-2"><Input placeholder="Start Date" className="w-40" /><span>→</span><Input placeholder="End Date" className="w-40" /></div><div className="relative max-w-xs w-full"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search" className="pl-10" /></div></div><div className="border rounded-lg"><Table><TableHeader><TableRow className="hover:bg-transparent"><TableHead>Quote Name</TableHead><TableHead>Estimate Number</TableHead><TableHead>Customer</TableHead><TableHead>Issue Date</TableHead><TableHead>Value</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell colSpan={6}><div className="h-64 flex flex-col items-center justify-center text-center gap-4"><div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center"><Search className="h-6 w-6 text-muted-foreground"/></div><p className="font-semibold text-foreground">Estimates</p><Button><Plus className="mr-2 h-4 w-4" />New Estimate</Button></div></TableCell></TableRow></TableBody></Table></div></CardContent></Card>);
    return (
        <div className="space-y-6">
             <div className="flex justify-between items-center">
                <div><h2 className="text-3xl font-bold">Estimates</h2><p className="text-muted-foreground">Create and Manage all estimates generated for your business</p></div>
                <div className="flex items-center gap-2"><Button variant="outline" onClick={() => setIsSettingsOpen(true)}><Settings className="mr-2 h-4 w-4" />Settings</Button><Button><Plus className="mr-2 h-4 w-4" />New Estimate</Button></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6"><MetricCard title="0 in sent" value="$0.00" /><MetricCard title="0 in accepted" value="$0.00" /><MetricCard title="0 in declined" value="$0.00" /><MetricCard title="0 in invoiced" value="$0.00" /></div>
            <Tabs defaultValue="All"><TabsList>{tabs.map(tab => <TabsTrigger key={tab} value={tab}>{tab}</TabsTrigger>)}</TabsList>{tabs.map(tab => (<TabsContent key={tab} value={tab} className="mt-4">{tabContent}</TabsContent>))}</Tabs>
            <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
        </div>
    );
};

// --- View for "Documents & Contracts" ---
const DocumentsAndContractsView = ({ onNavigate }: { onNavigate: (tab: string) => void }) => {
    const tabs = [{ name: "Draft", count: 0 }, { name: "Waiting for others", count: 0 }, { name: "Completed", count: 0 }, { name: "Payments", count: 0 }, { name: "Archived", count: 0 },];
    const EmptyState = () => (<div className="h-80 flex flex-col items-center justify-center text-center gap-4"><div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center"><Search className="h-8 w-8 text-muted-foreground"/></div><div className="space-y-1"><h3 className="text-xl font-semibold">Time to close a deal!</h3><p className="text-muted-foreground">No drafts in sight! Ready to create a fresh proposal?</p></div></div>);
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center"><div><h2 className="text-3xl font-bold">Documents & Contracts<span className="text-lg text-muted-foreground font-normal ml-2">(Proposals, Estimates & Contracts)</span></h2><p className="text-muted-foreground">Manage and oversee all documents & contracts created for your business.</p></div><div className="flex items-center gap-2"><Button variant="outline"><Settings className="mr-2 h-4 w-4" />Settings</Button><Button><Plus className="mr-2 h-4 w-4" />New</Button></div></div>
            <div className="flex justify-between items-center gap-4"><div className="flex items-center gap-2 border rounded-md p-1"><Input placeholder="Start Date" className="border-none focus-visible:ring-0 w-36" /><span className="text-muted-foreground">→</span><Input placeholder="End Date" className="border-none focus-visible:ring-0 w-36" /></div><div className="relative flex-grow max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search..." className="pl-10" /></div></div>
            <Tabs defaultValue="Draft"><TabsList>{tabs.map(tab => (<TabsTrigger key={tab.name} value={tab.name}>{tab.name}<span className="ml-2 bg-muted text-muted-foreground text-xs font-bold px-2 py-0.5 rounded-full">{tab.count}</span></TabsTrigger>))}</TabsList>
                {tabs.map(tab => (<TabsContent key={tab.name} value={tab.name} className="mt-4"><div className="border rounded-lg"><Table><TableHeader><TableRow className="hover:bg-transparent"><TableHead>Title</TableHead><TableHead>Status</TableHead><TableHead>Customer</TableHead><TableHead>Date modified</TableHead><TableHead>Value</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell colSpan={5}><EmptyState /></TableCell></TableRow></TableBody></Table></div></TabsContent>))}
            </Tabs>
        </div>
    );
};

// --- Vista para "Documents & Contracts Templates" ---
const DocumentTemplatesView = () => {
    const tabs = ["Templates", "Public Documents", "Content Library"];

    // Contenido reutilizable para el estado vacío de la tabla
    const EmptyState = () => (
        <div className="h-80 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <FileX className="h-8 w-8 text-muted-foreground"/>
            </div>
            <p className="text-muted-foreground">No Data</p>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold">
                        Documents & Contracts Templates
                    </h2>
                    <p className="text-muted-foreground">Create documents and contracts templates for automation and consistency.</p>
                </div>
                <Button><Plus className="mr-2 h-4 w-4" />New</Button>
            </div>

            <Tabs defaultValue="Templates">
                <TabsList>
                    {tabs.map(tab => (
                        <TabsTrigger key={tab} value={tab}>{tab}</TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="Templates" className="mt-4">
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div className="flex justify-between items-center gap-4">
                                <div className="flex items-center gap-2 border rounded-md p-1">
                                    <Input placeholder="Start Date" className="border-none focus-visible:ring-0 w-36" />
                                    <span className="text-muted-foreground">→</span>
                                    <Input placeholder="End Date" className="border-none focus-visible:ring-0 w-36" />
                                </div>
                                <div className="relative flex-grow max-w-sm">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Search..." className="pl-10" />
                                </div>
                            </div>
                            <div className="border rounded-lg">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="hover:bg-transparent">
                                            <TableHead>Title</TableHead>
                                            <TableHead>Value</TableHead>
                                            <TableHead>Date modified</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell colSpan={3}>
                                                <EmptyState />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="Public Documents">
                    <PlaceholderContent title="Public Documents" />
                </TabsContent>
                <TabsContent value="Content Library">
                    <PlaceholderContent title="Content Library" />
                </TabsContent>
            </Tabs>
        </div>
    );
};

// --- Component that renders the correct view for Invoices & Estimates ---
const InvoicesAndEstimatesContent = ({ activeSubTab, onNavigate }: { activeSubTab: string, onNavigate: (tab: string) => void }) => {
    switch (activeSubTab) {
        case "All Invoices": return <AllInvoicesView onNavigate={onNavigate} />;
        case "Recurring Invoices": return <RecurringInvoicesView onNavigate={onNavigate} />;
        case "Templates": return <TemplatesView onNavigate={onNavigate} />;
        case "Estimates": return <EstimatesView />;
        default: return <AllInvoicesView onNavigate={onNavigate} />;
    }
};

// --- Component that renders the correct view for Documents & Contracts ---
const DocumentsAndContractsContent = ({ activeSubTab, onNavigate }: { activeSubTab: string, onNavigate: (tab: string) => void }) => {
    switch (activeSubTab) {
        case "All Documents & Contracts": return <DocumentsAndContractsView onNavigate={onNavigate} />;
        case "Templates":
            return <DocumentTemplatesView />;
        default: return <DocumentsAndContractsView onNavigate={onNavigate} />;
    }
};



// --- Component for "Integrations" page ---
const IntegrationsContent = () => (<div>Integrations Page</div>);

// --- Placeholder for unimplemented views ---
const PlaceholderContent = ({ title }: { title: string }) => (<div className="p-6 text-center"><h2 className="text-3xl font-bold">{title}</h2><p className="text-muted-foreground">This section is under construction.</p></div>);

// --- Main Page Component ---
export default function PaymentsPage() {
    const [activeTab, setActiveTab] = useState("Invoices & Estimates");
    const [activeInvoiceSubTab, setActiveInvoiceSubTab] = useState("All Invoices");
    const [activeDocsSubTab, setActiveDocsSubTab] = useState("All Documents & Contracts");

    const navItems = [
        { name: "Invoices & Estimates", isDropdown: true, subItems: [{ name: "All Invoices", isNew: false },{ name: "Recurring Invoices", isNew: false },{ name: "Templates", isNew: false },{ name: "Estimates", isNew: true },]},
        { name: "Documents & Contracts", isDropdown: true, subItems: [{ name: "All Documents & Contracts", isNew: false },{ name: "Templates", isNew: false },]},
        { name: "Orders", isDropdown: true },
        { name: "Subscriptions", isDropdown: false },
        { name: "Payment Links", isDropdown: false },
        { name: "Transactions", isDropdown: false },
        { name: "Products", isDropdown: false },
        { name: "Coupons", isDropdown: false },
        { name: "Settings", isDropdown: false },
        { name: "Integrations", isDropdown: false },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'Invoices & Estimates': return <InvoicesAndEstimatesContent activeSubTab={activeInvoiceSubTab} onNavigate={setActiveTab} />;
            case 'Documents & Contracts': return <DocumentsAndContractsContent activeSubTab={activeDocsSubTab} onNavigate={setActiveTab} />;
            case 'Integrations': return <IntegrationsContent />;
            default: return <PlaceholderContent title={activeTab} />;
        }
    };
    
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col h-full gap-6">
                <header className="flex-shrink-0">
                    <div className="flex items-center border-b">
                        <h1 className="text-xl font-bold pr-6">Payments</h1>
                        <nav className="flex-grow">
                            <ul className="flex items-center gap-1">
                                {navItems.map((item) => (
                                    <li key={item.name}>
                                        {item.isDropdown ? (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild><Button variant="ghost" className={`text-sm font-medium h-auto py-2 px-3 rounded-none border-b-2 ${activeTab === item.name ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground'}`}>{item.name}<ChevronDown className="h-4 w-4 ml-1" /></Button></DropdownMenuTrigger>
                                                <DropdownMenuContent align="start">
                                                    {item.subItems?.map(subItem => (
                                                        <DropdownMenuItem key={subItem.name} onClick={() => {
                                                            setActiveTab(item.name);
                                                            if(item.name === "Invoices & Estimates") { setActiveInvoiceSubTab(subItem.name); } 
                                                            else if (item.name === "Documents & Contracts") { setActiveDocsSubTab(subItem.name); }
                                                        }}>
                                                            <span className={ (item.name === "Invoices & Estimates" && activeInvoiceSubTab === subItem.name) || (item.name === "Documents & Contracts" && activeDocsSubTab === subItem.name) ? 'text-primary' : '' }>{subItem.name}</span>
                                                            {subItem.isNew && <span className="ml-auto text-xs bg-yellow-400/80 text-yellow-900 px-1.5 py-0.5 rounded-sm font-bold">New</span>}
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        ) : (
                                            <Button onClick={() => setActiveTab(item.name)} variant="ghost" className={`text-sm font-medium h-auto py-2 px-3 rounded-none border-b-2 ${activeTab === item.name ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground'}`}>{item.name}</Button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </header>
                <main className="flex-grow">{renderContent()}</main>
            </div>
        </div>
    );
}
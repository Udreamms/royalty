"use client";

import React, { useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription_shadcn, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Bold,
    Box,
    HandCoins, // <-- CORREGIDO AQUÍ
    ChevronDown,
    CreditCard,
    DollarSign,
    Download,
    FileDown,
    FileX,
    Filter,
    Globe2,
    Info,
    Italic,
    List,
    ListOrdered,
    Plus,
    RefreshCw,
    Search,
    Settings,
    Shield,
    Trash2,
    Underline,
    UploadCloud,
    X,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";


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
    { name: "Business Information" },
    { name: "Receipts" }, // <-- AÑADE ESTA LÍNEA
    { name: "Email Configurations" },
    { name: "Title and Terms" },
    { name: "Payment Settings" },
    { name: "Product Settings" },
    { name: "Reminder Settings" },
    { name: "Custom fields" },
    { name: "Notifications", subItems: ["Customer Notifications", "Team Notifications"] }
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
            case "Receipts": return (
            <div className="space-y-6">
                <h3 className="text-xl font-semibold">Receipts</h3>
                <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/20">
                    <Label htmlFor="enable-receipts" className="font-normal text-base">Enable automatic sales receipts for payments</Label>
                    <Switch id="enable-receipts" defaultChecked />
                </div>
                <div className="space-y-5">
                    <div>
                        <Label htmlFor="receiptTitle">Title *</Label>
                        <Input id="receiptTitle" defaultValue="RECEIPT" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="receiptPrefix">Receipt prefix *</Label>
                            <Input id="receiptPrefix" defaultValue="REC" />
                            <p className="text-xs text-muted-foreground mt-1">Prefix to be used while generating all receipts</p>
                        </div>
                        <div>
                            <Label htmlFor="receiptStartNumber">Receipt start number *</Label>
                            <Input id="receiptStartNumber" defaultValue="10001" />
                            <p className="text-xs text-muted-foreground mt-1">Define the number to be used when creating the first receipt. The number will automatically increment with each receipt created</p>
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="receiptFromName">From Name</Label>
                        <Input id="receiptFromName" placeholder="From Name" />
                        <p className="text-xs text-muted-foreground mt-1">Name used while sending receipt notifications. If left blank, business name will be used</p>
                    </div>
                    <div>
                        <Label htmlFor="receiptFromEmail">From Email</Label>
                        <Input id="receiptFromEmail" placeholder="From Email" />
                        <p className="text-xs text-muted-foreground mt-1">Email address used while sending receipt notifications. If left blank, business email will be used</p>
                    </div>
                    <div>
                        <Label htmlFor="receiptSubject">Subject *</Label>
                        <Input id="receiptSubject" defaultValue="[[receipt.company.name]]] Thank you for your recent purchase" />
                    </div>
                    <div>
                        <Label htmlFor="receiptEmailTemplate">Email Template</Label>
                        <Select defaultValue="default">
                            <SelectTrigger id="receiptEmailTemplate"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="default">Default</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Add Notes / Terms</Label>
                        <MockRichTextEditor />
                    </div>
                </div>
            </div>
        );
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

// --- View for "Subscriptions" ---
const SubscriptionsView = () => {
    return (
        <div className="space-y-6">
            {/* Encabezado */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold">Subscriptions</h2>
                    <p className="text-muted-foreground">Keep track of customer subscriptions created via order forms</p>
                </div>
                <Button><Plus className="mr-2 h-4 w-4" />Add Subscription</Button>
            </div>

            {/* Tarjeta de contenido principal */}
            <Card>
                <CardContent className="p-6">
                    {/* Barra de filtros y búsqueda */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-2 flex-grow">
                            <Input placeholder="Start Date" className="w-40" />
                            <span className="text-muted-foreground">→</span>
                            <Input placeholder="End Date" className="w-40" />
                            <div className="relative flex-grow max-w-xs">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search" className="pl-10" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline"><Filter className="mr-2 h-4 w-4"/>Filters</Button>
                            <Button variant="outline" size="icon">
                                <Download className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Tabla de suscripciones */}
                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead>Provider</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Source</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <div className="h-64 flex flex-col items-center justify-center text-center">
                                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                                                <Search className="h-6 w-6 text-muted-foreground"/>
                                            </div>
                                            <p className="font-semibold text-foreground">No subscriptions to show yet</p>
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

// --- View for "Payment Links" ---
const PaymentLinksView = () => {
    return (
        <div className="space-y-6">
            {/* Encabezado */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold">Payment Links</h2>
                    <p className="text-muted-foreground">Create and Manage your Payment Links</p>
                </div>
                <Button><Plus className="mr-2 h-4 w-4" />Create New Payment Link</Button>
            </div>

            {/* Tarjeta de contenido */}
            <Card>
                <CardContent className="p-6">
                    {/* Barra de filtros y búsqueda */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-2">
                            <Input placeholder="Start Date" className="w-40" />
                            <span className="text-muted-foreground">→</span>
                            <Input placeholder="End Date" className="w-40" />
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search" className="pl-10" />
                            </div>
                            <Button variant="outline"><Filter className="mr-2 h-4 w-4"/>Filters</Button>
                        </div>
                    </div>

                    {/* Tabla */}
                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead>Name</TableHead>
                                    <TableHead>Link Url</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Created At</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <div className="h-64 flex flex-col items-center justify-center text-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                                <Search className="h-6 w-6 text-muted-foreground"/>
                                            </div>
                                            <p className="font-semibold text-foreground">Payment Links</p>
                                            <Button><Plus className="mr-2 h-4 w-4"/>Create Link</Button>
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

// --- View for "Transactions" ---
const TransactionsView = () => {
    return (
        <div className="space-y-6">
            {/* Encabezado */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold">Transactions</h2>
                    <p className="text-muted-foreground">Track customer payments at a single place</p>
                </div>
                <Button variant="outline"><FileDown className="mr-2 h-4 w-4" />Import as CSV</Button>
            </div>

            {/* Tarjeta de contenido */}
            <Card>
                <CardContent className="p-6">
                    {/* Barra de filtros y búsqueda */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-2">
                            <Input placeholder="Start Date" className="w-40" />
                            <span className="text-muted-foreground">→</span>
                            <Input placeholder="End Date" className="w-40" />
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search" className="pl-10" />
                            </div>
                            <Button variant="outline"><Filter className="mr-2 h-4 w-4"/>Filters</Button>
                            <Button variant="ghost" size="icon">
                                <RefreshCw className="h-5 w-5 text-muted-foreground" />
                            </Button>
                        </div>
                    </div>

                    {/* Tabla */}
                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Provider</TableHead>
                                    <TableHead>Source</TableHead>
                                    <TableHead>Transaction Date</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <div className="h-64 flex flex-col items-center justify-center text-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                                <Search className="h-6 w-6 text-muted-foreground"/>
                                            </div>
                                            <p className="font-semibold text-foreground">No transactions to show yet</p>
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

// --- View for "Coupons" ---
const CouponsView = () => {
    const couponTabs = ["All", "Active", "Scheduled", "Expired"];

    // Creamos un componente reutilizable para el estado vacío
    const EmptyState = () => (
        <div className="h-64 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <Search className="h-6 w-6 text-muted-foreground"/>
            </div>
            <p className="font-semibold text-foreground">No coupons found</p>
            <Button><Plus className="mr-2 h-4 w-4"/>Create Coupon</Button>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Encabezado */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold">Coupons</h2>
                    <p className="text-muted-foreground">Manage coupon discounts to increase conversion</p>
                </div>
                <Button><Plus className="mr-2 h-4 w-4" />Create Coupon</Button>
            </div>

            {/* Tarjeta de contenido principal */}
            <Card>
                <CardContent className="p-6">
                    <Tabs defaultValue="All">
                        {/* Pestañas de filtro y barra de búsqueda */}
                        <div className="flex justify-between items-center mb-4">
                            <TabsList>
                                {couponTabs.map(tab => (
                                    <TabsTrigger key={tab} value={tab}>{tab}</TabsTrigger>
                                ))}
                            </TabsList>
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search" className="pl-10" />
                            </div>
                        </div>

                        {/* Contenido de la tabla (igual para todas las pestañas en este ejemplo) */}
                        {couponTabs.map(tab => (
                            <TabsContent key={tab} value={tab}>
                                <div className="border rounded-lg">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="hover:bg-transparent">
                                                <TableHead>Coupon Name</TableHead>
                                                <TableHead>Coupon Code</TableHead>
                                                <TableHead>Discount</TableHead>
                                                <TableHead>Start Date</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Redemption Count</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell colSpan={6}>
                                                    <EmptyState />
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
};

// --- Sub-componente para los ajustes de Recibos (Receipts) ---
const ReceiptsSettings = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b">
                <div>
                    <h3 className="text-xl font-semibold">Receipts</h3>
                </div>
                <div className="flex items-center gap-2">
                    <Switch id="automatic-receipts" defaultChecked />
                    <Label htmlFor="automatic-receipts" className="font-normal whitespace-nowrap">Enable automatic sales receipts for payments</Label>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <Label htmlFor="receipt-title">Title *</Label>
                    <Input id="receipt-title" defaultValue="RECEIPT" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="receipt-prefix">Receipt prefix *</Label>
                        <Input id="receipt-prefix" defaultValue="REC" />
                        <p className="text-xs text-muted-foreground mt-1">Prefix to be used while generating all receipts</p>
                    </div>
                    <div>
                        <Label htmlFor="receipt-start-number">Receipt start number *</Label>
                        <Input id="receipt-start-number" defaultValue="10001" type="number" />
                        <p className="text-xs text-muted-foreground mt-1">Define the number to be used when creating the first receipt...</p>
                    </div>
                </div>
                <div>
                    <Label htmlFor="from-name">From Name</Label>
                    <Input id="from-name" placeholder="From Name" />
                    <p className="text-xs text-muted-foreground mt-1">Name used while sending receipt notifications. If left blank, business name will be used</p>
                </div>
                <div>
                    <Label htmlFor="from-email">From Email</Label>
                    <Input id="from-email" placeholder="From Email" />
                    <p className="text-xs text-muted-foreground mt-1">Email address used while sending receipt notifications. If left blank, business email will be used</p>
                </div>
                <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input id="subject" defaultValue="[[receipt.company.name]] Thank you for your recent purchase" />
                </div>
                <div>
                    <Label>Email Template</Label>
                    <Select defaultValue="default">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="default">Default</SelectItem></SelectContent>
                    </Select>
                </div>
                <div>
                    <Label>Add Notes / Terms</Label>
                    {/* Aquí reutilizamos el editor de texto que ya tenías */}
                    <MockRichTextEditor />
                </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
                <Button>Save</Button>
            </div>
        </div>
    );
};

// --- Sub-componente para los ajustes de Impuestos (Taxes) ---
const TaxesSettings = () => {
    return (
        <div className="space-y-8">
            {/* Sección de Incluir Impuesto en Precios */}
            <div className="pb-6 border-b">
                <h3 className="text-lg font-semibold">Include tax in prices</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Define if product prices should be inclusive or exclusive of tax by default.
                </p>
                <RadioGroup defaultValue="no" className="space-y-2">
                    <Label className="flex items-start gap-3 border rounded-md p-4 cursor-pointer [&:has([data-state=checked])]:border-primary">
                        <RadioGroupItem value="yes" id="tax-yes" />
                        <div className="grid gap-1.5">
                            <span className="font-semibold">Yes</span>
                            <span className="text-sm text-muted-foreground">
                                Tax will be included in the purchase price. The price shown to the customer will include the tax amount.
                            </span>
                        </div>
                    </Label>
                    <Label className="flex items-start gap-3 border rounded-md p-4 cursor-pointer [&:has([data-state=checked])]:border-primary">
                        <RadioGroupItem value="no" id="tax-no" />
                        <div className="grid gap-1.5">
                            <span className="font-semibold">No</span>
                            <span className="text-sm text-muted-foreground">
                                Tax will not be included in the purchase price. The price shown to the customer will not include the tax amount.
                            </span>
                        </div>
                    </Label>
                </RadioGroup>
            </div>

            {/* Sección de Tasas de Impuestos */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h3 className="text-lg font-semibold">Tax Rates</h3>
                        <p className="text-sm text-muted-foreground">Manage tax rates for your business</p>
                    </div>
                    <Button><Plus className="mr-2 h-4 w-4" />Add Tax</Button>
                </div>
                <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead>Name</TableHead>
                                <TableHead>Rate</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Tax Id Number</TableHead>
                                <TableHead>Tax Agency</TableHead>
                                <TableHead>Created At</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <div className="h-64 flex flex-col items-center justify-center text-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                            <Search className="h-6 w-6 text-muted-foreground" />
                                        </div>
                                        <p className="font-semibold text-foreground">No taxes to show yet</p>
                                        <Button><Plus className="mr-2 h-4 w-4" />Create Tax</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Sección de Impuestos Automáticos */}
            <div className="pb-6 border-b">
                <h3 className="text-lg font-semibold">Automatic Taxes</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Automatically calculates tax based on customer's address and/or business's address as applicable.
                </p>
                <div className="flex items-center gap-2">
                    <Switch id="automatic-tax" />
                    <Label htmlFor="automatic-tax" className="flex items-center gap-1 font-normal">
                        Enable automatic tax <Info className="h-4 w-4 text-muted-foreground" />
                    </Label>
                </div>
            </div>
        </div>
    );
};

// 1. (Opcional, si no lo tienes ya) Asegúrate de tener esta importación al inicio de tu archivo


// 2. Definimos una "interfaz" para describir las propiedades que espera el componente
interface NotificationSettingsBlockProps {
    title: string;
    description: string;
    toggleLabel: string;
    children: React.ReactNode; // 'React.ReactNode' significa que puede recibir cualquier elemento de React
}

// 3. Aplicamos la interfaz a las props del componente
const NotificationSettingsBlock = ({ title, description, toggleLabel, children }: NotificationSettingsBlockProps) => {
    return (
        <div className="border rounded-lg">
            <div className="p-6 space-y-4">
                <div>
                    <h4 className="text-lg font-semibold">{title}</h4>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
                <div className="flex items-center">
                    <Switch id={`toggle-${title.replace(/\s+/g, '-')}`} defaultChecked />
                    <Label htmlFor={`toggle-${title.replace(/\s+/g, '-')}`} className="ml-2 font-normal">{toggleLabel}</Label>
                </div>
                <div className="space-y-4 pt-4">
                    {children}
                </div>
            </div>
            <div className="bg-muted/50 px-6 py-3 flex justify-end rounded-b-lg border-t">
                <Button>Save</Button>
            </div>
        </div>
    );
};

// --- Sub-componente para los ajustes de Notificaciones ---
const NotificationsSettings = () => {
    return (
        <div className="space-y-8">
            <h3 className="text-xl font-semibold">Notifications</h3>
            {/* Carrito Abandonado */}
            <NotificationSettingsBlock
                title="Abandoned Cart"
                description="Send to the customer if they leave checkout before they buy the items in their cart."
                toggleLabel="Enable Abandoned Cart emails"
            >
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <div className="flex justify-between items-center">
                            <Label>Email Template</Label>
                            <Button variant="link" className="p-0 h-auto text-sm">Preview</Button>
                        </div>
                        <Select defaultValue="default">
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent><SelectItem value="default">Default</SelectItem></SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Subject *</Label>
                        <Input defaultValue="Complete your purchase" />
                    </div>
                </div>
                <div>
                    <Label>Send after</Label>
                    <div className="flex items-center gap-2">
                        <Input type="number" defaultValue={1} className="w-20" />
                        <Select defaultValue="hours">
                            <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="hours">hours</SelectItem>
                                <SelectItem value="days">days</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </NotificationSettingsBlock>

            {/* Confirmación de Orden */}
            <NotificationSettingsBlock
                title="Order confirmation Email for Stores"
                description="Send your customers an order confirmation Email, using which they can access and view their past orders as well."
                toggleLabel="Enable Order confirmation Email"
            >
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                         <div className="flex justify-between items-center">
                            <Label>Email Template</Label>
                            <Button variant="link" className="p-0 h-auto text-sm">Preview</Button>
                        </div>
                        <Select defaultValue="default">
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent><SelectItem value="default">Default</SelectItem></SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Subject</Label>
                        <Input defaultValue="Your Order has been successfully placed! Thank you for s" />
                    </div>
                </div>
            </NotificationSettingsBlock>

            {/* Email de Envío de Orden */}
            <NotificationSettingsBlock
                title="Order fulfillment Email"
                description="Send customers an order fulfillment email, this email will be sent to the user which will consist Shipping carrier, Tracking number, Tracking URL."
                toggleLabel="Enable Order Fulfillment Email"
            >
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <div className="flex justify-between items-center">
                            <Label>Email Template</Label>
                            <Button variant="link" className="p-0 h-auto text-sm">Preview</Button>
                        </div>
                        <Select defaultValue="default">
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent><SelectItem value="default">Default</SelectItem></SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Subject</Label>
                        <Input defaultValue="{{order.company.name}} Order fulfilled" />
                    </div>
                </div>
            </NotificationSettingsBlock>
        </div>
    );
};

// --- Sub-componente para los ajustes de Envío y Entrega (Shipping & Delivery) ---
const ShippingAndDeliverySettings = () => {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold">Shipping & Delivery</h3>

            {/* Sección de Zonas de Envío */}
            <div className="space-y-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                    <div>
                        <h4 className="text-lg font-semibold">Shipping Zones</h4>
                        <p className="text-sm text-muted-foreground">
                            How much you charge for shipping at checkout.
                            <Button variant="link" className="p-0 pl-1 h-auto">Learn more</Button>
                        </p>
                    </div>
                    <Button><Plus className="mr-2 h-4 w-4" />Add Zone</Button>
                </div>

                {/* Estado Vacío */}
                <div className="border-2 border-dashed rounded-lg min-h-[200px] flex flex-col items-center justify-center text-center p-6">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                        <Globe2 className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="font-semibold text-foreground mb-1">No zones added yet!</p>
                    <p className="text-sm text-muted-foreground">Add shipping zones to create rates for places you want to ship to.</p>
                </div>
            </div>
        </div>
    );
};

// --- Sub-componente para los ajustes de Origen de Envío (Shipping Origin) ---
const ShippingOriginSettings = () => {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold">Shipping origin</h3>
                <p className="text-sm text-muted-foreground">Where do you ship from</p>
            </div>
            <div className="space-y-4 pt-6 border-t">
                <div>
                    <Label htmlFor="origin-business-name">Business Name *</Label>
                    <Input id="origin-business-name" defaultValue="Udreamms LLC" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="origin-phone">Phone *</Label>
                        <Input id="origin-phone" defaultValue="+16507840581" />
                    </div>
                    <div>
                        <Label htmlFor="origin-email">Email *</Label>
                        <Input id="origin-email" type="email" defaultValue="joseph.flores.jc@gmail.com" />
                    </div>
                </div>
                <div>
                    <Label htmlFor="origin-street1">Street 1 *</Label>
                    <Input id="origin-street1" defaultValue="470 W 200 NUnit 115" />
                </div>
                <div>
                    <Label htmlFor="origin-street2">Street 2</Label>
                    <Input id="origin-street2" placeholder="Street 2" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="origin-country">Country *</Label>
                        <Select defaultValue="us">
                            <SelectTrigger id="origin-country"><SelectValue placeholder="Select a country" /></SelectTrigger>
                            <SelectContent><SelectItem value="us">United States</SelectItem></SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="origin-state">State *</Label>
                        <Select defaultValue="utah">
                            <SelectTrigger id="origin-state"><SelectValue placeholder="Select a state" /></SelectTrigger>
                            <SelectContent><SelectItem value="utah">Utah</SelectItem></SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="origin-city">City *</Label>
                        <Input id="origin-city" defaultValue="Salt Lake City" />
                    </div>
                    <div>
                        <Label htmlFor="origin-zip">Zip *</Label>
                        <Input id="origin-zip" defaultValue="84103" />
                    </div>
                </div>
            </div>
            <div className="flex justify-end pt-6 border-t">
                <Button>Save</Button>
            </div>
        </div>
    );
};

// --- Sub-componente para los ajustes de Suscripciones (Subscriptions) ---
const SubscriptionsSettings = () => {
    const retryOptions = [
        { id: 1, value: "Retry 1 day after the previous attempt" },
        { id: 2, value: "Retry 1 day after the previous attempt" },
        { id: 3, value: "Retry 1 day after the previous attempt" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-xl font-semibold">Subscription Settings</h3>
            </div>

            {/* Sección de Gestión de pagos fallidos */}
            <div className="space-y-4 pt-6 border-t">
                <div className="flex items-center gap-2">
                    <h4 className="text-lg font-semibold">Manage failed payments for subscriptions</h4>
                    <Info className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">Manually configure steps to manage failed payments for subscriptions until they succeed</p>
                <div className="space-y-2 max-w-sm">
                    {retryOptions.map(option => (
                        <div key={option.id} className="flex items-center gap-2">
                            <Select defaultValue="retry-1-day">
                                <SelectTrigger><SelectValue placeholder={option.value} /></SelectTrigger>
                                <SelectContent><SelectItem value="retry-1-day">{option.value}</SelectItem></SelectContent>
                            </Select>
                            <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-muted-foreground" /></Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sección de Estado de la suscripción */}
            <div className="space-y-2 pt-6 border-t">
                <h4 className="text-lg font-semibold">Subscription status</h4>
                <p className="text-sm text-muted-foreground">Subscription status to be updated to in case of all retries failing or in case there are no retries added</p>
                <div className="flex items-center space-x-2 pt-2">
                    <Checkbox id="cancel-subscription" />
                    <Label htmlFor="cancel-subscription" className="font-normal">If all retries for a payment fail, cancel the subscription</Label>
                </div>
            </div>

            {/* Sección de Gestión de facturas para pagos fallidos */}
            <div className="space-y-4 pt-6 border-t">
                 <div className="flex items-center gap-2">
                    <h4 className="text-lg font-semibold">Manage Invoices for failed Subscription Payments</h4>
                    <Info className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">Configure settings to enable or disable invoice creation and the option to send created invoices to customers.</p>
                <div className="flex items-center space-x-2">
                    <Switch id="auto-create-invoices" defaultChecked />
                    <Label htmlFor="auto-create-invoices">Automatically create invoices for failed subscription payments</Label>
                </div>
                <p className="text-sm text-muted-foreground">Automatically send invoices for failed subscription payments to customers via</p>
                <div className="space-y-2 pl-8">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="send-email" defaultChecked />
                        <Label htmlFor="send-email" className="font-normal">Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="send-sms" defaultChecked />
                        <Label htmlFor="send-sms" className="font-normal">SMS</Label>
                    </div>
                </div>
            </div>

            {/* Botones de Guardado */}
            <div className="flex justify-end gap-2 pt-6 border-t">
                <Button variant="outline">Cancel</Button>
                <Button>Save</Button>
            </div>
        </div>
    );
};

// --- Sub-componente para los ajustes de Cargos Misceláneos (Miscellaneous Charges) ---
const MiscellaneousChargesSettings = () => {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold">Miscellaneous Charges</h3>
            <div className="border rounded-lg mt-4">
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <h4 className="text-lg font-semibold">Processing Charges</h4>
                        <Info className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-start gap-4">
                        <Switch id="processing-charges" />
                        <div className="grid gap-1.5">
                            <Label htmlFor="processing-charges" className="font-medium">
                                Enable passing processing charges to customers
                            </Label>
                            <p className="text-sm text-muted-foreground">
                                Fees incurred in processing customer payments like Credit Card processing fees or 
                                convenience fees can be passed on to the customers
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-muted/50 px-6 py-4 flex justify-end gap-2 rounded-b-lg border-t">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save</Button>
                </div>
            </div>
        </div>
    );
};

// --- Sub-componente para los ajustes de Personalización de Enlaces de Pago ---
const PaymentLinkCustomizationSettings = () => {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold">Payment Link Customization</h3>
            </div>
            <div className="space-y-8 pt-6 border-t">
                {/* Selección de Tema */}
                <RadioGroup defaultValue="choose-theme" className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="choose-theme" id="choose-theme" />
                        <Label htmlFor="choose-theme">Choose Theme</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="brand-board" id="brand-board" />
                        <Label htmlFor="brand-board">Use Brand Board</Label>
                    </div>
                </RadioGroup>

                {/* Selectores de Color */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg">
                    <div>
                        <Label htmlFor="bg-color">Background Color</Label>
                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <div className="w-4 h-4 rounded-full border bg-white"></div>
                            </div>
                            <Input id="bg-color" defaultValue="#FFFFFF" className="pl-10" />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="btn-color">Button Color</Label>
                         <div className="relative mt-1">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#155EEF' }}></div>
                            </div>
                            <Input id="btn-color" defaultValue="#155EEF" className="pl-10" />
                        </div>
                    </div>
                </div>

                {/* Sección de Previsualización */}
                <div>
                    <h4 className="text-lg font-semibold mb-2">Preview</h4>
                    <div className="bg-muted/30 p-4 rounded-lg">
                        <Card className="p-6 md:p-8 shadow-md">
                            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                                {/* Lado Izquierdo de la Previsualización */}
                                <div className="w-full md:w-1/2 space-y-4">
                                    <h5 className="text-2xl font-bold">Fitness Center</h5>
                                    <div className="space-y-4">
                                        <div className="flex gap-4">
                                            <Box className="h-8 w-8 text-muted-foreground flex-shrink-0 mt-1" /> {/* <-- CORREGIDO AQUÍ */}
                                            <div>
                                                <p className="font-semibold">SMB Premium <span className="font-normal text-muted-foreground ml-2">$10</span></p>
                                                <p className="text-sm text-muted-foreground">This is a sample product description for the preview.</p>
                                            </div>
                                        </div>
                                         <div className="flex gap-4">
                                            <Box className="h-8 w-8 text-muted-foreground flex-shrink-0 mt-1" /> {/* <-- Y CORREGIDO AQUÍ */}
                                            <div>
                                                <p className="font-semibold">SMB Premium <span className="font-normal text-muted-foreground ml-2">$10</span></p>
                                                <p className="text-sm text-muted-foreground">This is a sample product description for the preview.</p>
                                                <div className="flex items-center border rounded-md w-fit mt-2">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-lg">-</Button>
                                                    <span className="px-4 font-medium">1</span>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-lg">+</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Separator className="my-4"/>
                                    <div className="flex justify-between text-sm"><p>Subtotal</p><p className="font-medium">$20.00</p></div>
                                    <div className="flex justify-between text-sm items-center">
                                        <p className="flex items-center gap-1 text-muted-foreground">Taxes <Info className="h-4 w-4" /></p>
                                        <p className="font-medium">$0.00</p>
                                    </div>
                                </div>
                                {/* Lado Derecho de la Previsualización */}
                                <div className="w-full md:w-1/2 space-y-4 rounded-lg">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><Label>First Name *</Label><Input placeholder="First Name" /></div>
                                        <div><Label>Last Name *</Label><Input placeholder="Last Name" /></div>
                                    </div>
                                    <div><Label>Email *</Label><Input type="email" placeholder="Email" /></div>
                                    <Button className="w-full h-12 text-base" style={{ backgroundColor: '#155EEF' }}>Pay</Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
             {/* Botón de Guardado */}
            <div className="flex justify-end pt-6 border-t">
                <Button>Save</Button>
            </div>
        </div>
    );
};

// --- Vista Principal para la pestaña "Settings" ---
const SettingsView = () => {
    const [activeSettingsTab, setActiveSettingsTab] = useState("Receipts");
    const settingsNav = [
        "Receipts", "Taxes", "Notifications", "Shipping & Delivery", 
        "Shipping Origin", "Subscriptions", "Miscellaneous Charges", "Payment Link Customization"
    ];

    const renderSettingsContent = () => {
        switch(activeSettingsTab) {
            case 'Receipts':
                return <ReceiptsSettings />;
            case 'Taxes': 
                return <TaxesSettings />;
             case 'Notifications': 
                return <NotificationsSettings />;
             case 'Shipping & Delivery':
                return <ShippingAndDeliverySettings />;
            case 'Shipping Origin': 
                return <ShippingOriginSettings />;
            case 'Subscriptions':
                return <SubscriptionsSettings />;
             case 'Miscellaneous Charges': 
                return <MiscellaneousChargesSettings />;
             case 'Payment Link Customization':
                return <PaymentLinkCustomizationSettings />;
            // Para las otras secciones, mostramos un placeholder por ahora
            default:
                return <PlaceholderContent title={activeSettingsTab} />;
        }
    };

    return (
        <Card>
            <div className="flex flex-col md:flex-row">
                <aside className="w-full md:w-1/4 border-b md:border-b-0 md:border-r p-4">
                    <nav className="flex flex-col gap-1">
                        {settingsNav.map(item => (
                            <Button
                                key={item}
                                variant="ghost"
                                className={`justify-start text-left h-auto py-2 ${activeSettingsTab === item ? 'bg-muted font-semibold' : ''}`}
                                onClick={() => setActiveSettingsTab(item)}
                            >
                                {item}
                            </Button>
                        ))}
                    </nav>
                </aside>
                <main className="w-full md:w-3/4 p-6">
                    {renderSettingsContent()}
                </main>
            </div>
        </Card>
    );
};


interface ProviderItemProps {
    logo: React.ReactNode; // React.ReactNode significa que puede ser cualquier elemento de React (un ícono, texto, etc.)
    name: string;
    description: string;
}

// Aplicamos la interfaz a las props del componente
const ProviderItem = ({ logo, name, description }: ProviderItemProps) => (
    <div className="border rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-4">
            <div className="w-24 h-12 flex-shrink-0 flex items-center justify-center">
                {logo}
            </div>
            <div>
                <h4 className="font-semibold text-base">{name}</h4>
                <p className="text-sm text-muted-foreground max-w-xl">{description}</p>
            </div>
        </div>
        <Button variant="outline" className="w-full sm:w-auto flex-shrink-0">Connect</Button>
    </div>
);

// --- Componente para la página "Integrations" ---
const IntegrationsContent = () => {
    const providers = [
        { 
            name: "Stripe", 
            description: "Millions of businesses of all sizes—from startups to large enterprises—use Stripe’s software and APIs to accept payments, send payouts, and manage their businesses online.", 
            logo: <p className="font-bold text-2xl text-indigo-600 tracking-tighter">stripe</p> 
        },
        { 
            name: "PayPal", 
            description: "With your Business account, you get access to diverse tools to help run your business and help it grow.", 
            logo: <p className="font-bold text-2xl text-blue-800 italic">PayPal</p> 
        },
        { 
            name: "Authorize.net", 
            description: "With your Business account, you get access to diverse tools to help run your business and help it grow.", 
            logo: <p className="font-semibold text-lg">authorize.net</p> 
        },
        { 
            name: "NMI", 
            description: "With your Business account, you get access to diverse tools to help run your business and help it grow.", 
            logo: <p className="font-bold text-2xl text-green-600">nmi</p> 
        },
        { 
            name: "Manual Payment Methods", 
            description: "Add Cash on Delivery or Custom Payment Methods for Manual Payment Collection", 
            logo: <HandCoins className="h-8 w-8 text-green-700" /> 
        },
        { 
            name: "Square", 
            description: "From small businesses to large enterprises, Square provides all the tools you need to start, run, and grow your business, including payment processing, point of sale, and business management solutions.", 
            logo: <div className="w-8 h-8 bg-black flex items-center justify-center"><div className="w-3.5 h-3.5 border-2 border-white"></div></div> 
        },
    ];
    
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold">Payment Integrations</h2>
                <p className="text-muted-foreground">Manage payment providers here</p>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">More Providers</h3>
                    <Button variant="link" className="text-sm">Search For More</Button>
                </div>

                <div className="space-y-4">
                    {providers.map(provider => (
                        <ProviderItem key={provider.name} {...provider} />
                    ))}
                </div>

                <div className="text-center pt-4">
                    <Button variant="outline">Search For More</Button>
                </div>
            </div>
        </div>
    );
};

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
            case 'Subscriptions': return <SubscriptionsView />;
            case 'Payment Links': return <PaymentLinksView />;
            case 'Transactions': return <TransactionsView />;
            case 'Coupons': return <CouponsView />;
            case 'Settings': return <SettingsView />;
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
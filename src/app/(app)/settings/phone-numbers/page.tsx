"use client";

import React, { useState } from "react";

// --- Iconos ---
const InfoIcon = ({ className = "h-5 w-5" }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg> );
const WarningIcon = ({ className = "h-6 w-6" }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" /></svg> );
const UploadIcon = ({ className = "h-8 w-8 text-muted-foreground" }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" /></svg> );
const ExternalLinkIcon = ({ className = "h-4 w-4" }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-4.5 0V6.75A.75.75 0 0114.25 6h1.5a.75.75 0 01.75.75v1.5m-4.5 0h4.5m-4.5 0l4.5-4.5" /></svg> );
const CalendarIcon = ({ className = "h-5 w-5 text-muted-foreground" }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18" /></svg> );
const ScriptIcon = ({ className = "h-6 w-6 text-muted-foreground" }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> );
const PlusIcon = ({ className = "h-5 w-5" }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" /></svg> );
const PasswordEyeIcon = ({ className = "h-5 w-5" }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.432 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> );
const TestCallIcon = ({ className = "h-6 w-6" }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" /></svg> );
const OutgoingCallIcon = ({ className = "h-5 w-5 text-green-700" }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9A2.25 2.25 0 004.5 18.75z" /></svg> );
const IncomingCallIcon = ({ className = "h-5 w-5 text-orange-700" }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" /></svg> );
const ExistingPhoneIcon = ({ className = "h-5 w-5 text-purple-700" }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg> );
const SearchPhoneIcon = ({ className = "h-5 w-5 text-blue-700" }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg> );
const SearchIcon = ({ className = "h-5 w-5" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
);
const NoDataIcon = ({ className = "h-12 w-12 text-muted-foreground/50" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9.75v4.5a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 14.25v-4.5m19.5 0a2.25 2.25 0 00-2.25-2.25H4.5A2.25 2.25 0 002.25 9.75m19.5 0v0a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 12v0m19.5 0v0a2.25 2.25 0 00-2.25-2.25H4.5A2.25 2.25 0 002.25 9.75m14.25-9l-3.75 3.75-3.75-3.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.03 16.03l3.94-3.94M13.97 16.03L10.03 12.09" />
    </svg>
);

// --- INTERFAZ PARA DEFINIR LOS TIPOS DE LAS PROPS ---
interface ToggleSwitchProps {
  label: string;
  description: string;
}
interface DatePickerPopoverProps {
  initialStartDate: Date | null;
  initialEndDate: Date | null;
  onDateChange: (dates: { start: Date | null; end: Date | null }) => void;
  onClose: () => void;
}
interface CalendarMonthProps {
  dateToDisplay: Date;
}

// --- Componente para el Toggle Switch ---
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, description }) => (
    <div className="flex items-start">
        <label className="relative inline-flex cursor-pointer items-center">
            <input type="checkbox" value="" className="peer sr-only" />
            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700"></div>
        </label>
        <div className="ml-4 flex-1">
            <div className="font-medium text-foreground">{label}</div>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    </div>
);

// --- Contenido para la pestaña "Manage Numbers" ---
const ManageNumbersContent = () => (
    <div>
        <h2 className="text-xl font-bold text-foreground">Manage Numbers</h2>
        <p className="mt-1 text-muted-foreground">
        Manage your Phone Numbers and their configuration here.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center rounded-xl border border-border bg-card p-16 text-center shadow-sm">
        <h3 className="text-lg font-medium text-foreground">
            Your phone system requires configuration
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
            Please reach out to our support team for assistance.
        </p>
        <button
            type="button"
            className="mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
            Phone System Settings
        </button>
        </div>
    </div>
);

// --- Contenido para la sección de Voice Calls ---
const VoiceCallsContent = () => {
    const [activeVoiceTab, setActiveVoiceTab] = useState('inbound');
    const voiceTabs = [
        { id: 'inbound', label: 'Inbound Call' },
        { id: 'outbound', label: 'Outbound Call' },
        { id: 'recording', label: 'Call Recording' },
    ];
  
    const renderContent = () => {
        switch (activeVoiceTab) {
            case 'inbound':
                return (
                    <div className="space-y-6 rounded-lg border border-border p-6">
                        <div className="flex items-start space-x-3">
                            <input id="forward-calls" type="checkbox" defaultChecked className="h-4 w-4 accent-primary mt-1 flex-shrink-0" />
                            <div className="text-sm">
                                <label htmlFor="forward-calls" className="font-medium text-foreground flex items-center gap-2">
                                    Forward calls to business phone number
                                    <InfoIcon className="h-4 w-4 text-muted-foreground" />
                                </label>
                                <p className="text-muted-foreground mt-1">
                                    If activated, calls will be forwarded to the business phone in case forwarding number and assigned user's phone number is not configured.
                                </p>
                            </div>
                        </div>
                        <hr className="border-border" />
                        <div className="flex items-start space-x-3">
                            <input id="ring-user" type="checkbox" defaultChecked className="h-4 w-4 accent-primary mt-1 flex-shrink-0" />
                            <div className="text-sm">
                                <label htmlFor="ring-user" className="font-medium text-foreground">
                                    Ring user assigned to called number
                                </label>
                                <p className="text-muted-foreground mt-1">
                                    If activated, calls will be forwarded to the user assigned to called number and not to the user assigned on the contact.
                                </p>
                            </div>
                        </div>
                    </div>
                );
            case 'outbound':
                return (
                    <div className="space-y-8">
                        <div className="flex items-start space-x-3">
                            <input id="connect-lead" type="checkbox" className="h-4 w-4 accent-primary mt-1 flex-shrink-0" />
                            <div className="text-sm">
                                <label htmlFor="connect-lead" className="font-medium text-foreground">
                                    Connect me to the lead after the call recording message ends playing
                                </label>
                                <p className="text-muted-foreground mt-1">
                                    Check this box to connect to your leads only after they've heard the call recording message. This helps you avoid listening to the call recording message yourself.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-foreground">Default Phone Number for Outbound Calls</h3>
                            <div className="mt-4 space-y-4">
                                <label className="block cursor-pointer rounded-lg border border-border p-4 hover:bg-muted/50">
                                    <div className="flex items-start space-x-3">
                                        <input name="outbound-phone" type="radio" className="h-4 w-4 accent-primary mt-1 flex-shrink-0" />
                                        <div className="text-sm">
                                            <span className="font-medium text-foreground">Local Presence Dialing</span>
                                            <p className="text-muted-foreground mt-1">Increases call answer rates by calling from a phone number local to the contact based on area code</p>
                                        </div>
                                    </div>
                                </label>
                                <label className="block cursor-pointer rounded-lg border border-border p-4 hover:bg-muted/50">
                                    <div className="flex items-start space-x-3">
                                        <input name="outbound-phone" type="radio" className="h-4 w-4 accent-primary mt-1 flex-shrink-0" />
                                        <div className="text-sm">
                                            <span className="font-medium text-foreground">Prefer phone number assigned to user</span>
                                            <p className="text-muted-foreground mt-1">Uses the phone number assigned to the user making the call. View and edit phone number assigned to user under Settings &gt; My Staff &gt; Edit &gt; Call & Voicemail settings</p>
                                        </div>
                                    </div>
                                </label>
                                <label className="block cursor-pointer rounded-lg border border-border p-4 hover:bg-muted/50">
                                    <div className="flex items-start space-x-3">
                                        <input name="outbound-phone" type="radio" className="h-4 w-4 accent-primary mt-1 flex-shrink-0" />
                                        <div className="text-sm">
                                            <span className="font-medium text-foreground">Prefer default phone number</span>
                                            <p className="text-muted-foreground mt-1">Uses the default number of your sub-account to make outgoing calls. View and edit default phone number under Settings &gt; Phone Numbers &gt; Manage Numbers</p>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                );
            case 'recording':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-foreground">Call Recording</h3>
                        <div className="rounded-lg border border-border bg-card p-6">
                            <ToggleSwitch 
                                label="Automatically Delete Older Recordings?" 
                                description="Enable automatic deletion to free up storage and reduce costs by removing recordings after a set time. This action is permanent and cannot be undone."
                            />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };
  
    return (
        <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
                <nav className="flex flex-col space-y-1">
                {voiceTabs.map(tab => (
                    <button
                    key={tab.id}
                    onClick={() => setActiveVoiceTab(tab.id)}
                    className={`text-left text-sm font-medium rounded-md px-3 py-2 transition-colors ${
                        activeVoiceTab === tab.id
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted/50'
                    }`}
                    >
                    {tab.label}
                    </button>
                ))}
                </nav>
            </div>
            <div className="md:w-3/4">
                {renderContent()}
            </div>
        </div>
    );
};

// --- Contenido para la sección de Voicemail ---
const VoicemailSettingsContent = () => {
  const [timeoutValue, setTimeoutValue] = useState(40);
  const [showWarning, setShowWarning] = useState(true);

 const handleTimeoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = Number(e.target.value);
  setTimeoutValue(value);
  setShowWarning(value > 20);
};

  const sliderProgress = (timeoutValue / 60) * 100;
  const sliderBackgroundStyle = {
    background: `linear-gradient(to right, #3b82f6 ${sliderProgress}%, #e5e7eb ${sliderProgress}%)`
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10">
      {/* Fila 1: Call & Voicemail Settings */}
      <div className="md:col-span-1">
        <h3 className="font-semibold text-foreground">Call & Voicemail Settings</h3>
        <p className="text-sm text-muted-foreground mt-2">
          This is the default voicemail message for all numbers in the location unless customized under <a href="#" className="text-primary hover:underline">Team Management Settings</a>.
        </p>
      </div>
      <div className="md:col-span-2 space-y-8">
        <div className="flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 p-4">
            <div className="flex items-center gap-4">
                <span className="text-primary text-xl">✨</span>
                <div>
                    <h4 className="font-semibold text-foreground">Still using voicemail? Try Voice AI Agents instead</h4>
                    <p className="text-sm text-muted-foreground">Always on, always helpful. They talk to your callers when you can't.</p>
                </div>
            </div>
            <a href="#" className="flex items-center gap-2 whitespace-nowrap rounded-md border bg-background px-3 py-2 text-sm font-medium hover:bg-muted">
                Set Up Voice AI
                <ExternalLinkIcon />
            </a>
        </div>
        <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-2">
                <h5 className="font-medium text-foreground">Incoming Call Timeout</h5>
                <InfoIcon className="text-muted-foreground"/>
            </div>
            <div className="relative mt-4">
                <input
                    type="range"
                    min="0"
                    max="60"
                    step="20"
                    value={timeoutValue}
                    onChange={handleTimeoutChange}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                    style={sliderBackgroundStyle}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>No Timeout</span>
                    <span>20 Sec</span>
                    <span>40 Sec</span>
                    <span>60 Sec</span>
                </div>
            </div>
            {timeoutValue > 20 && showWarning && (
                <div className="mt-4 flex items-start gap-3 rounded-lg border border-orange-300 bg-orange-50 p-3 text-sm text-orange-800">
                    <WarningIcon className="h-5 w-5 flex-shrink-0 text-orange-500 mt-0.5" />
                    <div className="flex-grow">
                        <p className="font-semibold">Timeout duration too high</p>
                        <p className="text-orange-700">To improve Call Status accuracy and ensure Voicemails go to your CRM instead of your personal phone, we recommend keeping this around 20 seconds.</p>
                    </div>
                    <button onClick={() => setShowWarning(false)} className="ml-auto -mx-1.5 -my-1.5 h-8 w-8 rounded-lg p-1.5 hover:bg-orange-100">
                        <span className="sr-only">Dismiss</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" /></svg>
                    </button>
                </div>
            )}
        </div>
        <div className="rounded-lg border bg-card p-6">
            <h4 className="font-semibold text-foreground">Voicemail Audio</h4>
             <div className="mt-4 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-8 text-center">
                <UploadIcon />
                <p className="mt-2 font-medium text-primary">Upload Audio File</p>
                <p className="text-xs text-muted-foreground">Click or drag a file to this area to upload. Supported formats are: mp3, wave, wav, aif, x-aiff, x-gsm, gsm or ulaw.</p>
            </div>
        </div>
        <div className="flex justify-end">
            <button type="button" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90">
                Save Call Settings
            </button>
        </div>
      </div>
      
      {/* Fila 2: SMS Settings */}
      <div className="md:col-span-1">
        <h3 className="font-semibold text-foreground">SMS Settings</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Customize the SMS Customizations and Optout texts
        </p>
      </div>
      <div className="md:col-span-2">
        <div className="rounded-lg border bg-card p-6 space-y-6">
            <div className="flex items-start space-x-3">
                <input id="missed-call-text" type="checkbox" defaultChecked className="h-4 w-4 accent-primary mt-1 flex-shrink-0" />
                <div className="text-sm">
                    <label htmlFor="missed-call-text" className="font-medium text-foreground">
                        Enabled Missed call text back
                    </label>
                    <p className="text-muted-foreground mt-1">
                        If activated, the you can text the customer and let them know your availability
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-between rounded-md border bg-muted/50 p-3">
                <p className="text-sm text-muted-foreground">Hi this is {'{{location.name}}'}, I saw that we just missed your call how can I help?</p>
                <button type="button" className="font-medium text-primary hover:underline text-sm whitespace-nowrap ml-4">Customize</button>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE DE CALENDARIO (MODIFICADO) ---
const DatePickerPopover: React.FC<DatePickerPopoverProps> = ({ 
  initialStartDate, 
  initialEndDate, 
  onDateChange, 
  onClose 
}) => {
    // 3. (Opcional pero recomendado) Especifica los tipos en los estados
    const [draftStartDate, setDraftStartDate] = useState<Date | null>(initialStartDate);
    const [draftEndDate, setDraftEndDate] = useState<Date | null>(initialEndDate);
    const [displayDate, setDisplayDate] = useState<Date>(initialStartDate || new Date());

    const ChevronLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>;
    const ChevronRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>;

    const goToPrevMonth = () => setDisplayDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
    const goToNextMonth = () => setDisplayDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));
    
const handleDateClick = (date: Date) => {
    if (!draftStartDate || draftEndDate) {
        setDraftStartDate(date);
        setDraftEndDate(null);
    } else if (date < draftStartDate) {
        setDraftStartDate(date);
    } else {
        setDraftEndDate(date);
    }
};

    const handleConfirm = () => {
        onDateChange({ start: draftStartDate, end: draftEndDate });
        onClose();
    };

    const setPresetToday = () => {
        const today = new Date();
        setDisplayDate(today);
        setDraftStartDate(today);
        setDraftEndDate(null);
    };
    const setPresetLast7Days = () => {
        const today = new Date();
        const pastDate = new Date();
        pastDate.setDate(today.getDate() - 6);
        setDisplayDate(pastDate);
        setDraftStartDate(pastDate);
        setDraftEndDate(today);
    };
     const setPresetThisMonth = () => {
        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        setDisplayDate(firstDay);
        setDraftStartDate(firstDay);
        setDraftEndDate(lastDay);
    };
     const setPresetThisYear = () => {
        const today = new Date();
        const firstDay = new Date(today.getFullYear(), 0, 1);
        const lastDay = new Date(today.getFullYear(), 11, 31);
        setDisplayDate(firstDay);
        setDraftStartDate(firstDay);
        setDraftEndDate(lastDay);
    };

 const CalendarMonth: React.FC<CalendarMonthProps> = ({ dateToDisplay }) => {
    const year = dateToDisplay.getFullYear();
    const month = dateToDisplay.getMonth();
    const monthName = dateToDisplay.toLocaleString('default', { month: 'short' });
    const today = new Date();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const calendarDays = [];
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    // Días del mes anterior (CORREGIDO)
    for (let i = firstDayOfMonth; i > 0; i--) {
        const day = prevMonthLastDay - i + 1;
        calendarDays.push({ day: day, isCurrent: false, date: new Date(year, month - 1, day) });
    }
    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push({ day: i, isCurrent: true, date: new Date(year, month, i) });
    }
    // Días del mes siguiente (CORREGIDO)
    const remaining = 42 - calendarDays.length;
    for (let i = 1; i <= remaining; i++) {
        calendarDays.push({ day: i, isCurrent: false, date: new Date(year, month + 1, i) });
    }

    return (
        <div className="flex-shrink-0">
            <div className="mb-3 flex items-center justify-between text-sm">
                <button onClick={goToPrevMonth} className="p-1 text-muted-foreground hover:text-foreground"><ChevronLeftIcon/></button>
                <span className="font-semibold text-foreground">{monthName} {year}</span>
                <button onClick={goToNextMonth} className="p-1 text-muted-foreground hover:text-foreground"><ChevronRightIcon/></button>
            </div>
            <div className="grid grid-cols-7 gap-x-2 text-center text-xs text-muted-foreground">
                <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
            </div>
            <div className="mt-2 grid grid-cols-7 gap-1">
                {calendarDays.map(({ day, isCurrent, date }, index) => {
                    // Ahora 'date' siempre es un objeto Date válido, por lo que estas líneas no darán error.
                    const isStartDate = draftStartDate && date.toDateString() === draftStartDate.toDateString();
                    const isEndDate = draftEndDate && date.toDateString() === draftEndDate.toDateString();
                    const isToday = date.toDateString() === today.toDateString();

                    const baseClasses = "relative flex h-8 w-8 items-center justify-center text-sm transition-colors rounded-full";
                    
                    if (!isCurrent) {
                        return <div key={index} className={`${baseClasses} text-muted-foreground/50`}>{day}</div>;
                    }

                    const stateClasses = isStartDate || isEndDate
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-foreground";

                    return (
                        <button key={index} onClick={() => handleDateClick(date)} className={`${baseClasses} ${stateClasses}`}>
                            {day}
                            {isToday && !isStartDate && !isEndDate && <span className="absolute bottom-1.5 h-1 w-1 rounded-full bg-primary"></span>}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

    const nextMonthDate = new Date(displayDate);
    nextMonthDate.setMonth(displayDate.getMonth() + 1);

    return (
        <div className="absolute right-0 top-full z-10 mt-2 min-w-max rounded-xl border bg-card p-4 shadow-lg">
            <div className="flex gap-x-6">
                <CalendarMonth dateToDisplay={displayDate} />
                <CalendarMonth dateToDisplay={nextMonthDate} />
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                <div className="flex items-center gap-x-1">
                     <button onClick={setPresetToday} className="rounded-md px-3 py-1.5 text-sm hover:bg-muted">Today</button>
                     <button onClick={setPresetLast7Days} className="rounded-md px-3 py-1.5 text-sm hover:bg-muted">Last 7 Days</button>
                     <button onClick={setPresetThisMonth} className="rounded-md px-3 py-1.5 text-sm hover:bg-muted">This Month</button>
                     <button onClick={setPresetThisYear} className="rounded-md px-3 py-1.5 text-sm hover:bg-muted">This Year</button>
                </div>
                <button onClick={handleConfirm} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                    Confirm
                </button>
            </div>
        </div>
    );
};

// --- CONTENIDO DE "RESTRICTION HISTORY" (CORREGIDO) ---
const RestrictionHistoryContent = () => {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    // El estado de las fechas ahora vive aquí
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(null);

    // Función para formatear la fecha a YYYY-MM-DD
    const formatDate = (date: Date | null): string => {
        if (!date) return '';
        // Intl.DateTimeFormat es más robusto para formatear fechas
        return new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
    };
    
    // Handler para actualizar las fechas desde el popover
    const handleDateChange = ({ start, end }: { start: Date | null; end: Date | null }) => {
        setStartDate(start);
        setEndDate(end);
    };

    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Restriction on SMS Sending</h3>
                <p className="text-sm text-muted-foreground mt-1">Keep track of SMS Sending Vulnerabilities</p>
              </div>
              <div className="relative">
                <button
                  onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                  className="flex w-full items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                  style={{ minWidth: '260px' }}
                >
                  <span className={startDate ? 'text-foreground' : 'text-muted-foreground'}>
                      {startDate ? formatDate(startDate) : 'Start Date'}
                  </span>
                  <span className="text-muted-foreground">→</span>
                  <span className={endDate ? 'text-foreground' : 'text-muted-foreground'}>
                      {endDate ? formatDate(endDate) : 'End Date'}
                  </span>
                  <CalendarIcon className="ml-4 h-4 w-4" />
                </button>
                {isDatePickerOpen && 
                    <DatePickerPopover 
                        initialStartDate={startDate}
                        initialEndDate={endDate}
                        onDateChange={handleDateChange}
                        onClose={() => setIsDatePickerOpen(false)} 
                    />}
              </div>
            </div>
          </div>
          <div className="border-t">
            {/* Table Header */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 px-6 py-3 text-sm font-medium text-muted-foreground bg-muted/50">
              <div className="col-span-1">Date</div>
              <div className="col-span-1">Restriction Type</div>
              <div className="col-span-1">Restriction Reason</div>
              <div className="col-span-1">Percentage/Count</div>
              <div className="col-span-1">Additional Details</div>
            </div>
            {/* Table Body - Empty State */}
            <div className="border-t">
              <div className="flex flex-col items-center justify-center gap-2 py-24 text-center">
                  <NoDataIcon />
                  <p className="text-sm font-medium text-muted-foreground mt-2">No Data</p>
              </div>
            </div>
          </div>
        </div>
    );
};

// --- CONTENIDO DE "CALL SCRIPTS" (NUEVO) ---
const CallScriptsContent = () => {
    return (
        <div>
            {/* Cabecera */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-foreground">Call Scripts</h2>
                    <p className="mt-1 text-muted-foreground">Create / Modify your scripts according to your need</p>
                </div>
                <button
                    type="button"
                    className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
                >
                    Add Scripts
                </button>
            </div>

            {/* Contenido - Estado Vacío */}
            <div className="mt-6 flex flex-col items-center justify-center rounded-lg border bg-card p-20 text-center shadow-sm">
                <div className="rounded-full bg-muted p-4">
                    <ScriptIcon />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                    No Calling Scripts Found
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                    You can Add your Calling Script which can help you while calling
                </p>
                <button
                    type="button"
                    className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
                >
                    <PlusIcon />
                    Add Scripts
                </button>
            </div>
        </div>
    );
};

// --- Contenido para la sección de VoIP deskphone (SIP) ---
const VoIPContent = () => {
    const [activeVoipTab, setActiveVoipTab] = useState('setup');
    const voipTabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'setup', label: 'Setup SIP' },
        { id: 'test', label: 'Test Calls' },
        { id: 'manage', label: 'Manage Device' },
    ];

    // --- Sub-componente para la pestaña Overview ---
    const OverviewContent = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex items-center justify-center rounded-2xl bg-muted/50 p-8 h-full">
                <svg className="w-48 h-48 text-muted-foreground/30" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="10" width="60" height="80" rx="5" fill="currentColor" opacity="0.1"/><rect x="25" y="15" width="25" height="60" rx="3" fill="currentColor" opacity="0.3"/><rect x="55" y="15" width="20" height="20" rx="3" fill="currentColor" opacity="0.3"/><rect x="55" y="40" width="20" height="45" rx="3" fill="currentColor" opacity="0.3"/></svg>
            </div>
            <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-foreground">Make and receive calls using your VoIP deskphone</h2>
                <p className="mt-2 text-lg text-muted-foreground">All integrated into your CRM!</p>
                <div className="mt-8 space-y-6">
                    <div className="flex items-start gap-4"><div className="rounded-full bg-green-100 p-2 flex-shrink-0"><OutgoingCallIcon/></div><div><p className="font-semibold text-foreground">Make Outgoing Calls</p><p className="text-sm text-muted-foreground">Place calls from your deskphone or SIP Softphone using your business number.</p></div></div>
                    <div className="flex items-start gap-4"><div className="rounded-full bg-orange-100 p-2 flex-shrink-0"><IncomingCallIcon/></div><div><p className="font-semibold text-foreground">Receive Incoming Calls</p><p className="text-sm text-muted-foreground">Get calls on your desk phone through your business number.</p></div></div>
                    <div className="flex items-start gap-4"><div className="rounded-full bg-purple-100 p-2 flex-shrink-0"><ExistingPhoneIcon/></div><div><p className="font-semibold text-foreground">Use Your Existing VoIP Phone</p><p className="text-sm text-muted-foreground">Connect your compatible SIP desk phone.</p><a href="#" className="text-sm font-medium text-primary hover:underline">Help article</a></div></div>
                    <div className="flex items-start gap-4"><div className="rounded-full bg-blue-100 p-2 flex-shrink-0"><SearchPhoneIcon/></div><div><p className="font-semibold text-foreground">Looking to buy new phone?</p><p className="text-sm text-muted-foreground">We recommend that support SIP protocol v2 or later with standard authentication.</p><a href="#" className="text-sm font-medium text-primary hover:underline">Recommended models</a></div></div>
                </div>
                <button type="button" className="mt-10 w-full rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90">Get Started</button>
            </div>
        </div>
    );
    
    // --- Sub-componente para la pestaña Setup SIP ---
    const SetupSipContent = () => (
        <div className="bg-card p-8 rounded-lg border shadow-sm">
            <div className="space-y-8">
                <div className="border-b pb-8">
                    <h2 className="text-xl font-bold text-foreground">SIP Server Configuration</h2>
                    <p className="mt-1 text-muted-foreground">Setup your SIP domain for your organization</p>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-foreground mb-1">SIP Domain/SIP Endpoint <span className="text-destructive">*</span></label>
                        <div className="flex items-center">
                            <input type="text" value="udreammsllc" readOnly className="flex-1 rounded-l-md border-y border-l bg-muted/50 p-2 text-muted-foreground" />
                            <span className="rounded-r-md border-y border-r bg-muted/50 p-2 text-muted-foreground text-sm">.sip.ashburn.twilio.com</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">This can be set only once.</p>
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-foreground">Create New SIP User</h2>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="extension" className="flex items-center gap-1 text-sm font-medium text-foreground mb-1">Extension/User Name <InfoIcon className="h-4 w-4 text-muted-foreground flex-shrink-0"/></label>
                            <input id="extension" type="text" placeholder='Example: "301" or "john"' className="w-full rounded-md border bg-background p-2" />
                            <p className="text-xs text-muted-foreground mt-1">Pro tip: Extensions should be 3-5 digits long. Avoid starting with 0, 1, or 9, and try to match the last digits of the assignee's direct-dial number</p>
                        </div>
                        <div>
                            <label htmlFor="password" className="flex items-center gap-1 text-sm font-medium text-foreground mb-1">Password <InfoIcon className="h-4 w-4 text-muted-foreground flex-shrink-0"/></label>
                            <div className="relative">
                                <input id="password" type="password" placeholder="Enter Password" className="w-full rounded-md border bg-background p-2 pr-10" />
                                <button className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"><PasswordEyeIcon /></button>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">Please store this yourself to connect your deskphone. We won't be able to share this with you</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-foreground mb-1">Assign to User <span className="text-destructive">*</span></label>
                        <select className="w-full rounded-md border bg-background p-2"><option>Search to assign User</option></select>
                    </div>
                </div>
            </div>
            <div className="mt-8 flex justify-end">
                <button type="button" className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90">Save Configuration</button>
            </div>
        </div>
    );

     // --- Sub-componente para la pestaña Test Calls (CORREGIDO) ---
    const TestCallsContent = () => (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-bold text-foreground">Test Your Deskphone Integration</h2>
                <p className="mt-1 text-muted-foreground">Make sure your deskphone is properly configured by testing calls</p>
            </div>
            <div className="rounded-lg border bg-card dark:bg-card/60 p-6 shadow-sm">
                <label className="block text-sm font-medium text-foreground mb-1">Select Your SIP User</label>
                <select className="w-full rounded-md border bg-background p-2 dark:bg-input"><option>Search User</option></select>
            </div>
            {/* Tarjeta de Información Corregida */}
            <div className="rounded-lg bg-muted/50 dark:bg-muted/20 p-6 flex items-start gap-4">
                <InfoIcon className="h-5 w-5 text-foreground flex-shrink-0 mt-1" />
                <div>
                    <h3 className="font-semibold text-foreground">Before Testing Your Deskphone</h3>
                    <p className="text-sm text-muted-foreground mt-2">Please ensure you've entered these 3 essential details in your deskphone's SIP settings:</p>
                    <ul className="mt-2 space-y-1 list-disc list-inside text-sm text-muted-foreground">
                        <li><span className="font-semibold text-foreground">SIP Server URL:</span> yourbusiness.sip.ashburn.twilio.com</li>
                        <li><span className="font-semibold text-foreground">Username:</span> The SIP username you created</li>
                        <li><span className="font-semibold text-foreground">Password:</span> The corresponding password for that username</li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-2">After configuring these settings in your deskphone, it should register with our SIP server. Most phones will display a registration status indicator when successful.</p>
                    <a href="#" className="inline-flex items-center gap-2 mt-2 text-sm font-medium text-primary hover:underline">
                        Help Doc 
                        <ExternalLinkIcon className="flex-shrink-0" />
                    </a>
                </div>
            </div>
            <div>
                <h3 className="text-xl font-bold text-foreground">Stimulate Calls</h3>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Tarjeta de Llamadas Salientes Corregida */}
                    <div className="rounded-lg border bg-card dark:bg-card/60 p-6 flex items-start gap-4 shadow-sm">
                        <div className="bg-muted/50 dark:bg-muted/20 p-3 rounded-full">
                           <TestCallIcon className="text-primary flex-shrink-0" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground">Test Outgoing Calls</h4>
                            <p className="text-sm text-muted-foreground mt-1">To test an outgoing call, use your physical deskphone to dial a number. If the call connects successfully, your SIP integration is working properly. If not, check your phone configuration or contact support.</p>
                        </div>
                    </div>
                    {/* Tarjeta de Llamadas Entrantes Corregida */}
                    <div className="rounded-lg border bg-card dark:bg-card/60 p-6 flex items-start gap-4 shadow-sm">
                         <div className="bg-muted/50 dark:bg-muted/20 p-3 rounded-full">
                           <TestCallIcon className="text-primary flex-shrink-0" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground">Receive Incoming Calls</h4>
                            <p className="text-sm text-muted-foreground mt-1">Test if your deskphone rings when receiving incoming calls through the platform.</p>
                            <button type="button" className="mt-4 w-full rounded-md bg-muted dark:bg-muted/30 px-4 py-2 text-sm font-medium text-muted-foreground cursor-not-allowed">Test Ring</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // --- Sub-componente para la pestaña Manage Device ---
const ManageDeviceContent = () => (
    <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <h2 className="text-xl font-bold text-foreground">Manage SIP Devices</h2>
                <p className="mt-1 text-muted-foreground">View, edit and delete your SIP devices</p>
            </div>
            <button
                type="button"
                className="rounded-md bg-primary/10 px-4 py-2 text-sm font-medium text-primary shadow-sm hover:bg-primary/20"
            >
                Add New Device
            </button>
        </div>
        <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon className="text-muted-foreground" />
            </div>
            <input
                type="text"
                placeholder="Search User"
                className="w-full rounded-md border bg-background py-2 pl-10 pr-3"
            />
        </div>
        <div className="rounded-lg border bg-card shadow-sm">
            <div className="grid grid-cols-4 gap-4 p-4 border-b bg-muted/50 text-sm font-semibold text-muted-foreground">
                <span>Extension/User Name</span>
                <span>Assigned To</span>
                <span>Created</span>
                <span>Actions</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
                <NoDataIcon />
                <p className="text-sm font-medium text-muted-foreground">No Data</p>
            </div>
        </div>
    </div>
);

    return ( <div className="flex flex-col md:flex-row gap-8"><div className="md:w-1/5"><nav className="flex flex-col space-y-1">{voipTabs.map(tab => ( <button key={tab.id} onClick={() => setActiveVoipTab(tab.id)} className={`text-left text-sm font-medium rounded-md px-3 py-2 transition-colors ${ activeVoipTab === tab.id ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground' }`}>{tab.label}</button> ))}</nav></div><div className="md:w-4/5 flex-1">{activeVoipTab === 'overview' && <OverviewContent />}{activeVoipTab === 'setup' && <SetupSipContent />}{activeVoipTab === 'test' && <TestCallsContent />}{activeVoipTab === 'manage' && <ManageDeviceContent />}</div></div> );
};


// --- Contenido para la pestaña "Advanced Settings" ---
const AdvancedSettingsContent = () => {
  const [activeSubTab, setActiveSubTab] = useState("voip");
  const subTabs = [ { id: "sms", label: "SMS Provider" }, { id: "voice", label: "Voice Calls" }, { id: "voicemail", label: "Voicemail & Missed Call Textback" }, { id: "history", label: "Restriction History" }, { id: "scripts", label: "Call Scripts" }, { id: "voip", label: "VoIP deskphone (SIP)" }, ];
  const renderSubTabContent = () => {
    switch (activeSubTab) {
      case "sms": return <div>Contenido de SMS</div>;
      case "voice": return <VoiceCallsContent />;
      case "voicemail": return <VoicemailSettingsContent />;
      case "history": return <RestrictionHistoryContent />;
      case "scripts": return <CallScriptsContent />;
      case "voip": return <VoIPContent />;
      default: return ( <div className="flex min-h-[200px] w-full items-center justify-center rounded-lg border-2 border-dashed border-border p-12"><p className="text-center text-muted-foreground">Content for {subTabs.find((t) => t.id === activeSubTab)?.label}</p></div> );
    }
  };
  return ( <div><h2 className="text-xl font-bold text-foreground">Advanced Settings</h2><p className="mt-1 text-muted-foreground">Choose when and how we contact you.</p><div className="mt-6 border-b border-border"><nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">{subTabs.map((tab) => ( <button type="button" key={tab.id} onClick={() => setActiveSubTab(tab.id)} className={`whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${ activeSubTab === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground" }`}>{tab.label}</button> ))}</nav></div><div className="mt-8">{renderSubTabContent()}</div></div> );
};

// --- Componente Principal ---
export default function PhoneNumbersPage() {
  const [activeTab, setActiveTab] = useState("advanced");
  const tabs = [ { id: "manage", label: "Manage Numbers" }, { id: "advanced", label: "Advanced Settings" }, ];
  return ( <div className="p-8 bg-background text-foreground min-h-screen"><div className="max-w-5xl mx-auto"><h1 className="text-3xl font-bold text-foreground mb-6">Phone System</h1><div className="border-b border-border"><nav className="-mb-px flex space-x-8" aria-label="Tabs">{tabs.map((tab) => ( <button type="button" key={tab.id} onClick={() => setActiveTab(tab.id)} className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${ activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground" }`}>{tab.label}</button> ))}</nav></div><div className="mt-8">{activeTab === "manage" && <ManageNumbersContent />}{activeTab === "advanced" && <AdvancedSettingsContent />}</div></div></div> );
}

//listo
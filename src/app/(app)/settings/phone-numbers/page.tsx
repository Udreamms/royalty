"use client";

import React, { useState } from "react";

// --- Iconos ---
const InfoIcon = ({ className = "h-5 w-5" }) => (
  <svg 
    className={className}
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor"
  >
    <path 
      fillRule="evenodd" 
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
      clipRule="evenodd" 
    />
  </svg>
);

const WarningIcon = ({ className = "h-6 w-6" }) => (
    <svg 
        className={className}
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor"
    >
        <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" 
        />
    </svg>
);

const UploadIcon = ({ className = "h-8 w-8 text-muted-foreground" }) => (
    <svg 
        className={className}
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor"
    >
        <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" 
        />
    </svg>
);

const ExternalLinkIcon = ({ className = "h-4 w-4" }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-4.5 0V6.75A.75.75 0 0114.25 6h1.5a.75.75 0 01.75.75v1.5m-4.5 0h4.5m-4.5 0l4.5-4.5"
        />
    </svg>
);

const CalendarIcon = ({ className = "h-5 w-5 text-muted-foreground" }) => (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18"
      />
    </svg>
);

const NoDataIcon = ({ className = "h-12 w-12 text-muted-foreground/50" }) => (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M49 63H15c-2.2 0-4-1.8-4-4V5c0-2.2 1.8-4 4-4h23l15 15v43c0 2.2-1.8 4-4 4z" />
      <path d="M38 1v15h15" />
      <circle cx="32" cy="41" r="10" />
      <path d="M37 36l-10 10M27 36l10 10" />
    </svg>
);

// --- Componente para el Toggle Switch ---
const ToggleSwitch = ({ label, description }) => (
    <div className="flex items-center">
        <label className="relative inline-flex cursor-pointer items-center">
        <input type="checkbox" value="" className="peer sr-only" />
        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700"></div>
        </label>
        <div className="ml-4">
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
    // La función renderContent iría aquí, la omito por brevedad pero debe estar presente.
    const renderContent = () => { /* ... Contenido ... */ };
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
                {/* Aquí se renderizaría el contenido de la pestaña de voz activa */}
            </div>
        </div>
    );
};

// --- Contenido para la sección de Voicemail (CORREGIDO) ---
const VoicemailSettingsContent = () => {
  const [timeoutValue, setTimeoutValue] = useState(40);
  const [showWarning, setShowWarning] = useState(true);

  const handleTimeoutChange = (e) => {
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

// --- NUEVO COMPONENTE: CALENDARIO DESPLEGABLE ---
const DatePickerPopover = ({ onClose }) => {
    const renderDay = (day, isCurrentMonth = true, isSelected = false) => (
      <button
        key={day}
        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
          isCurrentMonth ? "text-foreground" : "text-muted-foreground/50"
        } ${isSelected ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
      >
        {day}
      </button>
    );
  
    const sepDays = [ ...Array.from({length: 1}, (_, i) => 31 + i), ...Array.from({length: 30}, (_, i) => i + 1), ...Array.from({length: 11}, (_, i) => i + 1) ];
    const octDays = [ ...Array.from({length: 3}, (_, i) => 28 + i), ...Array.from({length: 31}, (_, i) => i + 1), ...Array.from({length: 8}, (_, i) => i + 1) ];

    return (
      <div className="absolute right-0 top-full z-10 mt-2 w-auto rounded-xl border bg-card p-4 shadow-lg">
        <div className="flex gap-x-6">
          {/* Calendario de Septiembre */}
          <div className="flex-shrink-0">
            <div className="mb-3 flex items-center justify-between">
              <button className="text-muted-foreground hover:text-foreground">{"<"}</button>
              <button className="text-muted-foreground hover:text-foreground">{"<<"}</button>
              <span className="font-semibold">Sep 2025</span>
              <button className="text-muted-foreground hover:text-foreground">{">"}</button>
              <button className="text-muted-foreground hover:text-foreground">{">>"}</button>
            </div>
            <div className="grid grid-cols-7 gap-x-2 text-center text-xs text-muted-foreground">
              <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
            </div>
            <div className="mt-2 grid grid-cols-7 gap-1">
              {sepDays.map((day, i) => renderDay(day, i >= 1 && i <= 30, day === 9))}
            </div>
          </div>
  
          {/* Calendario de Octubre */}
          <div className="flex-shrink-0">
             <div className="mb-3 flex items-center justify-between">
              <button className="text-muted-foreground hover:text-foreground">{"<"}</button>
              <button className="text-muted-foreground hover:text-foreground">{"<<"}</button>
              <span className="font-semibold">Oct 2025</span>
              <button className="text-muted-foreground hover:text-foreground">{">"}</button>
              <button className="text-muted-foreground hover:text-foreground">{">>"}</button>
            </div>
            <div className="grid grid-cols-7 gap-x-2 text-center text-xs text-muted-foreground">
              <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
            </div>
            <div className="mt-2 grid grid-cols-7 gap-1">
              {octDays.map((day, i) => renderDay(day, i >= 3 && i <= 33))}
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between border-t pt-3">
          <div className="flex items-center gap-x-1">
            <button className="rounded-md px-3 py-1.5 text-sm hover:bg-muted">Today</button>
            <button className="rounded-md px-3 py-1.5 text-sm hover:bg-muted">Last 7 Days</button>
            <button className="rounded-md px-3 py-1.5 text-sm hover:bg-muted">This Month</button>
            <button className="rounded-md px-3 py-1.5 text-sm hover:bg-muted">This Year</button>
          </div>
          <button onClick={onClose} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Confirm
          </button>
        </div>
      </div>
    );
};

// --- CONTENIDO MODIFICADO PARA "RESTRICTION HISTORY" ---
const RestrictionHistoryContent = () => {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

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
                  className="flex w-full items-center gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                >
                  <span>Start Date</span>
                  <span className="text-muted-foreground">→</span>
                  <span>End Date</span>
                  <CalendarIcon className="ml-4 h-4 w-4" />
                </button>
                {isDatePickerOpen && <DatePickerPopover onClose={() => setIsDatePickerOpen(false)} />}
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

// --- Contenido para la pestaña "Advanced Settings" ---
const AdvancedSettingsContent = () => {
  const [activeSubTab, setActiveSubTab] = useState("history"); 
  const subTabs = [
    { id: "sms", label: "SMS Provider" },
    { id: "voice", label: "Voice Calls" },
    { id: "voicemail", label: "Voicemail & Missed Call Textback" },
    { id: "history", label: "Restriction History" },
    { id: "scripts", label: "Call Scripts" },
    { id: "voip", label: "VoIP deskphone (SIP)" },
  ];

  const renderSubTabContent = () => {
    switch (activeSubTab) {
      case "sms":
        return (
          <div className="flex min-h-[200px] w-full items-center justify-center rounded-lg border-2 border-dashed border-border p-12">
            <p className="text-center text-muted-foreground">Content for SMS Provider</p>
          </div>
        );
      case "voice":
        return <VoiceCallsContent />;
      case "voicemail":
        return <VoicemailSettingsContent />;
      case "history":
        return <RestrictionHistoryContent />;
      default:
        return (
          <div className="flex min-h-[200px] w-full items-center justify-center rounded-lg border-2 border-dashed border-border p-12">
            <p className="text-center text-muted-foreground">
              Content for {subTabs.find((t) => t.id === activeSubTab)?.label}
            </p>
          </div>
        );
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground">Advanced Settings</h2>
      <p className="mt-1 text-muted-foreground">Choose when and how we contact you.</p>
      <div className="mt-6 border-b border-border">
        <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
          {subTabs.map((tab) => (
            <button
              type="button"
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeSubTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-8">
        {renderSubTabContent()}
      </div>
    </div>
  );
};


// --- Componente Principal ---
export default function PhoneNumbersPage() {
  const [activeTab, setActiveTab] = useState("advanced");
  const tabs = [
    { id: "manage", label: "Manage Numbers" },
    { id: "advanced", label: "Advanced Settings" },
  ];

  return (
    <div className="p-8 bg-background text-foreground min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-6">Phone System</h1>
        <div className="border-b border-border">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-8">
          {activeTab === "manage" && <ManageNumbersContent />}
          {activeTab === "advanced" && <AdvancedSettingsContent />}
        </div>
      </div>
    </div>
  );
}
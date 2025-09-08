"use client";

import React, { useState } from 'react';

// --- Icon Components ---
const AddIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

const GlobeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
);

const LeadConnectorIcon = ({ className = "w-10 h-10" }) => (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="url(#grad_lc)"/>
        <path d="M20 27.5C24.1421 27.5 27.5 24.1421 27.5 20C27.5 15.8579 24.1421 12.5 20 12.5C15.8579 12.5 12.5 15.8579 12.5 20C12.5 24.1421 15.8579 27.5 20 27.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 12.5C18.6868 12.5 17.4264 12.8973 16.3637 13.6165C15.301 14.3357 14.4886 15.3415 14 16.5M13.5 24C14.0114 25.1585 14.801 26.1643 15.8637 26.8835C16.9264 27.6027 18.1868 28 19.5 28M27 16C26.4886 14.8415 25.699 13.8357 24.6363 13.1165C23.5736 12.3973 22.3132 12 21 12M26.5 24.5C25.7933 25.9221 24.6083 27.0565 23.1363 27.731C21.6644 28.4055 20.0003 28.5684 18.4 28.2" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <defs><radialGradient id="grad_lc" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(20 20) rotate(90) scale(20)"><stop stopColor="#222956"/><stop offset="1" stopColor="#3A458E"/></radialGradient></defs>
    </svg>
);

const CheckmarkIcon = () => (
    <svg className="absolute top-2 right-2 w-5 h-5 text-white bg-blue-600 rounded-full p-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5"></path>
    </svg>
);

const WarningIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);

// --- Componente de la Vista SMTP ---
const SmtpServiceView = () => (
    <div className="mt-6">
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-xl font-semibold">SMTP Service</h2>
                <p className="text-sm text-muted-foreground">You can use your own SMTP services or use the default service</p>
            </div>
            <button className="bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary/90 transition-colors">
                <AddIcon />
                Add Service
            </button>
        </div>

        <div className="mt-6 bg-card border border-border rounded-lg p-6">
            <div className="flex justify-between items-center pb-6 border-b border-border">
                <h3 className="font-semibold text-lg">Select Default Provider</h3>
                <button className="border border-border px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-muted">
                    <GlobeIcon />
                    Dedicated Domain
                </button>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Left Column */}
                <div className="relative border-2 border-primary bg-primary/5 p-4 rounded-lg">
                    <CheckmarkIcon />
                    <div className="flex items-center gap-4">
                        <LeadConnectorIcon />
                        <div>
                            <p className="font-semibold text-foreground">LeadConnector Email System</p>
                            <p className="text-sm text-muted-foreground">mg.msgsndr.net</p>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border">
                        <button className="text-sm font-medium text-primary hover:underline">
                            View Configuration
                        </button>
                    </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col items-center text-center">
                    <LeadConnectorIcon className="w-20 h-20" />
                    <p className="mt-4 font-semibold text-lg">LeadConnector Email System</p>
                    
                    <div className="mt-6 w-full bg-orange-50 border border-orange-200 rounded-lg p-4 text-left">
                        <div className="flex items-start gap-3">
                            <WarningIcon />
                            <div>
                                <p className="text-sm text-orange-800 font-medium">
                                    Not having a dedicated sending domain can lead to several issues when it comes to email communication. Here are some of the potential problems you may face:
                                </p>
                                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-orange-700">
                                    <li>
                                        <span className="font-semibold">Deliverability Problems:</span> Messages may be caught in spam filters or rejected by recipients due to
                                    </li>
                                </ul>
                                <button className="text-sm text-orange-800 font-semibold hover:underline mt-3">
                                    Show More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// --- Componente Principal ---
export default function EmailServicesPage() {
    const [activeTab, setActiveTab] = useState("smtp");
    const tabs = [
        { id: "smtp", label: "SMTP Service" },
        { id: "reply", label: "Reply & Forward Settings" },
        { id: "analytics", label: "Email Analytics" },
        { id: "risk", label: "Risk Assessment" },
        { id: "bounce", label: "Bounce Classification" },
        { id: "postmaster", label: "Postmaster Tools" },
    ];

    return (
        <div className="p-6 bg-background text-foreground min-h-screen">
            <h1 className="text-3xl font-bold">Email Services</h1>
            
            {/* Navegación de Pestañas */}
            <div className="mt-6 border-b border-border">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-sm transition-colors
                                ${activeTab === tab.id
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Contenido de las Pestañas */}
            <div>
                {activeTab === 'smtp' && <SmtpServiceView />}
                {activeTab === 'reply' && <div className="p-10 text-center">Reply & Forward Settings Content</div>}
                {activeTab === 'analytics' && <div className="p-10 text-center">Email Analytics Content</div>}
                {active-tab === 'risk' && <div className="p-10 text-center">Risk Assessment Content</div>}
                {activeTab === 'bounce' && <div className="p-10 text-center">Bounce Classification Content</div>}
                {activeTab === 'postmaster' && <div className="p-10 text-center">Postmaster Tools Content</div>}
            </div>
        </div>
    );
}